import React, { createContext, ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Block, Card, Cog } from 'src/__generated__/graphql'
import { useQuery, useMutation } from '@apollo/client'
import { gql } from 'src/__generated__/gql'
import {
  CogQuery,
  CogQueryVariables,
  CreateBlockMutation,
  CreateBlockMutationVariables,
  UpdateBlockMutation,
  UpdateBlockMutationVariables,
  CreateCardBlocksMutation,
  CreateCardBlocksMutationVariables,
  DuplicateCardMutation,
  DuplicateCardMutationVariables,
  ChangePositionCardMutation,
  ChangePositionCardMutationVariables
} from 'src/__generated__/graphql'
import { useToast } from '@/components/shared/Toast'
import useLocalStorage from '@/utils/hooks/useLocalStorage'

const FETCH_COG = gql(`
  query editorCog($cogId: ID!) {
    cog(id: $cogId) {
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
              photoUrl(width: 300, height: 300)
              videoUrl
              audioUrl
              actions
            }
          }
        }
      }
    }
  }
`)

const CREATE_BLOCK = gql(/* GraphQL */ `
  mutation createBlock($inputBlock: CreateBlockInput!) {
    createBlock(input: $inputBlock) {
      block {
        id
        name
        cogId
      }
    }
  }
`)

const CREATE_CARD = gql(/* GraphQL */ `
  mutation createCardBlocks($inputCard: CreateCardInput!) {
    createCard(input: $inputCard) {
      card {
        id
        name
        blockId
        cardType
        text
        photoUrl(width: 300, height: 300)
        videoUrl
        audioUrl
        actions
      }
    }
  }
`)

const UPDATE_BLOCK_NAME = gql(`
  mutation updateBlock($updateBlock: UpdateBlockInput!) {
    updateBlock(input: $updateBlock) {
      block {
        id
        name
        cards {
          collection {
            blockId
            id
            cardType
          }
        }
      }
    }
  }
`)

const UPDATE_OPENING_CARD = gql(/* GraphQL */ `
  mutation updateOpeningCard($updateCard: UpdateCardInput!) {
    updateCard(input: $updateCard) {
      card {
        id
        name
      }
    }
  }
`)

const CHANGE_CARD_POSITION = gql(/* GraphQL */ `
  mutation changePositionCard($inputCard: ChangePositionCardInput!) {
    changePositionCard(input: $inputCard) {
      card {
        id
        name
        blockId
        cardType
        text
        photoUrl(width: 300, height: 300)
        videoUrl
        audioUrl
        actions
      }
    }
  }
`)

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

interface Props {
  children?: JSX.Element | Array<JSX.Element>
}

type EditorBlocksType = {
  loading: boolean
  cog: Cog | undefined
  blocks: Block[]
  onBlockClick: (block: Block, isFocused: boolean) => void
  activeBlock: Block | null | undefined
  createBlock: (name?: string) => void
  renameBlock: (name: string) => void
  updateCardOrder: (cardId: string, newPosition: number) => void
  createCard: (type: string) => void
  duplicateCard: (card: Card) => void
  addCardToCog: (card: Card, blockId: string) => void
  isMassEditing: boolean
  setIsMassEditing: (value: boolean) => void
}

const EditorBlocksContext = createContext<EditorBlocksType>({
  loading: true,
  cog: undefined,
  blocks: [],
  onBlockClick: () => {},
  activeBlock: null,
  createBlock: () => {},
  renameBlock: () => {},
  updateCardOrder: () => {},
  createCard: () => {},
  duplicateCard: () => {},
  addCardToCog: () => {},
  isMassEditing: false,
  setIsMassEditing: () => {}
})

interface Props {
  children?: JSX.Element | Array<JSX.Element>
}

export function EditorBlocksContextProvider(props: Props): ReactElement {
  const router = useRouter()
  const { cogId, blockId } = router.query
  const toast = useToast()

  const [cogentUser] = useLocalStorage('cogentUser', '')
  const [shouldSkip, setShouldSkip] = useState(true)
  const [activeBlock, setActiveBlock] = useState<Block | null | undefined>(null)

  const [isMassEditing, setIsMassEditing] = useState<boolean>(false)

  useEffect(() => {
    if (!!cogId) {
      setShouldSkip(false)
    }
  }, [cogId])

  /* fetch cog */
  const { data, loading } = useQuery<CogQuery, CogQueryVariables>(FETCH_COG, {
    variables: {
      cogId: cogId as string
    },
    onError: (err) => toast.open('error', err.message),
    onCompleted: (data) => {
      if (!data?.cog?.blocks) return
      setBlockAsActive(data?.cog?.blocks?.collection)
    },
    skip: shouldSkip
  })

  /* create a new block */
  const [createBlock] = useMutation<
    CreateBlockMutation,
    CreateBlockMutationVariables
  >(CREATE_BLOCK, {
    onError: (err) => {
      toast.open(
        'error',
        'An error occurred while trying to create a new Block. Please try again.'
      )
    },
    onCompleted: async (value) => {
      if (!value.createBlock?.block) return
      await generateNewOpeningCard(
        value?.createBlock?.block?.id,
        value?.createBlock?.block?.name
      )
      router.push(`/cogs/${cogId}/blocks/${value?.createBlock?.block?.id}/edit`)
    }
  })

  const handleCreateBlock = async (name?: string) => {
    const generatedName = !!data?.cog?.blocks
      ? `New Block (${data?.cog?.blocks?.collection.length + 1})`
      : 'New Block'
    const blockName = name ? name : generatedName

    await createBlock({
      variables: {
        inputBlock: {
          attributes: {
            name: blockName,
            cogId: cogId as string
          }
        }
      }
    })
  }

  /* update block */
  const [updateBlock] = useMutation<
    UpdateBlockMutation,
    UpdateBlockMutationVariables
  >(UPDATE_BLOCK_NAME, {
    onError: (err) => {
      toast.open(
        'error',
        'An error occurred while trying to create a rename the Block. Please try again.'
      )
    },
    onCompleted: (data) => {
      toast.open(
        'success',
        `The Block was renamed to '${data?.updateBlock?.block.name}'`
      )
      if (!data?.updateBlock?.block?.cards?.collection) return
      const openingCard = data?.updateBlock?.block?.cards.collection.find(
        (card) => card.cardType === 'opening'
      )
      if (!!openingCard) {
        updateCardName(openingCard, data?.updateBlock?.block.name)
      }
    }
  })

  const renameBlock = async (name: string) => {
    if (!activeBlock) return
    await updateBlock({
      variables: {
        updateBlock: {
          id: activeBlock.id,
          attributes: {
            name: name,
            cogId: cogId as string
          }
        }
      }
    })
  }

  /* update opening card name */
  const [updateOpeningCard] = useMutation(UPDATE_OPENING_CARD, {
    onError: (err) => {
      toast.open(
        'error',
        'An error occurred while trying to update the Card. Please try again.'
      )
    }
  })

  const updateCardName = async (card: Card, name: string) => {
    await updateOpeningCard({
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

  /* create card */
  const [createCard] = useMutation<
    CreateCardBlocksMutation,
    CreateCardBlocksMutationVariables
  >(CREATE_CARD, {
    onError: (err) => {
      toast.open(
        'error',
        'An error occurred while trying to create a new Card. Please try again.'
      )
    },
    onCompleted: (data) => {
      router.push({
        pathname: `/cogs/${cogId}/blocks/${data?.createCard?.card?.blockId}/edit`,
        query: { focusedCard: data?.createCard?.card.id }
      })
    }
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
  const [duplicateCard] = useMutation<
    DuplicateCardMutation,
    DuplicateCardMutationVariables
  >(DUPLICATE_CARD, {
    onError: (err) => toast.open('error', err.message),
    onCompleted: (data) => {
      router.push({
        pathname: `/cogs/${cogId}/blocks/${data?.duplicateCard?.card?.blockId}/edit`,
        query: { focusedCard: data?.duplicateCard?.card?.id }
      })
    },
    refetchQueries: [
      {
        query: FETCH_COG,
        variables: { cogId: cogId }
      }
    ]
  })

  const [duplicateIntoBlock] = useMutation<
    DuplicateCardMutation,
    DuplicateCardMutationVariables
  >(DUPLICATE_CARD, {
    onError: (err) => toast.open('error', err.message),
    onCompleted: (data) => {
      toast.open(
        'success',
        `Card '${data.duplicateCard?.card?.name}' was added to the cog successfully!`
      )
    },
    refetchQueries: [
      {
        query: FETCH_COG,
        variables: { cogId: cogId }
      }
    ]
  })

  const duplicateFromLibrary = async (libraryCard: Card) => {
    if (!activeBlock) return
    await duplicateCard({
      variables: {
        duplicateCard: {
          id: libraryCard.id,
          attributes: {
            cardType: libraryCard.cardType,
            blockId: activeBlock.id
          }
        }
      }
    })
  }

  const handleAddCardToCog = async (card: Card, blockId: string) => {
    await duplicateIntoBlock({
      variables: {
        duplicateCard: {
          id: card.id,
          attributes: {
            cardType: card.cardType,
            blockId: blockId
          }
        }
      }
    })
  }

  /* change card position */
  const [changePositionCard] = useMutation<
    ChangePositionCardMutation,
    ChangePositionCardMutationVariables
  >(CHANGE_CARD_POSITION, {
    onError: (err) => {
      toast.open(
        'error',
        'An error occurred while trying to change the Card position. Please try again.'
      )
    },
    refetchQueries: [{ query: FETCH_COG, variables: { cogId: cogId } }]
  })

  const handleUpdateCardOrder = async (cardId: string, newPosition: number) => {
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

  const setBlockAsActive = (blocks: Block[]) => {
    const block = blocks.find((item) => item.id === blockId)
    setActiveBlock(block)
  }

  const zoomIn = () => {
    if (!activeBlock || !!isMassEditing) return
    router.push(`/cogs/${cogId}/blocks/${activeBlock?.id}/edit`)
  }

  const handleBlockOnClick = (block: Block, isFocused: boolean) => {
    if (isFocused) {
      zoomIn()
    } else {
      setActiveBlock(block)
    }
  }

  const handleCreateCard = (type: string) => {
    if (!activeBlock) return
    createNewCard(activeBlock?.id, activeBlock?.name, type)
  }

  const handleDuplicateCard = (card: Card) => {
    duplicateFromLibrary(card)
  }

  return (
    <EditorBlocksContext.Provider
      value={{
        cog: data?.cog,
        loading: loading,
        blocks: data?.cog?.blocks?.collection.length
          ? data?.cog?.blocks?.collection
          : [],
        renameBlock: renameBlock,
        onBlockClick: handleBlockOnClick,
        activeBlock: activeBlock,
        createBlock: handleCreateBlock,
        updateCardOrder: handleUpdateCardOrder,
        createCard: handleCreateCard,
        duplicateCard: handleDuplicateCard,
        addCardToCog: handleAddCardToCog,
        isMassEditing: isMassEditing,
        setIsMassEditing: setIsMassEditing
      }}
    >
      {props.children}
    </EditorBlocksContext.Provider>
  )
}

export default EditorBlocksContext
