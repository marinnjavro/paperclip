import { useState } from 'react'
import { Card } from 'src/__generated__/graphql'
import _ from 'lodash'
import { is, getErrors } from '@/utils/validation'

import FileUpload from '@/components/shared/FileUpload'
import TextInput from '@/components/shared/TextInput'
import TextEditor from '@/components/shared/TextEditor'
import VideoPlayer from '@/components/shared/VideoPlayer'
import Icon from '@/components/shared/Icon'
import ButtonPrimary from '@/components/shared/ButtonPrimary'
import TextEditorMobile from './TextEditorMobile'

interface VideoTextInputsMobileProps {
  card: Card
  updateMobileCard: (cardInput: any) => void
  updateCardVideo: (CardInput: any, files: FileList) => void
  loading: boolean
}

const VideoTextCardInputsMobile: React.FC<VideoTextInputsMobileProps> = ({
  card,
  updateMobileCard,
  updateCardVideo,
  loading
}) => {
  const [dragActive, setDragActive] = useState(false)
  const [cardInput, setCardInput] = useState({
    id: card.id,
    name: card.name || '',
    cardType: card.cardType,
    blockId: card.blockId,
    text: card.text || '',
    actions: card.actions || '',
    photo: card.photoUrl || '',
    video: card.videoUrl || '',
    audio: card.audioUrl || ''
  })

  const [errors, setErrors] = useState({
    name: '',
    text: ''
  })

  const validateInput = (values: { name: string; text: string }) => {
    const errors = getErrors(values, {
      name: [is.max(50)],
      text: [is.max(530)]
    })
    return { errors, isValid: _.values(errors).every(_.isEmpty) }
  }

  const [media, setMedia] = useState({
    photo: null,
    video: card.videoUrl
  })

  const getUrl = (video: string | FileList) => {
    if (typeof video === 'string') {
      return video
    } else {
      return URL.createObjectURL(video[0])
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setCardInput((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  const handleTextChange = (value: string) => {
    setCardInput((prevState) => {
      return {
        ...prevState,
        text: value
      }
    })
  }

  const handleMediaChange = (files: FileList) => {
    if (!files) return

    setMedia({ photo: null, video: getUrl(files) })
    updateCardVideo(cardInput, files)
  }

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const { errors: dataErrors, isValid } = validateInput(cardInput)
    if (!isValid) {
      setErrors(dataErrors)
      return
    }
    updateMobileCard(cardInput)
  }

  return (
    <div className="flex flex-1 flex-col gap-5">
      <div className="h-full max-h-[230px] min-h-[230px] overflow-hidden rounded-[32px] border border-solid border-night-base-05 bg-night-base-01 hover:bg-night-base-02">
        <FileUpload
          accepts={['video']}
          handleFiles={handleMediaChange}
          dragActive={dragActive}
          setDrag={setDragActive}
        >
          {!!media.video ? (
            <div className="h-full rounded-[32px] bg-support-gray-006">
              <VideoPlayer url={getUrl(media.video)} />
            </div>
          ) : (
            <div className="group flex h-full w-full flex-1 cursor-pointer items-center justify-center gap-5">
              <Icon
                className="fill-none text-night-base-06 group-hover:text-white"
                type="addVideo"
                width={40}
                height={40}
                label="Upload photo or video"
              />
              <span className=" text-white">Add Video</span>
            </div>
          )}
        </FileUpload>
      </div>
      <div className="">
        <TextInput
          label="Title"
          name="name"
          value={cardInput.name}
          handleChange={handleChange}
          error={errors.name}
        />
      </div>

      <div className="max-h-[400px] flex-1">
        <TextEditorMobile
          value={cardInput.text}
          setValue={handleTextChange}
          placeholder="Describe card"
          error={errors.text}
        />
      </div>

      <ButtonPrimary
        label="Save"
        classNames="w-full mt-5"
        onClick={handleSubmit}
        isLoading={loading}
      />
    </div>
  )
}

export default VideoTextCardInputsMobile
