import { CardInterface } from '@/utils/types/cogentTypes'
import { sortByPosition } from '@/utils/functions'
import CogPreviewCard from '@/components/shared/CogPreview/CogPreviewCard'
import BlockElements from '@/assets/static/elements/block-elements.svg'

interface CardPreviewProps {
  cards: CardInterface[]
  name?: string
}

export const BlockIndexElement = () => (
  <div className="ml-0.5 mt-1 w-min rounded-[2px] bg-day-base-secondary-darker p-0.5 text-[3px] text-day-base-secondary">
    #
  </div>
)

const CogPreviewBlock = ({ cards, name }: CardPreviewProps) => {
  return (
    <div className="flex h-full w-full flex-col items-center items-stretch justify-center">
      <span className="mx-0.5 mb-1 text-[5px] font-medium text-white line-clamp-1">
        {!!name ? name : ''}
      </span>
      <div className="flex h-[80%] w-full items-center justify-center rounded-lg border border-solid border-white border-opacity-5 bg-night-base-03 px-2">
        {cards.length === 0 ? (
          <div className="flex w-full items-center justify-center">
            <BlockElements width="100%" height="100%" />
          </div>
        ) : (
          <div className="grid w-full grid-cols-5 gap-0.5">
            {sortByPosition(cards)
              .slice(0, 5)
              .map((card) => (
                <CogPreviewCard
                  key={`card-preview-${card.id}`}
                  card={card}
                  small={true}
                />
              ))}
          </div>
        )}
      </div>
      <BlockIndexElement />
    </div>
  )
}

export default CogPreviewBlock
