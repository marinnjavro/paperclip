import LibraryContext from '@/components/library/store/LibraryContext'

import CogsTab from '@/components/library/cogs'
import BlocksTab from '@/components/library/blocks'
import CardsTab from '@/components/library/cards'
import { useContext } from 'react'

const TabTypes: { [type: string]: JSX.Element } = {
  cogs: <CogsTab />,
  blocks: <BlocksTab />,
  cards: <CardsTab />
}

const LibraryTab = () => {
  const { activeTab } = useContext(LibraryContext)

  return <div className="py-6">{TabTypes[activeTab]}</div>
}

export default LibraryTab
