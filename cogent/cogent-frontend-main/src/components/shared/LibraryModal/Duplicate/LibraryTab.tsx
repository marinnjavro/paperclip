import React, { useContext } from 'react'
import LibraryContext from '@/components/library/store/LibraryContext'
import CardsTab from '@/components/shared/LibraryModal/Duplicate/CardsTab'
import CommunityCardsTab from '@/components/shared/LibraryModal/Duplicate/CommunityCardsTab'
import HeaderButton from '@/components/block/CardHeader/HeaderButton'

const TabTypes: { [type: string]: JSX.Element } = {
  cards: <CardsTab />,
  communityCards: <CommunityCardsTab />
}

const LibraryTab = () => {
  const { activeTab, switchTab } = useContext(LibraryContext)

  return (
    <div>
      {/* Tab Buttons */}
      <div className="tab-buttons flex">
        <button
          className={`tab-button ${activeTab === 'cards' ? 'active' : ''}`}
          onClick={() => switchTab('cards')}
        >
          Cards
        </button>
        <button
          className={`tab-button ${
            activeTab === 'communityCards' ? 'active' : ''
          }`}
          onClick={() => switchTab('communityCards')}
        >
          Community Cards
        </button>
      </div>

      {/* Tab Content */} 
      <div className="tab-content py-6">
        {TabTypes[activeTab]}
        <div className="w-[152px]">
          <HeaderButton
            label="Create card"
            icon="plus"
            classNames="w-full rounded-[12px]"
            onClick={}
          />
        </div>
      </div>
    </div>
  )
}

export default LibraryTab
