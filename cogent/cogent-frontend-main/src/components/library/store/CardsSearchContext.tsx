import { useEffect, createContext, ReactElement } from 'react'
import { useQuery } from '@apollo/client'
import { gql } from 'src/__generated__/gql'
import { Card } from 'src/__generated__/graphql'
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

type CardsSearchType = {
  cards: Card[] | undefined
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
  cardCategory: string
  onCardCategoryChange: (value: string) => void
  clearAllFilters: () => void
}

const CardsSearchContext = createContext<CardsSearchType>({
  cards: [],
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
  cardCategory: '',
  onCardCategoryChange: () => {},
  clearAllFilters: () => {}
})

export const SEARCH_CARDS = gql(`
  query cardsSearch($pagination: JSON, $filters: JSON, $order: String) {
    cardsSearch(pagination: $pagination, filters: $filters, order: $order) {
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
        createdAt
        blockId
        audioUrl
        videoUrl
        photoUrl(width: 1000, height: 1000)
        block {
          id
          name
          cogId
        }
      }
    }
  }
`)

export function CardsSearchContextProvider(props: Props): ReactElement {
  const toast = useToast()

  const [limit, setLimit] = useQueryState(
    'cards_per_page',
    parseAsInteger.withDefault(25)
  )

  const [page, setPage] = useQueryState(
    'cards_page',
    parseAsInteger.withDefault(1)
  )

  const [query, setQuery] = useQueryState(
    'query',
    parseAsString.withDefault('')
  )

  const [orderBy, setOrderBy] = useQueryState(
    'cards_order_by',
    parseAsString.withDefault('created_at desc')
  )

  const [cardTypes, setCardTypes] = useQueryState(
    'cards_card_types',
    parseAsArrayOf(parseAsString)
  )

  const [cardCategory, setCardCategory] = useQueryState(
    'cards_category',
    parseAsString.withDefault('')
  )

  const { loading, data } = useQuery(SEARCH_CARDS, {
    variables: {
      pagination: {
        page: page,
        limit: limit
      },
      order: `cards.${orderBy}`,
      filters: {
        query: query,
        card_type: cardTypes,
        card_category: cardCategory || undefined
      }
    },
    onError: (err) => toast.open('error', err.message)
  })

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

  const handleCardCategoryChange = (value: string) => {
    resetPage()
    setCardCategory(value || null)
  }

  const clearAllFilters = () => {
    setOrderBy(null)
    setCardTypes(null)
    setCardCategory(null)
  }

  return (
    <CardsSearchContext.Provider
      value={{
        cards: data?.cardsSearch?.collection,
        limit: limit,
        onLimitChange: handleLimitChange,
        onPageChange: handlePageChange,
        paginationMetadata: data?.cardsSearch?.metadata,
        query: query,
        onQueryChange: handleQueryChange,
        orderBy: orderBy,
        onOrderChange: handleOrderChange,
        cardTypes: cardTypes,
        onCardTypeChange: handleCardTypeChange,
        cardCategory: cardCategory,
        onCardCategoryChange: handleCardCategoryChange,
        clearAllFilters: clearAllFilters
      }}
    >
      {props.children}
    </CardsSearchContext.Provider>
  )
}

export default CardsSearchContext
