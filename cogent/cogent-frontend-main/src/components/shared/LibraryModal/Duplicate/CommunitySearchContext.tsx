import React, { createContext, ReactElement } from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import {
  useQueryState,
  parseAsString,
  parseAsInteger,
  parseAsArrayOf,
} from 'nuqs'; // Assuming 'nuqs' is a utility library for query parameters
import { useToast } from '@/components/shared/Toast'; // Custom hook for toasts

// Define the types for your context
interface Props {
  children?: React.ReactNode;
}

type CommunitySearchType = {
  communityCards: any[] | undefined;
  refetchCards: () => void;
  paginationMetadata: any;
  limit: number;
  onLimitChange: (value: number) => void;
  onPageChange: (value: number) => void;
  query: string;
  onQueryChange: (value: string) => void;
  orderBy: string;
  onOrderChange: (value: string) => void;
  clearAllFilters: () => void;
};

// Create the context with default values
const CommunitySearchContext = createContext<CommunitySearchType>({
  communityCards: [],
  refetchCards: () => {},
  paginationMetadata: {},
  limit: 25,
  onLimitChange: () => {},
  onPageChange: () => {},
  query: '',
  onQueryChange: () => {},
  orderBy: 'created_at desc',
  onOrderChange: () => {},
  clearAllFilters: () => {},
});

// Define the GraphQL query with variables
export const SEARCH_COMMUNITY_CARDS = gql(`
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

// Create the context provider component
export function CommunitySearchContextProvider(props: Props): ReactElement {
  const toast = useToast();

  // Manage state with URL query parameters
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [limit, setLimit] = useQueryState('limit', parseAsInteger.withDefault(25));
  const [query, setQuery] = useQueryState('query', parseAsString.withDefault(''));
  const [orderBy, setOrderBy] = useQueryState('order_by', parseAsString.withDefault('created_at desc'));

  // Fetch data using the updated query
  const { loading, data, refetch: refetchCards } = useQuery(SEARCH_COMMUNITY_CARDS, {
    variables: {
      pagination: {
        page: page,
        limit: limit,
      },
      order: orderBy,
      filters: {
        query: query,
      },
    },
    onError: (err) => toast.open('error', err.message),
  });

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  const handleLimitChange = (value: number) => {
    setLimit(value);
  };

  const resetPage = () => {
    if (page !== 1) {
      setPage(1);
    }
  };

  const handleQueryChange = (value: string) => {
    resetPage();
    setQuery(value);
  };

  const handleOrderChange = (value: string) => {
    resetPage();
    setOrderBy(value);
  };

  const clearAllFilters = () => {
    setQuery('');
    setOrderBy('created_at desc');
    resetPage();
  };

  return (
    <CommunitySearchContext.Provider
      value={{
        communityCards: data?.communityCardsSearch.cards,
        refetchCards: refetchCards,
        onPageChange: handlePageChange,
        limit: limit,
        onLimitChange: handleLimitChange,
        paginationMetadata: data?.communityCardsSearch.metadata,
        query: query,
        onQueryChange: handleQueryChange,
        orderBy: orderBy,
        onOrderChange: handleOrderChange,
        clearAllFilters: clearAllFilters,
      }}
    >
      {props.children}
    </CommunitySearchContext.Provider>
  );
}

export default CommunitySearchContext;
