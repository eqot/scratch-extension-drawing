import BlockType from 'scratch-vm/src/extension-support/block-type'
import ArgumentType from 'scratch-vm/src/extension-support/argument-type'
import Cast from 'scratch-vm/src/util/cast'

import { BlockInfo } from './index'
import { translations } from '../translations'

const SetTextPositionBlock = {
  info(): BlockInfo {
    return {
      opcode: 'setTextPosition',
      blockType: BlockType.COMMAND,
      text: translations.label('setTextPosition'),
      arguments: {
        H_POSITION: {
          type: ArgumentType.STRING,
          menu: 'hPosition',
        },
        V_POSITION: {
          type: ArgumentType.STRING,
          menu: 'vPosition',
        },
      },
    }
  },

  menus(): object {
    return {
      hPosition: {
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
      vPosition: {
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

  setTextPosition(args: any) {
    this.property.text.hPosition = Cast.toString(args.H_POSITION)
    this.property.text.vPosition = Cast.toString(args.V_POSITION)
  },
}

export default SetTextPositionBlock
