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
    'setTextPosition',
    '---',
    'drawRectangle',
  ]

  private static LAYER_NAME = 'sprite'

  private static INITIAL_PROPERTY = {
    text: {
      size: 32,
      color: '#000000',
      fontFamily: 'Menlo, sans-serif',
      hPosition: 'left',
      vPosition: 'top',
    },
  }

  private runtime: Runtime
  private blocks

  private drawableId?: number = null
  private skinId?: number = null

  private draw: any
  private property: any

  constructor(runtime: Runtime, locale?: string) {
    this.runtime = runtime

    translations.initialize(this.runtime, locale)

    this.blocks = Blocks(DrawingExtension.BLOCKS_ORDER)
    this.blocks.inject(this)

    runtime.on(Runtime.PROJECT_LOADED, () => {
      if (this.skinId !== null) {
        this.removeSvgLayer()
      }

      this.createSvgLayer()

      this.property = JSON.parse(JSON.stringify(DrawingExtension.INITIAL_PROPERTY))
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

  private createSvgLayer(): void {
    const { renderer } = this.runtime
    const [width, height] = renderer.getNativeSize()

    this.draw = SVG().size(width, height)
    this.draw.viewbox(0, 0, width, height)

    this.skinId = renderer.createSVGSkin(this.draw.svg())
    this.drawableId = renderer.createDrawable(DrawingExtension.LAYER_NAME)
    renderer.updateDrawableProperties(this.drawableId, { skinId: this.skinId })
  }

  private removeSvgLayer() {
    this.runtime.renderer.destroyDrawable(this.drawableId, DrawingExtension.LAYER_NAME)
    this.runtime.renderer.destroySkin(this.skinId)

    this.drawableId = null
    this.skinId = null
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
