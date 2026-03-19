import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useContext,
  createContext,
  ReactElement
} from 'react'
import { useRouter } from 'next/router'

import { useMutation, useQuery } from '@apollo/client'
import { gql } from 'src/__generated__/gql'
import {
  FetchEditorCogQuery,
  FetchEditorCogQueryVariables,
  CreateBlockMutation,
  CreateBlockMutationVariables,
  DestroyBlockMutation,
  DestroyBlockMutationVariables,
  ChangePositionBlockMutation,
  ChangePositionBlockMutationVariables,
  CreateNewCardMutation,
  CreateNewCardMutationVariables,
  Cog,
  Block
} from 'src/__generated__/graphql'
import { useQueryState, parseAsInteger } from 'nuqs'
import { sortByPosition } from '@/utils/functions'
import useLocalStorage from '@/utils/hooks/useLocalStorage'
import { useToast } from '@/components/shared/Toast'
import useConfirm from '@/components/shared/ConfirmModal/useConfirm'

interface Props {
  children?: JSX.Element | Array<JSX.Element>
}

type BlocksSearchType = {
  loading: boolean
  cog: Cog
  blocks: Block[]
  createBlock: () => void
  deleteBlock: (blockId: string) => void
  updateBlockOrder: (blockId: string, newPosition: number) => void
  paginationMetadata: any
  onPageChange: (value: number) => void
}

const CogContext = createContext<BlocksSearchType>({
  loading: true,
  cog: {},
  createBlock: () => {},
  deleteBlock: () => {},
  updateBlockOrder: () => {},
  blocks: [],
  paginationMetadata: {},
  onPageChange: () => {}
})

export const FETCH_COG = gql(`
  query fetchEditorCog($cogId: ID!, $page: Int) {
    cog(id: $cogId) {
      id
      name
      user {
        id
        name
        email
        roles
        organization {
          id
          name
        }
      }
      blocks(page: $page) {
        collection {
          id
          name
          position
          cogId
          cards {
            collection {
              id
              blockId
              name
              cardType
              text
              position
              photoUrl(width: 250, height: 250)
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

export const CREATE_BLOCK = gql(`
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

const CREATE_CARD = gql(`
  mutation createNewCard($inputCard: CreateCardInput!) {
    createCard(input: $inputCard) {
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

export const DESTROY_BLOCK = gql(`
  mutation destroyBlock($destroyBlock: DestroyBlockInput!) {
    destroyBlock(input: $destroyBlock) {
      id
      name
      cogId
    }
  }
`)

export const CHANGE_POSITION_BLOCK = gql(`
  mutation changePositionBlock($inputBlock: ChangePositionBlockInput!) {
    changePositionBlock(input: $inputBlock) {
      block {
        id
        name
        cogId
        position
      }
    }
  }
`)

export function CogContextProvider(props: Props): ReactElement {
  const router = useRouter()
  const { cogId } = router.query

  const { RenderConfirmModal, requestConfirm } = useConfirm(
    'Delete this block?',
    false
  )

  const toast = useToast()

  const [shouldSkip, setShouldSkip] = useState(true)

  useEffect(() => {
    if (!!cogId) {
      setShouldSkip(false)
    }
  }, [cogId])

  const [page, setPage] = useQueryState(
    'blocks_page',
    parseAsInteger.withDefault(1)
  )

  const { loading, data, refetch } = useQuery<
    FetchEditorCogQuery,
    FetchEditorCogQueryVariables
  >(FETCH_COG, {
    variables: {
      cogId: cogId as string,
      page: page
    },
    onError: (err) => toast.open('error', err.message),
    skip: shouldSkip
  })

  /* create a block */
  const [createNewBlock] = useMutation<
    CreateBlockMutation,
    CreateBlockMutationVariables
  >(CREATE_BLOCK, {
    onError: (err) => {
      toast.open(
        'error',
        'An error occurred while trying to create a new Block. Please try again.'
      )
    },
    onCompleted: (value) => {
      if (!value.createBlock?.block) return
      createOpeningCard(
        value?.createBlock?.block?.id,
        value?.createBlock?.block?.name
      )
      router.push(`/cogs/${cogId}/blocks/${value?.createBlock?.block?.id}/edit`)
    }
  })

  const [createCard] = useMutation<
    CreateNewCardMutation,
    CreateNewCardMutationVariables
  >(CREATE_CARD, {
    onError: (err) => {
      toast.open(
        'error',
        'An error occurred while trying to create a new Card. Please try again.'
      )
    }
  })

  const createOpeningCard = async (id: string, name: string) => {
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

  const createBlock = async () => {
    await createNewBlock({
      variables: {
        inputBlock: {
          attributes: {
            name: `${
              !!data?.cog?.blocks?.collection
                ? `New Block (${data?.cog?.blocks?.collection.length + 1})`
                : 'New Block'
            }`,
            cogId: cogId as string
          }
        }
      }
    })
  }

  /* delete a block */
  const [destroyBlock] = useMutation<
    DestroyBlockMutation,
    DestroyBlockMutationVariables
  >(DESTROY_BLOCK, {
    onError: (err) => {
      toast.open(
        'error',
        'An error occurred while trying to delete the Block. Please try again.'
      )
    },
    onCompleted: (data) =>
      toast.open('success', `Block '${data?.destroyBlock?.name}' was deleted`)
  })

  const deleteBlock = async (id: string) => {
    {
      await requestConfirm()
      await destroyBlock({
        variables: {
          destroyBlock: {
            id: id
          }
        },
        update(cache) {
          const normalizedId = cache.identify({ id, __typename: 'Block' })
          cache.evict({ id: normalizedId })
          cache.gc()
        }
      })
    }
  }

  /* change block position */
  const [changePositionBlock] = useMutation<
    ChangePositionBlockMutation,
    ChangePositionBlockMutationVariables
  >(CHANGE_POSITION_BLOCK, {
    onError: (err) => {
      toast.open(
        'error',
        'An error occurred while trying to change the Block position. Please try again.'
      )
    },
    refetchQueries: [
      {
        query: FETCH_COG,
        variables: {
          cogId: cogId
        }
      }
    ]
  })

  const updateBlockOrder = (blockId: string, newPosition: number) => {
    if (isNaN(newPosition)) return
    changePositionBlock({
      variables: {
        inputBlock: {
          attributes: {
            id: blockId,
            position: newPosition
          }
        }
      }
    })
  }

  const handlePageChange = (value: number) => {
    setPage(value)
  }

  return (
    <CogContext.Provider
      value={{
        loading: loading,
        cog: data?.cog,
        blocks: data?.cog?.blocks?.collection.length
          ? sortByPosition(data?.cog?.blocks?.collection)
          : [],
        createBlock: createBlock,
        deleteBlock: deleteBlock,
        updateBlockOrder: updateBlockOrder,
        onPageChange: handlePageChange,
        paginationMetadata: {} // data?.blocksSearch?.metadata,
      }}
    >
      {props.children}
      {RenderConfirmModal}
    </CogContext.Provider>
  )
}

export default CogContext
