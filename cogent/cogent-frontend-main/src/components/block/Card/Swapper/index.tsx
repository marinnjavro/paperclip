import { Card } from 'src/__generated__/graphql'
import { useMutation } from '@apollo/client'
import { gql } from 'src/__generated__/gql'
import {
  ChangePositionCardSwapperMutation,
  ChangePositionCardSwapperMutationVariables
} from 'src/__generated__/graphql'
import { useToast } from '@/components/shared/Toast'

import SortableCardsMobile from './SortableCardsMobile'
import PageHeading from '@/components/shared/PageHeading'

interface SwapperProps {
  cards: Card[]
  close: () => void
}

const Swapper: React.FC<SwapperProps> = ({ cards, close }) => {
  const toast = useToast()

  const GET_BLOCKS = gql(`
    query fetchBlocks {
      blocks {
        metadata {
          currentPage
          limitValue
          totalCount
          totalPages
        }
        collection {
          id
          name
          cogId
          position
          cards {
            metadata {
              currentPage
              limitValue
              totalCount
              totalPages
            }
            collection {
              id
              name
              cardType
              text
              position
              photoUrl(width: 1000, height: 1000)
              videoUrl
              audioUrl
              actions
            }
          }
        }
      }
    }
  `)

  /* change card position */
  const CHANGE_CARD_POSITION = gql(/* GraphQL */ `
    mutation changePositionCardSwapper($inputCard: ChangePositionCardInput!) {
      changePositionCard(input: $inputCard) {
        card {
          id
          name
          blockId
          cardType
          text
          photoUrl(width: 100, height: 100)
          videoUrl
          audioUrl
          actions
        }
      }
    }
  `)

  const [changePositionCard] = useMutation<
    ChangePositionCardSwapperMutation,
    ChangePositionCardSwapperMutationVariables
  >(CHANGE_CARD_POSITION, {
    onError: (err) => {
      toast.open(
        'error',
        'An error occurred while trying to change the Card position. Please try again.'
      )
    },
    refetchQueries: [{ query: GET_BLOCKS }]
  })

  const updateCardOrder = async (cardId: string, newPosition: number) => {
    await changePositionCard({
      variables: {
        inputCard: {
          attributes: {
            id: cardId,
            position: newPosition
          }
        }
      }
    })
  }

  return (
    <div className="page-spacing">
      <PageHeading
        icon="chevronLeft"
        label="Back to card selection"
        handleOnClick={() => close()}
      />

      <h3 className="-mt-8 pb-8 text-base text-day-text-label-primary opacity-60 dark:text-opacity-white">
        Drag cards to change display order
      </h3>
      <div className="grid grid-cols-3 gap-x-3 gap-y-14 pb-32">
        <SortableCardsMobile items={cards} updateOrder={updateCardOrder} />
      </div>
    </div>
  )
}

export default Swapper
