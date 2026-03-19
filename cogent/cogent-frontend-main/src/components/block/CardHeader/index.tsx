import { useState } from 'react'
import { Card } from 'src/__generated__/graphql'
import { useCardContext } from '@/components/block/state/CardContext'

import RecreateModal from '@/components/shared/RecreateModal'
import HeaderButton from '@/components/block/CardHeader/HeaderButton'
import { useToast } from '@/components/shared/Toast'

interface CardHeaderProps {
  recreateCard: (card: Card) => void
  recreateImage: (id: string, query: string, generatorType: string) => void
}

const CardHeader: React.FC<CardHeaderProps> = ({
  recreateCard,
  recreateImage
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const { card } = useCardContext()
  const toast = useToast()

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  const handleRecreateImage = (query: string, generatorType: string) => {
    recreateImage(card.id, query, generatorType)
    toggleModal()
    toast.open(
      'success',
      'Image generation is in progress. Please wait a few minutes.'
    )
  }

  const isMediaTextCardContent = card.cardType === 'media and text'

  return (
    <div className="w-[333px] rounded-t-[20px] border border-solid border-[#555665] bg-night-base-02 pb-10 text-white">
      <div className="flex gap-6 p-4">
        <HeaderButton
          label="Generate image"
          icon="image"
          classNames="w-full rounded-[12px]"
          onClick={() => toggleModal()}
        />
        {isMediaTextCardContent && (
          <HeaderButton
            label="Recreate text"
            icon="interfaceArrows"
            classNames="w-full rounded-[12px]"
            onClick={() => recreateCard(card)}
          />
        )}
      </div>
      <RecreateModal
        card={card}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        recreate={handleRecreateImage}
      />
    </div>
  )
}

export default CardHeader
