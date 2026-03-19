import { ActiveTabType } from '@/components/library/store/LibraryContext'
import { LibraryTabType } from '@/pages/library'

interface TabButtonProps {
  tab: LibraryTabType
  isActive: boolean
  handleOnClick: (type: ActiveTabType) => void
}

const TabButton: React.FC<TabButtonProps> = ({
  tab,
  isActive,
  handleOnClick
}) => {
  return (
    <div
      className={`${
        isActive
          ? 'border-opacity-violet bg-opacity-violet font-bold'
          : 'border-white border-opacity-10 bg-night-base-03'
      } flex h-9 w-full cursor-pointer items-center justify-center rounded-lg border-[0.5px] border-solid text-xs text-white hover:brightness-125 sm:max-w-[152px]`}
      onClick={() => handleOnClick(tab.type)}
    >
      {tab.title}
    </div>
  )
}

export default TabButton
