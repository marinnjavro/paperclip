import { createContext, ReactElement } from 'react'
import { useQueryState, parseAsArrayOf, parseAsString } from 'nuqs'

interface Props {
  children?: JSX.Element | Array<JSX.Element>
}

export type ActiveTabType = 'cards' | 'cogs' | 'community'

interface AddLinkContextInterface {
  activeTab: ActiveTabType
  switchTab: (tab: ActiveTabType) => void
}

const AddLinkContext = createContext<AddLinkContextInterface>({
  activeTab: 'cards',
  switchTab: () => {}
})

export function AddLinkContextProvider(props: Props): ReactElement {
  const [activeTab, setActiveTab] = useQueryState(
    'tab',
    parseAsString.withDefault('cards')
  )

  const switchTab = (tab: ActiveTabType) => {
    setActiveTab(tab)
  }

  return (
    <AddLinkContext.Provider
      value={{
        activeTab: activeTab,
        switchTab: switchTab
      }}
    >
      {props.children}
    </AddLinkContext.Provider>
  )
}

export default AddLinkContext
