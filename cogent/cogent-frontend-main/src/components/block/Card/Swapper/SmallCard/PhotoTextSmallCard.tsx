import SmallCardName from '@/components/block/Card/Swapper/SmallCard/elements/SmallCardName'
import SmallCardMedia from '@/components/block/Card/Swapper/SmallCard/elements/SmallCardMedia'
import SmallCardText from '@/components/block/Card/Swapper/SmallCard/elements/SmallCardText'

const PhotoTextCard = ({
  name,
  photoUrl,
  text
}: {
  name: string | undefined | null
  photoUrl?: string | undefined | null
  text?: string | undefined | null
}) => (
  <div className="fade flex h-full w-full flex-col">
    {!!photoUrl && <SmallCardMedia photoUrl={photoUrl} small={true} />}
    <div className={`${!!photoUrl ? 'mt-1.5' : 'mt-3'} mb-1.5 sm:mb-3`}>
      <h3 className="truncate px-2 font-semibold leading-tight text-day-text-label-primary dark:text-white sm:px-3">
        {name}
      </h3>
    </div>
    <div className="mb-1 h-full overflow-hidden">
      {!!text && <SmallCardText text={text} />}
    </div>
  </div>
)

export default PhotoTextCard
