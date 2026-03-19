import { useState } from 'react'
import { Cog, Block } from 'src/__generated__/graphql'

import LibraryModalCogs from '@/components/shared/LibraryModal/LibraryModalCogs'
import LibraryModalBlocks from '@/components/shared/LibraryModal/LibraryModalBlocks'
import LibraryModalCards from '@/components/shared/LibraryModal/LibraryModalCards'

interface LibrarySearchModuleProps {
  target: 'cog' | 'block' | 'card'
  onSelect: (item: any) => void
  toggleModal: () => void
}

const LibrarySearchModule: React.FC<LibrarySearchModuleProps> = ({
  target,
  onSelect,
  toggleModal
}) => {
  const [selectedCog, setSelectedCog] = useState<Cog | null>(null)
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null)

  const handleSelectCog = (cog: Cog) => {
    setSelectedCog(cog)
  }

  const handleSelectBlock = (block: Block) => {
    switch (target) {
      case 'block':
        onSelect(block)
      default:
        setSelectedBlock(block)
    }
  }

  const handleCancel = () => {
    setSelectedCog(null)
  }

  return (
    <div className="h-full w-full">
      {!selectedCog && (
        <LibraryModalCogs
          title="Choose cog from library"
          toggleModal={toggleModal}
          onSelect={handleSelectCog}
        />
      )}
      {!!selectedCog && !selectedBlock && (
        <LibraryModalBlocks
          blocks={selectedCog?.blocks?.collection}
          toggleModal={toggleModal}
          onCancel={handleCancel}
          onSelect={handleSelectBlock}
        />
      )}
      {/* <LibraryModalCards
        title="Choose card from library"
        toggleModal={toggleModal}
        onSelect={onSelect}
      /> */}
    </div>
  )
}

export default LibrarySearchModule
