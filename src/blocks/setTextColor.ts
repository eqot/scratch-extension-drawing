import BlockType from 'scratch-vm/src/extension-support/block-type'
import ArgumentType from 'scratch-vm/src/extension-support/argument-type'

import { BlockInfo } from './index'
import { translations } from '../translations'

const SetTextColorBlock = {
  info(): BlockInfo {
    return {
      opcode: 'setTextColor',
      blockType: BlockType.COMMAND,
      text: translations.label('setTextColor'),
      arguments: {
        COLOR: {
          type: ArgumentType.COLOR,
        },
      },
    }
  },

  setTextColor(args: any) {
    this.property.text.color = args.COLOR
  },
}

export default SetTextColorBlock
