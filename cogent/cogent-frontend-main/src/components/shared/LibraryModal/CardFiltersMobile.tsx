import { useContext, useState } from 'react'
import LibraryModalCardsSearchContext from '@/components/shared/LibraryModal/state/LibraryModalCardsSearchContext'
import { ORDER_TYPES } from '@/components/library/cards/LibraryCardOrder'
import { CARD_TYPES } from '@/pages/library'

import Icon from '@/components/shared/Icon'
import FiltersModal from '@/components/shared/FiltersModal'

const CardFiltersMobile = () => {
  const {
    orderBy,
    onOrderChange,
    cardTypes,
    onCardTypeChange,
    clearAllFilters
  } = useContext(LibraryModalCardsSearchContext)

  const [isOpen, setIsOpen] = useState(false)

  const toggleFilters = () => {
    setIsOpen(!isOpen)
  }

  const handleOrderChange = (value: string) => {
    onOrderChange(value)
  }

  const handleCardTypeChange = (value: string) => {
    onCardTypeChange([value])
  }

  return (
    <>
      <FiltersModal
        open={isOpen}
        toggleModal={toggleFilters}
        filters={[
          {
            name: 'card_order',
            label: 'Order',
            options: ORDER_TYPES,
            value: orderBy,
            onChange: handleOrderChange
          },
          {
            name: 'card_types',
            label: 'Card type',
            options: CARD_TYPES,
            value: !!cardTypes ? cardTypes[0] : '',
            onChange: handleCardTypeChange
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

export default CardFiltersMobile
