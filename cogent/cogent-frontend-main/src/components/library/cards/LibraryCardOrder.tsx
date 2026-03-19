import React, { useState, useContext } from 'react'
import CardsSearchContext from '@/components/library/store/CardsSearchContext'

import DropdownInput from '@/components/shared/DropdownInput'

export const ORDER_TYPES = [
  { label: 'From old to new', value: 'created_at asc' },
  { label: 'From new to old', value: 'created_at desc' }
]

const LibraryCardOrder = () => {
  const { orderBy, onOrderChange } = useContext(CardsSearchContext)

  const handleOrderChange = (value: string) => {
    onOrderChange(value)
  }

  return (
    <DropdownInput
      name="sorting"
      options={ORDER_TYPES}
      value={orderBy}
      handleChange={handleOrderChange}
    />
  )
}

export default LibraryCardOrder
