import React from 'react'
import { Card } from 'src/__generated__/graphql'
import CardName from '@/components/block/Card/CardContent/elements/CardName'
import VideoPlayer from '@/components/shared/VideoPlayer'
import MediaPlaceholder from '@/components/shared/MediaPlaceholder'
import QuillToolbarPlaceholder from './placeholders/QuillToolbarPlaceholder'
import CardNameInput from '../CardEditor/elements/CardNameInput'
import CardNamePlaceholder from './placeholders/CardNamePlaceholder'

const MultimediaCardContent = React.memo(function VideoComponent({
  card
}: {
  card: Card
}) {
  return (
    <>
      <div className="flex h-full flex-col overflow-hidden">
        {!!card.name && (
          <div className="mx-4 my-5">
            <CardName name={card.name || ''} />
          </div>
        )}
        {!card.name && (
          <div className="relative flex flex-col">
            <div className="mt-5 mb-1.5">
              <CardNamePlaceholder />
            </div>
          </div>
        )}
        <div className="h-full overflow-hidden">
          {!!card.photoUrl && (
            <img
              src={card.photoUrl}
              alt="Card Image"
              draggable={false}
              className="h-full w-full rounded-t-3xl bg-[#565879] object-contain"
            />
          )}
          {!!card.videoUrl && (
            <div className="rounded-el-mask h-full w-full rounded-3xl">
              <VideoPlayer url={card.videoUrl} />
            </div>
          )}
          {!card.photoUrl && !card.videoUrl && (
            <div className="flex h-full flex-1 items-center justify-center">
              <div className="flex h-full w-full flex-1 cursor-pointer items-center justify-center pb-20">
                <MediaPlaceholder size="large" label="Upload photo or video" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
})

export default MultimediaCardContent
