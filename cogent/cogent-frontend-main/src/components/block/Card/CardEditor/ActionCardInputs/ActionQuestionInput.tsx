import { useState, useRef, useEffect } from 'react'
import { CardEditorInputProps } from '@/components/block/Card/CardEditor'

const ActionQuestionInput: React.FC<CardEditorInputProps> = ({
  card,
  setIsSaving,
  updateCardName
}) => {
  const [cardName, setCardName] = useState<string>(card.name || '')
  const [timer, setTimer] = useState<any>(null)

  const handleNameChange = (value: string) => {
    setCardName(value)
    setIsSaving(true)
    clearTimeout(timer)
    const newTimer = setTimeout(() => {
      updateCardName(value)
    }, 3000)
    setTimer(newTimer)
  }

  return (
    <div className="mx-3.5 mb-5 text-xl text-support-gray-001">
      <input
        className="w-full rounded-2xl border border-opacity-silver border-opacity-20 bg-white p-4 text-sm leading-tight placeholder:italic focus:outline-none focus:ring-1 focus:ring-day-base-primary dark:border-white dark:border-opacity-10 dark:bg-night-base-04"
        style={{ background: 'transparent' }}
        type="text"
        placeholder="Enter Question..."
        aria-label="Card Name Input"
        value={cardName}
        onChange={(e) => handleNameChange(e.target.value)}
      />
    </div>
  )
}

export default ActionQuestionInput
