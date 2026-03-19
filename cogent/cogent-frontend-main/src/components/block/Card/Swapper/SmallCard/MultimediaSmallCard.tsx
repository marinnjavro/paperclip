import React from 'react'
import SmallCardName from '@/components/block/Card/Swapper/SmallCard/elements/SmallCardName'
import SmallCardMedia from '@/components/block/Card/Swapper/SmallCard/elements/SmallCardMedia'

const MultimediaSmallCard = React.memo(function MultimediaComponent({
  name,
  videoUrl,
  photoUrl
}: {
  name: string | undefined | null
  videoUrl?: string | undefined | null
  photoUrl?: string | undefined | null
}) {
  return (
    <div className="flex h-full w-full flex-col">
      {!!name && (
        <div className="pt-3 pb-4">
          <SmallCardName name={name} truncate={true} />
        </div>
      )}
      <div className="flex h-full overflow-hidden">
        {!!photoUrl && <SmallCardMedia photoUrl={photoUrl} />}
        {!!videoUrl && <SmallCardMedia videoUrl={videoUrl} />}
      </div>
    </div>
  )
})

export default MultimediaSmallCard
