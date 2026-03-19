import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { Cog, Card } from 'src/__generated__/graphql'
import Icon from '@/components/shared/Icon'
import ActionButtonMobile from '@/components/shared/ActionButtonMobile'
import MobileCard from '@/components/block/MobileCard'
import MobileOpeningCard from '@/components/block/MobileOpeningCard'
import MobileCardEditor from '@/components/block/MobileCardEditor'
import CardPagination from '@/components/block/CardPagination'
import Swapper from './Card/Swapper'

interface SortableCardListProps {
  cog: Cog | undefined | null
  name: string
  cards: Card[]
  updateOrder: (cardId: string, newIndex: number) => void
  deleteCard: (cardId: string) => void
  toggleModal: () => void
}

const MobileCardList: React.FC<SortableCardListProps> = ({
  cog,
  name,
  cards,
  updateOrder,
  deleteCard,
  toggleModal
}) => {
  const router = useRouter()
  const { focusedCard } = router.query

  const scrollableRef = useRef<HTMLDivElement | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)

  const openingCard = cards.find((card) => card.cardType === 'opening')
  const horizontalCards = cards.filter((card) => !card.parentCardId)
  const sortableCards = cards.filter(
    (card) => card.cardType !== 'opening' && !card.parentCardId
  )

  const [mode, setMode] = useState<'editor' | 'swapper'>('editor')

  const [focusedCardId, setFocusedCardId] = useState<null | string | string[]>(
    null
  )
  const [card, setCard] = useState<Card | null>(null)
  const [isEditorOpen, setIsEditorOpen] = useState(false)

  /* get scroll progress */
  const [scrollWidth, setScrollWidth] = useState(0)
  const [cardWidth, setCardWidth] = useState(0)
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    if (!scrollableRef?.current || !cardRef.current) return
    setScrollWidth(scrollableRef?.current?.scrollWidth)
    setCardWidth(cardRef?.current?.offsetWidth)
  }, [])

  const handleScroll = () => {
    if (!scrollableRef?.current) return
    setScrollPosition(scrollableRef?.current?.scrollLeft)
  }

  useEffect(() => {
    setFocusedCardIdFromQuery()
  }, [router.isReady])

  useEffect(() => {
    if (!card) return
    setFocusedCardId(card?.id)
  }, [card])

  const prevItemsLength = useRef(horizontalCards.length)
  useEffect(() => {
    if (horizontalCards.length > prevItemsLength.current) {
      const [lastItem] = horizontalCards.slice(-1)
      setFocusedCardId(lastItem.id)
    }
    prevItemsLength.current = horizontalCards.length
  }, [horizontalCards])

  const setFocusedCardIdFromQuery = () => {
    if (!focusedCard) return
    setFocusedCardId(focusedCard)
  }

  const toggleEditorModal = () => {
    setIsEditorOpen(!isEditorOpen)
  }

  const handleCardOnClick = (id: string, isFocused: boolean) => {
    if (isFocused) return
    setFocusedCardId(id)
  }

  const openEditor = (item: Card) => {
    setIsEditorOpen(true)
    setCard(item)
  }

  const getVerticalCards = (cardId: string) =>
    cards.filter((card) => card.parentCardId === cardId)

  const closeSwapper = () => {
    setMode('editor')
  }

  return (
    <section className="flex w-full flex-col overflow-hidden">
      {!!card && (
        <MobileCardEditor
          open={isEditorOpen}
          toggleModal={toggleEditorModal}
          card={card}
          verticalCards={getVerticalCards(card.id)}
        />
      )}

      {mode === 'editor' ? (
        <>
          <div className="mx-3 mb-1 flex flex-row gap-x-3">
            <div className="w-full">
              <ActionButtonMobile
                icon="addCircle"
                label="Add card"
                textStyle="text-sm"
                handleOnClick={() => toggleModal()}
              />
            </div>
            <div className="w-full">
              <ActionButtonMobile
                icon="arrows"
                label="Swap Places"
                textStyle="text-sm"
                handleOnClick={() => setMode('swapper')}
              />
            </div>
          </div>
          <div className="pb-6">
            {!!cards && (
              <CardPagination
                cards={horizontalCards}
                progress={(scrollPosition / (scrollWidth - cardWidth)) * 100}
              />
            )}
          </div>
          <div
            ref={scrollableRef}
            onScroll={handleScroll}
            className="scrollbar--md flex h-full w-full flex-row items-stretch gap-y-3 gap-x-4 overflow-hidden overflow-x-auto px-3 pb-32"
          >
            {!!openingCard && (
              <MobileOpeningCard
                blockName={name}
                card={openingCard}
                user={cog?.user}
                isFocused={focusedCardId === openingCard.id}
                focusCard={handleCardOnClick}
                deleteCard={deleteCard}
              />
            )}
            {sortableCards.map((item: any) => (
              <div
                ref={cardRef}
                key={`mobile-editor-${item.id}`}
                onClick={() => {
                  openEditor(item)
                }}
              >
                <MobileCard
                  key={item.id}
                  card={item}
                  isFocused={focusedCardId === item.id}
                  focusCard={handleCardOnClick}
                  updateOrder={updateOrder}
                  deleteCard={deleteCard}
                  isOverlay={false}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <Swapper cards={sortableCards} close={closeSwapper} />
      )}
    </section>
  )
}

export default MobileCardList
