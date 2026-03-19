import React from 'react'
import { useRouter } from 'next/router'
import { Cog } from 'src/__generated__/graphql'

interface FeedCardProps {
  cog: Cog
}

const FeedCard: React.FC<FeedCardProps> = ({ cog }) => {
  const router = useRouter()

  return (
    <div
      className="relative aspect-[3/4] w-full cursor-pointer overflow-hidden rounded-lg active:opacity-80"
      onClick={() => router.push(`/cogs/${cog.id}`)}
    >
      {/* Cover image or gradient fallback */}
      {cog.photoUrl ? (
        <img
          src={cog.photoUrl}
          alt={cog.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-day-base-primary to-night-base-05 p-4">
          <span className="text-center text-sm font-bold text-white/60">
            {cog.name}
          </span>
        </div>
      )}

      {/* Bottom gradient overlay */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-2 pb-2 pt-8">
        <h3 className="line-clamp-2 text-xs font-bold leading-tight text-white">
          {cog.name}
        </h3>
        {cog.user?.name && (
          <p className="mt-0.5 line-clamp-1 text-xxs text-white/70">
            {cog.user.name}
          </p>
        )}
      </div>
    </div>
  )
}

export default FeedCard
