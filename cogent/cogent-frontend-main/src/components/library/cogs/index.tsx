import React, { useState, useContext } from 'react'
import _ from 'lodash'
import { LIBRARY_TABS } from '@/pages/library'
import LibraryContext from '@/components/library/store/LibraryContext'
import { CogsSearchContextProvider } from '@/components/library/store/CogsSearchContext'

import Icon from '@/components/shared/Icon'
import TabButtonGroup from '@/components/shared/tabs/TabButtonGroup'
import LibraryCogList from '@/components/library/cogs/LibraryCogList'
import LibraryCogSearch from '@/components/library/cogs/LibraryCogSearch'
import LibraryCogOrder from '@/components/library/cogs/LibraryCogOrder'
import LibraryCogFilters from '@/components/library/cogs/LibraryCogFilters'
import LibraryCogFiltersMobile from '@/components/library/cogs/LibraryCogFiltersMobile'

const CogsTab = () => {
  const { activeTab, switchTab } = useContext(LibraryContext)

  return (
    <CogsSearchContextProvider>
      <div className="w-full pt-4 sm:hidden">
        <TabButtonGroup
          tabs={LIBRARY_TABS}
          activeTab={activeTab}
          selectTab={switchTab}
        />
        <div className="flex w-full justify-center pt-4">
          <div className="flex w-full gap-2">
            <LibraryCogSearch />
            <LibraryCogFiltersMobile />
          </div>
        </div>
      </div>

      <div className="hidden w-full justify-center pb-16 sm:flex">
        <div className="sm:w-1/2 2xl:w-1/3">
          <LibraryCogSearch />
        </div>
      </div>

      <div className="hidden w-full justify-between py-1 sm:flex">
        <TabButtonGroup
          tabs={LIBRARY_TABS}
          activeTab={activeTab}
          selectTab={switchTab}
        />
        <div className="flex h-min items-center divide-x divide-solid divide-night-base-06">
          <LibraryCogOrder />
          <LibraryCogFilters />
        </div>
      </div>

      <LibraryCogList />
    </CogsSearchContextProvider>
  )
}

export default CogsTab
