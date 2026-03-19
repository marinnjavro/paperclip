import React, { useContext } from 'react'
import { CARD_TYPES } from '@/pages/library'
import BlocksSearchContext from '@/components/library/store/BlocksSearchContext'

import DropdownCheckboxInput from '@/components/shared/DropdownCheckboxInput'

const LibraryBlockTypeFilters = () => {
  const { cardTypes, onCardTypeChange } = useContext(BlocksSearchContext)

  const handleChange = (value: string[]) => {
    if (value.length) {
      onCardTypeChange(value)
    } else {
      onCardTypeChange(null)
    }
  }

  return (
    <DropdownCheckboxInput
      icon="filters"
      options={CARD_TYPES}
      values={!!cardTypes ? cardTypes : []}
      onChange={handleChange}
    />
  )
}

export default LibraryBlockTypeFilters
