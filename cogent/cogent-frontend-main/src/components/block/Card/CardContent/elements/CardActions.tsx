import { Card } from 'src/__generated__/graphql'
import Icon from '@/components/shared/Icon'

interface CardActionsProps {
  card: Card
}

interface ActionOptionProps {
  option: {
    question: string
    answer: boolean
  }
}

const ActionOption: React.FC<ActionOptionProps> = ({ option }) => {
  return (
    <div className="flex items-center">
      <Icon
        height={40}
        width={40}
        className={`${
          option.answer ? 'fc-option--correct' : 'fc-option--incorrect'
        } action-icon `}
        type={`${option.answer ? 'actionCheckMark' : 'actionCrossMark'}`}
      />
      <span className="ml-4 flex-1">{option.question}</span>
    </div>
  )
}

const CardActions: React.FC<CardActionsProps> = ({ card }) => {
  return (
    <div className="flex flex-col gap-3">
      {!!card.actions &&
        card.actions.map((action: any, i: number) => (
          <ActionOption key={`action-option-${i}`} option={card.actions[i]} />
        ))}
    </div>
  )
}

export default CardActions
