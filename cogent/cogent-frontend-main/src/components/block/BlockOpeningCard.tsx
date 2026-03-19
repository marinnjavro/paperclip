import { useState } from 'react'
import { useRouter } from 'next/router'
import { Card, User } from 'src/__generated__/graphql'
import { useToast } from '@/components/shared/Toast'
import Icon from '@/components/shared/Icon'
import SavingIndicator from '@/components/shared/SavingIndicator'
import ElementIndexNumber from '@/components/shared/ElementIndexNumber'
import CardEditor from '@/components/block/Card/CardEditor'
import OpeningCard from '@/components/shared/OpeningCard'

interface BlockOpeningCardProps {
  blockName: string
  card: Card
  user?: User | undefined | null
  isFocused: boolean
  focusCard: (id: string, isFocused: boolean) => void
  deleteCard: (cardId: string) => void
}

const BlockOpeningCard: React.FC<BlockOpeningCardProps> = ({
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

  const [isSaving, setIsSaving] = useState<boolean>(false)

  const shareCard = (e: React.MouseEvent) => {
    e.stopPropagation()
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/cogs/${cogId}/?focusedCardId=${card.id}`
    navigator.clipboard.writeText(url)
    toast.open('success', 'Card link was copied to clipboard')
  }

  return (
    <div
      className="card mb-14 w-full max-w-[20rem] xs:min-w-[333px]"
      onClick={() => focusCard(card.id, isFocused)}
    >
      <div className="aspect-ratio--wrapper--9-16">
        <div className="aspect-ratio--content">
          <div className="h-full w-full overflow-hidden rounded-3xl border border-solid border-opacity-silver border-opacity-20 bg-[#E3E7EB] bg-center bg-no-repeat dark:border-white dark:border-opacity-10 dark:bg-night-base-03">
            <CardEditor card={card} user={user} setIsSaving={setIsSaving} />
          </div>
        </div>

        <div className="absolute -mt-[1.5px] flex w-full">
          <div className="w-1/5">
            <ElementIndexNumber
              index={1}
              elementId={card.id}
              updateIndex={() => {}}
            />
          </div>
          <div className="card-footer w-3/5">
            <div className="flex h-[100%] flex-1 items-center justify-center rounded-b-3xl border border-t-0 border-solid border-opacity-silver border-opacity-20 bg-gradient-to-r  from-[#C0B1E4] via-[#B9AADF] to-[#C4B9E3] pb-3 pt-1.5 dark:border-white dark:border-opacity-10 dark:from-[#463770] dark:to-[#3B3060]">
              <div className="flex flex-1 cursor-pointer justify-center border-r border-solid border-opacity-silver py-1 hover:text-day-base-primary dark:border-white dark:border-opacity-10 dark:hover:text-night-base-secondary">
                <Icon
                  type="delete"
                  width={17}
                  height={17}
                  onClick={() => deleteCard(card.id)}
                />
              </div>
              <div className="flex flex-1 cursor-pointer justify-center border-r border-solid border-opacity-silver py-1 hover:text-day-base-primary dark:border-white dark:border-opacity-10 dark:hover:text-night-base-secondary">
                <Icon
                  type="share"
                  width={17}
                  height={17}
                  onClick={(e: any) => shareCard(e)}
                />
              </div>
              <div className="flex flex-1 justify-center">
                <SavingIndicator isSaving={isSaving} />
              </div>
            </div>
          </div>
          <div className="flex-2 w-1/5"></div>
        </div>
      </div>
    </div>
  )
}

export default BlockOpeningCard
