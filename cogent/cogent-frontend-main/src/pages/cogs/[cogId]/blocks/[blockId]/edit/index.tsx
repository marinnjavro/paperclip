import { useState, useEffect, useLayoutEffect } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { useQuery, useMutation } from '@apollo/client'
import { gql } from 'src/__generated__/gql'
import {
  Card,
  BlockQuery,
  BlockQueryVariables,
  DestroyCardMutation,
  DestroyCardMutationVariables,
  ChangePositionCardEditorMutation,
  ChangePositionCardEditorMutationVariables,
  CreateCardMutation,
  CreateCardMutationVariables,
  DuplicateCardMutation,
  DuplicateCardMutationVariables,
  CardTypePaginated,
  LlmGenerateCardMutation,
  LlmGenerateCardMutationVariables,
  LlmGenerateImageMutation,
  LlmGenerateImageMutationVariables
} from 'src/__generated__/graphql'
import { sortByPosition } from '@/utils/functions'
import { useToast } from '@/components/shared/Toast'
import { getOpeningCard } from '@/utils/filterData'
import useLocalStorage from '@/utils/hooks/useLocalStorage'
import useUrl from '@/utils/hooks/useUrl'

import UserRestricted from '@/components/utils/UserRestricted'
import ButtonPrimary from '@/components/shared/ButtonPrimary'
import Spinner from '@/components/shared/Spinner'
import TopMenu from '@/components/layout/TopMenu'
import BottomMenu from '@/components/layout/BottomMenu'
import PageHeading from '@/components/shared/PageHeading'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import SortableCardList from '@/components/block/SortableCardList'
import MobileCardList from '@/components/block/MobileCardList'
import QrCodeModal from '@/components/shared/QrCodeModal'
import { Data } from '@dnd-kit/core'

const Prompt = dynamic(() => import('@/components/shared/Prompt'))

const LibraryModal = dynamic(() => import('@/components/shared/LibraryModal'))

const CardTemplatesModal = dynamic(
  () => import('@/components/shared/CardTemplatesModal')
)

export const FETCH_BLOCK = gql(/* GraphQL */ `
  query block($blockId: ID!) {
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
      cards(page: 1, limit: 100) {
        metadata {
          currentPage
          limitValue
          totalCount
          totalPages
        }
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

export default function Blocks() {
  const router = useRouter()
  const { cogId, blockId } = router.query
  const toast = useToast()

  const [cogentUser] = useLocalStorage('cogentUser', '')

  const { toCommunity, toLibrary, toProfile } = useUrl()

  const [isCardPromptVisible, setIsCardPromptVisible] = useState<boolean>(false)
  const [isTemplatesModalVisible, setIsTemplatesModalVisible] =
    useState<boolean>(false)
  const [isLibraryModalVisible, setIsLibraryModalVisible] =
    useState<boolean>(false)
  const [shouldSkip, setShouldSkip] = useState(true)
  const [isQRModalOpen, setIsQRModalOpen] = useState(false)

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

  useEffect(() => {
    if (!!cogId) {
      setShouldSkip(false)
    }
  }, [cogId])

  const { loading, data } = useQuery<BlockQuery, BlockQueryVariables>(
    FETCH_BLOCK,
    {
      variables: {
        blockId: blockId as string
      },
      onError: (err) => toast.open('error', err.message),
      skip: shouldSkip
    }
  )

  const DESTROY_CARD = gql(/* GraphQL */ `
    mutation destroyCard($destroyCard: DestroyCardInput!) {
      destroyCard(input: $destroyCard) {
        id
        name
        blockId
      }
    }
  `)

  /* delete a card */
  const [destroyCard] = useMutation<
    DestroyCardMutation,
    DestroyCardMutationVariables
  >(DESTROY_CARD, {
    onError: (err) => {
      toast.open(
        'error',
        'An error occurred while trying to delete the Card. Please try again.'
      )
    },
    onCompleted: (data) =>
      toast.open(
        'success',
        `Card ${
          !!data && data?.destroyCard?.name ? `'${data?.destroyCard.name}'` : ''
        } was deleted`
      )
  })

  const deleteCard = async (id: string) => {
    await destroyCard({
      variables: {
        destroyCard: {
          id: id
        }
      },
      update(cache) {
        const normalizedId = cache.identify({ id, __typename: 'Card' })
        cache.evict({ id: normalizedId })
        cache.gc()
      }
    })
  }

  const CHANGE_POSITION_CARD = gql(/* GraphQL */ `
    mutation changePositionCardEditor($inputCard: ChangePositionCardInput!) {
      changePositionCard(input: $inputCard) {
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

  /* change card's position */
  const [changePositionCard] = useMutation<
    ChangePositionCardEditorMutation,
    ChangePositionCardEditorMutationVariables
  >(CHANGE_POSITION_CARD, {
    onError: (err) => {
      toast.open(
        'error',
        'An error occurred while trying to change the Card position. Please try again.'
      )
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

  const updateCardOrder = async (cardId: string, newPosition: number) => {
    if (isNaN(newPosition)) return
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

  /* create card */
  const CREATE_CARD = gql(/* GraphQL */ `
    mutation createCard($inputCard: CreateCardInput!) {
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
    CreateCardMutation,
    CreateCardMutationVariables
  >(CREATE_CARD, {
    onError: (err) => {
      toast.open(
        'error',
        'An error occurred while trying to create a new Card. Please try again.'
      )
    },
    onCompleted: (data) => {
      toggleCardTemplatesModal()
    },
    refetchQueries: [
      {
        query: FETCH_BLOCK,
        variables: {
          blockId: blockId as string
        }
      }
    ]
    // update(cache, { data }) {
    //   const query = cache.readQuery({
    //     query: FETCH_BLOCK,
    //     variables: {
    //       blockId: blockId as string
    //     }
    //   })

    //   cache.writeQuery({
    //     query: FETCH_BLOCK,
    //     variables: {
    //       blockId: blockId as string
    //     },
    //     data: {
    //       block: {
    //         ...query!.block,
    //         cards: !!query?.block?.cards?.collection
    //           ? [data?.createCard?.card, ...query?.block?.cards?.collection]
    //           : [data?.createCard?.card]
    //       }
    //     }
    //   })
    // }
  })

  const createNewCard = (id: string, name: string, type: string) => {
    switch (type) {
      case 'action':
        generateNewActionCard(id)
        break
      case 'opening':
        generateNewOpeningCard(id, name)
        break
      default:
        generateNewCard(id, type)
    }
  }

  const generateNewCard = async (id: string, type: string) => {
    await createCard({
      variables: {
        inputCard: {
          attributes: {
            blockId: id,
            cardType: type
          }
        }
      }
    })
  }

  const generateNewOpeningCard = async (id: string, name: string) => {
    await createCard({
      variables: {
        inputCard: {
          attributes: {
            blockId: id,
            name: name,
            cardType: 'opening'
          }
        }
      }
    })
  }

  const generateNewActionCard = async (id: string) => {
    await createCard({
      variables: {
        inputCard: {
          attributes: {
            blockId: id,
            cardType: 'action'
          }
        }
      }
    })
  }

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
      toggleLibraryModal()
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
              : [data?.duplicateCard?.card]
          }
        }
      })
    }
  })

  const duplicateFromLibrary = async (libraryCard: Card) => {
    if (!data?.block) return
    await duplicateCard({
      variables: {
        duplicateCard: {
          id: libraryCard.id,
          attributes: {
            cardType: libraryCard.cardType,
            blockId: data?.block?.id
          }
        }
      }
    })
  }

  const GENERATE_CARD = gql(`
  mutation llmGenerateCard($inputCard: LlmGenerateCardInput!) {
    llmGenerateCard(input: $inputCard) {
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

  const [generateCard] = useMutation<
    LlmGenerateCardMutation,
    LlmGenerateCardMutationVariables
  >(GENERATE_CARD, {
    onError: (err) => {
      toast.open(
        'error',
        'An error occurred while trying to recreate the card. Please try again.'
      )
    }
    // refetchQueries: [
    //   {
    //     query: FETCH_BLOCK,
    //     variables: {
    //       blockId: blockId as string
    //     }
    //   }
    // ]

    // update(cache, { data }) {
    //   const query = cache.readQuery({
    //     query: FETCH_BLOCK,
    //     variables: {
    //       blockId: blockId as string
    //     }
    //   })

    //   const newCard = data?.llmGenerateCard?.card

    //   const updatedCards = query?.block?.cards?.collection?.map((card: any) => {
    //     if (card!.id === newCard) {
    //       return { ...newCard } // Replace edition with a new value
    //     }
    //     return card
    //   })

    //   cache.modify({
    //     id: cache.identify(newCard),
    //     fields: {
    //       text(cachedText) {
    //         return newCard.text
    //       },
    //       name(cachedName) {
    //         return newCard.name
    //       }
    //     },
    //     broadcast: false // Include this to prevent automatic query refresh
    //   })

    //   // cache.writeQuery({
    //   //   query: FETCH_BLOCK,
    //   //   variables: {
    //   //     blockId: blockId as string
    //   //   },
    //   //   data: {
    //   //     block: {
    //   //       ...query!.block,
    //   //       cards: {
    //   //         metadata: query?.block?.cards?.metadata,
    //   //         collection: updatedCards
    //   //       }
    //   //     }
    //   //   }
    //   // })
    // }

    // refetchQueries: [
    //   {
    //     query: FETCH_BLOCK,
    //     variables: {
    //       blockId: blockId
    //     }
    //   }
    // ]
  })

  const recreateCard = async (card: Card) => {
    toast.open('waiting', 'Card is being recreated.')
    await generateCard({
      variables: {
        inputCard: {
          attributes: {
            cardId: card.id,
            query: card?.text || card?.name || ''
          }
        }
      }
    })
  }

  const GENERATE_IMAGE = gql(`
  mutation llmGenerateImage($input: LlmGenerateImageInput!) {
    llmGenerateImage(input: $input) {
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

  const [generateImage] = useMutation<
    LlmGenerateImageMutation,
    LlmGenerateImageMutationVariables
  >(GENERATE_IMAGE, {
    onSuccess: () => {
      toast.open(
        'success',
        'Image generation is in progress. Please wait a few minutes.'
      )
    },
    onError: (err) => {
      toast.open(
        'error',
        'An error occurred while trying to recreate the card. Please try again.'
      )
    }
  })

  const recreateImage = async (
    id: string,
    query: string,
    generatorType: string
  ) => {
    await generateImage({
      variables: {
        input: {
          attributes: {
            cardId: id,
            query: query,
            generatorType: generatorType
          }
        }
      }
    })
  }

  const toBlocks = () => {
    width < breakpoint
      ? router.push(`/cogs/${cogId}/edit`)
      : router.push({
          pathname: `/cogs/${cogId}/blocks`,
          query: { blockId: blockId }
        })
  }

  const shareCog = () => {
    setIsQRModalOpen(!isQRModalOpen)
  }

  const toggleNewCardPrompt = () => {
    setIsCardPromptVisible(!isCardPromptVisible)
  }

  const toggleCardTemplatesModal = () => {
    setIsTemplatesModalVisible(!isTemplatesModalVisible)
  }

  const toggleLibraryModal = () => {
    setIsLibraryModalVisible(!isLibraryModalVisible)
  }

  const ButtonsRight = (): JSX.Element => (
    <>
      <ButtonPrimary label="Share Cog" icon="cog" onClick={shareCog} />
    </>
  )

  const ButtonsMobile = (): JSX.Element => (
    <>
      <ButtonPrimary
        label="Share Cog"
        icon="cog"
        size="small"
        onClick={() => shareCog()}
      />
    </>
  )

  const handleDuplicateCard = (card: Card) => {
    duplicateFromLibrary(card)
  }

  const handleCreateNewCard = (type: string) => {
    if (!data?.block) return
    createNewCard(data?.block?.id, data?.block?.name, type)
  }

  return (
    !!data?.block?.cog && (
      <UserRestricted cog={data?.block?.cog}>
        <>
          <Prompt
            isOpen={isCardPromptVisible}
            setIsOpen={setIsCardPromptVisible}
            text="Add card"
            actions={[
              {
                text: 'Choose from your library',
                icon: 'multipleFiles',
                function: () => toggleLibraryModal()
              },
              {
                text: 'Create new',
                icon: 'addCircle',
                function: () => toggleCardTemplatesModal()
              }
            ]}
          />

          <QrCodeModal
            setIsModalOpen={setIsQRModalOpen}
            text="Share cog"
            isModalOpen={isQRModalOpen}
            manualCogId={data?.block?.cog?.id}
          />

          {!!data?.block && (
            <CardTemplatesModal
              isOpen={isTemplatesModalVisible}
              toggleModal={toggleCardTemplatesModal}
              showOpeningCard={
                !!data?.block?.cards?.collection
                  ? !getOpeningCard(data?.block?.cards?.collection)
                  : true
              }
              handleTemplateOnClick={handleCreateNewCard}
            />
          )}

          {!!data?.block && (
            <LibraryModal
              module="select"
              selectTarget="card"
              isOpen={isLibraryModalVisible}
              toggleModal={toggleLibraryModal}
              onSelect={handleDuplicateCard}
            />
          )}

          <TopMenu
            buttonsRight={<ButtonsRight />}
            buttonsMobile={<ButtonsMobile />}
            handleBackClick={() => router.back()}
          />

          {loading ? (
            <div className="flex h-[40vh] w-full items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <div className="flex h-full w-full flex-1 flex-col">
              <div className="page-spacing hidden sm:block">
                {!!data?.block && (
                  <Breadcrumbs
                    breadcrumbs={[
                      {
                        label: 'My cogs',
                        path: '/library'
                      },
                      {
                        label: !!data?.block?.cog?.name
                          ? data?.block?.cog?.name
                          : 'Cog',
                        path: `/cogs/${data?.block?.cogId}/edit`
                      },
                      {
                        label: 'Blocks',
                        path:
                          width < breakpoint
                            ? `/cogs/${cogId}/edit`
                            : `/cogs/${cogId}/blocks?blockId=${blockId}`
                      },
                      {
                        label: data?.block.name
                      }
                    ]}
                  />
                )}
              </div>
              <div className="page-spacing relative mt-2 hidden sm:block">
                <PageHeading
                  icon="chevronLeft"
                  label={!!data ? data?.block.name : 'Back'}
                  handleOnClick={() => toBlocks()}
                />
              </div>
              <div className="mt-5 flex h-full w-full flex-1 items-stretch sm:mt-0">
                {width < breakpoint ? (
                  <>
                    {!!data?.block?.cards && (
                      <MobileCardList
                        cog={data?.block?.cog}
                        name={data?.block?.name}
                        cards={sortByPosition(data?.block?.cards?.collection)}
                        updateOrder={updateCardOrder}
                        deleteCard={deleteCard}
                        toggleModal={toggleNewCardPrompt}
                      />
                    )}
                  </>
                ) : (
                  <>
                    {!!data?.block?.cards && (
                      <SortableCardList
                        cog={data?.block?.cog}
                        name={data?.block?.name}
                        items={sortByPosition(data?.block?.cards?.collection)}
                        updateOrder={updateCardOrder}
                        deleteCard={deleteCard}
                        recreateCard={recreateCard}
                        recreateImage={recreateImage}
                        toggleModal={toggleNewCardPrompt}
                      />
                    )}
                  </>
                )}
              </div>
              <BottomMenu
                buttons={[
                  {
                    label: 'Community',
                    icon: 'community',
                    action: toCommunity
                  },
                  {
                    label: 'Library',
                    icon: 'multipleFiles',
                    action: toLibrary
                  },
                  {
                    label: 'Create card',
                    icon: 'addItem',
                    action: () => {}
                  },

                  {
                    label: 'Profile',
                    icon: 'profileCircle',
                    action: () => toProfile(cogentUser?.id)
                  }
                ]}
              />
            </div>
          )}
        </>
      </UserRestricted>
    )
  )
}

// const FocusedCards: React.FC = () => (
//   <div className="flex items-center border-l border-solid border-white border-opacity-10 pl-3 text-lg font-semibold text-white">
//     <div className="mr-2 flex items-center justify-center rounded-lg border border-solid border-day-base-primary bg-day-base-primary text-center">
//       <span className="py-0 px-1.5 text-base">{3}</span>
//     </div>
//     cards out of {data?.block?.cards?.length}
//   </div>
// )
