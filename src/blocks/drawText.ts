import BlockType from 'scratch-vm/src/extension-support/block-type'
import ArgumentType from 'scratch-vm/src/extension-support/argument-type'
import Cast from 'scratch-vm/src/util/cast'

import { BlockInfo } from './index'
import { translations } from '../translations'

const DrawTextBlock = {
  info(): BlockInfo {
    return {
      opcode: 'drawText',
      blockType: BlockType.COMMAND,
      text: translations.label('drawText'),
      arguments: {
        TEXT: {
          type: ArgumentType.STRING,
          defaultValue: 'Hello, World!',
        },
        X: {
          type: ArgumentType.NUMBER,
          defaultValue: 0,
        },
        Y: {
          type: ArgumentType.NUMBER,
          defaultValue: 0,
        },
      },
    }
  },

  drawText(args: any) {
    const text = Cast.toString(args.TEXT)
    const [x, y] = this.getScratchCoordinate(args)

    this.draw
      .text(text)
      .attr({ x, y })
      .font({
        size: this.property.text.size,
        family: this.property.text.fontFamily,
        fill: this.property.text.color,
        anchor: getAnchor(this.property.text.hAlignment),
      })
      .attr({ 'dominant-baseline': getDominantBaseline(this.property.text.vAlignment) })

    this.updateSVGLayer()
  },
}

function getAnchor(alignment: string): string {
  switch (alignment) {
    case 'left':
      return 'start'

    case 'center':
      return 'middle'

    case 'right':
      return 'end'

    default:
      break
  }
}

function getDominantBaseline(alignment: string): string {
  switch (alignment) {
    case 'top':
      return 'hanging'

    case 'center':
      return 'middle'

    case 'bottom':
      return 'text-top'

    default:
      break
  }
}

export default DrawTextBlock
