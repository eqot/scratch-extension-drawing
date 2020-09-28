import Runtime from 'scratch-vm/src/engine/runtime'
import Cast from 'scratch-vm/src/util/cast'
import { SVG } from '@svgdotjs/svg.js'

import { translations } from './translations'
import { Blocks } from './blocks'

class DrawingExtension {
  private static BLOCKS_ORDER = [
    'clearAll',
    '---',
    'drawText',
    'setTextColor',
    'setTextSize',
    '---',
    'drawRectangle',
  ]

  private static LAYER_NAME = 'scratch-extension-drawing'

  private runtime: Runtime
  private blocks

  private skinId: number = -1

  private draw: any

  private property = {
    text: {
      size: 32,
      color: '#000000',
      fontFamily: 'Menlo, sans-serif',
      hPosition: 'left',
      vPosition: 'top',
    },
  }

  constructor(runtime: Runtime, locale?: string) {
    this.runtime = runtime

    translations.initialize(this.runtime, locale)

    this.blocks = Blocks(DrawingExtension.BLOCKS_ORDER)
    this.blocks.inject(this)

    runtime.on(Runtime.PROJECT_LOADED, () => {
      this.createSVGLayer()
    })
  }

  getInfo() {
    return {
      id: 'drawing',
      name: 'Drawing',
      menuIconURI: require('../assets/images/menuIcon.png'),
      blockIconURI: require('../assets/images/blockIcon.png'),
      color1: '#a0a0a0',
      color2: '#808080',
      color3: '#606060',

      blocks: this.blocks.info(),
      menus: this.blocks.menus(),
    }
  }

  private createSVGLayer(): void {
    if (this.skinId !== -1) {
      return
    }

    const { renderer } = this.runtime
    const size = renderer.getNativeSize()

    this.draw = SVG().size(size[0], size[1])
    this.draw.viewbox(0, 0, size[0], size[1])

    const layers = renderer._groupOrdering
    layers.push(DrawingExtension.LAYER_NAME)
    renderer.setLayerGroupOrdering(layers)

    const drawableId = renderer.createDrawable(DrawingExtension.LAYER_NAME)
    this.skinId = renderer.createSVGSkin(this.draw.svg())

    renderer.updateDrawableProperties(drawableId, { skinId: this.skinId })
  }

  private updateSVGLayer(): void {
    this.runtime.renderer.updateSVGSkin(this.skinId, this.draw.svg())
  }

  private getScratchCoordinate(args: any): number[] {
    const x = Cast.toNumber(args.X)
    const y = Cast.toNumber(args.Y)

    return [x + 240, -y + 180]
  }
}

export default DrawingExtension
