import { LibraryCogsSearchContextProvider } from '@/components/shared/LibraryModal/state/LibraryModalCogsSearchContext'
import { LibraryModalCardsSearchContextProvider } from '@/components/shared/LibraryModal/state/LibraryModalCardsSearchContext'

const LibraryModalContextWrapper = ({
  children
}: {
  children: JSX.Element
}) => {
  return (
    <LibraryCogsSearchContextProvider>
      <LibraryModalCardsSearchContextProvider>
        {children}
      </LibraryModalCardsSearchContextProvider>
    </LibraryCogsSearchContextProvider>
  )
}

export default LibraryModalContextWrapper
