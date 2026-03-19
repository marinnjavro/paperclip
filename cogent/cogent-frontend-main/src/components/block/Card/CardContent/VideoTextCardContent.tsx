import React from 'react'
import { Card } from 'src/__generated__/graphql'
import CardName from '@/components/block/Card/CardContent/elements/CardName'
import CardText from '@/components/block/Card/CardContent/elements/CardText'
import VideoPlayer from '@/components/shared/VideoPlayer'
import MediaPlaceholder from '@/components/shared/MediaPlaceholder'
import CardNamePlaceholder from './placeholders/CardNamePlaceholder'
import QuillToolbarPlaceholder from './placeholders/QuillToolbarPlaceholder'

interface VideoTextCardContentProps {
  card: Card
}

const VideoTextCardContent: React.FC<VideoTextCardContentProps> = ({
  card
}) => {
  return (
    <>
      {!!card.videoUrl && (
        <div className="overflow-hidden">
          <div className="fade h-[210px] rounded-t-3xl xxs:h-[248.25px]">
            <VideoPlayer url={card.videoUrl} />
          </div>
        </div>
      )}
      {!card.videoUrl && (
        <div className="mb-4 flex  flex-1 items-center justify-center border-b border-solid border-opacity-silver border-opacity-20 dark:border-white dark:border-opacity-10">
          <div className="flex h-full w-full flex-1 cursor-pointer items-center justify-center">
            <MediaPlaceholder label="Upload video" />
          </div>
        </div>
      )}
      {!!card.text && (
        <div className={`${card.videoUrl ? 'mt-2' : 'mt-5'} mx-3.5 mb-5`}>
          <div className="mb-3">
            <CardName name={card.name || ''} />
          </div>
          <div className="text-sm leading-relaxed">
            <CardText text={card.text} />
          </div>
        </div>
      )}
      {!card.name && !card.videoUrl && !card.text && (
        <div className="relative flex flex-col">
          <div className="">
            <CardNamePlaceholder />
          </div>
        </div>
      )}
      {!card.text && (
        <div className="flex h-full">
          <div className="flex h-full w-full cursor-pointer flex-col  pb-20">
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

export default VideoTextCardContent
