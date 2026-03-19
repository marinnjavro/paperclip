import { Card, Cog } from 'src/__generated__/graphql'
import CardPreview from '@/components/shared/CardPreview'

type CardTemplateProps = {
  cog: any
  card: Card
  linkToCard: (cogId: string, cardId: string, blockId: string) => void
}

const LinkableCard = ({
  cog,
  card,
  linkToCard
}: CardTemplateProps): JSX.Element => {
  return (
    <div
      className="flex justify-center"
      onClick={() => linkToCard(cog.id, card.id, card.blockId)}
    >
      <div className="flex w-full shrink-0 cursor-pointer flex-col items-center justify-between rounded-3xl border border-solid border-white border-opacity-10 hover:bg-day-base-primary hover:bg-opacity-75 xs:w-full">
        <div className="flex h-full flex-1 flex-col justify-between p-3">
          <div className="mb-3.5 text-center text-sm font-semibold text-white line-clamp-2">
            {!!card.name ? card.name : '─'}
          </div>
          <div className="flex items-center justify-center overflow-hidden">
            <CardPreview user={cog.user} card={card} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LinkableCard
