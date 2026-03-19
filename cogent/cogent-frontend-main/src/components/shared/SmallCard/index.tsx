import React from 'react'
import { Card } from 'src/__generated__/graphql'

import MediaAndText from '@/components/shared/SmallCard/MediaAndText'
import Quiz from '@/components/shared/SmallCard/Quiz'
import Audio from '@/components/shared/SmallCard/Audio'
import Multimedia from '@/components/shared/SmallCard/Multimedia'

interface SmallCardProps {
  index?: number
  card: Card
  hoverable?: boolean
}

const SmallCard = ({
  card,
  index,
  hoverable = true
}: SmallCardProps): JSX.Element => {
  // prettier-ignore
  const smallCardContent: { [key: string]: JSX.Element } = {
    'media and text': (
      <MediaAndText
        card={card}
      />
    ),
    'multimedia': (
      <Multimedia
        card={card}
      />
    ),
    'audio': (
      <Audio card={card} />
    ),
    'action': (
      <Quiz
        card={card}
      />
    )
  }

  return (
    <div
      className={`${
        hoverable
          ? 'cursor-pointer dark:hover:bg-night-base-02 dark:group-hover:bg-night-base-02'
          : ''
      } col small-card relative box-content h-full w-full overflow-hidden rounded-2xl border border-solid border-opacity-silver border-opacity-20 bg-day-base-02 dark:border-white dark:border-opacity-10 dark:bg-night-base-03`}
    >
      <div className="h-full">
        <div className="pointer-events-none flex h-full break-words text-[9px] sm:text-sm">
          {smallCardContent[card.cardType]}
        </div>
      </div>
    </div>
  )
}

export default SmallCard
