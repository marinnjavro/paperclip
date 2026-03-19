import { createContext, ReactElement } from 'react'
import { useQuery } from '@apollo/client'
import { gql } from 'src/__generated__/gql'
import {
  CommunitySearchQuery,
  CommunitySearchQueryVariables,
  UserEnum,
  Cog
} from 'src/__generated__/graphql'
import {
  useQueryState,
  parseAsString,
  parseAsInteger,
  parseAsArrayOf
} from 'nuqs'
import { useToast } from '@/components/shared/Toast'

interface Props {
  children?: JSX.Element | Array<JSX.Element>
}

type CommunitySearchType = {
  cogs: Cog[] | undefined
  refetchCogs: () => void
  paginationMetadata: any
  limit: number
  onLimitChange: (value: number) => void
  onPageChange: (value: number) => void
  query: string
  onQueryChange: (value: string) => void
  orderBy: string
  onOrderChange: (value: string) => void
  user: string[]
  onUserChange: (value: string[]) => void
  clearAllFilters: () => void
}

const CommunitySearchContext = createContext<CommunitySearchType>({
  cogs: [],
  refetchCogs: () => {},
  paginationMetadata: {},
  limit: 25,
  onLimitChange: () => {},
  onPageChange: () => {},
  query: '',
  onQueryChange: () => {},
  orderBy: 'created_at desc',
  onOrderChange: () => {},
  user: ['ALL'],
  onUserChange: () => {},
  clearAllFilters: () => {}
})

export const SEARCH_COMMUNITY = gql(`
  query communitySearch($pagination: JSON, $filters: JSON, $order: String, $user: UserEnum) {
    cogsSearch(
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
          photoUrl(width: 250, height: 250)
        }
      }
    }
  }
`)

export function CommunitySearchContextProvider(props: Props): ReactElement {
  const toast = useToast()

  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))

  const [limit, setLimit] = useQueryState(
    'cogs_per_page',
    parseAsInteger.withDefault(25)
  )

  const [query, setQuery] = useQueryState(
    'query',
    parseAsString.withDefault('')
  )

  const [orderBy, setOrderBy] = useQueryState(
    'order_by',
    parseAsString.withDefault('created_at desc')
  )

  const [user, setUser] = useQueryState(
    'user',
    parseAsArrayOf(parseAsString).withDefault(['ME'])
  )

  const {
    loading,
    data,
    refetch: refetchCogs
  } = useQuery<CommunitySearchQuery, CommunitySearchQueryVariables>(
    SEARCH_COMMUNITY,
    {
      variables: {
        pagination: {
          page: page,
          limit: limit
        },
        order: !!orderBy ? `cogs.${orderBy}` : '',
        filters: {
          query: query,
          user: 'ALL'
        }
      },
      onError: (err) => toast.open('error', err.message)
    }
  )

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

  const handleUserChange = (value: string[] | null) => {
    resetPage()
    setUser(value)
  }

  const clearAllFilters = () => {
    setOrderBy(null)
  }

  return (
    <CommunitySearchContext.Provider
      value={{
        cogs: data?.cogsSearch.collection,
        refetchCogs: refetchCogs,
        onPageChange: handlePageChange,
        limit: limit,
        onLimitChange: handleLimitChange,
        paginationMetadata: data?.cogsSearch.metadata,
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
    </CommunitySearchContext.Provider>
  )
}

export default CommunitySearchContext
