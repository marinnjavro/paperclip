import React from 'react'
import { Card } from 'src/__generated__/graphql'

import AudioPlayer from '@/components/shared/AudioPlayer'
import Name from '@/components/shared/SmallCard/elements/Name'
import SmallCardNamePlaceholder from '@/components/shared/SmallCard/placeholders/SmallCardNamePlaceholder'
import SmallMediaPlaceholder from '@/components/shared/SmallCard/placeholders/SmallMediaPlaceholder'

const Audio = React.memo(function MultimediaComponent({
  card
}: {
  card: Card
}) {
  return (
    <div className="flex h-full w-full flex-col">
      {!!card.name && <Name card={card} />}
      {!card.name && (
        <div className="mt-3.5">
          <div className="">
            <SmallCardNamePlaceholder />
          </div>
        </div>
      )}
      <div className="flex h-full w-full items-center justify-center overflow-hidden px-4">
        {!!card.audioUrl && (
          <div className="w-full pb-2 sm:h-[90%] sm:pb-0 sm:pt-[30%]">
            <AudioPlayer
              cardId={card.id}
              url={card.audioUrl}
              isDisabled={true}
            />
          </div>
        )}
        {!card.audioUrl && (
          <div className=" flex h-full flex-1 items-center justify-center border-b border-solid border-opacity-silver border-opacity-20 px-4 dark:border-white dark:border-opacity-10">
            <div className="flex flex-1 items-center justify-center">
              <div className="flex w-full flex-1 cursor-pointer  items-center justify-center ">
                <SmallMediaPlaceholder size="small" label="Upload audio" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
})

export default Audio
