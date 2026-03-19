import React, { useContext } from 'react'
import _ from 'lodash'

import LibraryCardSearch from '@/components/library/cards/LibraryCardSearch'
import LibraryCardOrder from '@/components/library/cards/LibraryCardOrder'
import LibraryCardFilters from '@/components/library/cards/LibraryCardFilters'
import LibraryCardFiltersMobile from '@/components/library/cards/LibraryCardFiltersMobile'
import AddLinkTabButtonGroup from '@/components/block/Card/CardEditor/AddLinkModal/AddLinkTabButtonGroup'
import { ADD_LINK_TABS } from '@/components/block/Card/CardEditor/AddLinkModal/index'
import AddLinkContext from '@/components/block/Card/CardEditor/AddLinkModal/AddLinkContext'
import LibraryModalCards from '@/components/shared/LibraryModal/LibraryModalCards'
import LibrarySelectModule from '@/components/shared/LibraryModal/LibrarySelectModule'
import cards from '@/components/library/cards'
import { filterOpeningCards } from '@/utils/filterData'
import SmallCard from '../../Swapper/SmallCard'
import Pagination from '@/components/shared/Pagination'
import Spinner from '@/components/shared/Spinner'
import LibraryModalCardsSearchContext, {
  LibraryModalCardsSearchContextProvider
} from '@/components/shared/LibraryModal/state/LibraryModalCardsSearchContext'
// import LibraryCardList from '@/components/library/cards/LibraryCardList'
import ModalLibraryCardList from '@/components/library/cards/ModalLibraryCardList'
import LibraryModalContextWrapper from '@/components/shared/LibraryModal/state/LibraryModalContextWrapper'
import LibrarySearchModule from '@/components/shared/LibraryModal/LibrarySearchModule'
import { Card } from 'src/__generated__/graphql'

interface LinkCardsTabProps {
  onSelect: (item: any) => void
  toggleModal: () => void
  selectTarget: 'cog' | 'block' | 'card'
  target: 'cog' | 'block' | 'card'
  module: 'select' | 'search'
  hoverable?: boolean
  duplicateFromLibrary: (card: Card) => void
}

const LinkCardsTab: React.FC<LinkCardsTabProps> = ({
  onSelect,
  toggleModal,
  selectTarget,
  target,
  module,
  hoverable,
  duplicateFromLibrary
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

  const handleDuplicateCard = (card: Card) => {
    duplicateFromLibrary(card)
  }

  return (
    <LibraryModalCardsSearchContextProvider>
      <div className="w-full pt-4 sm:hidden">
        <AddLinkTabButtonGroup
          tabs={ADD_LINK_TABS}
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

      <div className="hidden w-full justify-between py-2 sm:flex">
        <AddLinkTabButtonGroup
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
    </LibraryModalCardsSearchContextProvider>
  )
}

export default LinkCardsTab
