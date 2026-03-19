import { useState } from 'react'
import { Card } from 'src/__generated__/graphql'
import _ from 'lodash'
import { is, getErrors } from '@/utils/validation'

import TextInput from '@/components/shared/TextInput'
import TextEditor from '@/components/shared/TextEditor'
import FileUpload from '@/components/shared/FileUpload'
import Icon from '@/components/shared/Icon'
import ButtonPrimary from '@/components/shared/ButtonPrimary'
import TextEditorMobile from './TextEditorMobile'

interface PhotoTextInputsMobileProps {
  card: Card
  updateMobileCard: (cardInput: any) => void
  updateCardPhoto: (CardInput: any, files: FileList) => void
  loading: boolean
}

type CardInputType = {
  id: string
  name: string
  cardType: string
  blockId: string
  text: string
  photo: string | FileList | null
}

const PhotoTextCardInputsMobile: React.FC<PhotoTextInputsMobileProps> = ({
  card,
  updateMobileCard,
  updateCardPhoto,
  loading
}) => {
  const [dragActive, setDragActive] = useState(false)
  const [cardInput, setCardInput] = useState<CardInputType>({
    id: card.id,
    name: card.name || '',
    cardType: card.cardType,
    blockId: card.blockId,
    text: card.text || '',
    photo: card.photoUrl || ''
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
    setCardInput({ ...cardInput, photo: files })
    updateCardPhoto(cardInput, files)
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
      <div className=" h-1/2 rounded-[32px] border border-solid border-night-base-05 bg-night-base-01 hover:bg-night-base-02">
        <FileUpload
          accepts={['image']}
          handleFiles={handleMediaChange}
          dragActive={dragActive}
          setDrag={setDragActive}
        >
          {!!cardInput.photo ? (
            <img
              src={getUrl(cardInput.photo)}
              width="100%"
              height="100%"
              alt="Card Image"
              draggable={false}
              className="h-[175px] w-full rounded-[32px]  object-cover xxs:h-[220px]"
            />
          ) : (
            <div className="group flex h-full w-full flex-1 cursor-pointer items-center justify-center gap-5">
              <Icon
                className="fill-none text-night-base-06 group-hover:text-white"
                type="addCircle"
                width={40}
                height={40}
                label="Upload photo or video"
              />
              <span className=" text-white">Add Picture</span>
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

export default PhotoTextCardInputsMobile
