import React from 'react'
import { Card } from 'src/__generated__/graphql'
import CardName from '@/components/block/Card/CardContent/elements/CardName'

import AudioPlayer from '@/components/shared/AudioPlayer'
import CardNamePlaceholder from './placeholders/CardNamePlaceholder'
import MediaPlaceholder from '@/components/shared/MediaPlaceholder'

const CardAudioContent = React.memo(function AudioComponent({
  card
}: {
  card: Card
}) {
  return (
    <>
      <div className=" pointer-events-none flex h-full flex-col">
        {!!card.name ? (
          <div className="mx-3.5 mt-5 mb-3.5">
            <CardName name={card.name || ''} />
          </div>
        ) : (
          <div className=" flex flex-col">
            <div className="mt-5">
              <CardNamePlaceholder />
            </div>
          </div>
        )}
        {!!card.audioUrl ? (
          <div className="flex h-full w-full items-end justify-end">
            <div className="relative mx-3.5 h-[68%] w-full flex-1">
              <AudioPlayer url={card.audioUrl} cardId={card.id} />
            </div>
          </div>
        ) : (
          <div className="flex h-full w-full items-center pb-20">
            <div className="flex h-full w-full flex-1 cursor-pointer items-center justify-center">
              <MediaPlaceholder size="large" label="Upload audio" />
            </div>
          </div>
        )}
      </div>
    </>
  )
})

export default CardAudioContent
