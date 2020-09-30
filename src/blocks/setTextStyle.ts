import BlockType from 'scratch-vm/src/extension-support/block-type'
import ArgumentType from 'scratch-vm/src/extension-support/argument-type'
import Cast from 'scratch-vm/src/util/cast'

import { BlockInfo } from './index'
import { translations } from '../translations'

const SetTextStyleBlock = {
  info(): BlockInfo {
    return {
      opcode: 'setTextStyle',
      blockType: BlockType.COMMAND,
      text: translations.label('setTextStyle'),
      arguments: {
        STYLE: {
          type: ArgumentType.STRING,
          menu: 'style',
        },
        WEIGHT: {
          type: ArgumentType.STRING,
          menu: 'weight',
        },
      },
    }
  },

  menus(): object {
    return {
      style: {
        items: [
          {
            value: 'normal',
            text: translations.label('normal'),
          },
          {
            value: 'italic',
            text: translations.label('italic'),
          },
        ],
        acceptReporters: true,
      },
      weight: {
        items: [
          {
            value: 'normal',
            text: translations.label('normal'),
          },
          {
            value: 'bold',
            text: translations.label('bold'),
          },
          // {
          //   value: 'bolder',
          //   text: translations.label('bolder'),
          // },
          // {
          //   value: 'lighter',
          //   text: translations.label('lighter'),
          // },
        ],
        acceptReporters: true,
      },
    }
  },

  setTextStyle(args: any) {
    this.property.text.style = Cast.toString(args.STYLE)
    this.property.text.weight = Cast.toString(args.WEIGHT)
  },
}

export default SetTextStyleBlock
