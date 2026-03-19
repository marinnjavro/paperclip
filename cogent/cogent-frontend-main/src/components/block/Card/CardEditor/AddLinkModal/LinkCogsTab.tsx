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
import AddLinkContext from '@/components/block/Card/CardEditor/AddLinkModal/AddLinkContext'
import { ADD_LINK_TABS } from '.'
import LibraryModalCogs from '@/components/shared/LibraryModal/LibraryModalCogs'
import LibraryModalContextWrapper from '@/components/shared/LibraryModal/state/LibraryModalContextWrapper'
import LibrarySelectModule from '@/components/shared/LibraryModal/LibrarySelectModule'
import LibraryModalCardsSearchContext from '@/components/shared/LibraryModal/state/LibraryModalCardsSearchContext'

interface LinkCogsTabProps {
  selectTarget: 'cog' | 'block' | 'card'
  onSelect: (item: any) => void
  toggleModal: () => void
  module: 'select' | 'search'
}

const LinkCogsTab: React.FC<LinkCogsTabProps> = ({
  selectTarget,
  onSelect,
  toggleModal,
  module
}) => {
  const { activeTab, switchTab } = useContext(AddLinkContext)
  const {
    cards,
    refetchCards,
    onCardTypeChange,
    cardTypes,
    limit,
    onLimitChange,
    onQueryChange,
    paginationMetadata,
    onPageChange
  } = useContext(LibraryModalCardsSearchContext)
  const isSelectModule = module === 'select'

  return (
    <CogsSearchContextProvider>
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

      <div className="hidden w-full justify-between py-2 sm:flex">
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
    </CogsSearchContextProvider>
  )
}

export default LinkCogsTab
