import { useContext, useState } from 'react'
import CogsSearchContext from '@/components/library/store/CogsSearchContext'
import { ORDER_TYPES } from '@/components/library/cogs/LibraryCogOrder'
import { COG_TYPES } from '@/components/library/cogs/LibraryCogFilters'

import Icon from '@/components/shared/Icon'
import FiltersModal from '@/components/shared/FiltersModal'

const LibraryCogFiltersMobile = () => {
  const { orderBy, onOrderChange, user, onUserChange, clearAllFilters } =
    useContext(CogsSearchContext)
  const [isOpen, setIsOpen] = useState(false)

  const toggleFilters = () => {
    setIsOpen(!isOpen)
  }

  const handleOrderChange = (value: string) => {
    onOrderChange(value)
  }

  const handleUserChange = (value: string) => {
    onUserChange(value)
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
          },
          {
            name: 'cog_types',
            label: 'Cog type',
            options: COG_TYPES,
            value: user,
            onChange: handleUserChange
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

export default LibraryCogFiltersMobile
