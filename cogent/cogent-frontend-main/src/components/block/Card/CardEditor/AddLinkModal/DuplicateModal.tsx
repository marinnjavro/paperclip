import { useEffect } from 'react'
import _ from 'lodash'
import dynamic from 'next/dynamic'
import { useMutation } from '@apollo/client'
import { gql } from 'src/__generated__/gql'
import {
  Card,
  DuplicateCardMutation,
  DuplicateCardMutationVariables,
  Cog,
  VerticalCogMutation,
  VerticalCogMutationVariables
} from 'src/__generated__/graphql'
import { useRouter } from 'next/router'
import { useScrollBlock } from '@/utils/hooks/useScrollBlock'
import { useToast } from '@/components/shared/Toast'
import { useCardContext } from '@/components/block/state/CardContext'
import { FETCH_BLOCK } from '@/pages/cogs/[cogId]/blocks/[blockId]/edit'

const AddLinkModal = dynamic(
  () => import('@/components/block/Card/CardEditor/AddLinkModal/index')
)

interface DuplicateModalProps {
  isVisible: boolean
  toggleModal: () => void
  formatLink: (cogId: string, verticalCardId: string, blockId: string, isVerticalCog: boolean, verticalCogId?: string) => void
}



// card {
//   id
//   blockId
//   parentCardId
//   name
//   cardType
//   text
//   position
//   photoUrl(width: 1000, height: 1000)
//   videoUrl
//   audioUrl
//   actions
// }

const VERTICAL_COG = gql(`  
  mutation verticalCog($verticalCog: VerticalCogInput!) {
    verticalCog(input: $verticalCog) {
      cog {
        id
        name
        description
        tags
        isPinned
        isPublic
        createdAt
        photoUrl(width: 1000, height: 1000)
        firstCard {
          id
        }
        firstBlock {
          id
        }
      }
    }
  }  
`)

const DuplicateModal: React.FC<DuplicateModalProps> = ({
  isVisible,
  toggleModal,
  formatLink,
}) => {
  const { card } = useCardContext()

  const router = useRouter()
  const { cogId, blockId } = router.query

  const toast = useToast()

  const [blockScroll, allowScroll] = useScrollBlock()

  /* duplicate card */
  const DUPLICATE_CARD = gql(`
    mutation duplicateCard($duplicateCard: DuplicateCardInput!) {
      duplicateCard(input: $duplicateCard) {
        card {
          id
          blockId
          parentCardId
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
 `)

  const [duplicateCard] = useMutation<
    DuplicateCardMutation,
    DuplicateCardMutationVariables
  >(DUPLICATE_CARD, {
    onError: (err) => toast.open('error', err.message),
    onCompleted: (data) => {
      formatLink(
        cogId as string,
        data.duplicateCard?.card?.id as string,
        blockId as string,
        false
      )
      toggleModal()
    },
    update(cache, { data }) {
      const query = cache.readQuery({
        query: FETCH_BLOCK,
        variables: {
          blockId: blockId as string
        }
      })

      cache.writeQuery({
        query: FETCH_BLOCK,
        variables: {
          blockId: blockId as string
        },
        data: {
          block: {
            ...query!.block,
            cards: !!query?.block?.cards?.collection
              ? [data?.duplicateCard?.card, ...query?.block?.cards?.collection]
              : [data?.createduplicateCardCard?.card]
          }
        }
      })
    }
  })

  /* duplicate cog */
  const [duplicateCog] = useMutation<
    VerticalCogMutation,
    VerticalCogMutationVariables
  >(VERTICAL_COG, {
    onError: (err) => {
      console.log(err)
      toast.open('error', err.message)
    },
    onCompleted: (data) => {
      formatLink(
        data.verticalCog?.cog?.id as string,
        data.verticalCog?.cog?.firstCard?.id as string,
        data.verticalCog?.cog?.firstBlock?.id as string,
        true,
        data.verticalCog?.cog?.id as string
      )
      toggleModal()
    },
    update(cache, { data }) {
      const query = cache.readQuery({
        query: FETCH_BLOCK,
        variables: {
          blockId: blockId as string
        }
      })
      cache.writeQuery({
        query: FETCH_BLOCK,
        variables: {
          blockId: blockId as string
        },
        data: {
          block: {
            ...query!.block,
            cards: !!query?.block?.cards?.collection
              ? [data?.verticalCog?.cog?.firstCard, ...query?.block?.cards?.collection]
              : [data?.createduplicateCardCard?.card]
          }
        }
      })
    }
  })

  const duplicateFromLibrary = async (libraryCard: Card) => {
    if (libraryCard.__typename === 'Card') {
      await duplicateCard({
        variables: {
          duplicateCard: {
            id: libraryCard.id,
            attributes: {
              cardType: libraryCard.cardType,
              blockId: card.blockId,
              parentCardId: card.id
            }
          }
        }
      })
    } else if (libraryCard.__typename === 'Cog') {
      await duplicateCog({
        variables: {
          verticalCog: {
            id: libraryCard.id,
            parentCardId: card.id
          }
        }
      })
    }
  }

  /* disable body scrolling when modal is open */
  useEffect(() => {
    isVisible ? blockScroll() : allowScroll()
  }, [isVisible])

  const handleDuplicateFromLibrary = (libraryCard: Card) => {
    duplicateFromLibrary(libraryCard)
  }

  return (
    <AddLinkModal
      module="select"
      toggleModal={toggleModal}
      onSelect={handleDuplicateFromLibrary}
      isOpen={isVisible}
      title={'Add a link'}
    />
  )
}

export default DuplicateModal
