import React from 'react'
import { trimString } from '@/utils/functions'
import Icon from '@/components/shared/Icon'

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
        height={24}
        width={24}
        className={`${
          option.answer ? 'fc-option--correct' : 'fc-option--incorrect'
        } action-icon `}
        type={`${option.answer ? 'actionCheckMark' : 'actionCrossMark'}`}
      />
      <span className="mb-0.5 ml-1 flex-1 text-[8px] leading-snug">
        {/* {trimString(option.question, 50)} */}
        {option.question}
      </span>
    </div>
  )
}

export default ActionOption
