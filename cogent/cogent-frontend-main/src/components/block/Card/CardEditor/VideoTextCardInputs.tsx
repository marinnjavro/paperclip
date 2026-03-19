import { useState } from 'react'
import { Card } from 'src/__generated__/graphql'
import { useToast } from '@/components/shared/Toast'
import { stripHTML } from '@/utils/textUtils'

import CardNameInput from '@/components/block/Card/CardEditor/elements/CardNameInput'
import MediaInput from '@/components/block/Card/CardEditor/elements/MediaInput'
import TextEditor from '@/components/shared/TextEditor'

const MAX_CHARS_VIDEO_TEXT = 450

interface VideoTextInputsProps {
  isHorizontal: boolean
  card: Card
  setIsSaving: (value: boolean) => void
  updateCardName: (name: string) => void
  updateCardText: (text: string) => void
  updateCardVideo: (files: FileList) => void
}

const VideoTextCardInputs: React.FC<VideoTextInputsProps> = (props) => {
  const [cardText, setCardText] = useState<string>(props.card.text || '')
  const [timer, setTimer] = useState<any>(null)
  const toast = useToast()

  const handleTextChange = (value: string) => {
    setCardText(value)
    props.setIsSaving(true)
    clearTimeout(timer)
    const newTimer = setTimeout(() => {
      if (stripHTML(value).length > MAX_CHARS_VIDEO_TEXT) {
        toast.open(
          'error',
          `Text must be at most ${MAX_CHARS_VIDEO_TEXT} characters`
        )
        return
      }
      props.updateCardText(value)
    }, 1000)
    setTimer(newTimer)
  }

  return (
    <div className="scrollbar--sm h-full overflow-y-auto">
      <div
        className={`${
          !!props.card.videoUrl
            ? ''
            : 'mb-4 border-b border-solid border-opacity-silver border-opacity-20 dark:border-white dark:border-opacity-10'
        }`}
      >
        <MediaInput label="Upload video" types={['video']} {...props} />
      </div>
      <CardNameInput
        card={props.card}
        setIsSaving={props.setIsSaving}
        updateCardName={props.updateCardName}
        maxChars={55}
      />
      <div className="h-[45%] pb-2">
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

export default VideoTextCardInputs
