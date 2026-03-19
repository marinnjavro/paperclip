import { useEffect, useState } from 'react'
import { Card } from 'src/__generated__/graphql'
import { useToast } from '@/components/shared/Toast'
import { stripHTML } from '@/utils/textUtils'
import { fileTypes } from '@/components/block/Card/CardEditor'

import CardNameInput from '@/components/block/Card/CardEditor/elements/CardNameInput'
import MediaInput from '@/components/block/Card/CardEditor/elements/MediaInput'
import TextEditor from '@/components/shared/TextEditor'
import FileUpload from '@/components/shared/FileUpload'
import EditButton from '@/components/shared/EditButton'
import VideoPlayer from '@/components/shared/VideoPlayer'
import MediaPlaceholder from '@/components/shared/MediaPlaceholder'

const MAX_CHARS_PHOTO_TEXT = 950

interface MediaTextInputsProps {
  isHorizontal: boolean
  card: Card
  setIsSaving: (value: boolean) => void
  updateCardName: (name: string) => void
  updateCardText: (text: string) => void
  updateCardPhoto: (files: FileList) => void
  updateCardVideo: (files: FileList) => void
}

const MediaTextCardInputs: React.FC<MediaTextInputsProps> = (props) => {
  const [cardText, setCardText] = useState<string>(props.card.text || '')
  const [timer, setTimer] = useState<any>(null)
  const toast = useToast()
  const hasMedia = !!props.card.photoUrl || !!props.card.videoUrl
  const [dragActive, setDragActive] = useState<boolean>(false)

  useEffect(() => {
    if (props.card.text !== cardText) {
      if (!props.card.text) return
      setCardText(props?.card?.text)
    }
  }, [props.card])

  const handleTextChange = (value: string) => {
    setCardText(value)
    props.setIsSaving(true)
    clearTimeout(timer)
    const newTimer = setTimeout(() => {
      if (stripHTML(value).length > MAX_CHARS_PHOTO_TEXT) {
        toast.open(
          'error',
          `Text must be at most ${MAX_CHARS_PHOTO_TEXT} characters`
        )
        return
      }
      props.updateCardText(value)
    }, 1000)
    setTimer(newTimer)
  }

  const handleMediaChange = (files: FileList) => {
    if (!files) return
    props.setIsSaving(true)
    if (files && fileTypes.image.includes(files[0].type)) {
      props.updateCardPhoto(files)
    }
    if (files && fileTypes.video.includes(files[0].type)) {
      props.updateCardVideo(files)
    }
  }

  const Edit = () => (
    <div className="absolute -top-1 -left-3 z-10 p-5">
      <FileUpload
        accepts={['image', 'video']}
        handleFiles={handleMediaChange}
        dragActive={dragActive}
        setDrag={setDragActive}
      >
        <div
          className="flex items-center p-2"
          onClick={(e) => e.stopPropagation()}
        >
          <EditButton />
        </div>
      </FileUpload>
    </div>
  )

  return (
    <div className="scrollbar--sm h-full overflow-hidden overflow-y-auto">
      <div
        className={`${
          !!props.card.photoUrl || !!props.card.videoUrl
            ? ''
            : 'mb-3 border-b border-solid border-opacity-silver border-opacity-20 dark:border-white dark:border-opacity-10'
        }`}
      >
        {hasMedia ? (
          <>
            {!!props.card.videoUrl && (
              <div className="relative h-[210px] overflow-hidden rounded-tl-3xl xxs:h-[248.25px]">
                <MediaInput
                  label="Upload photo"
                  types={['video', 'image']}
                  {...props}
                />
              </div>
            )}
            {!!props.card.photoUrl && (
              <MediaInput
                label="Upload photo"
                types={['image', 'video']}
                {...props}
              />
            )}
          </>
        ) : (
          <div className="flex h-full flex-1 items-center justify-center">
            <FileUpload
              accepts={['image', 'video']}
              handleFiles={handleMediaChange}
              dragActive={dragActive}
              setDrag={setDragActive}
            >
              <div className="flex h-full w-full flex-1 cursor-pointer items-center justify-center">
                <MediaPlaceholder size="small" label="Upload media" />
              </div>
            </FileUpload>
          </div>
        )}
      </div>
      <div className={`${!!props.card.videoUrl ? 'mt-5' : ''}`}>
        <CardNameInput
          card={props.card}
          setIsSaving={props.setIsSaving}
          updateCardName={props.updateCardName}
          maxChars={55}
        />
      </div>
      <div className="h-[50%] overflow-hidden pb-2">
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

export default MediaTextCardInputs
