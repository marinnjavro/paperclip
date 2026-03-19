import { useRouter } from 'next/router'
import { Card, User } from 'src/__generated__/graphql'
import { useToast } from '@/components/shared/Toast'
import OpeningCard from '@/components/shared/OpeningCard'

interface BlockOpeningCardProps {
  blockName: string
  card: Card
  user?: User | undefined | null
  isFocused: boolean
  focusCard: (id: string, isFocused: boolean) => void
  deleteCard: (cardId: string) => void
}

const MobileOpeningCard: React.FC<BlockOpeningCardProps> = ({
  blockName,
  card,
  user,
  isFocused,
  focusCard,
  deleteCard
}) => {
  const router = useRouter()
  const { cogId } = router.query
  const toast = useToast()

  const shareCard = (e: React.MouseEvent) => {
    e.stopPropagation()
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/cogs/${cogId}/?focusedCardId=${card.id}`
    navigator.clipboard.writeText(url)
    toast.open('success', 'Card link was copied to clipboard')
  }

  return (
    <div
      className="card mb-5 w-full min-w-[18rem] max-w-[18rem]"
      onClick={() => focusCard(card.id, isFocused)}
    >
      <div className="aspect-ratio--wrapper--9-16">
        <div className="aspect-ratio--content">
          <div className="h-full w-full overflow-hidden rounded-3xl bg-night-base-03 bg-center bg-no-repeat dark:border dark:border-solid dark:border-white dark:border-white dark:border-opacity-10">
            <OpeningCard
              blockName={card?.name || blockName || ''}
              author={user?.name}
              organization={user?.organization?.name}
              photoUrl={user?.photoUrl || ''}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileOpeningCard
