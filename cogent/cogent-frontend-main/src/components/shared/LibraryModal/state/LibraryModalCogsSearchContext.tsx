import { createContext, ReactElement, useState } from 'react'
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

const LibraryModalCogsSearchContext = createContext<CogsSearchType>({
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
  query libraryModalCogSearch($pagination: JSON, $filters: JSON, $order: String, $user: UserEnum) {
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
          photoUrl(width: 250, height: 250)
        }
        blocks {
          collection {
            id
            name
            position
            createdAt
            cards {
              collection {
                id
                blockId
                name
                cardType
                text
                position
                photoUrl
                videoUrl
                audioUrl
                actions
              }          
            }
          }    
        }
      }
    }
  }
`)

export function LibraryCogsSearchContextProvider(props: Props): ReactElement {
  const toast = useToast()

  const [limit, setLimit] = useState(25)

  const [page, setPage] = useState(1)

  const [query, setQuery] = useState('')

  const [orderBy, setOrderBy] = useState('created_at desc')

  const [user, setUser] = useState('ME')

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

  const handleUserChange = (value: string) => {
    resetPage()
    setUser(value)
  }

  const handleLimitChange = (value: number) => {
    setLimit(value)
    resetPage()
  }

  const clearAllFilters = () => {
    setOrderBy('created_at desc')
  }

  return (
    <LibraryModalCogsSearchContext.Provider
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
    </LibraryModalCogsSearchContext.Provider>
  )
}

export default LibraryModalCogsSearchContext
