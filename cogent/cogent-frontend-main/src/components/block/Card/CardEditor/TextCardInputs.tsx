import { useRef, useState } from 'react'
import { Card } from 'src/__generated__/graphql'
import { useToast } from '@/components/shared/Toast'
import useAutosizeTextArea from '@/utils/hooks/useAutoResizeTextArea'
import { stripHTML } from '@/utils/textUtils'

import CardNameInput from '@/components/block/Card/CardEditor/elements/CardNameInput'
import TextEditor from '@/components/shared/TextEditor'

const MAX_CHARS_TEXT = 950

interface TextInputsProps {
  isHorizontal: boolean
  card: Card
  setIsSaving: (value: boolean) => void
  updateCardName: (name: string) => void
  updateCardText: (text: string) => void
}

const TextCardInputs: React.FC<TextInputsProps> = ({
  card,
  setIsSaving,
  updateCardName,
  updateCardText,
  isHorizontal
}) => {
  const [cardText, setCardText] = useState<string>(card.text || '')
  const [timer, setTimer] = useState<any>(null)
  const toast = useToast()

  /* text area will resize with text */
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  useAutosizeTextArea(textAreaRef.current, cardText)

  const handleTextChange = (value: string) => {
    setCardText(value)
    setIsSaving(true)
    clearTimeout(timer)
    const newTimer = setTimeout(() => {
      if (stripHTML(value).length > MAX_CHARS_TEXT) {
        toast.open('error', `Text must be at most ${MAX_CHARS_TEXT} characters`)
        return
      }
      updateCardText(value)
    }, 1000)
    setTimer(newTimer)
  }

  return (
    <>
      <div className="pt-5">
        <CardNameInput
          card={card}
          setIsSaving={setIsSaving}
          updateCardName={updateCardName}
          maxChars={63}
        />
      </div>
      <div>
        <TextEditor
          isHorizontal={isHorizontal}
          value={cardText}
          setValue={handleTextChange}
          placeholder="Enter Card Text..."
        />
      </div>
    </>
  )
}

export default TextCardInputs
