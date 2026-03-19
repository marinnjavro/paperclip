import React, { useContext } from 'react'
import _ from 'lodash'
import { LIBRARY_TABS } from '@/pages/library'
import LibraryContext from '@/components/library/store/LibraryContext'
import { CardsSearchContextProvider } from '@/components/library/store/CardsSearchContext'

import Icon from '@/components/shared/Icon'
import TabButtonGroup from '@/components/shared/tabs/TabButtonGroup'
import LibraryCardSearch from '@/components/library/cards/LibraryCardSearch'
import LibraryCardList from '@/components/library/cards/LibraryCardList'
import LibraryCardOrder from '@/components/library/cards/LibraryCardOrder'
import LibraryCardFilters from '@/components/library/cards/LibraryCardFilters'
import LibraryCardFiltersMobile from '@/components/library/cards/LibraryCardFiltersMobile'

const CardsTab = () => {
  const { activeTab, switchTab } = useContext(LibraryContext)

  return (
    <CardsSearchContextProvider>
      <div className="w-full pt-4 sm:hidden">
        <TabButtonGroup
          tabs={LIBRARY_TABS}
          activeTab={activeTab}
          selectTab={switchTab}
        />
        <div className="flex w-full justify-center pt-4">
          <div className="flex w-full gap-2">
            <LibraryCardSearch />
            <LibraryCardFiltersMobile />
          </div>
        </div>
      </div>

      <div className="hidden w-full justify-center pb-16 sm:flex">
        <div className="sm:w-1/2 2xl:w-1/3">
          <LibraryCardSearch />
        </div>
      </div>

      <div className="hidden w-full justify-between py-1 sm:flex">
        <TabButtonGroup
          tabs={LIBRARY_TABS}
          activeTab={activeTab}
          selectTab={switchTab}
        />
        <div className="flex h-min items-center divide-x divide-solid divide-night-base-06">
          <LibraryCardOrder />
          <LibraryCardFilters />
        </div>
      </div>

      <LibraryCardList />
    </CardsSearchContextProvider>
  )
}

export default CardsTab
