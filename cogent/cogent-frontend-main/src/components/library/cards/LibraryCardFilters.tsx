import React, { useContext } from 'react'
import { CARD_TYPES, CARD_CATEGORIES } from '@/pages/library'
import CardsSearchContext from '@/components/library/store/CardsSearchContext'

import DropdownCheckboxInput from '@/components/shared/DropdownCheckboxInput'
import SelectInput from '@/components/shared/SelectInput'

const LibraryCardTypeFilters = () => {
  const { cardTypes, onCardTypeChange, cardCategory, onCardCategoryChange } =
    useContext(CardsSearchContext)

  const handleTypesChange = (value: string[]) => {
    onCardTypeChange(value)
  }

  const handleCategoryChange = (value: string) => {
    onCardCategoryChange(value)
  }

  return (
    <div className="flex items-center gap-2">
      <SelectInput
        name="card_category"
        options={[
          { value: '', label: 'All categories' },
          ...CARD_CATEGORIES
        ]}
        value={cardCategory}
        handleChange={handleCategoryChange}
        size="small"
      />
      <DropdownCheckboxInput
        icon="filters"
        options={CARD_TYPES}
        values={!!cardTypes ? cardTypes : []}
        onChange={handleTypesChange}
      />
    </div>
  )
}

export default LibraryCardTypeFilters
