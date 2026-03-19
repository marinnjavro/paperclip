import { createContext, ReactElement } from 'react'
import { useQueryState, parseAsArrayOf, parseAsString } from 'nuqs'

interface Props {
  children?: JSX.Element | Array<JSX.Element>
}

export type ActiveTabType = 'cogs' | 'blocks' | 'cards'

interface LibraryContextInterface {
  activeTab: ActiveTabType
  switchTab: (tab: ActiveTabType) => void
}

const LibraryContext = createContext<LibraryContextInterface>({
  activeTab: 'cogs',
  switchTab: () => {}
})

export function LibraryContextProvider(props: Props): ReactElement {
  const [activeTab, setActiveTab] = useQueryState(
    'tab',
    parseAsString.withDefault('cogs')
  )

  const switchTab = (tab: ActiveTabType) => {
    setActiveTab(tab)
  }

  return (
    <LibraryContext.Provider
      value={{
        activeTab: activeTab,
        switchTab: switchTab
      }}
    >
      {props.children}
    </LibraryContext.Provider>
  )
}

export default LibraryContext
