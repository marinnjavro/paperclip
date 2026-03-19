import { useState, useEffect } from 'react'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { Card, Cog } from 'src/__generated__/graphql'
import useLocalStorage from '@/utils/hooks/useLocalStorage'
import { sortByPosition } from '@/utils/functions'
import { CogViewerContext } from '@/components/view/state/CogViewerContext'

import Swiper from '@/components/view/Swiper'
import { getActionCards } from '@/utils/filterData'
import { patchConsoleError } from "next/dist/client/components/react-dev-overlay/internal/helpers/hydration-error-info";

interface FullscreenCardsProps {
  cog: Cog
}

const MobileCogViewer: React.FC<FullscreenCardsProps> = ({ cog }) => {
  const router = useRouter()
  const { blockId, focusedCardId } = router.query

  const [results, setResults] = useLocalStorage(`RESULTS_${cog?.id}`, null)
  const currentReplay = results?.replays?.slice(-1)[0]

  const [blockIndex, setBlockIndex] = useState(0)
  const [cardIndex, setCardIndex] = useState(-1)

  useEffect(() => {
    // start a new replay
    if (!results) {
      setResults({
        isSubmitted: false,
        replays: [getInitialReplay()]
      })
    } else {
      if (!currentReplay.endDate) return
      const updatedResults = { ...results }
      setResults({
        ...updatedResults,
        replays: [...updatedResults.replays, getInitialReplay()]
      })
    }
  }, [])

  useEffect(() => {
    if (!blockId || !focusedCardId) {
      setCardIndex(0)
    }

    if (!blockId || !cog?.blocks?.collection) return
    const block_index = sortByPosition(cog?.blocks?.collection).findIndex(
      (block: any) => block.id === blockId
    )
    setBlockIndex(block_index)

    if (focusedCardId && block_index !== -1) {
      const horizontalCards = sortCards(
        cog?.blocks?.collection[block_index].cards?.collection as Card[]
      ).filter((card) => !card.parentCardId)
      const card_index = horizontalCards.findIndex(
        (card) => card.id === focusedCardId
      )
      setCardIndex(card_index)
    } else {
      setCardIndex(0)
    }
  }, [])

  const sortCards = (cards: Card[]) => {
    console.log("cards:", cards)
    const openingCard = cards.find((card) => card.cardType === 'opening')
    const sortedCards = sortByPosition(
      cards.filter((card) => card.cardType !== 'opening')
    )

    console.log(openingCard)
    console.log(sortedCards)
    //return !!openingCard ? [openingCard, ...sortedCards] : sortedCards
    return cards
  }

  const getInitialReplay = () => {
    if (!cog?.cards) return {}
    const actionCards = getActionCards(cog?.cards)
    return {
      startDate: new Date().toLocaleString(),
      endDate: null,
      answers: getInitialAnswers(actionCards)
    }
  }

  const getInitialAnswers = (actionCards: Card[]) => {
    // if cog has no quiz (action) cards then answers array will be empty
    let answers = {}
    actionCards.forEach((card) => (answers = { ...answers, [card.id]: [] }))
    return answers
  }

  const getPrevIndex = () => {
    const prevBlock = sortByPosition(cog!.blocks!.collection)[blockIndex - 1]

    if (!prevBlock) {
      return 0
    }

    if (!prevBlock.cards?.collection) {
      return 0
    } else {
      const horizontalCards = prevBlock?.cards?.collection.filter(
        (card: Card) => !card.parentCardId
      )
      if (horizontalCards.length === 0) {
        return 0
      }
      return horizontalCards.length - 1
    }
  }

  const loadNextBlock = () => {
    if (!cog?.blocks) return
    if (blockIndex === cog?.blocks?.collection.length - 1) return
    setBlockIndex(blockIndex + 1)
  }

  const loadPrevBlock = () => {
    if (blockIndex === 0) return
    setBlockIndex(blockIndex - 1)
  }

  const getBlockCards = () => {
    if (!cog?.blocks?.collection) return []
    if (cog?.blocks?.collection?.[blockIndex]?.cards?.collection) {
      return sortCards(
        cog?.blocks?.collection?.[blockIndex].cards?.collection as Card[]
      )
    }
    return []
  }

  if (!cog?.blocks?.collection?.length || !cog?.cards) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 px-6">
        <p className="text-lg font-bold text-white">{cog?.name || 'Cog'}</p>
        <p className="text-sm text-white/50">This cog has no content yet.</p>
        <button
          onClick={() => router.back()}
          className="mt-4 rounded-lg bg-white/10 px-6 py-2 text-sm text-white"
        >
          Go back
        </button>
      </div>
    )
  }

  return (
    <CogViewerContext.Provider
      value={{
        actionCards: getActionCards(cog?.cards)
      }}
    >
      <div className="flex justify-center">
        {cardIndex !== -1 &&
          !!cog?.blocks?.collection[blockIndex]?.cards &&
          !!cog?.user && (
            <Swiper
              user={cog?.user}
              cards={getBlockCards()}
              blockIndex={blockIndex}
              cardIndex={cardIndex}
              isFirst={blockIndex === 0}
              isLast={blockIndex === cog?.blocks?.collection.length - 1}
              prevIndex={getPrevIndex()}
              loadNextBlock={loadNextBlock}
              loadPrevBlock={loadPrevBlock}
            />
          )}
      </div>
    </CogViewerContext.Provider>
  )
}

export default MobileCogViewer
