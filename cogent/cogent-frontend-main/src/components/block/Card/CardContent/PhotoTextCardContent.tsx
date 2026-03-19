import React from 'react'
import { Card } from 'src/__generated__/graphql'
import CardName from '@/components/block/Card/CardContent/elements/CardName'
import CardText from '@/components/block/Card/CardContent/elements/CardText'
import CardPhoto from '@/components/block/Card/CardContent/elements/CardPhoto'
import MediaPlaceholder from '@/components/shared/MediaPlaceholder'
import CardNamePlaceholder from './placeholders/CardNamePlaceholder'
import QuillToolbarPlaceholder from './placeholders/QuillToolbarPlaceholder'

interface PhotoTextCardContentProps {
  card: Card
}

const PhotoTextCardContent: React.FC<PhotoTextCardContentProps> = ({
  card
}) => {
  return (
    <>
      <div>
        {!!card.photoUrl && <CardPhoto photoUrl={card.photoUrl} />}
        {!card.photoUrl && (
          <div className="mb-4 flex h-full flex-1 items-center justify-center border-b border-solid border-opacity-silver border-opacity-20 dark:border-white dark:border-opacity-10">
            <div className="flex h-full w-full flex-1 cursor-pointer items-center justify-center">
              <MediaPlaceholder label="Upload photo" />
            </div>
          </div>
        )}
      </div>
      {!!card.name && (
        <div className={`${card.photoUrl ? 'mt-2' : 'mt-5'} mx-3.5 mb-5`}>
          <div className="mb-3">
            <CardName name={card.name || ''} />
          </div>
        </div>
      )}
      {!card.name && !card.photoUrl && !card.text && (
        <div className="relative flex flex-col">
          <div className="">
            <CardNamePlaceholder />
          </div>
        </div>
      )}
      {!!card.text && (
        <div className={`${card.photoUrl ? 'mt-2' : 'mt-5'} mx-3.5 mb-5`}>
          <div className="text-sm leading-relaxed">
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

export default PhotoTextCardContent
