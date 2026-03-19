import { useState, ChangeEvent } from 'react'
import { Card } from 'src/__generated__/graphql'
import { ActionOptionType } from '../Card/CardEditor/ActionCardInputs/ActionOption'

import { RadioGroup as HeadlessRadioGroup } from '@headlessui/react'
import TextInput from '@/components/shared/TextInput'
import FileUpload, { fileTypes } from '@/components/shared/FileUpload'
import Icon from '@/components/shared/Icon'
import SelectInput from '@/components/shared/SelectInput'
import ButtonPrimary from '@/components/shared/ButtonPrimary'
import VideoPlayer from '@/components/shared/VideoPlayer'

const answerTypes = [
  { value: 'one', label: 'One Answer' },
  { value: 'multiple', label: 'Multiple Answers' }
]

interface ActionInputsProps {
  card: Card
  updateMobileCard: (cardInput: any) => void
  updateCardPhoto: (CardInput: any, files: FileList) => void
  updateCardVideo: (CardInput: any, files: FileList) => void
  loading: boolean
}

const ActionCardInputs: React.FC<ActionInputsProps> = ({
  card,
  updateMobileCard,
  updateCardPhoto,
  updateCardVideo,
  loading
}) => {
  const [dragActive, setDragActive] = useState(false)

  const [cardInput, setCardInput] = useState(() => {
    const idx = !!card.actions
      ? card.actions.findIndex((option: ActionOptionType) => option.answer)
      : -1

    const answersLength = !!card.actions
      ? card.actions.filter((option: ActionOptionType) => {
          return option.answer
        }).length
      : 0
    const type = answersLength > 1 ? 'multiple' : 'one'

    const initialData = {
      id: card.id,
      name: card.name || '',
      cardType: card.cardType,
      blockId: card.blockId,
      text: card.text || '',
      actions: card.actions || '',
      audio: card.audioUrl || '',
      answerType: type,
      selected: idx !== -1 ? idx : 0
    }
    return initialData
  })

  const [media, setMedia] = useState({
    photo: card.photoUrl,
    video: card.videoUrl
  })

  const hasMedia = !!media.photo || !!media.video

  const getUrl = (file: string | FileList) => {
    if (typeof file === 'string') {
      return file
    } else {
      return URL.createObjectURL(file[0])
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

  const handleAnswerTypesChange = (selection: {
    value: string
    name: string
  }) => {
    const updatedActions = cardInput.actions.map(
      (option: ActionOptionType, i: number) => {
        let isAnswer = false
        if (i === 0) {
          isAnswer = true
        }
        return { ...option, answer: isAnswer }
      }
    )

    setCardInput((prevState) => ({
      ...cardInput,
      answerType: selection.value,
      actions: updatedActions
    }))
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

  const addOption = async () => {
    setCardInput((prevState) => ({
      ...cardInput,
      actions: [...prevState.actions, { question: 'Enter text', answer: false }]
    }))
  }

  const handleCheckOption = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const checked = event.target.checked

    const updatedActions = cardInput.actions.map(
      (option: ActionOptionType, i: number) => {
        let isAnswer = option.answer
        if (i === index) {
          isAnswer = checked
        }
        return { ...option, answer: isAnswer }
      }
    )

    setCardInput((prevState) => ({
      ...cardInput,
      selected: index,
      actions: updatedActions
    }))
  }

  const handleActionsChange = (value: any) => {
    const index = cardInput.actions.findIndex(
      (option: ActionOptionType) => option === value
    )

    const updatedActions = cardInput.actions.map((option: ActionOptionType) => {
      let isAnswer = false
      if (option === value) {
        isAnswer = true
      }
      return { ...option, answer: isAnswer }
    })

    setCardInput((prevState) => ({
      ...cardInput,
      selected: index,
      actions: updatedActions
    }))
  }

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    updateMobileCard(cardInput)
  }

  return (
    <div className="flex flex-1 flex-col gap-3.5">
      <div>
        <div className=" h-[40vh] overflow-hidden rounded-[32px] border border-solid border-night-base-05 bg-night-base-01 hover:bg-night-base-02">
          <FileUpload
            accepts={['image', 'video']}
            handleFiles={handleMediaChange}
            dragActive={dragActive}
            setDrag={setDragActive}
          >
            {hasMedia ? (
              <>
                {!!media.video && (
                  <div className="h-full rounded-[32px]">
                    <VideoPlayer url={media.video} autoPlay={true} />
                  </div>
                )}
                {!!media.photo && (
                  <img
                    src={media.photo}
                    width="100%"
                    height="100%"
                    alt="Card Image"
                    draggable={false}
                    className="h-full w-full rounded-[32px]  object-cover "
                  />
                )}
              </>
            ) : (
              <div className="group flex h-full w-full flex-1 cursor-pointer items-center justify-center gap-5">
                <Icon
                  className="fill-none text-night-base-06 group-hover:text-white"
                  type="addCircle"
                  width={40}
                  height={40}
                  label="Upload photo or video"
                />
                <span className=" text-white">Add Photo/Video</span>
              </div>
            )}
          </FileUpload>
        </div>
      </div>

      <div>
        <TextInput
          label="Title"
          name="name"
          value={cardInput.name}
          handleChange={handleChange}
        />
      </div>

      <div className="-mt-2">
        <SelectInput
          name="answerTypes"
          options={answerTypes}
          value={cardInput.answerType}
          handleChange={handleAnswerTypesChange}
        />
      </div>

      <div>
        {cardInput.answerType === 'multiple' ? (
          <div className="flex flex-col gap-2.5">
            {!!cardInput.actions &&
              cardInput.actions.map((option: ActionOptionType, i: number) => (
                <div key={`action-multi-option-${i}`}>
                  <div className="group flex flex-row items-center rounded-xl border border-solid border-white border-opacity-10 p-3 text-support-gray-001 hover:text-white">
                    <input
                      id={`multi-option-${i}`}
                      type="checkbox"
                      checked={option.answer}
                      onChange={(e) => handleCheckOption(e, i)}
                      className="h-4 w-4 cursor-pointer rounded border-white border-opacity-20 bg-night-base-04 checked:border-day-base-primary checked:bg-day-base-primary hover:checked:bg-day-base-primary-hover focus:bg-day-base-primary focus:ring-0 focus:ring-offset-0 group-hover:bg-day-base-primary-hover"
                    />
                    <label
                      htmlFor={`multi-option-${i}`}
                      className="ml-3 block cursor-pointer text-sm leading-6"
                    >
                      {option.question}
                    </label>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <HeadlessRadioGroup
            value={cardInput.actions[cardInput.selected]}
            onChange={handleActionsChange}
            className="flex flex-col gap-2.5"
          >
            <HeadlessRadioGroup.Label className="text-base font-semibold text-black"></HeadlessRadioGroup.Label>
            {!!cardInput.actions &&
              cardInput.actions.map((option: ActionOptionType, i: number) => (
                <HeadlessRadioGroup.Option
                  key={`action-option-${i}`}
                  value={option}
                >
                  {({ checked }) => (
                    <div className="flex flex-row items-center rounded-xl border border-solid border-white border-opacity-10 p-3">
                      <input
                        id={`action-option-${i}`}
                        name="notification-method"
                        type="radio"
                        defaultChecked={checked}
                        className="h-4 w-4 bg-night-base-04 checked:bg-day-base-primary-hover focus:ring-0 focus:ring-offset-0 group-hover:bg-day-base-primary-hover"
                      />
                      <label
                        htmlFor={`action-option-${i}`}
                        className="ml-3 block text-sm font-medium leading-6 text-support-gray-001"
                      >
                        {option.question}
                      </label>
                    </div>
                  )}
                </HeadlessRadioGroup.Option>
              ))}
          </HeadlessRadioGroup>
        )}
      </div>

      <NewVariantButton handleOnClick={addOption} />

      <div className="flex h-full w-full flex-col bg-night-base-01"></div>

      <ButtonPrimary
        label="Save"
        classNames="w-full mt-5"
        onClick={handleSubmit}
        isLoading={loading}
      />
    </div>
  )
}

export default ActionCardInputs

const NewVariantButton = ({ handleOnClick }: { handleOnClick: () => void }) => {
  return (
    <div
      onClick={() => handleOnClick()}
      className="hover:bg- w-full rounded-[16px] py-2 px-2 hover:border hover:border-solid hover:border-white hover:border-opacity-10 hover:bg-night-base-05 sm:hidden"
    >
      <div className="flex items-center justify-start gap-4 text-support-gray-001">
        <Icon type="addCircle" width={32} height={32} />
        <span className="text-sm">Add a new answer</span>
      </div>
    </div>
  )
}
