import { useState } from 'react'
import { Card } from 'src/__generated__/graphql'
import TextEditor from '@/components/shared/TextEditor'

interface ActionLinksProps {
  isHorizontal: boolean
  card: Card
  setIsSaving: (value: boolean) => void
  updateCardText: (text: string) => void
}

const ActionLinks: React.FC<ActionLinksProps> = (props) => {
  const [cardText, setCardText] = useState<string>(props.card.text || '')
  const [timer, setTimer] = useState<any>(null)

  const handleTextChange = (value: string) => {
    setCardText(value)
    props.setIsSaving(true)
    clearTimeout(timer)
    const newTimer = setTimeout(() => {
      props.updateCardText(value)
    }, 1000)
    setTimer(newTimer)
  }

  return (
    <div className="border-t border-solid border-opacity-silver border-opacity-20 dark:border-white dark:border-opacity-10">
      <div className="mx-3.5 py-5">
        <h3 className="pb-1.5 font-semibold text-day-text-label-primary dark:text-white">
          Action Card Links
        </h3>
        <p className="opacity-80">
          This text will be visible to students only after they submit the
          answer.
        </p>
      </div>
      <div className="mb-3 h-[250px]">
        <TextEditor
          isHorizontal={props.isHorizontal}
          value={cardText}
          setValue={handleTextChange}
          placeholder="Enter Card Text..."
        />
      </div>
    </div>
  )
}

export default ActionLinks
