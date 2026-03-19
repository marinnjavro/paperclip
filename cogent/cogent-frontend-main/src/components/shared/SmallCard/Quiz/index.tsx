import { Card } from 'src/__generated__/graphql'

import Option from '@/components/shared/SmallCard/Quiz/Option'
import CardMedia from '@/components/shared/SmallCard/elements/Media'
import Name from '@/components/shared/SmallCard/elements/Name'
import SmallMediaPlaceholder from '@/components/shared/SmallCard/placeholders/SmallMediaPlaceholder'
import SmallActionQuestionPlaceholder from '@/components/shared/SmallCard/placeholders/SmallActionQuestionPlaceholder'

const Quiz = ({ card }: { card: Card }) => (
  <div className="fade flex h-full w-full flex-col">
    {!!card.photoUrl && (
      <div className="fade-md h-[136.5px]">
        <CardMedia photoUrl={card.photoUrl} />
      </div>
    )}
    {!!card.videoUrl && (
      <div className="fade-md h-[136.5px]">
        <CardMedia videoUrl={card.videoUrl} />
      </div>
    )}
    {!card.photoUrl && !card.videoUrl && (
      <div className=" flex h-[136.5px] items-center justify-center border-b border-solid border-opacity-silver border-opacity-20 px-4 dark:border-white dark:border-opacity-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="flex w-full flex-1 cursor-pointer items-center justify-center ">
            <SmallMediaPlaceholder size="small" label="Upload media" />
          </div>
        </div>
      </div>
    )}

    {!!card.name ? (
      <div>
        <Name card={card} />
      </div>
    ) : (
      <div className="relative mx-3.5 mt-3.5 flex flex-col">
        <div className="">
          <SmallActionQuestionPlaceholder />
        </div>
      </div>
    )}
    {!!card.actions ? (
      <div className="mx-3 flex flex-col gap-2 overflow-hidden pt-3">
        {card.actions.map((action: any, i: number) => (
          <Option key={`action-option-${i}`} option={card.actions[i]} />
        ))}
      </div>
    ) : (
      <div className="mx-3 flex flex-col gap-2 overflow-hidden pt-3">
        <Option option={{ answer: false, question: 'Add a new answer' }} />
      </div>
    )}
  </div>
)

export default Quiz
