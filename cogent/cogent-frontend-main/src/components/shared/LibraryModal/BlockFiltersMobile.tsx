import { useState } from 'react'
import { ORDER_TYPES } from '@/components/shared/LibraryModal/LibraryModalBlocks'

import Icon from '@/components/shared/Icon'
import FiltersModal from '@/components/shared/FiltersModal'

interface BlockFiltersMobileProps {
  orderBy: string
  onOrderChange: (value: string) => void
  clearAllFilters: () => void
}

const BlockFiltersMobile: React.FC<BlockFiltersMobileProps> = ({
  orderBy,
  onOrderChange,
  clearAllFilters
}) => {
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
            name: 'block_order',
            label: 'Order',
            options: ORDER_TYPES,
            value: orderBy,
            onChange: onOrderChange
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

export default BlockFiltersMobile
