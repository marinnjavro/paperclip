import { Card } from 'src/__generated__/graphql'

import CardName from '@/components/block/Card/CardContent/elements/CardName'
import CardPhoto from '@/components/block/Card/CardContent/elements/CardPhoto'
import CardActions from '@/components/block/Card/CardContent/elements/CardActions'
import VideoPlayer from '@/components/shared/VideoPlayer'
import MediaPlaceholder from '@/components/shared/MediaPlaceholder'
import ActionQuestionPlaceholder from './placeholders/ActionQuestionPlaceholder'
import ActionOptionPlaceholder from './placeholders/ActionOptionPlaceholder'
import QuillToolbarPlaceholder from './placeholders/QuillToolbarPlaceholder'
import Icon from '@/components/shared/Icon'
import CardText from './elements/CardText'

interface ActionCardContentProps {
  card: Card
}

const ActionCardContent: React.FC<ActionCardContentProps> = ({ card }) => {
  return (
    <>
      {!!card.photoUrl && (
        <div>
          <CardPhoto photoUrl={card.photoUrl} />
        </div>
      )}
      {!!card.videoUrl && (
        <div className="fade h-[180px] xxs:h-[248.25px]">
          <VideoPlayer url={card.videoUrl} />
        </div>
      )}
      {!card.photoUrl && !card.videoUrl && (
        <div className="mb-4 flex flex-1 items-center justify-center border-b border-solid border-opacity-silver border-opacity-20 dark:border-white dark:border-opacity-10">
          <div className="flex w-full flex-1 cursor-pointer items-center justify-center">
            <MediaPlaceholder label="Upload photo or video" />
          </div>
        </div>
      )}
      <div className={`${!!card.photoUrl || !!card.videoUrl ? '' : ''} `}>
        <div className="mb-5">
          {!!card.name ? (
            <div className="mx-4 mb-4">
              <CardName name={card.name || ''} />
            </div>
          ) : (
            <div className="relative mx-3.5 flex flex-col">
              <div className="">
                <ActionQuestionPlaceholder />
              </div>
            </div>
          )}
        </div>
        <div className="mx-3.5 mb-3 text-sm leading-relaxed">
          {!!card.actions && <CardActions card={card} />}
        </div>
        <div className="border-b border-solid border-opacity-silver border-opacity-20 dark:border-white dark:border-opacity-10">
          <div className="mx-3.5 mb-5 flex items-center">
            <Icon height={40} width={40} type="actionNew" />
            <div className="ml-4 text-sm text-white">Add a new answer</div>
          </div>
        </div>

        <div className=" flex h-full flex-col">
          <div className="mt-5 flex h-full w-full cursor-pointer flex-col">
            <h3 className="mx-3.5 text-sm font-bold text-white">
              Action Card Links
            </h3>
            <p className="mx-3.5 mt-1.5 mb-5 text-sm">
              This text will be visible to students only after they submit the
              answer.
            </p>
            <QuillToolbarPlaceholder />
            {!!card.text ? (
              <div className="mx-3.5 text-sm leading-relaxed">
                <CardText text={card?.text || ''} />
              </div>
            ) : (
              <p className="mx-3.5 text-[14px] italic text-[#606174]">
                Enter Card Text...
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ActionCardContent
