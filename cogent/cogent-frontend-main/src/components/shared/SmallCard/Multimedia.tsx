import React from 'react'
import { Card } from 'src/__generated__/graphql'

import CardMedia from '@/components/shared/SmallCard/elements/Media'
import Name from '@/components/shared/SmallCard/elements/Name'
import SmallCardNamePlaceholder from '@/components/shared/SmallCard/placeholders/SmallCardNamePlaceholder'
import SmallMediaPlaceholder from '@/components/shared/SmallCard/placeholders/SmallMediaPlaceholder'

const Multimedia = React.memo(function MultimediaComponent({
  card
}: {
  card: Card
}) {
  return (
    <div className="flex h-full w-full flex-col">
      {!!card.name && (
        <div className="pb-3">
          <Name card={card} />
        </div>
      )}
      {!card.name && (
        <div className="mt-3.5">
          <div className="">
            <SmallCardNamePlaceholder />
          </div>
        </div>
      )}
      <div className="relative flex h-full w-full overflow-hidden rounded-t-2xl">
        {!!card.photoUrl && (
          <CardMedia photoUrl={card.photoUrl} isFullHeight={true} />
        )}

        {!!card.videoUrl && (
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 z-10 h-full"
          >
            <div className="flex h-full items-end justify-end">
              <div className="fade-t h-44 w-full bg-[#f1f5fb] dark:bg-[#2b2c3e]"></div>
            </div>
          </div>
        )}
        {!!card.videoUrl && (
          <CardMedia videoUrl={card.videoUrl} isFullHeight={true} />
        )}
        {!card.photoUrl && !card.videoUrl && (
          <div className=" flex h-full flex-1 items-center justify-center px-4">
            <div className="flex flex-1 items-center justify-center">
              <div className="flex w-full flex-1 cursor-pointer items-center justify-center ">
                <SmallMediaPlaceholder
                  size="small"
                  label="Upload photo / video"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
})

export default Multimedia
