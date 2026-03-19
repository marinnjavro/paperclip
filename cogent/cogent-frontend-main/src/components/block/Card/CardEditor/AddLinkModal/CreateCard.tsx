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
import CardTemplatesModal from '@/components/shared/CardTemplatesModal'
import CardTemplate from '@/components/shared/CardTemplate'

const cardTemplates = [
  { label: 'Opening card', type: 'opening' },
  { label: 'Audio', type: 'audio' },
  { label: 'Video / Photo', type: 'multimedia' },
  { label: 'Quiz', type: 'action' },
  { label: 'Text', type: 'text' },
  { label: 'Photo and text', type: 'photo and text' },
  { label: 'Video and text', type: 'video and text' },
  { label: 'Media and text', type: 'media and text' }
]

interface CreateCardProps {
  onSelect: (item: any) => void
  toggleModal: () => void
  selectTarget: 'cog' | 'block' | 'card'
  target: 'cog' | 'block' | 'card'
  module: 'select' | 'search'
  hoverable?: boolean
  duplicateFromLibrary: (card: Card) => void
  showOpeningCard: boolean
  handleTemplateOnClick: (type: string) => void
}

const CreateCard: React.FC<CreateCardProps> = ({
  onSelect,
  toggleModal,
  selectTarget,
  target,
  module,
  hoverable,
  duplicateFromLibrary,
  showOpeningCard,
  handleTemplateOnClick
}) => {
  const { activeTab, switchTab } = useContext(AddLinkContext)

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

      <div className="basis-9/10 scrollbar-md--purple lg:flex-start mt-3 grid grid-cols-2 gap-6 overflow-y-auto py-6 xs:grid-cols-2 xs:px-6 md:grid-cols-2 lg:flex lg:flex-wrap xl:flex">
        {cardTemplates.map((template) =>
          template.type === 'opening' ? (
            showOpeningCard && (
              <div
                key={template.type}
                onClick={() => handleTemplateOnClick(template.type)}
              >
                <CardTemplate label={template.label} type={template.type} />
              </div>
            )
          ) : (
            <div
              key={template.type}
              onClick={() => handleTemplateOnClick(template.type)}
            >
              <CardTemplate label={template.label} type={template.type} />
            </div>
          )
        )}
      </div>
    </LibraryModalCardsSearchContextProvider>
  )
}

export default CreateCard
