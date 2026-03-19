import React, { useState, useEffect, createContext, useRef } from 'react'
import { useRouter } from 'next/router'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card } from 'src/__generated__/graphql'
import { useToast } from '@/components/shared/Toast'
import Icon from '@/components/shared/Icon'
import ElementIndexNumber from '@/components/shared/ElementIndexNumber'
import CardEditor from '@/components/block/Card/CardEditor'
import CardContent from '@/components/block/Card/CardContent'
import SavingIndicator from '@/components/shared/SavingIndicator'

interface MobileCardProps {
  card: Card
  isFocused: boolean
  focusCard: (id: string, isFocused: boolean) => void
  updateOrder: (cardId: string, newIndex: number) => void
  deleteCard: (cardId: string) => void
  isOverlay: boolean
}

export const SavingContext = createContext({ isSaving: false })

const MobileCard: React.FC<MobileCardProps> = (props) => {
  const router = useRouter()
  const { cogId } = router.query
  const toast = useToast()
  const ref = useRef<any>(null)

  const [isSaving, setIsSaving] = useState<boolean>(false)

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
    if (element && props.isFocused) {
      element.scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      })
    }
  }, [props.isFocused])

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: props.card.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? '100' : 'auto',
    opacity: isDragging ? 0.6 : 1
  }

  const overlayStyle = {
    boxShadow: props.isOverlay
      ? 'rgba(0, 0, 0, 0.2) 0px 19px 38px, rgba(0, 0, 0, 0.15) 0px 15px 12px'
      : 'none'
  }

  const shareCard = (e: React.MouseEvent) => {
    e.stopPropagation()
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/cogs/${cogId}/?focusedCardId=${props.card.id}&blockId=${props.card.blockId}`
    navigator.clipboard.writeText(url)
    toast.open('success', 'Card link was copied to clipboard')
  }

  return (
    <SavingContext.Provider value={{ isSaving }}>
      <div
        ref={setNodeRef}
        style={style}
        className={`${
          !props.isFocused && 'cursor-pointer'
        } card mb-5 h-full w-[280px]`}
        onClick={() => props.focusCard(props.card.id, props.isFocused)}
      >
        <div className="aspect-ratio--wrapper--9-16" ref={ref}>
          <div
            className={`${
              props.isFocused
                ? 'border-opacity-silver border-opacity-20 bg-day-base-04 dark:border-white dark:border-opacity-[15%] dark:bg-night-base-02'
                : 'border-opacity-silver border-opacity-20 bg-day-base-02 dark:border-white dark:border-opacity-10 dark:bg-night-base-03'
            } aspect-ratio--content overflow-hidden rounded-3xl border border-solid`}
            style={overlayStyle}
          >
            <CardContent card={props.card} />
          </div>
        </div>
      </div>
    </SavingContext.Provider>
  )
}

export default MobileCard
