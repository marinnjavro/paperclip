import { useState } from 'react'
import { Card } from 'src/__generated__/graphql'
import { fileTypes } from '@/components/shared/FileUpload'
import _ from 'lodash'
import { is, getErrors } from '@/utils/validation'

import TextInput from '@/components/shared/TextInput'
import FileUpload from '@/components/shared/FileUpload'
import Icon from '@/components/shared/Icon'
import VideoPlayer from '@/components/shared/VideoPlayer'
import ButtonPrimary from '@/components/shared/ButtonPrimary'

interface MultimediaInputsProps {
  card: Card
  updateMobileCard: (cardInput: any) => void
  updateCardPhoto: (CardInput: any, files: FileList) => void
  updateCardVideo: (CardInput: any, files: FileList) => void
  loading: boolean
}

type CardInputType = {
  id: string
  name: string
  cardType: string
  blockId: string
  text: string
  actions: string
}

const MultimediaCardInputs: React.FC<MultimediaInputsProps> = ({
  card,
  updateMobileCard,
  updateCardPhoto,
  updateCardVideo,
  loading
}) => {
  const [dragActive, setDragActive] = useState(false)
  const [cardInput, setCardInput] = useState<CardInputType>({
    id: card.id,
    name: card.name || '',
    cardType: card.cardType,
    blockId: card.blockId,
    text: card.text || '',
    actions: card.actions || ''
  })

  const [errors, setErrors] = useState({
    name: ''
  })

  const validateInput = (values: { name: string; text: string }) => {
    const errors = getErrors(values, {
      name: [is.max(46)]
    })
    return { errors, isValid: _.values(errors).every(_.isEmpty) }
  }

  const [media, setMedia] = useState({
    photo: card.photoUrl,
    video: card.videoUrl
  })

  const hasMedia = !!media.photo || !!media.video

  const getUrl = (photo: string | FileList) => {
    if (typeof photo === 'string') {
      return photo
    } else {
      return URL.createObjectURL(photo[0])
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

  const handleMediaChange = (files: FileList) => {
    if (!files) return
    if (fileTypes.image[0].includes(files[0].type)) {
      setMedia({ photo: getUrl(files), video: null })
      updateCardPhoto(cardInput, files)
    }
    if (fileTypes.video[0].includes(files[0].type)) {
      setMedia({ photo: null, video: getUrl(files) })
      updateCardVideo(cardInput, files)
    }
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
      <div className="flex max-h-[400px] flex-1 items-center overflow-hidden rounded-[32px] border border-solid border-night-base-05 bg-night-base-01 hover:bg-night-base-02">
        <FileUpload
          accepts={['image', 'video']}
          handleFiles={handleMediaChange}
          dragActive={dragActive}
          setDrag={setDragActive}
        >
          {hasMedia ? (
            <>
              {!!media.video && (
                <div className="relative flex h-full w-full justify-center overflow-hidden rounded-[32px] bg-support-gray-006">
                  <VideoPlayer url={getUrl(media.video)} />
                </div>
              )}
              {!!media.photo && (
                <img
                  src={getUrl(media.photo)}
                  alt="Card Image"
                  className="rounded-el-mask h-full w-full rounded-[32px] object-cover"
                />
              )}{' '}
            </>
          ) : (
            <div className="group flex h-full w-full flex-1 cursor-pointer items-center justify-center gap-5">
              <Icon
                className="text-night-base-06 group-hover:text-white"
                type="addVideo"
                width={40}
                height={40}
                label="Upload photo or video"
              />
              <span className=" text-white">Add Video/Photo</span>
            </div>
          )}
        </FileUpload>
      </div>
      <div className="flex-0">
        <TextInput
          label="Title"
          name="name"
          value={cardInput.name}
          handleChange={handleChange}
          error={errors.name}
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

export default MultimediaCardInputs
