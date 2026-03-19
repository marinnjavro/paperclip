import SmallCardText from '@/components/block/Card/Swapper/SmallCard/elements/SmallCardText'
import SmallCardName from '@/components/block/Card/Swapper/SmallCard/elements/SmallCardName'

const TextSmallCard = ({
  name,
  text
}: {
  name: string | undefined | null
  text?: string | undefined | null
}) => (
  <div className="fade flex h-full flex-col">
    <div className="mt-3 mb-1.5 sm:mb-2.5">
      {!!name && <SmallCardName name={name} />}
    </div>
    <div className="h-full overflow-hidden">
      {!!text && <SmallCardText text={text} />}
    </div>
  </div>
)

export default TextSmallCard
