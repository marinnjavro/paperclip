import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSwipeable } from 'react-swipeable'
import { Cog, Card, User } from 'src/__generated__/graphql'
import { allEqual, sortByPosition } from '@/utils/functions'
import useLocalStorage from '@/utils/hooks/useLocalStorage'

import Icon from '@/components/shared/Icon'
import Pagination from '@/components/view/Pagination'
import FullscreenCard from '@/components/view/FullScreenCard'
import BackButton from '@/components/view/BackButton'
import ClosingCard from '@/components/view/ClosingCard'

interface SwiperProps {
  user: User
  cards: Card[]
  blockIndex: number
  cardIndex: number
  isFirst: boolean
  isLast: boolean
  prevIndex: number
  loadNextBlock: () => void
  loadPrevBlock: () => void
}
const Swiper: React.FC<SwiperProps> = ({
  user,
  cards,
  blockIndex,
  cardIndex,
  isFirst,
  isLast,
  prevIndex,
  loadNextBlock,
  loadPrevBlock
}) => {
  const router = useRouter()
  const { cogId, prevCog, prevBlock, prevCard } = router.query

  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const [current, setCurrent] = useState<number>(0)
  const [cardsHistory, setCardsHistory] = useState<string[]>([])
  const [showClosingCard, setShowClosingCard] = useState<boolean>(false)

  const horizontalCards = cards.filter((card) => !card.parentCardId)
  const length = horizontalCards.length
  //HANDLING VERTICAL CARDS
  const verticalCards = cards.filter((card) => !!card.parentCardId)
  const currentCard = horizontalCards[current]

  const isBackToCardVisible = cardsHistory.length > 0
  const isBackToBlockVisible = !isBackToCardVisible && prevBlock
  const isBackToCogVisible = !isBackToCardVisible && !prevBlock && prevCog

  const handlers = useSwipeable({
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: true,
    onSwipedRight: (eventData) => (isDisabled ? () => {} : prevSlide()),
    onSwipedLeft: (eventData) => (isDisabled ? () => {} : nextSlide())
  })

  useEffect(() => {
    slideTo(cardIndex)
  }, [])

  const getCardIndex = (id: string | string[]) => {
    return horizontalCards.findIndex((card) => card.id === id)
  }

  const nextSlide = () => {
    if (current >= length - 1) {
      if (isLast) {
        setShowClosingCard(true)
        setCurrent(length)

        return
      }

      loadNextBlock()
      setCurrent(0)
      return
    }
    setCurrent(current + 1)
  }

  const prevSlide = () => {
    if (showClosingCard) {
      setShowClosingCard(false)
    }
    if (current === 0) {
      if (isFirst) return

      loadPrevBlock()
      setCurrent(prevIndex)
      return
    }
    setCurrent(current - 1)
  }

  const slideTo = (index: number) => {
    setCurrent(index)
  }

  const backToCard = () => {
    setCardsHistory(cardsHistory.slice(1))
    slideTo(getCardIndex(cardsHistory[0]))

    if (allEqual(cardsHistory)) {
      setCardsHistory([])
    }
  }

  const backToBlock = () => {
    const getQuery = () => {
      if (!prevCard) return
      return { focusedCardId: prevCard, blockId: prevBlock }
    }
    router.push({
      pathname: `/cogs/${prevCog}`,
      query: getQuery()
    })
  }

  const backToCog = () => {
    const getQuery = () => {
      if (!prevCard) return
      return { focusedCardId: prevCard, blockId: prevBlock }
    }
    router.push({
      pathname: `/cogs/${prevCog}`,
      query: getQuery()
    })
  }

  const slideToCard = (fromId: string, toId: string) => {
    const index = getCardIndex(toId)
    if (index === -1) return
    setCardsHistory([fromId, ...cardsHistory])
    slideTo(index)
  }

  const toggleSwiping = () => {
    setIsDisabled(!isDisabled)
  }

  return (
    !!cards && (
      <div
        className="fixed inset-0 flex h-full max-h-screen w-full items-center justify-center overflow-hidden"
        {...handlers}
      >
        <div className="relative h-full w-full max-w-[430px] overflow-hidden">
          <div className="absolute top-0 right-0 z-30 w-full">
            {!!horizontalCards && (
              <div className="mx-4 mt-4 flex items-center">
                <div className="w-full flex-1">
                  <Pagination
                    blockIndex={blockIndex}
                    cards={horizontalCards}
                    currentIndex={current}
                    slideTo={slideTo}
                    isDisabled={isDisabled}
                  />
                </div>
                <div
                  className={`${
                    !showClosingCard
                      ? 'text-gray-500'
                      : `${
                          blockIndex % 2 === 0
                            ? 'text-day-base-secondary'
                            : 'text-[#5018A3]'
                        }`
                  } ml-2 flex items-center justify-center`}
                >
                  <Icon width={16} height={16} type="closingCard" />
                </div>
              </div>
            )}
            {isBackToCardVisible && <BackButton handleOnClick={backToCard} />}
            {isBackToBlockVisible && <BackButton handleOnClick={backToBlock} />}
            {isBackToCogVisible && <BackButton handleOnClick={backToCog} />}
          </div>
          {!!horizontalCards &&
            !!verticalCards &&
            (!showClosingCard ? (
              horizontalCards.map((card, index) => {
                return (
                  <div key={index}>
                    {index === current && (
                      <FullscreenCard
                        blockIndex={blockIndex}
                        user={user}
                        card={card}
                        slideToCard={slideToCard}
                        verticalCards={verticalCards}
                        nextSlide={nextSlide}
                        toggleSwiping={toggleSwiping}
                      />
                    )}
                  </div>
                )
              })
            ) : (
              <ClosingCard />
            ))}
        </div>
      </div>
    )
  )
}

export default Swiper
