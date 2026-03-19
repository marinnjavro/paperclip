import React, { useState, useContext } from 'react'
import _ from 'lodash'

import { CogsSearchContextProvider } from '@/components/library/store/CogsSearchContext'

import TabButtonGroup from '@/components/shared/tabs/TabButtonGroup'
import LibraryCogSearch from '@/components/library/cogs/LibraryCogSearch'
import LibraryCogOrder from '@/components/library/cogs/LibraryCogOrder'
import LibraryCogFilters from '@/components/library/cogs/LibraryCogFilters'
import LibraryCogFiltersMobile from '@/components/library/cogs/LibraryCogFiltersMobile'
import AddLinkContext from '@/components/block/Card/CardEditor/AddLinkModal/AddLinkContext'
import { ADD_LINK_TABS } from '.'
import CommunityCogs from '@/components/community/CommunityCogs'
import { CommunitySearchContextProvider } from '@/components/community/store/CommunitySearchContext'
import LibraryModalContextWrapper from "@/components/shared/LibraryModal/state/LibraryModalContextWrapper";
import LibrarySelectModule from "@/components/shared/LibraryModal/LibrarySelectModule";

interface LinkCommunityTabProps {
  selectTarget: 'cog' | 'block' | 'card' | 'communityCog'
  onSelect: (item: any) => void
  toggleModal: () => void
  module: 'select' | 'search'
}
const LinkCommunityTab: React.FC<LinkCommunityTabProps> = ({
  selectTarget,
  onSelect,
  toggleModal,
  module
}) => {
  const { activeTab, switchTab } = useContext(AddLinkContext)
  const isSelectModule = module === 'select'

  return (
    <CommunitySearchContextProvider>
      <div className="w-full pt-4 sm:hidden">
        <TabButtonGroup
          tabs={ADD_LINK_TABS}
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

      <div className="hidden w-full justify-between py-1 sm:flex">
        <TabButtonGroup
          tabs={ADD_LINK_TABS}
          activeTab={activeTab}
          selectTab={switchTab}
        />
      </div>
      <LibraryModalContextWrapper>
        <>
          {isSelectModule && (
            <LibrarySelectModule
              target={selectTarget}
              toggleModal={toggleModal}
              onSelect={onSelect}
            />
          )}
        </>
      </LibraryModalContextWrapper>
    </CommunitySearchContextProvider>
  )
}

export default LinkCommunityTab
