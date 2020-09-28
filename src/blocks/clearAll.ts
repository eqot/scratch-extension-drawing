import BlockType from 'scratch-vm/src/extension-support/block-type'
import ArgumentType from 'scratch-vm/src/extension-support/argument-type'

import { BlockInfo } from './index'
import { translations } from '../translations'

const ClearAllBlock = {
  info(): BlockInfo {
    return {
      opcode: 'clearAll',
      blockType: BlockType.COMMAND,
      text: translations.label('clearAll'),
    }
  },

  clearAll(): void {
    this.draw.clear()

    this.updateSVGLayer()
  },
}

export default ClearAllBlock
