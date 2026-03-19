import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import dynamic from 'next/dynamic'
import { gql } from 'src/__generated__/gql'
import {
  CreateVerticalCardMutation,
  CreateVerticalCardMutationVariables
} from 'src/__generated__/graphql'
import { useToast } from '@/components/shared/Toast'
import { useCardContext } from '@/components/block/state/CardContext'
import { FETCH_BLOCK } from '@/pages/cogs/[cogId]/blocks/[blockId]/edit'

const CardTemplatesModal = dynamic(
  () => import('@/components/shared/CardTemplatesModal')
)

interface NewVerticalCardModalProps {
  isVisible: boolean
  toggleModal: () => void
  formatLink: (cogId: string, cardId: string, blockId: string) => void
}

const NewVerticalCardModal: React.FC<NewVerticalCardModalProps> = ({
  isVisible,
  toggleModal,
  formatLink
}) => {
  const router = useRouter()
  const { cogId, blockId } = router.query
  const toast = useToast()
  const { card } = useCardContext()

  /* create card */
  const CREATE_VERTICAL_CARD = gql(/* GraphQL */ `
    mutation createVerticalCard($inputCard: CreateCardInput!) {
      createCard(input: $inputCard) {
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

  const [createCard] = useMutation<
    CreateVerticalCardMutation,
    CreateVerticalCardMutationVariables
  >(CREATE_VERTICAL_CARD, {
    onError: (err) => {
      toast.open(
        'error',
        'An error occurred while trying to create a new Card. Please try again.'
      )
    },
    onCompleted: (data) => {
      formatLink(
        cogId as string,
        data.createCard?.card?.id as string,
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
              ? [data?.createCard?.card, ...query?.block?.cards?.collection]
              : [data?.createCard?.card]
          }
        }
      })
    }
  })

  const createVerticalCard = (type: string) => {
    switch (type) {
      case 'action':
        generateNewActionCard()
        break
      default:
        generateNewCard(type)
    }
  }

  const generateNewCard = async (type: string) => {
    await createCard({
      variables: {
        inputCard: {
          attributes: {
            blockId: blockId as string,
            parentCardId: card.id,
            cardType: type
          }
        }
      }
    })
  }

  const generateNewActionCard = async () => {
    await createCard({
      variables: {
        inputCard: {
          attributes: {
            blockId: blockId as string,
            parentCardId: card.id,
            cardType: 'action'
          }
        }
      }
    })
  }

  const handleCreateNew = (type: string) => {
    createVerticalCard(type)
  }

  return (
    <CardTemplatesModal
      isOpen={isVisible}
      toggleModal={toggleModal}
      showOpeningCard={false}
      handleTemplateOnClick={handleCreateNew}
    />
  )
}

export default NewVerticalCardModal
