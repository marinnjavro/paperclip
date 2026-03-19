import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useLongPress } from 'use-long-press'
import { Card, Block } from 'src/__generated__/graphql'
import { sortByPosition } from '@/utils/functions'
import CogContext from '@/components/cog/state/CogContext'

import Icon from '@/components/shared/Icon'
import BlockElements from '@/assets/static/elements/block-elements.svg'
import BlockElementsLight from '@/assets/static/elements/block-elements-light.svg'
import ElementIndexNumber from '@/components/shared/ElementIndexNumber'
import NumberOfCards from '@/components/shared/NumberOfCards'
import BlockPreview from '@/components/shared/BlockPreview'

interface SortableBlockProps {
  block: Block
  isOverlay?: boolean
}

const SortableBlock: React.FC<SortableBlockProps> = ({
  block,
  isOverlay = false
}) => {
  const { deleteBlock, updateBlockOrder } = useContext(CogContext)

  const router = useRouter()
  const { cogId } = router.query

  const [showControls, setShowControls] = useState(false)

  const [width, setWidth] = useState(window.innerWidth)
  const breakpoint = 640
  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth)
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener('resize', handleResizeWindow)
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener('resize', handleResizeWindow)
    }
  }, [])

  const bind = useLongPress((e) => {
    e.stopPropagation()
    showFooter()
  })

  /* drag and drop */
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: block.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? '100' : 'auto',
    opacity: isDragging ? 0.3 : 1
  }

  const overlayStyle = {
    boxShadow: isOverlay
      ? 'rgba(0, 0, 0, 0.2) 0px 19px 38px, rgba(0, 0, 0, 0.15) 0px 15px 12px'
      : 'none'
  }

  const getSortableCards = (cards: Card[] | undefined | null) => {
    if (!cards) return []

    const sortableCards = sortByPosition(
      cards.filter((card) => card.cardType !== 'opening' && !card.parentCardId)
    )
    if (!!sortableCards) {
      return sortableCards
    }
    return []
  }

  const toBlock = () => {
    width < breakpoint
      ? router.push(`/cogs/${cogId}/blocks/${block.id}/edit`)
      : router.push({
          pathname: `/cogs/${cogId}/blocks`,
          query: { blockId: block.id }
        })
  }

  const showFooter = () => {
    setShowControls(true)
  }

  const hideFooter = () => {
    setShowControls(false)
  }

  return (
    <div ref={setNodeRef} style={style}>
      <div
        onMouseEnter={() => showFooter()}
        onMouseLeave={() => hideFooter()}
        className="z-0"
      >
        <div {...bind()} className="text-night-text">
          <div
            className={`${
              showControls ? 'text-day-text-label-primary dark:text-white' : ''
            } cog-header mx-1.5 hidden font-bold sm:block`}
          >
            <p className="truncate pb-4">{block.name}</p>
          </div>

          <div
            className={`${
              showControls
                ? 'bg-day-base-04 dark:bg-night-base-02'
                : 'bg-day-base-03 dark:bg-night-base-03'
            } flex min-h-[215px] w-full cursor-pointer flex-col justify-center rounded-[32px] border border-solid border-opacity-silver border-opacity-20 dark:border-white dark:border-opacity-10 xl:min-h-[250px]`}
            style={overlayStyle}
            onClick={() => {
              if (!showControls) return
              toBlock()
            }}
          >
            <div className="mx-1.5 mt-5 px-5 font-bold text-day-text-label-primary dark:text-white sm:hidden">
              <p className="truncate">{block.name}</p>
            </div>
            <div className="flex w-full items-center justify-center px-7 py-9 sm:px-8 sm:py-10">
              {!!block?.cards &&
              getSortableCards(block?.cards?.collection).length !== 0 ? (
                <div className="relative mb-9 flex h-full w-full items-center justify-center pt-8 sm:mb-0 sm:pt-0">
                  <BlockPreview
                    cards={getSortableCards(block?.cards?.collection)}
                    length={5}
                  />
                </div>
              ) : (
                <div className="flex w-full items-center justify-center px-7 py-9 sm:px-8 sm:py-10">
                  <div className="hidden h-full w-full dark:block">
                    <BlockElements width="100%" height="100%" />
                  </div>
                  <div className="h-full w-full dark:hidden">
                    <BlockElementsLight width="100%" height="100%" />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex-1">
              {!!block.position && (
                <ElementIndexNumber
                  index={block.position}
                  elementId={block.id}
                  updateIndex={updateBlockOrder}
                />
              )}
            </div>
            {showControls && (
              <div className="z-10 w-1/3">
                <div
                  className="mt-[-7px] flex h-[100%] flex-1 items-center justify-center rounded-b-3xl border border-t-0 border-solid border-opacity-silver border-opacity-20 bg-day-base-04 px-1 pb-3 pt-1 dark:border-white dark:border-opacity-10 dark:bg-night-base-02"
                  style={overlayStyle}
                >
                  <div className="flex flex-1 justify-center border-r border-solid border-opacity-silver border-opacity-20 hover:text-night-base-secondary dark:border-white dark:border-opacity-10">
                    <Icon
                      type="move"
                      width={20}
                      height={20}
                      {...attributes}
                      {...listeners}
                    />
                  </div>
                  <div className="flex flex-1 justify-center">
                    <button
                      className="hover:text-night-base-secondary"
                      onClick={() => deleteBlock(block.id)}
                    >
                      <Icon type="delete" width={17} height={17} />
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="flex flex-1 justify-end">
              {!!showControls && (
                <NumberOfCards
                  cardsNumber={
                    getSortableCards(block?.cards?.collection).length
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SortableBlock
