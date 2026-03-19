import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useRef
} from 'react'
import { useRouter } from 'next/router'
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragEndEvent,
  DragStartEvent
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy
} from '@dnd-kit/sortable'
import { Cog, Card } from 'src/__generated__/graphql'
import SortableCard from '@/components/block/SortableCard'
import NewCardButton from '@/components/block/NewCardButton'
import BlockOpeningCard from '@/components/block/BlockOpeningCard'
import ActionButton from '@/components/shared/ActionButton'
import Draggable from '../shared/Draggable'
import QrCodeCard from '@/components/shared/QrCodeCard'

interface SortableCardListProps {
  cog: Cog | undefined | null
  name: string
  items: Card[]
  updateOrder: (cardId: string, newIndex: number) => void
  deleteCard: (cardId: string) => void
  recreateCard: (card: Card, cardInput: any) => void
  recreateImage: (id: string, query: string, generatorType: string) => void
  toggleModal: () => void
}

const SortableCardList: React.FC<SortableCardListProps> = ({
  cog,
  name,
  items,
  updateOrder,
  deleteCard,
  recreateCard,
  recreateImage,
  toggleModal
}) => {
  const router = useRouter()
  const { focusedCard } = router.query

  const [focusedCardId, setFocusedCardId] = useState<null | string | string[]>(
    null
  )

  const [activeId, setActiveId] = useState<string | null>(null)
  const [sortableItems, setSortableItems] = useState(items)

  const overlayCard = items.find((item: Card) => item.id === activeId)
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

  useLayoutEffect(() => {
    setSortableItems(getSortableCards())
  }, [items])

  useEffect(() => {
    setFocusedCardIdFromQuery()
  }, [router.isReady])

  const prevItemsLength = useRef(sortableItems.length)
  useEffect(() => {
    if (sortableItems.length > prevItemsLength.current) {
      const [lastItem] = sortableItems.slice(-1)
      setFocusedCardId(lastItem.id)
    }
    prevItemsLength.current = sortableItems.length
  }, [sortableItems])

  // const cardListRef = useRef(null)

  const setFocusedCardIdFromQuery = () => {
    if (!focusedCard) return
    setFocusedCardId(focusedCard)
  }

  const handleCardOnClick = (id: string, isFocused: boolean) => {
    if (isFocused) return
    setFocusedCardId(id)
  }

  const handleDragStart = useCallback((event: DragStartEvent) => {
    if (!event.active.id) return
    setActiveId(event.active.id.toString())
  }, [])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event
    if (!active || !over) return

    if (active.id !== over?.id) {
      setSortableItems((items: any) => {
        const oldIndex = items.findIndex((item: any) => item.id === active.id)
        const newIndex = items.findIndex((item: any) => item.id === over.id)
        const overItem = items.find((item: any) => item.id === over.id)
        const newPosition = overItem.position
        updateOrder(active.id.toString(), newPosition)
        return arrayMove(items, oldIndex, newIndex)
      })
    }

    setActiveId(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDragCancel = useCallback(() => {
    setActiveId(null)
  }, [])

  const openingCard = items.find((card) => card.cardType === 'opening')

  const getSortableCards = () =>
    items.filter((card) => card.cardType !== 'opening' && !card.parentCardId)

  const getVerticalCards = (cardId: string) =>
    items.filter((card) => card.parentCardId === cardId)

  const openModal = () => {
    toggleModal()
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
    >
      {/* <Draggable innerRef={cardListRef} rootClass={'drag'}> */}
      <section
        className="scrollbar--md mx-3 -mt-[70px] flex w-full flex-col items-center gap-y-3 gap-x-4 overflow-hidden overflow-x-auto pt-[74px] sm:flex-row sm:items-stretch"
        // ref={cardListRef}
      >
        {/* {sortableItems.length > 6 && (
          <div className="flex justify-center">
            <div className="flex justify-center xs:m-0 xs:w-[20rem]">
              <div className="mb-14 w-[90%] cursor-pointer xs:w-[20rem]">
                <div className="aspect-ratio--wrapper--9-16">
                  <div className=" aspect-ratio--content">
                    <ActionButton
                      icon="add"
                      label="New Card"
                      alignContent="vertical"
                      handleOnClick={openModal}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )} */}
        <QrCodeCard
          title={'Scan QR code to open the editor on mobile device.'}
        />

        {!!openingCard && (
          <BlockOpeningCard
            blockName={name}
            card={openingCard}
            user={cog?.user}
            isFocused={focusedCardId === openingCard.id}
            focusCard={handleCardOnClick}
            deleteCard={deleteCard}
          />
        )}
        <SortableContext items={sortableItems} strategy={rectSortingStrategy}>
          {sortableItems.map((item: any, index) => (
            <SortableCard
              index={index + 2}
              key={item.id}
              card={item}
              isFocused={focusedCardId === item.id}
              focusCard={handleCardOnClick}
              updateOrder={updateOrder}
              deleteCard={deleteCard}
              recreateCard={recreateCard}
              recreateImage={recreateImage}
              isOverlay={false}
              verticalCards={getVerticalCards(item.id)}
            />
          ))}

          <DragOverlay className="cursor-move">
            {!!activeId && !!overlayCard ? (
              <SortableCard
                index={0}
                card={overlayCard}
                isFocused={false}
                focusCard={handleCardOnClick}
                updateOrder={updateOrder}
                deleteCard={deleteCard}
                recreateCard={recreateCard}
                recreateImage={recreateImage}
                isOverlay={true}
                verticalCards={getVerticalCards(overlayCard.id)}
              />
            ) : null}
          </DragOverlay>
        </SortableContext>

        <div className="flex justify-center">
          <div className="flex justify-center xs:m-0 xs:w-[20rem]">
            <div className="mb-14 w-[90%] cursor-pointer xs:w-[20rem]">
              <div className="aspect-ratio--wrapper--9-16 w-[333px]">
                <div className=" aspect-ratio--content">
                  <ActionButton
                    icon="add"
                    label="New Card"
                    alignContent="vertical"
                    handleOnClick={openModal}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </Draggable> */}
      </section>
    </DndContext>
  )
}

export default SortableCardList
