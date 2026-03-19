import { Card } from 'src/__generated__/graphql'
import CardPreview from '@/components/shared/CardPreview'

interface CardPreviewProps {
  cards: Card[]
  length: number
}

const BlockPreview = ({ cards, length }: CardPreviewProps) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className={`grid w-full grid-cols-${length} gap-2`}>
        {cards.slice(0, length).map((card: Card) => (
          <CardPreview
            key={`card-preview-${card.id}`}
            card={card}
            small={true}
          />
        ))}
      </div>
    </div>
  )
}

export default BlockPreview
