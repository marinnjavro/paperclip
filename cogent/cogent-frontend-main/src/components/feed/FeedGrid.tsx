import React, { useRef, useEffect, useCallback } from 'react'
import { Cog } from 'src/__generated__/graphql'
import FeedCard from '@/components/feed/FeedCard'
import Spinner from '@/components/shared/Spinner'

interface FeedGridProps {
  cogs: Cog[]
  loading: boolean
  hasMore: boolean
  onLoadMore: () => void
}

const FeedGrid: React.FC<FeedGridProps> = ({
  cogs,
  loading,
  hasMore,
  onLoadMore
}) => {
  const sentinelRef = useRef<HTMLDivElement>(null)

  const handleLoadMore = useCallback(onLoadMore, [onLoadMore])

  useEffect(() => {
    if (!sentinelRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          handleLoadMore()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [hasMore, loading, handleLoadMore])

  if (loading && (!cogs || cogs.length === 0)) {
    return (
      <div className="flex h-[60vh] w-full items-center justify-center">
        <Spinner color="white" />
      </div>
    )
  }

  if (!loading && cogs.length === 0) {
    return (
      <div className="flex h-[40vh] w-full flex-col items-center justify-center gap-2">
        <p className="text-sm text-white/50">No cogs yet</p>
        <p className="text-xs text-white/30">Check back soon!</p>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 sm:gap-2 md:grid-cols-4 lg:grid-cols-5">
        {cogs.map((cog: Cog) => (
          <FeedCard key={cog.id} cog={cog} />
        ))}
      </div>

      {/* Sentinel for infinite scroll */}
      <div ref={sentinelRef} className="h-10 w-full" />

      {loading && hasMore && (
        <div className="flex w-full justify-center py-6">
          <Spinner color="white" />
        </div>
      )}
    </div>
  )
}

export default FeedGrid
