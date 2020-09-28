import BlockType from 'scratch-vm/src/extension-support/block-type'
import ArgumentType from 'scratch-vm/src/extension-support/argument-type'
import Cast from 'scratch-vm/src/util/cast'

import { BlockInfo } from './index'
import { translations } from '../translations'

const DrawRectangleBlock = {
  info(): BlockInfo {
    return {
      opcode: 'drawRectangle',
      blockType: BlockType.COMMAND,
      text: translations.label('drawRectangle'),
      arguments: {
        X1: {
          type: ArgumentType.NUMBER,
          defaultValue: 0,
        },
        Y1: {
          type: ArgumentType.NUMBER,
          defaultValue: 0,
        },
        X2: {
          type: ArgumentType.NUMBER,
          defaultValue: 100,
        },
        Y2: {
          type: ArgumentType.NUMBER,
          defaultValue: 100,
        },
      },
    }
  },

  drawRectangle(args: any) {
    const [x1, y1] = this.getScratchCoordinate({ X: args.X1, Y: args.Y1 })
    const [x2, y2] = this.getScratchCoordinate({ X: args.X2, Y: args.Y2 })

    let x, width
    if (x1 < x2) {
      x = x1
      width = x2 - x1
    } else {
      x = x2
      width = x1 - x2
    }

    let y, height
    if (y1 < y2) {
      y = y1
      height = y2 - y1
    } else {
      y = y2
      height = y1 - y2
    }

    this.draw.rect(width, height).attr({ x, y }).attr({ fill: '#f06' })

    this.updateSVGLayer()
  },
}

export default DrawRectangleBlock
