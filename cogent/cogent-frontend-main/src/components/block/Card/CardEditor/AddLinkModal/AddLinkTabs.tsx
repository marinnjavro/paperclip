import { useContext } from 'react'
import AddLinkContext from '@/components/block/Card/CardEditor/AddLinkModal/AddLinkContext'
import LinkCardsTab from '@/components/block/Card/CardEditor/AddLinkModal/LinkCardsTab'
import LinkCogsTab from '@/components/block/Card/CardEditor/AddLinkModal/LinkCogsTab'
import LinkCommunityTab from '@/components/block/Card/CardEditor/AddLinkModal/LinkCommunityTab'
import HeaderButton from '@/components/block/CardHeader/HeaderButton'
import CreateCard from './CreateCard'
import { Card } from 'src/__generated__/graphql'

interface AddLinkTabsProps {
  onSelect: (item: any) => void
}

const AddLinkTabs: React.FC<AddLinkTabsProps> = ({ onSelect }) => {
  const { activeTab } = useContext(AddLinkContext)

  const TabTypes: { [type: string]: JSX.Element } = {
    cards: (
      <LinkCardsTab module="select" selectTarget="card" onSelect={onSelect} />
    ),
    cogs: (
      <LinkCogsTab module="select" selectTarget="cog" onSelect={onSelect} />
    ),
    community: (
      <LinkCommunityTab module="select" selectTarget="communityCog" onSelect={onSelect} />
    ),
    create: (
      <CreateCard
        onSelect={function (item: any): void {
          throw new Error('Function not implemented.')
        }}
        toggleModal={function (): void {
          throw new Error('Function not implemented.')
        }}
        selectTarget={'card'}
        target={'card'}
        module={'search'}
        duplicateFromLibrary={function (card: Card): void {
          throw new Error('Function not implemented.')
        }}
      />
    )
  }

  return (
    <div className="flex justify-between py-6">
      <div>{TabTypes[activeTab]}</div>
      {/* <div className="w-[152px]">
        <HeaderButton
          label="Create card"
          icon="plus"
          classNames="w-full rounded-[12px]"
          // onClick={}
        />
      </div> */}
    </div>
  )
}

export default AddLinkTabs
