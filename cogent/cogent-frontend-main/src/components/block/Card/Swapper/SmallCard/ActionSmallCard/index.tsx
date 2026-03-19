import ActionOption from '@/components/block/Card/Swapper/SmallCard/ActionSmallCard/ActionOption'
import { ActionOptionType } from '@/components/block/Card/CardEditor/ActionCardInputs/ActionOption'
import SmallCardName from '@/components/block/Card/Swapper/SmallCard/elements/SmallCardName'
import SmallCardMedia from '@/components/block/Card/Swapper/SmallCard/elements/SmallCardMedia'

const ActionSmallCard = ({
  name,
  photoUrl,
  videoUrl,
  actions
}: {
  name: string | undefined | null
  photoUrl?: string | undefined | null
  videoUrl?: string | undefined | null
  actions?: ActionOptionType[]
}) => (
  <div className="fade flex h-full w-full flex-col">
    {!!photoUrl && <SmallCardMedia photoUrl={photoUrl} small={true} />}
    {!!videoUrl && <SmallCardMedia videoUrl={videoUrl} small={true} />}
    <div className={`${!!photoUrl || !!videoUrl ? 'mt-1.5' : 'mt-3'} mb-2.5`}>
      {!!name && <SmallCardName name={name} />}
    </div>
    {!!actions && (
      <div className="mx-3 flex flex-col gap-2 overflow-hidden">
        {actions.map((action: any, i: number) => (
          <ActionOption key={`action-option-${i}`} option={actions[i]} />
        ))}
      </div>
    )}
  </div>
)

export default ActionSmallCard
