import { useCallback } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useQuery, gql } from '@apollo/client'
import { useToast } from '@/components/shared/Toast'
import useUrl from '@/utils/hooks/useUrl'

import TopMenu from '@/components/layout/TopMenu'
import BottomMenu from '@/components/layout/BottomMenu'
import FeedGrid from '@/components/feed/FeedGrid'
import ButtonPrimary from '@/components/shared/ButtonPrimary'

const FEED_PAGE_LIMIT = 12

const FEED_QUERY = gql`
  query recommendedFeed($pagination: JSON, $excludeMine: Boolean) {
    recommendedCogs(pagination: $pagination, excludeMine: $excludeMine) {
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
        photoUrl(width: 400, height: 534)
        user {
          id
          name
          photoUrl(width: 100, height: 100)
        }
      }
    }
  }
`

const Feed: NextPage = () => {
  const router = useRouter()
  const toast = useToast()
  const { toCommunity, toLibrary, toMyProfile, toOpenCogGenerator } = useUrl()

  const { data, loading, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      pagination: { page: 1, limit: FEED_PAGE_LIMIT },
      excludeMine: false
    },
    onError: (err: any) => toast.open('error', err.message)
  })

  const cogs = data?.recommendedCogs?.collection ?? []
  const metadata = data?.recommendedCogs?.metadata
  const hasMore = metadata ? metadata.currentPage < metadata.totalPages : false

  const handleLoadMore = useCallback(() => {
    if (!metadata || loading) return

    fetchMore({
      variables: {
        pagination: {
          page: metadata.currentPage + 1,
          limit: FEED_PAGE_LIMIT
        }
      },
      updateQuery: (prev: any, { fetchMoreResult }: any) => {
        if (!fetchMoreResult) return prev
        return {
          recommendedCogs: {
            ...fetchMoreResult.recommendedCogs,
            collection: [
              ...prev.recommendedCogs.collection,
              ...fetchMoreResult.recommendedCogs.collection
            ]
          }
        }
      }
    })
  }, [metadata, loading, fetchMore])

  return (
    <>
      {/* Mobile: clean centered header */}
      <div className="sticky top-0 z-50 flex w-full items-center justify-center border-b border-white/10 bg-night-base-01/90 px-3 py-3 backdrop-blur-xl sm:hidden">
        <h1 className="text-lg font-bold text-white">For You</h1>
      </div>

      {/* Desktop: standard top menu */}
      <div className="hidden sm:block">
        <TopMenu
          buttonsRight={
            <ButtonPrimary
              label="Generate"
              icon="stars"
              iconPosition="right"
              onClick={() => toOpenCogGenerator()}
            />
          }
          handleBackClick={() => router.back()}
        />
      </div>

      {/* Feed content */}
      <section className="pb-24 sm:px-3 sm:pb-10">
        <div className="hidden py-4 sm:block sm:px-3">
          <h1 className="text-xl font-bold text-white">Feed</h1>
        </div>

        <FeedGrid
          cogs={cogs}
          loading={loading}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
        />
      </section>

      <BottomMenu
        buttons={[
          {
            label: 'Feed',
            icon: 'home',
            action: () => router.push('/feed')
          },
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
            label: 'Profile',
            icon: 'profileCircle',
            action: toMyProfile
          }
        ]}
      />
    </>
  )
}

export default Feed
