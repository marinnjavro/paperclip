import React, { useContext } from 'react'
import _ from 'lodash'
import LibraryContext from '@/components/library/store/LibraryContext'
import { BlocksSearchContextProvider } from '@/components/library/store/BlocksSearchContext'

import TabButtonGroup from '@/components/shared/tabs/TabButtonGroup'
import LibraryBlockSearch from '@/components/library/blocks/LibraryBlockSearch'
import { LIBRARY_TABS } from '@/pages/library'
import LibraryBlockList from '@/components/library/blocks/LibraryBlockList'
import LibraryBlockOrder from '@/components/library/blocks/LibraryBlockOrder'
import LibraryBlockFilters from '@/components/library/blocks/LibraryBlockFilters'
import LibraryBlockFiltersMobile from '@/components/library/blocks/LibraryBlockFiltersMobile'

const BlocksTab = () => {
  const { activeTab, switchTab } = useContext(LibraryContext)

  return (
    <BlocksSearchContextProvider>
      <div className="w-full pt-4 sm:hidden">
        <TabButtonGroup
          tabs={LIBRARY_TABS}
          activeTab={activeTab}
          selectTab={switchTab}
        />
        <div className="flex w-full justify-center pt-4">
          <div className="flex w-full gap-2">
            <LibraryBlockSearch />
            <LibraryBlockFiltersMobile />
          </div>
        </div>
      </div>

      <div className="hidden w-full justify-center pb-16 sm:flex">
        <div className="sm:w-1/2 2xl:w-1/3">
          <LibraryBlockSearch />
        </div>
      </div>

      <div className="hidden w-full justify-between py-1 sm:flex">
        <TabButtonGroup
          tabs={LIBRARY_TABS}
          activeTab={activeTab}
          selectTab={switchTab}
        />
        <div className="flex h-min items-center divide-x divide-solid divide-night-base-06">
          <LibraryBlockOrder />
          <LibraryBlockFilters />
        </div>
      </div>
      <LibraryBlockList />
    </BlocksSearchContextProvider>
  )
}

export default BlocksTab
