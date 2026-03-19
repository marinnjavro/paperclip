import { useContext } from 'react'
import { SavingContext } from '@/components/block/SortableCard'
import { Card } from 'src/__generated__/graphql'
import ActionOption, {
  ActionOptionType
} from '@/components/block/Card/CardEditor/ActionCardInputs/ActionOption'
import Icon from '@/components/shared/Icon'

interface ActionOptionsGroupProps {
  card: Card
  setIsSaving: (value: boolean) => void
  updateCardActions: (actions: string) => void
}

const ActionOptionsGroup: React.FC<ActionOptionsGroupProps> = ({
  card,
  setIsSaving,
  updateCardActions
}) => {
  const { isSaving } = useContext(SavingContext)

  const handleOptionChange = (
    index: number,
    updatedOption: ActionOptionType
  ) => {
    const options = [...card.actions]
    options[index] = updatedOption
    updateCardActions(JSON.stringify(options))
  }

  const addOption = async () => {
    if (isSaving) return
    const options = !!card.actions
      ? [...card.actions, { question: '', answer: false }]
      : [{ question: '', answer: false }]
    updateCardActions(JSON.stringify(options))
  }

  const NewOptionButton = () => (
    <button
      className={`${
        isSaving
          ? 'cursor-not-allowed'
          : 'cursor-pointer hover:text-day-base-secondary'
      } flex items-center text-day-text-label-primary dark:text-white`}
      onClick={() => addOption()}
    >
      <Icon height={40} width={40} type="actionNew" />
      <div className="ml-4">Add a new answer</div>
    </button>
  )

  return (
    <div className="mx-3.5">
      <div className="mt-1 flex flex-col gap-3 pb-5">
        {!!card.actions &&
          card.actions.map((action: any, i: number) => (
            <ActionOption
              id={`option-${i}`}
              key={`action-option-${i}`}
              option={card.actions[i]}
              handleOptionChange={handleOptionChange}
              setIsSaving={setIsSaving}
            />
          ))}
        <NewOptionButton />
      </div>
    </div>
  )
}

export default ActionOptionsGroup
