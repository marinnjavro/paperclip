import { Card } from 'src/__generated__/graphql'
import CardEditor from '@/components/block/Card/CardEditor'
import Icon from '@/components/shared/Icon'

interface VerticalCardEditorProps {
  verticalCards: Card[]
  verticalLinkHistory: string[]
  setIsSaving: (value: boolean) => void
  close: () => void
}

const VerticalCardEditor: React.FC<VerticalCardEditorProps> = ({
  verticalCards,
  verticalLinkHistory,
  setIsSaving,
  close
}) => {
  const activeVerticalCard = verticalCards.find(
    (card) => card.id === verticalLinkHistory[0]
  )

  return (
    <div className="aspect-ratio--wrapper--9-16  absolute relative inset-0 inset-0">
      <div className="aspect-ratio--content h-full overflow-hidden rounded-3xl border border-solid border-opacity-silver border-opacity-20 bg-day-base-04 dark:border-white dark:border-opacity-[15%] dark:bg-night-base-02">
        <div
          className="absolute right-3 top-3 z-[5] cursor-pointer"
          onClick={() => close()}
        >
          <Icon type="remove" />
        </div>
        {!!activeVerticalCard && (
          <CardEditor
            isHorizontal={false}
            key={activeVerticalCard.id}
            card={activeVerticalCard}
            setIsSaving={setIsSaving}
          />
        )}
      </div>
    </div>
  )
}

export default VerticalCardEditor
