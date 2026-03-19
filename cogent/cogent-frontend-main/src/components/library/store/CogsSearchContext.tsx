import { createContext, ReactElement } from 'react'
import { useQuery } from '@apollo/client'
import { gql } from 'src/__generated__/gql'
import {
  LibraryCogSearchQuery,
  LibraryCogSearchQueryVariables,
  Cog
} from 'src/__generated__/graphql'
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

type CogsSearchType = {
  cogs: Cog[] | undefined
  refetchCogs: () => void
  limit: number
  onLimitChange: (value: number) => void
  paginationMetadata: any
  onPageChange: (value: number) => void
  query: string
  onQueryChange: (value: string) => void
  orderBy: string
  onOrderChange: (value: string) => void
  user: string
  onUserChange: (value: string) => void

  clearAllFilters: () => void
}

const CogsSearchContext = createContext<CogsSearchType>({
  cogs: [],
  refetchCogs: () => {},
  limit: 25,
  onLimitChange: () => {},
  paginationMetadata: {},
  onPageChange: () => {},
  query: '',
  onQueryChange: () => {},
  orderBy: 'created_at desc',
  onOrderChange: () => {},
  user: 'ME',
  onUserChange: () => {},
  clearAllFilters: () => {}
})

export const SEARCH_COGS = gql(`
  query libraryCogSearch($pagination: JSON, $filters: JSON, $order: String, $user: UserEnum) {
  cogsMine(
    pagination: $pagination
    filters: $filters
    order: $order
    user: $user
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
      description
      tags
      isPinned
      isPublic
      createdAt
      photoUrl(width: 250, height: 250)
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
  }
}
`)

export function CogsSearchContextProvider(props: Props): ReactElement {
  const toast = useToast()

  const [limit, setLimit] = useQueryState(
    'cogs_per_page',
    parseAsInteger.withDefault(25)
  )

  const [page, setPage] = useQueryState(
    'cogs_page',
    parseAsInteger.withDefault(1)
  )

  const [query, setQuery] = useQueryState(
    'query',
    parseAsString.withDefault('')
  )

  const [orderBy, setOrderBy] = useQueryState(
    'cogs_order_by',
    parseAsString.withDefault('created_at desc')
  )

  const [user, setUser] = useQueryState('user', parseAsString.withDefault('ME'))

  const {
    loading,
    data,
    refetch: refetchCogs
  } = useQuery<LibraryCogSearchQuery, LibraryCogSearchQueryVariables>(
    SEARCH_COGS,
    {
      variables: {
        pagination: {
          page: page,
          limit: limit
        },
        order: `cogs.${orderBy}`,
        filters: {
          query: query,
          user: user
        }
      },
      onError: (err) => toast.open('error', err.message)
    }
  )

  const handlePageChange = (value: number) => {
    setPage(value)
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

  const handleUserChange = (value: string | null) => {
    resetPage()
    setUser(value)
  }

  const handleLimitChange = (value: number) => {
    setLimit(value)
  }

  const clearAllFilters = () => {
    setOrderBy(null)
    setUser(null)
  }

  return (
    <CogsSearchContext.Provider
      value={{
        cogs: data?.cogsMine?.collection,
        refetchCogs: refetchCogs,
        limit: limit,
        onLimitChange: handleLimitChange,
        onPageChange: handlePageChange,
        paginationMetadata: data?.cogsMine.metadata,
        query: query,
        onQueryChange: handleQueryChange,
        orderBy: orderBy,
        onOrderChange: handleOrderChange,
        user: user,
        onUserChange: handleUserChange,
        clearAllFilters: clearAllFilters
      }}
    >
      {props.children}
    </CogsSearchContext.Provider>
  )
}

export default CogsSearchContext
