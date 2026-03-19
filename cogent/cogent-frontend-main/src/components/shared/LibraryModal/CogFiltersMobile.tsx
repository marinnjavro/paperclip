import { useContext, useState } from 'react'
import { ORDER_TYPES } from '@/components/library/cogs/LibraryCogOrder'
import { COG_TYPES } from '@/components/library/cogs/LibraryCogFilters'
import LibraryModalCogsSearchContext from '@/components/shared/LibraryModal/state/LibraryModalCogsSearchContext'

import Icon from '@/components/shared/Icon'
import FiltersModal from '@/components/shared/FiltersModal'

const CogFiltersMobile = () => {
  const { orderBy, onOrderChange, clearAllFilters } = useContext(
    LibraryModalCogsSearchContext
  )

  const [isOpen, setIsOpen] = useState(false)

  const toggleFilters = () => {
    setIsOpen(!isOpen)
  }

  const handleOrderChange = (value: string) => {
    onOrderChange(value)
  }

  return (
    <>
      <FiltersModal
        open={isOpen}
        toggleModal={toggleFilters}
        filters={[
          {
            name: 'cog_order',
            label: 'Order',
            options: ORDER_TYPES,
            value: orderBy,
            onChange: handleOrderChange
          }
        ]}
        clearAllFilters={clearAllFilters}
      />

      <div
        onClick={() => toggleFilters()}
        className="rounded-xl border border-solid p-4 text-white dark:border-opacity-silver dark:border-opacity-20 dark:bg-night-base-02"
      >
        <Icon height={20} width={20} type="filter" />
      </div>
    </>
  )
}

export default CogFiltersMobile
