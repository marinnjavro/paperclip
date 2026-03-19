import React, { useState, useEffect, createContext, useRef } from 'react'
import { useRouter } from 'next/router'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card } from 'src/__generated__/graphql'
import { useToast } from '@/components/shared/Toast'
import { CardContext } from '@/components/block/state/CardContext'
import Icon from '@/components/shared/Icon'
import ElementIndexNumber from '@/components/shared/ElementIndexNumber'
import CardEditor from '@/components/block/Card/CardEditor'
import CardContent from '@/components/block/Card/CardContent'
import SavingIndicator from '@/components/shared/SavingIndicator'
import VerticalCardEditor from '@/components/block/Card/VerticalCardEditor'
import useConfirm from '@/components/shared/ConfirmModal/useConfirm'
import CardHeader from '@/components/block/CardHeader/index'

interface SortableCardProps {
  index: number
  card: Card
  isFocused: boolean
  focusCard: (id: string, isFocused: boolean) => void
  updateOrder: (cardId: string, newIndex: number) => void
  deleteCard: (cardId: string) => void
  recreateCard: (card: Card) => void
  recreateImage: (id: string, query: string, generatorType: string) => void
  isOverlay: boolean
  verticalCards: Card[]
}

export const SavingContext = createContext({ isSaving: false })

const SortableCard: React.FC<SortableCardProps> = ({
  index,
  card,
  isFocused,
  focusCard,
  updateOrder,
  deleteCard,
  recreateCard,
  recreateImage,
  isOverlay,
  verticalCards
}) => {
  const router = useRouter()
  const { cogId } = router.query
  const toast = useToast()
  const ref = useRef<any>(null)

  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [verticalLinkHistory, setVerticalLinkHistory] = useState<string[]>([])

  const { RenderConfirmModal, requestConfirm } = useConfirm(
    'Delete this card?',
    false
  )

  const handleDeleteCard = async () => {
    const result = await requestConfirm()
    if (result) {
      deleteCard(card.id)
    }
  }

  /* prompt the user if they try and leave with unsaved changes */
  useEffect(() => {
    const warningText =
      'You have unsaved changes - are you sure you want to leave this page?'
    const handleWindowClose = (e: BeforeUnloadEvent) => {
      if (!isSaving) return
      e.preventDefault()
      return (e.returnValue = warningText)
    }
    const handleBrowseAway = () => {
      if (!isSaving) return
      if (window.confirm(warningText)) return
      router.events.emit('routeChangeError')
      throw 'routeChange aborted.'
    }
    window.addEventListener('beforeunload', handleWindowClose)
    router.events.on('routeChangeStart', handleBrowseAway)
    return () => {
      window.removeEventListener('beforeunload', handleWindowClose)
      router.events.off('routeChangeStart', handleBrowseAway)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSaving])

  useEffect(() => {
    const element = ref.current
    if (element && isFocused) {
      element.scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      })
    }
  }, [isFocused])

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: card.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? '100' : 'auto',
    opacity: isDragging ? 0.6 : 1
  }

  const overlayStyle = {
    boxShadow: isOverlay
      ? 'rgba(0, 0, 0, 0.2) 0px 19px 38px, rgba(0, 0, 0, 0.15) 0px 15px 12px'
      : 'none'
  }

  const saveToHistory = (id: string) => {
    if (id === verticalLinkHistory[0]) return
    setVerticalLinkHistory([id, ...verticalLinkHistory])
  }

  const removeFromHistory = () => {
    setVerticalLinkHistory(verticalLinkHistory.slice(1))
  }

  const shareCard = (e: React.MouseEvent) => {
    e.stopPropagation()
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/cogs/${cogId}/?focusedCardId=${card.id}&blockId=${card.blockId}`
    navigator.clipboard.writeText(url)
    toast.open('success', 'Card link was copied to clipboard')
  }

  return (
    <CardContext.Provider
      value={{
        card: card,
        verticalCards: verticalCards,
        saveToHistory: saveToHistory,
        removeFromHistory: removeFromHistory
      }}
    >
      <SavingContext.Provider value={{ isSaving }}>
        <div
          ref={setNodeRef}
          style={style}
          className={`${
            !isFocused && 'cursor-pointer'
          } card relative mb-14 w-full max-w-[20rem] xs:min-w-[333px]`}
          onClick={() => focusCard(card.id, isFocused)}
        >
          {RenderConfirmModal}
          <div className="card-header absolute -top-[74px]">
            <CardHeader
              recreateCard={recreateCard}
              recreateImage={recreateImage}
            />
          </div>
          {isFocused && verticalLinkHistory.length > 0 ? (
            <VerticalCardEditor
              verticalCards={verticalCards}
              verticalLinkHistory={verticalLinkHistory}
              setIsSaving={setIsSaving}
              close={removeFromHistory}
            />
          ) : (
            <div className="aspect-ratio--wrapper--9-16 relative" ref={ref}>
              <div
                className={`${
                  isFocused
                    ? 'border-opacity-silver border-opacity-20 bg-day-base-04 dark:border-white dark:border-opacity-[15%] dark:bg-night-base-02'
                    : 'border-opacity-silver border-opacity-20 bg-day-base-02 dark:border-white dark:border-opacity-10 dark:bg-night-base-03'
                } aspect-ratio--content h-full overflow-hidden rounded-3xl border border-solid`}
                style={overlayStyle}
              >
                {isFocused ? (
                  <CardEditor card={card} setIsSaving={setIsSaving} />
                ) : (
                  <CardContent card={card} />
                )}
              </div>
              <div className="absolute -mt-[1.5px] flex w-full">
                <div className="w-1/5">
                  {!!card.position && (
                    <ElementIndexNumber
                      index={index}
                      elementId={card.id}
                      updateIndex={updateOrder}
                    />
                  )}
                </div>

                <div className="card-footer w-3/5">
                  <div
                    className={`${
                      isFocused
                        ? 'border-opacity-silver border-opacity-20 border-opacity-30 bg-day-base-04 dark:border-white dark:border-opacity-[15%] dark:bg-night-base-02'
                        : 'border-opacity-silver border-opacity-20 border-opacity-30 bg-day-base-02 dark:border-white  dark:border-opacity-10 dark:bg-night-base-03'
                    } flex h-[100%] flex-1 items-center justify-center rounded-b-3xl border border-t-0 border-solid pb-3 pt-1.5`}
                    style={overlayStyle}
                  >
                    <div className="flex flex-1 cursor-pointer justify-center border-r border-solid border-opacity-silver border-opacity-30 py-1 hover:text-day-base-primary dark:border-white dark:border-opacity-10 dark:hover:text-night-base-secondary">
                      <Icon
                        type="move"
                        width={17}
                        height={17}
                        {...listeners}
                        {...attributes}
                      />
                    </div>
                    <div className="flex flex-1 cursor-pointer justify-center border-r border-solid border-opacity-silver border-opacity-30 py-1 hover:text-day-base-primary dark:border-white dark:border-opacity-10 dark:hover:text-night-base-secondary">
                      <Icon
                        type="delete"
                        width={17}
                        height={17}
                        onClick={() => handleDeleteCard()}
                      />
                    </div>
                    <div className="flex flex-1 cursor-pointer justify-center border-r border-solid border-opacity-silver border-opacity-30 py-1 hover:text-day-base-primary dark:border-white dark:border-opacity-10 dark:hover:text-night-base-secondary">
                      <Icon
                        type="share"
                        width={17}
                        height={17}
                        onClick={(e: any) => shareCard(e)}
                      />
                    </div>
                    <div className="flex flex-1 justify-center">
                      <SavingIndicator isSaving={isSaving} />
                    </div>
                  </div>
                </div>
                <div className="flex-2 w-1/5"></div>
              </div>
            </div>
          )}
        </div>
      </SavingContext.Provider>
    </CardContext.Provider>
  )
}

export default SortableCard
