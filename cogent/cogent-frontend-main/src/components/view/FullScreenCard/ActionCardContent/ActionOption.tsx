import { OptionType } from '@/utils/types/cogentTypes'
import Icon from '@/components/shared/Icon'

interface ActionOptionProps {
  id: string
  option: OptionType
  isSelected: boolean
  handleOnClick: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void
  answerSubmitted: boolean
}

const ActionOption: React.FC<ActionOptionProps> = ({
  id,
  option,
  isSelected,
  handleOnClick,
  answerSubmitted
}) => {
  return (
    <label>
      <div
        className={`${
          answerSubmitted
            ? ''
            : 'fc-option--container cursor-pointer hover:text-white'
        } flex items-center`}
      >
        <Icon
          height={45}
          width={45}
          className={`action-icon ${
            answerSubmitted
              ? `${
                  isSelected
                    ? option.answer
                      ? 'fc-option--correct'
                      : 'fc-option--incorrect'
                    : ''
                }`
              : `${isSelected ? 'fc-option--selected' : ''}`
          }`}
          type={`${
            answerSubmitted
              ? `${option.answer ? 'actionCheckMark' : 'actionCrossMark'}`
              : 'actionCheckMark'
          }`}
        />

        <input
          type="checkbox"
          className="hidden"
          value={id}
          checked={isSelected}
          onChange={(e) => handleOnClick(e, id)}
        />
        <span className={`${isSelected ? 'text-white' : ''} ml-4 flex-1 `}>
          {option.question}
        </span>
      </div>
    </label>
  )
}

export default ActionOption
