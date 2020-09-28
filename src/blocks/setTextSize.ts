import BlockType from 'scratch-vm/src/extension-support/block-type'
import ArgumentType from 'scratch-vm/src/extension-support/argument-type'
import Cast from 'scratch-vm/src/util/cast'

import { BlockInfo } from './index'
import { translations } from '../translations'

const SetTextSizeBlock = {
  info(): BlockInfo {
    return {
      opcode: 'setTextSize',
      blockType: BlockType.COMMAND,
      text: translations.label('setTextSize'),
      arguments: {
        SIZE: {
          type: ArgumentType.NUMBER,
          defaultValue: 32,
        },
      },
    }
  },

  setTextSize(args: any) {
    this.property.text.size = Cast.toNumber(args.SIZE)
  },
}

export default SetTextSizeBlock
