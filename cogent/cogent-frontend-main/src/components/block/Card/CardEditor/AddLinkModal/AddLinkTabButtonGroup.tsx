import { AddLinkTabType } from '@/components/block/Card/CardEditor/AddLinkModal/index'
import { ActiveTabType } from '@/components/block/Card/CardEditor/AddLinkModal/AddLinkContext'
import AddLinkTabButton from '@/components/block/Card/CardEditor/AddLinkModal/AddLinkTabButton'

interface AddLinkTabButtonGroupProps {
  tabs: Array<AddLinkTabType>
  activeTab: string
  selectTab: (tab: ActiveTabType) => void
}

const AddLinkTabButtonGroup: React.FC<AddLinkTabButtonGroupProps> = ({
  tabs,
  activeTab,
  selectTab
}) => {
  return (
    <div className="flex w-full gap-x-2">
      {tabs.map((tab, i) => (
        <AddLinkTabButton
          key={`tab-${i}`}
          tab={tab}
          isActive={tab.type === activeTab}
          handleOnClick={selectTab}
        />
      ))}
    </div>
  )
}

export default AddLinkTabButtonGroup
