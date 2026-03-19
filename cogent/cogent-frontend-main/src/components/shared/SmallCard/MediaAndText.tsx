import { Card } from 'src/__generated__/graphql'

import Media from '@/components/shared/SmallCard/elements/Media'
import Name from '@/components/shared/SmallCard/elements/Name'
import Text from '@/components/shared/SmallCard/elements/Text'
import SmallCardNamePlaceholder from '@/components/shared/SmallCard/placeholders/SmallCardNamePlaceholder'
import SmallMediaPlaceholder from '@/components/shared/SmallCard/placeholders/SmallMediaPlaceholder'

const MediaAndText = ({ card }: { card: Card }) => (
  <div className="fade flex h-full w-full flex-col">
    <div>
      {!!card.photoUrl && (
        <div className="fade-md">
          <Media photoUrl={card.photoUrl} />
        </div>
      )}
      {!!card.videoUrl && (
        <div className="fade-md">
          <Media videoUrl={card.videoUrl} />
        </div>
      )}
      {!card.photoUrl && !card.videoUrl && (
        <div className=" flex h-full flex-1 items-center justify-center border-b border-solid border-opacity-silver border-opacity-20 px-4 dark:border-white dark:border-opacity-10">
          <div className="flex flex-1 items-center justify-center">
            <div className="flex w-full flex-1 cursor-pointer items-center justify-center ">
              <SmallMediaPlaceholder size="small" label="Upload media" />
            </div>
          </div>
        </div>
      )}
    </div>
    {!!card.name && <Name card={card} />}
    {!card.name && (
      <div className="mt-3.5">
        <div className="">
          <SmallCardNamePlaceholder />
        </div>
      </div>
    )}
    {!!card.text && <Text card={card} />}
    {!card.text && (
      <div className="flex">
        <div className="flex w-full cursor-pointer flex-col">
          <p className="ml-[15px] mt-[3px] text-[8px] italic text-[#606174]">
            Enter Card Text...
          </p>
        </div>
      </div>
    )}
  </div>
)

export default MediaAndText
