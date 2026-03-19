import React from 'react'
import { Card } from 'src/__generated__/graphql'
import ActionCardContent from '@/components/block/Card/CardContent/ActionCardContent'
import TextCardContent from '@/components/block/Card/CardContent/TextCardContent'
import PhotoTextCardContent from '@/components/block/Card/CardContent/PhotoTextCardContent'
import VideoTextCardContent from '@/components/block/Card/CardContent/VideoTextCardContent'
import AudioCardContent from '@/components/block/Card/CardContent/AudioCardContent'
import MultimediaCardContent from '@/components/block/Card/CardContent/MultimediaCardContent'
import MediaTextCardContent from '@/components/block/Card/CardContent/MediaTextCardContent'

interface CardContentProps {
  card: Card
}

const CardContent: React.FC<CardContentProps> = ({ card }) => {
  // prettier-ignore
  const cardContent: { [key: string]: JSX.Element } = {
    'photo and text': (
      <PhotoTextCardContent card={card} />
    ),
    'video and text': (
      <VideoTextCardContent card={card} />
    ),
    'text': (
      <TextCardContent card={card} />
    ),
    'media and text': (
      <MediaTextCardContent card={card} />
    ),
    'multimedia': (
      <MultimediaCardContent card={card} />
    ),
    'audio': (
      <AudioCardContent card={card} />
      ),
    'action': (
    <ActionCardContent card={card} />
    )
  }

  return (
    <div className="scrollbar--sm h-full overflow-hidden overflow-y-auto break-words">
      {cardContent[card.cardType]}
    </div>
  )
}

export default CardContent
