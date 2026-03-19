import React from 'react'
import { Card } from 'src/__generated__/graphql'
import MultimediaSmallCard from '@/components/block/Card/Swapper/SmallCard/MultimediaSmallCard'
import AudioSmallCard from '@/components/block/Card/Swapper/SmallCard/AudioSmallCard'
import TextSmallCard from '@/components/block/Card/Swapper/SmallCard/TextSmallCard'
import PhotoTextSmallCard from '@/components/block/Card/Swapper/SmallCard/PhotoTextSmallCard'
import VideoTextSmallCard from '@/components/block/Card/Swapper/SmallCard/VideoTextSmallCard'
import ActionSmallCard from '@/components/block/Card/Swapper/SmallCard/ActionSmallCard'
import MediaTextSmallCard from '@/components/block/Card/Swapper/SmallCard/MediaTextSmallCard'

interface SmallCardProps {
  index: number
  card: Card
  isDragging: boolean
}

const SmallCard = ({
  card,
  isDragging,
  index
}: SmallCardProps): JSX.Element => {
  // prettier-ignore
  const smallCardContent: { [key: string]: JSX.Element } = {
    'photo and text': (
      <PhotoTextSmallCard
        name={card.name}
        text={card.text}
        photoUrl={card.photoUrl}
      />
    ),
    'video and text': (
      <VideoTextSmallCard
        name={card.name}
        text={card.text}
        videoUrl={card.videoUrl}
      />
    ),
    'text': <TextSmallCard name={card.name} text={card.text} />,
    'media and text': (
      <MediaTextSmallCard
        name={card.name}
        text={card.text}
        photoUrl={card.photoUrl}
        videoUrl={card.videoUrl}
      />
    ),
    'multimedia': (
      <MultimediaSmallCard
        name={card.name}
        videoUrl={card.videoUrl}
        photoUrl={card.photoUrl}
      />
    ),
    'audio': (
      <AudioSmallCard name={card.name} id={card.id} audioUrl={card.audioUrl} />
    ),
    'action': (
      <ActionSmallCard
        name={card.name}
        photoUrl={card.photoUrl}
        videoUrl={card.videoUrl}
        actions={card.actions}
      />
    )
  }

  return (
    <div
      className={`${
        isDragging ? 'shadow-lg' : ''
      } col small-card aspect-ratio--wrapper--9-16 relative w-[14rem] rounded-xl border border-solid border-opacity-silver border-opacity-20 bg-day-base-02 dark:border-white dark:border-opacity-10 dark:bg-night-base-03 sm:rounded-3xl`}
    >
      <div className="aspect-ratio--content">
        <div className="pointer-events-none flex h-full w-full break-words text-[9px] sm:text-sm">
          {smallCardContent[card.cardType]}
        </div>
      </div>
      <div
        className={`${
          isDragging ? 'hidden' : ''
        } absolute left-1/2 -bottom-8 -translate-x-1/2 transform sm:hidden`}
      >
        <div className="w-min min-w-[1rem] rounded-md border-solid bg-day-base-02 bg-opacity-violet bg-opacity-30 dark:border dark:border-night-base-secondary-darker dark:border-opacity-100 dark:bg-night-base-secondary-darker dark:bg-opacity-100">
          <span className="flex text-sm font-semibold  text-support-violet-101 dark:text-night-base-secondary">
            <div className="block w-[1.2rem] w-full rounded-md border-none py-0 px-1 text-center text-[10px] font-bold dark:bg-night-base-secondary-darker">
              {index + 1}
            </div>
          </span>
        </div>
      </div>
    </div>
  )
}

export default SmallCard
