import React from 'react'
import { Card } from 'src/__generated__/graphql'
import CardName from '@/components/block/Card/CardContent/elements/CardName'
import CardText from '@/components/block/Card/CardContent/elements/CardText'
import CardPhoto from '@/components/block/Card/CardContent/elements/CardPhoto'
import MediaPlaceholder from '@/components/shared/MediaPlaceholder'
import CardNamePlaceholder from './placeholders/CardNamePlaceholder'
import QuillToolbarPlaceholder from './placeholders/QuillToolbarPlaceholder'
import VideoPlayer from '@/components/shared/VideoPlayer'

interface MediaTextCardContentProps {
  card: Card
}

const MediaTextCardContent: React.FC<MediaTextCardContentProps> = ({
  card
}) => {
  return (
    <>
      <div>
        {!!card.photoUrl && <CardPhoto photoUrl={card.photoUrl} />}

        {!!card.videoUrl && (
          <div className="fade-md mb-5 h-[210px] rounded-t-3xl xxs:h-[248.25px]">
            <VideoPlayer url={card.videoUrl} />
          </div>
        )}
        {!card.photoUrl && !card.videoUrl && (
          <div className="mb-4 flex h-full flex-1 items-center justify-center border-b border-solid border-opacity-silver border-opacity-20 dark:border-white dark:border-opacity-10">
            <div className="flex h-full flex-1 items-center justify-center">
              <div className="flex h-full w-full flex-1 cursor-pointer items-center justify-center ">
                <MediaPlaceholder size="small" label="Upload media" />
              </div>
            </div>
          </div>
        )}
      </div>
      {!!card.name && (
        <div className={`mx-4 mb-4`}>
          <div>
            <CardName name={card.name || ''} />
          </div>
        </div>
      )}
      {!card.name && (
        <div className="relative flex flex-col">
          <div className="">
            <CardNamePlaceholder />
          </div>
        </div>
      )}
      {!!card.text && (
        <div
          className={`${
            card.photoUrl || card.videoUrl ? 'mt-2' : 'mt-5'
          } mx-3.5 mb-5`}
        >
          <div className="text-xs leading-relaxed sm:text-sm">
            <CardText text={card.text} />
          </div>
        </div>
      )}
      {!card.text && (
        <div className="flex">
          <div className="flex w-full cursor-pointer flex-col">
            <QuillToolbarPlaceholder />
            <p className="ml-[15px] mt-[3px] text-[14px] italic text-[#606174]">
              Enter Card Text...
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default MediaTextCardContent
