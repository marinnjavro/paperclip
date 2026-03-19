import { useState } from 'react'
import { Card } from 'src/__generated__/graphql'
import _ from 'lodash'
import { is, getErrors } from '@/utils/validation'

import AudioPlayer from '@/components/shared/AudioPlayer'
import TextInput from '@/components/shared/TextInput'
import FileUpload from '@/components/shared/FileUpload'
import Icon from '@/components/shared/Icon'
import ButtonPrimary from '@/components/shared/ButtonPrimary'

interface AudioInputsProps {
  card: Card
  updateMobileCard: (cardInput: any) => void
  updateCardAudio: (CardInput: any, files: FileList) => void
  loading: boolean
}

type CardInputType = {
  id: string
  name: string
  cardType: string
  blockId: string
  text: string
  actions: string
  photo: string | FileList | null
  video: string | FileList | null
  audio: string | FileList | null
}

const AudioCardInputs: React.FC<AudioInputsProps> = ({
  card,
  updateMobileCard,
  updateCardAudio,
  loading
}) => {
  const [dragActive, setDragActive] = useState(false)

  const [cardInput, setCardInput] = useState<CardInputType>({
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
    name: ''
  })

  const validateInput = (values: { name: string; text: string }) => {
    const errors = getErrors(values, {
      name: [is.max(50)]
    })
    return { errors, isValid: _.values(errors).every(_.isEmpty) }
  }

  const getUrl = (audio: string | FileList) => {
    if (typeof audio === 'string') {
      return audio
    } else {
      return URL.createObjectURL(audio[0])
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
    setCardInput({ ...cardInput, audio: files })
    updateCardAudio(cardInput, files)
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
      <div className=" flex-1 rounded-[32px] border border-solid border-night-base-05 bg-night-base-01 hover:bg-night-base-02">
        <FileUpload
          accepts={['audio']}
          handleFiles={handleMediaChange}
          dragActive={dragActive}
          setDrag={setDragActive}
        >
          {!!cardInput.audio ? (
            <div className="flex h-full w-full items-end justify-end pb-6">
              <div className="mx-3.5 w-full flex-1">
                <AudioPlayer
                  url={getUrl(cardInput.audio)}
                  cardId={'audio-card-input'}
                />
              </div>
            </div>
          ) : (
            <div className="group flex h-full w-full flex-1 cursor-pointer items-center justify-center gap-5">
              <Icon
                className="fill-none text-night-base-06 group-hover:text-night-text-link"
                type="addAudio"
                width={40}
                height={40}
                label="Upload photo or video"
              />
              <span className=" text-white">Add Audio</span>
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

export default AudioCardInputs
