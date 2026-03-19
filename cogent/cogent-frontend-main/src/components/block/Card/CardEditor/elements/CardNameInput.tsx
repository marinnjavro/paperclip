import { useToast } from '@/components/shared/Toast'
import { useState } from 'react'
import { Card } from 'src/__generated__/graphql'

interface NameInputProps {
  card: Card
  setIsSaving: (value: boolean) => void
  updateCardName: (name: string) => void
  maxChars?: number
}

const CardNameInput: React.FC<NameInputProps> = ({
  card,
  setIsSaving,
  updateCardName,
  maxChars = 46
}) => {
  const [cardName, setCardName] = useState<string>(card.name || '')
  const [timer, setTimer] = useState<any>(null)
  const toast = useToast()

  const handleNameChange = (value: string) => {
    setCardName(value)
    setIsSaving(true)
    clearTimeout(timer)
    const newTimer = setTimeout(() => {
      if (value.length > maxChars) {
        toast.open('error', `Name must be at most ${maxChars} characters`)
        return
      }
      updateCardName(value)
    }, 3000)
    setTimer(newTimer)
  }

  return (
    <div className="mx-4 mb-4 text-xl font-semibold text-white">
      <input
        className="w-full border-none bg-transparent p-0 text-lg font-semibold leading-tight text-day-text-label-primary placeholder:font-medium placeholder:italic placeholder:opacity-40 focus:outline-none focus:ring-0 dark:text-white"
        style={{ background: 'transparent' }}
        type="text"
        placeholder="Enter Card Name"
        aria-label="Card Name Input"
        value={cardName || ''}
        onChange={(e) => handleNameChange(e.target.value)}
      />
    </div>
  )
}

export default CardNameInput
