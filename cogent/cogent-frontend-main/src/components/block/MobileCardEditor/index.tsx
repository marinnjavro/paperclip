import React, { Fragment, useState } from 'react'
import { gql } from 'src/__generated__/gql'
import { Card } from 'src/__generated__/graphql'
import { useMutation } from '@apollo/client'
import { useToast } from '@/components/shared/Toast'
import { useRouter } from 'next/router'
import { CardContext } from '@/components/block/state/CardContext'

import { Dialog, Transition } from '@headlessui/react'
import Icon from '@/components/shared/Icon'
import TextCardInputs from '@/components/block/MobileCardEditor/TextCardInputsMobile'
import MultimediaCardInputs from '@/components/block/MobileCardEditor/MultimediaCardInputsMobile'
import AudioCardInputs from '@/components/block/MobileCardEditor/AudioCardInputsMobile'
import PhotoTextCardInputs from '@/components/block/MobileCardEditor/PhotoTextCardInputsMobile'
import VideoTextCardInputs from '@/components/block/MobileCardEditor/VideoTextCardInputsMobile'
import MediaTextCardInputs from '@/components/block/MobileCardEditor/MediaTextCardInputsMobile'
import ActionCardInputs from '@/components/block/MobileCardEditor/ActionCardInputs'

interface ModalProps {
  open: boolean
  toggleModal: () => void
  card: Card
  verticalCards: Card[]
}

export const fileTypes = {
  image: 'image/png, image/gif, image/jpeg'
}

const MobileCardEditor: React.FC<ModalProps> = ({
  open,
  toggleModal,
  card,
  verticalCards
}) => {
  const router = useRouter()
  const { blockId } = router.query
  const toast = useToast()

  const [isMediaChange, setIsMediaChange] = useState<boolean>(false)
  const [verticalLinkHistory, setVerticalLinkHistory] = useState<string[]>([])

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

  const [updateCard, { loading }] = useMutation(UPDATE_CARD, {
    onError: (err) => {
      toast.open(
        'error',
        'An error occurred while trying to update the Card. Please try again.'
      )
    },
    onCompleted: (data) => {
      if (isMediaChange) return
      toggleModal()
    }
  })

  const updateMobileCard = async (cardInput: any) => {
    setIsMediaChange(false)
    await updateCard({
      variables: {
        updateCard: {
          id: cardInput.id,
          attributes: {
            name: cardInput.name,
            cardType: cardInput.cardType,
            blockId: cardInput.blockId,
            text: cardInput.text,
            actions: cardInput.actions
          }
        }
      }
    })
  }

  const updateCardPhoto = async (cardInput: any, files: FileList) => {
    setIsMediaChange(true)
    await updateCard({
      variables: {
        updateCard: {
          id: cardInput.id,
          attributes: {
            cardType: cardInput.cardType,
            blockId: cardInput.blockId,
            photo: files[0],
            video: null
          }
        }
      }
    })
  }

  const updateCardVideo = async (cardInput: any, files: FileList) => {
    setIsMediaChange(true)
    await updateCard({
      variables: {
        updateCard: {
          id: cardInput.id,
          attributes: {
            cardType: cardInput.cardType,
            blockId: cardInput.blockId,
            photo: null,
            video: files[0]
          }
        }
      }
    })
  }

  const updateCardAudio = async (cardInput: any, files: FileList) => {
    setIsMediaChange(true)
    await updateCard({
      variables: {
        updateCard: {
          id: cardInput.id,
          attributes: {
            cardType: cardInput.cardType,
            blockId: cardInput.blockId,
            audio: files[0]
          }
        }
      }
    })
  }

  const saveToHistory = (id: string) => {
    if (id === verticalLinkHistory[0]) return
    setVerticalLinkHistory([id, ...verticalLinkHistory])
  }

  const removeFromHistory = () => {
    setVerticalLinkHistory(verticalLinkHistory.slice(1))
  }

  // prettier-ignore
  const editorInputs: { [key: string]: JSX.Element } = {
    // 'opening': (
    //   <OpeningCardInputs
    //     user={user}
    //     card={card}
    //     setIsSaving={setIsSaving}
    //     updateCardName={updateCardName}
    //   />
    // ),

    'photo and text': (
      <PhotoTextCardInputs card={card} updateMobileCard={updateMobileCard} updateCardPhoto={updateCardPhoto} loading={loading} />
    ),
    'video and text': (
      <VideoTextCardInputs card={card} updateMobileCard={updateMobileCard} updateCardVideo={updateCardVideo} loading={loading} />
    ),
    'text': <TextCardInputs card={card} updateMobileCard={updateMobileCard} loading={loading} />,
    'media and text': (
      <MediaTextCardInputs card={card} updateMobileCard={updateMobileCard} updateCardPhoto={updateCardPhoto} updateCardVideo={updateCardVideo} loading={loading} />
    ),
    'multimedia': (
      <MultimediaCardInputs
        card={card}
        updateMobileCard={updateMobileCard}
        updateCardPhoto={updateCardPhoto}
        updateCardVideo={updateCardVideo}
        loading={loading}
      />
    ),
    'audio': (
      <AudioCardInputs
        card={card}
        updateMobileCard={updateMobileCard}
        updateCardAudio={updateCardAudio}
        loading={loading}
      />
    ),
    'action': <ActionCardInputs card={card} updateMobileCard={updateMobileCard} updateCardPhoto={updateCardPhoto}
    updateCardVideo={updateCardVideo}
    loading={loading} />
  }

  const renderCardForm = () => <>{editorInputs[card.cardType]}</>

  return (
    <CardContext.Provider
      value={{
        card: card,
        verticalCards: verticalCards,
        saveToHistory: saveToHistory,
        removeFromHistory: removeFromHistory
      }}
    >
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={toggleModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 backdrop-blur-sm transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 h-full">
            <div className=" flex h-[100vh] min-h-full justify-center text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="scrollbar--sm relative inset-0 z-10 flex h-full w-full transform flex-col overflow-hidden overflow-y-auto bg-night-base-01 px-5 pb-4 pt-8 text-left shadow-xl transition-all sm:my-8 sm:max-w-2xl sm:py-10 sm:pl-12 sm:pr-9">
                  <div
                    className="flex-start flex cursor-pointer pb-5"
                    onClick={() => toggleModal()}
                  >
                    <div className="text-white">
                      <Icon type="chevronLeft" width={12} height={12} />
                    </div>
                    <div className="ml-3 text-2xl font-bold leading-6 text-white">
                      Back to card selection
                    </div>
                  </div>
                  <div className="mt-2 flex-1">
                    <div className="flex h-full flex-col gap-5">
                      {!!card && (
                        <div
                          key={`card-inputs-${card.id}`}
                          className="flex h-full w-full flex-col bg-night-base-01"
                        >
                          {renderCardForm()}
                        </div>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </CardContext.Provider>
  )
}

export default MobileCardEditor
