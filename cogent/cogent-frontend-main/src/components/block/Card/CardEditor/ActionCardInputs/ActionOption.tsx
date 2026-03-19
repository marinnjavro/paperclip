import { useState, useEffect, useRef, useContext } from 'react'
import { SavingContext } from '@/components/block/SortableCard'
import Icon from '@/components/shared/Icon'

export type ActionOptionType = {
  question: string
  answer: boolean
}

interface ActionOptionProps {
  id: string
  option: ActionOptionType
  handleOptionChange: (index: number, updatedOption: ActionOptionType) => void
  setIsSaving: (value: boolean) => void
}

const ActionOption: React.FC<ActionOptionProps> = ({
  id,
  option,
  handleOptionChange,
  setIsSaving
}) => {
  const { isSaving } = useContext(SavingContext)

  const index: number = parseInt(id.replace('option-', ''))

  const [optionText, setOptionText] = useState<string>(option.question || '')
  const [timer, setTimer] = useState<any>(null)

  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const resizeTextArea = () => {
    if (textAreaRef.current != null) {
      textAreaRef.current.style.height = '18px'
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px'
    }
  }

  useEffect(resizeTextArea, [optionText])

  const handleOptionClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isSaving) return
    let updatedOption = { question: optionText, answer: e.target.checked }
    handleOptionChange(index, updatedOption)
  }

  const handleTextChange = (value: string) => {
    setOptionText(value)
    let updatedOption = { question: value, answer: option.answer }
    setIsSaving(true)
    clearTimeout(timer)
    const newTimer = setTimeout(() => {
      handleOptionChange(index, updatedOption)
    }, 3000)
    setTimer(newTimer)
  }

  return (
    <div className="flex items-center">
      <label>
        <Icon
          height={40}
          width={40}
          className={`${
            option.answer ? 'fc-option--correct' : 'fc-option--incorrect'
          } ${isSaving ? 'cursor-not-allowed' : 'cursor-pointer'} action-icon `}
          type={`${option.answer ? 'actionCheckMark' : 'actionCrossMark'}`}
        />
        <input
          onChange={(e) => handleOptionClick(e)}
          type="checkbox"
          className="hidden"
          checked={option.answer}
        />
      </label>
      <div className="ml-4 w-full">
        <textarea
          ref={textAreaRef}
          rows={1}
          className="scrollbar--hidden m-0	w-full resize-none resize-none overflow-y-hidden border-none bg-transparent p-0 text-sm leading-relaxed placeholder:italic placeholder:text-support-gray-002 placeholder:opacity-50 focus:outline-none focus:ring-0"
          placeholder="Enter answer ..."
          aria-label="Action Card Answer Input"
          value={optionText || ''}
          onChange={(e) => handleTextChange(e.target.value)}
        />
      </div>
    </div>
  )
}

export default ActionOption
