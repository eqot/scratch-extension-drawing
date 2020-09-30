import BlockType from 'scratch-vm/src/extension-support/block-type'
import ArgumentType from 'scratch-vm/src/extension-support/argument-type'
import Cast from 'scratch-vm/src/util/cast'

import { BlockInfo } from './index'
import { translations } from '../translations'

const SetTextAlignmentBlock = {
  info(): BlockInfo {
    return {
      opcode: 'setTextAlignment',
      blockType: BlockType.COMMAND,
      text: translations.label('setTextAlignment'),
      arguments: {
        H_ALIGNMENT: {
          type: ArgumentType.STRING,
          menu: 'hAlignment',
        },
        V_ALIGNMENT: {
          type: ArgumentType.STRING,
          menu: 'vAlignment',
        },
      },
    }
  },

  menus(): object {
    return {
      hAlignment: {
        items: [
          {
            value: 'left',
            text: translations.label('left'),
          },
          {
            value: 'center',
            text: translations.label('center'),
          },
          {
            value: 'right',
            text: translations.label('right'),
          },
        ],
        acceptReporters: true,
      },
      vAlignment: {
        items: [
          {
            value: 'top',
            text: translations.label('top'),
          },
          {
            value: 'center',
            text: translations.label('center'),
          },
          {
            value: 'bottom',
            text: translations.label('bottom'),
          },
        ],
        acceptReporters: true,
      },
    }
  },

  setTextAlignment(args: any) {
    this.property.text.hAlignment = Cast.toString(args.H_ALIGNMENT)
    this.property.text.vAlignment = Cast.toString(args.V_ALIGNMENT)
  },
}

export default SetTextAlignmentBlock
