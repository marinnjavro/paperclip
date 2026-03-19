import { useState } from 'react'
import { Card } from 'src/__generated__/graphql'
import _ from 'lodash'
import { is, getErrors } from '@/utils/validation'

import TextInput from '@/components/shared/TextInput'
import TextEditor from '@/components/shared/TextEditor'
import ButtonPrimary from '@/components/shared/ButtonPrimary'
import TextEditorMobile from './TextEditorMobile'

interface TextInputsMobileProps {
  card: Card
  updateMobileCard: (cardInput: any) => void
  loading: boolean
}

type CardInputType = {
  id: string
  name: string
  cardType: string
  blockId: string
  text: string
}

const TextCardInputsMobile: React.FC<TextInputsMobileProps> = ({
  card,
  updateMobileCard,
  loading
}) => {
  const [cardInput, setCardInput] = useState<CardInputType>({
    id: card.id,
    name: card.name || '',
    cardType: card.cardType,
    blockId: card.blockId,
    text: card.text || ''
  })

  const [errors, setErrors] = useState({
    name: '',
    text: ''
  })

  const validateInput = (values: { name: string; text: string }) => {
    const errors = getErrors(values, {
      name: [is.max(50)],
      text: [is.max(920)]
    })
    return { errors, isValid: _.values(errors).every(_.isEmpty) }
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
      <div className="flex-0">
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

export default TextCardInputsMobile
