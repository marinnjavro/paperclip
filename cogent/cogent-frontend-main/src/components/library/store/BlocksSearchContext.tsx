import { useEffect, useRef, createContext, ReactElement } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { gql } from 'src/__generated__/gql'
import { Block } from 'src/__generated__/graphql'
import {
  useQueryState,
  parseAsArrayOf,
  parseAsString,
  parseAsInteger
} from 'nuqs'
import { useToast } from '@/components/shared/Toast'

interface Props {
  children?: JSX.Element | Array<JSX.Element>
}

type BlocksSearchType = {
  blocks: Block[] | undefined
  paginationMetadata: any
  limit: number
  onLimitChange: (value: number) => void
  onPageChange: (value: number) => void
  query: string
  onQueryChange: (value: string) => void
  orderBy: string
  onOrderChange: (value: string) => void
  cardTypes: string[] | null
  onCardTypeChange: (value: string[] | null) => void
  clearAllFilters: () => void
}

const BlocksSearchContext = createContext<BlocksSearchType>({
  blocks: [],
  paginationMetadata: {},
  limit: 25,
  onLimitChange: () => {},
  onPageChange: () => {},
  query: '',
  onQueryChange: () => {},
  orderBy: 'created_at desc',
  onOrderChange: () => {},
  cardTypes: [],
  onCardTypeChange: () => {},
  clearAllFilters: () => {}
})

export const SEARCH_BLOCKS = gql(`
  query libraryBlockSearch($pagination: JSON, $filters: JSON, $order: String) {
    blocksSearch(
      pagination: $pagination
      filters: $filters
      order: $order
    ) {
      metadata {
        currentPage
        limitValue
        totalCount
        totalPages
      }
      collection {
        id
        name
        createdAt
        cogId
        cog {
          id
          name
        }
        cards(page: 1, limit: 6) {
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
  }
`)

export function BlocksSearchContextProvider(props: Props): ReactElement {
  const toast = useToast()

  const [limit, setLimit] = useQueryState(
    'blocks_per_page',
    parseAsInteger.withDefault(25)
  )

  const [page, setPage] = useQueryState(
    'blocks_page',
    parseAsInteger.withDefault(1)
  )

  const [query, setQuery] = useQueryState(
    'query',
    parseAsString.withDefault('')
  )

  const [orderBy, setOrderBy] = useQueryState(
    'blocks_order_by',
    parseAsString.withDefault('created_at desc')
  )

  const [cardTypes, setCardTypes] = useQueryState(
    'blocks_card_types',
    parseAsArrayOf(parseAsString)
  )

  const { loading, data } = useQuery(SEARCH_BLOCKS, {
    variables: {
      pagination: {
        page: page,
        limit: limit
      },
      order: `blocks.${orderBy}`,
      filters: {
        query: query,
        card_type: cardTypes
      }
    },
    onError: (err) => toast.open('error', err.message)
  })

  const clearAllFilters = () => {
    setOrderBy(null)
    setCardTypes(null)
  }

  const handlePageChange = (value: number) => {
    setPage(value)
  }

  const handleLimitChange = (value: number) => {
    setLimit(value)
  }

  const resetPage = () => {
    if (page !== 1) {
      setPage(1)
    }
  }

  const handleQueryChange = (value: string) => {
    resetPage()
    setQuery(value)
  }

  const handleOrderChange = (value: string) => {
    resetPage()
    setOrderBy(value)
  }

  const handleCardTypeChange = (value: string[] | null) => {
    resetPage()
    setCardTypes(value)
  }

  return (
    <BlocksSearchContext.Provider
      value={{
        blocks: data?.blocksSearch?.collection,
        onPageChange: handlePageChange,
        limit: limit,
        onLimitChange: handleLimitChange,
        paginationMetadata: data?.blocksSearch?.metadata,
        query: query,
        onQueryChange: handleQueryChange,
        orderBy: orderBy,
        onOrderChange: handleOrderChange,
        cardTypes: cardTypes,
        onCardTypeChange: handleCardTypeChange,
        clearAllFilters: clearAllFilters
      }}
    >
      {props.children}
    </BlocksSearchContext.Provider>
  )
}

export default BlocksSearchContext
