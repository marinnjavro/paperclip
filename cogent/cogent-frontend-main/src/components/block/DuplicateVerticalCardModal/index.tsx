import { useEffect } from 'react'
import _ from 'lodash'
import dynamic from 'next/dynamic'
import { useMutation } from '@apollo/client'
import { gql } from 'src/__generated__/gql'
import {
  Card,
  DuplicateCardMutation,
  DuplicateCardMutationVariables
} from 'src/__generated__/graphql'
import { useRouter } from 'next/router'
import { useScrollBlock } from '@/utils/hooks/useScrollBlock'
import { useToast } from '@/components/shared/Toast'
import { useCardContext } from '@/components/block/state/CardContext'
import { FETCH_BLOCK } from '@/pages/cogs/[cogId]/blocks/[blockId]/edit'
import { LibraryContextProvider } from '@/components/library/store/LibraryContext'
import LibraryTab from '@/components/shared/LibraryModal/Duplicate/LibraryTab'

const LibraryModal = dynamic(() => import('@/components/shared/LibraryModal'))

interface CardLinksModalProps {
  isVisible: boolean
  toggleModal: () => void
  formatLink: (cogId: string, verticalCardId: string, blockId: string) => void
}

const DuplicateCardModal: React.FC<CardLinksModalProps> = ({
  isVisible,
  toggleModal,
  formatLink
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
        blockId as string
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

  const duplicateFromLibrary = async (libraryCard: Card) => {
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
  }

  /* disable body scrolling when modal is open */
  useEffect(() => {
    isVisible ? blockScroll() : allowScroll()
  }, [isVisible])

  const handleDuplicateFromLibrary = (libraryCard: Card) => {
    duplicateFromLibrary(libraryCard)
  }

  return (
    <LibraryModal
      module="select"
      selectTarget="card"
      isOpen={isVisible}
      toggleModal={toggleModal}
      onSelect={handleDuplicateFromLibrary}
    />
    // <LibraryContextProvider>
    //   <div className="library-modal-container">
    //     <LibraryTab
    //       module="select"
    //       selectTarget="card"
    //       onSelect={handleDuplicateFromLibrary}
    //       toggleModal={() => {}}
    //     />
    //   </div>
    // </LibraryContextProvider>
  )
}

export default DuplicateCardModal
