import SmallCardName from '@/components/block/Card/Swapper/SmallCard/elements/SmallCardName'
import SmallCardMedia from '@/components/block/Card/Swapper/SmallCard/elements/SmallCardMedia'
import SmallCardText from '@/components/block/Card/Swapper/SmallCard/elements/SmallCardText'

const VideoTextCard = ({
  name,
  videoUrl,
  text
}: {
  name: string | undefined | null
  videoUrl?: string | undefined | null
  text?: string | undefined | null
}) => (
  <div className="fade flex h-full w-full flex-col">
    <div>
      {!!videoUrl && <SmallCardMedia videoUrl={videoUrl} small={true} />}
    </div>
    <div className={`${!!videoUrl ? 'mt-1.5' : 'mt-3'} mb-1.5 sm:mb-3`}>
      {!!name && <SmallCardName name={name} />}
    </div>
    <div className="mb-1 overflow-hidden">
      {!!text && <SmallCardText text={text} />}
    </div>
  </div>
)

export default VideoTextCard
