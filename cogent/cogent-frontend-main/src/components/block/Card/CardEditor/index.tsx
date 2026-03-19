import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { gql } from 'src/__generated__/gql'
import { Card, User } from 'src/__generated__/graphql'
import { useToast } from '@/components/shared/Toast'
import OpeningCardInputs from '@/components/block/Card/CardEditor/OpeningCardInputs'
import TextCardInputs from '@/components/block/Card/CardEditor/TextCardInputs'
import PhotoTextCardInputs from '@/components/block/Card/CardEditor/PhotoTextCardInputs'
import VideoTextCardInputs from '@/components/block/Card/CardEditor/VideoTextCardInputs'
import MultimediaCardInputs from '@/components/block/Card/CardEditor/MultimediaCardInputs'
import AudioCardInputs from '@/components/block/Card/CardEditor/AudioCardInputs'
import ActionCardInputs from '@/components/block/Card/CardEditor/ActionCardInputs'
import MediaTextCardInputs from '@/components/block/Card/CardEditor/MediaTextCardInputs'

export interface CardEditorInputProps {
  isHorizontal: boolean
  card: Card
  user?: User
  setIsSaving: (value: boolean) => void
  updateCardName: (name: string) => void
  updateCardText?: (text: string) => void
}

export const fileTypes = {
  image: 'image/png, image/gif, image/jpeg',
  video: 'video/mp4, video/x-m4v, video/mov, video/quicktime, video/*',
  audio: 'audio/*'
}

interface CardEditorProps {
  card: Card
  user?: User | undefined | null
  setIsSaving: (value: boolean) => void
  isHorizontal?: boolean
}

const CardEditor: React.FC<CardEditorProps> = ({
  card,
  user,
  setIsSaving,
  isHorizontal = true
}) => {
  const router = useRouter()
  const { blockId } = router.query
  const toast = useToast()

  const FETCH_BLOCK = gql(/* GraphQL */ `
    query editorBlock($blockId: ID!) {
      block(id: $blockId) {
        id
        name
        position
        cogId
        cog {
          id
          name
          user {
            id
            name
            email
            roles
            photoUrl(width: 1000, height: 1000)
            organization {
              id
              name
            }
          }
        }
        cards {
          collection {
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
    }
  `)

  const UPDATE_CARD = gql(`
    mutation updateCard($updateCard: UpdateCardInput!) {
      updateCard(input: $updateCard) {
        card {
          id
          name
          blockId
          cardType
          text
          photoUrl(width: 1000, height: 1000)
          videoUrl
          audioUrl
          actions
        }
      }
    }
  `)

  const [updateCard] = useMutation(UPDATE_CARD, {
    onError: (err) => {
      toast.open(
        'error',
        'An error occurred while trying to update the Card. Please try again.'
      )
      setIsSaving(false)
    },
    onCompleted: (data) => {
      setIsSaving(false)
    },
    refetchQueries: [
      {
        query: FETCH_BLOCK,
        variables: {
          blockId: blockId
        }
      }
    ]
  })

  const updateCardName = async (name: string) => {
    await updateCard({
      variables: {
        updateCard: {
          id: card.id,
          attributes: {
            name: name,
            cardType: card.cardType,
            blockId: card.blockId
          }
        }
      }
    })
  }

  const updateCardText = async (text: string) => {
    await updateCard({
      variables: {
        updateCard: {
          id: card.id,
          attributes: {
            name: card.name,
            cardType: card.cardType,
            blockId: blockId as string,
            text: text
          }
        }
      }
    })
  }

  const updateCardPhoto = async (files: FileList) => {
    await updateCard({
      variables: {
        updateCard: {
          id: card.id,
          attributes: {
            name: card.name,
            cardType: card.cardType,
            blockId: card.blockId,
            video: null,
            photo: files[0]
          }
        }
      }
    })
  }

  const updateCardVideo = async (files: FileList) => {
    await updateCard({
      variables: {
        updateCard: {
          id: card.id,
          attributes: {
            name: card.name,
            cardType: card.cardType,
            blockId: card.blockId,
            video: files[0],
            photo: null
          }
        }
      }
    })
  }

  const updateCardAudio = async (files: FileList) => {
    await updateCard({
      variables: {
        updateCard: {
          id: card.id,
          attributes: {
            name: card.name,
            cardType: card.cardType,
            blockId: card.blockId,
            video: null,
            photo: null,
            audio: files[0]
          }
        }
      }
    })
  }

  const updateCardActions = async (updatedOptions: string) => {
    await updateCard({
      variables: {
        updateCard: {
          id: card.id,
          attributes: {
            name: card.name,
            cardType: card.cardType,
            blockId: card.blockId,
            actions: updatedOptions
          }
        }
      }
    })
  }

  // prettier-ignore
  const editorInputs: { [key: string]: JSX.Element } = {
    'opening': (
      <OpeningCardInputs
        user={user}
        card={card}
        setIsSaving={setIsSaving}
        updateCardName={updateCardName} 
      />
    ),
    'media and text': (
      <MediaTextCardInputs
        card={card}
        setIsSaving={setIsSaving}
        updateCardName={updateCardName}
        updateCardText={updateCardText}
        updateCardPhoto={updateCardPhoto}
        updateCardVideo={updateCardVideo}
        isHorizontal={isHorizontal}
      />
    ),
    'photo and text': (
      <PhotoTextCardInputs
        card={card}
        setIsSaving={setIsSaving}
        updateCardName={updateCardName}
        updateCardText={updateCardText}
        updateCardPhoto={updateCardPhoto}
        isHorizontal={isHorizontal}
      />
    ),
    'video and text': (
      <VideoTextCardInputs
        card={card}
        setIsSaving={setIsSaving}
        updateCardName={updateCardName}
        updateCardText={updateCardText}
        updateCardVideo={updateCardVideo}
        isHorizontal={isHorizontal}
      />
    ),
    'text': (
      <TextCardInputs
        card={card}
        setIsSaving={setIsSaving}
        updateCardName={updateCardName}
        updateCardText={updateCardText}
        isHorizontal={isHorizontal}
      />
    ),
    'multimedia': (
      <MultimediaCardInputs
        card={card}
        setIsSaving={setIsSaving}
        updateCardName={updateCardName}
        updateCardPhoto={updateCardPhoto}
        updateCardVideo={updateCardVideo}
      />
    ),
    'audio': (
      <AudioCardInputs
        card={card}
        setIsSaving={setIsSaving}
        updateCardName={updateCardName}
        updateCardAudio={updateCardAudio}
      />
    ),
    'action': (
      <ActionCardInputs
        card={card}
        setIsSaving={setIsSaving}
        updateCardName={updateCardName}
        updateCardActions={updateCardActions}
        updateCardPhoto={updateCardPhoto}
        updateCardVideo={updateCardVideo}
        updateCardText={updateCardText}
        isHorizontal={isHorizontal}
      />
    )
  }

  const renderCardForm = () => <>{editorInputs[card.cardType]}</>

  return (
    <div className="scrollbar--sm h-full overflow-hidden overflow-y-auto">
      {renderCardForm()}
    </div>
  )
}

export default CardEditor
