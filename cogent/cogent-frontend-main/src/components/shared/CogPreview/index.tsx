import { BlockInterface } from '@/utils/types/cogentTypes'
import CogPreviewBlock from '@/components/shared/CogPreview/CogPreviewBlock'

interface CardPreviewProps {
  blocks: BlockInterface[]
  length: number
}

const CogPreview = ({ blocks, length }: CardPreviewProps) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="grid h-full w-full grid-cols-3 grid-rows-2 gap-y-2 gap-x-2 py-2 px-7">
        {blocks.slice(0, length).map((block) => (
          <CogPreviewBlock
            key={`card-preview-${block.id}`}
            name={block.name}
            cards={block.cards}
          />
        ))}
      </div>
    </div>
  )
}

export default CogPreview
