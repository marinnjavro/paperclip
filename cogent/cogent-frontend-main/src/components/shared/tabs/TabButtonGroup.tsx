import { ActiveTabType } from '@/components/library/store/LibraryContext'
import { LibraryTabType } from '@/pages/library'

import TabButton from '@/components/shared/tabs/TabButton'

interface TabButtonGroupProps {
  tabs: Array<LibraryTabType>
  activeTab: string
  selectTab: (tab: ActiveTabType) => void
}

const TabButtonGroup: React.FC<TabButtonGroupProps> = ({
  tabs,
  activeTab,
  selectTab
}) => {
  return (
    <div className="flex w-full gap-x-2">
      {tabs.map((tab, i) => (
        <TabButton
          key={`tab-${i}`}
          tab={tab}
          isActive={tab.type === activeTab}
          handleOnClick={selectTab}
        />
      ))}
    </div>
  )
}

export default TabButtonGroup
