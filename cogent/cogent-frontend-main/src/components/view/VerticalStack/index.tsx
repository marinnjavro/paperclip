import { useState, useEffect } from 'react'
import { Card } from 'src/__generated__/graphql'
import BackButton from '@/components/view/BackButton'
import NextButton from '@/components/view/NextButton'
import FullscreenCard from '@/components/view/FullScreenCard'


interface VerticalStackProps {
  blockIndex: number
  verticalCards: Card[]
  verticalHistory: string[]
  removeFromHistory: () => void
}

const VerticalStack: React.FC<VerticalStackProps> = ({
  blockIndex,
  verticalCards,
  verticalHistory,
  removeFromHistory
}) => {
  const [activeCard, setActiveCard] = useState<Card | null>(null)
  const [nextCard, setNextCard] = useState<Card | null>(null)
  const showNextCard = () => {
    const currentCard = nextCard
    if (!currentCard) return
    const nexCard = verticalCards.find((card) => currentCard.id === card.parentCardId)
    setActiveCard(currentCard)
    setNextCard(nexCard)
  }

  useEffect(() => {
    const currentCard = verticalCards.find((card) => card.id === verticalHistory[0])
    if (!currentCard) return
    const nexCard = verticalCards.find((card) => currentCard.id === card.parentCardId)
    setActiveCard(currentCard)
    setNextCard(nexCard)
  }, [])

  return (
    <div className="absolute left-0 right-0 z-50 h-full bg-[#2E2E43]">
      <BackButton handleOnClick={removeFromHistory} />
      {!!activeCard && (
        <FullscreenCard
          card={activeCard}
          verticalCards={verticalCards}
          blockIndex={blockIndex}
          slideToCard={() => {}}
        />
      )}
    </div>
  )
}

export default VerticalStack
