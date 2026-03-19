import React from 'react'
import { EditorBlocksContextProvider } from '@/components/blocks/state/EditorBlocksContext'

import EditorBlocks from '@/components/blocks/EditorBlocks'

const Blocks: React.FC = () => {
  return (
    <EditorBlocksContextProvider>
      <EditorBlocks />
    </EditorBlocksContextProvider>
  )
}

export default Blocks
