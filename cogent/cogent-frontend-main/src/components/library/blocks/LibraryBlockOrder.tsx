import React, { useState, useContext } from 'react'
import BlocksSearchContext from '@/components/library/store/BlocksSearchContext'

import DropdownInput from '@/components/shared/DropdownInput'

export const ORDER_TYPES = [
  { label: 'From old to new', value: 'created_at asc' },
  { label: 'From new to old', value: 'created_at desc' }
]

const LibraryBlockOrder = () => {
  const { orderBy, onOrderChange } = useContext(BlocksSearchContext)

  const handleChange = (value: string) => {
    onOrderChange(value)
  }

  return (
    <DropdownInput
      name="sorting"
      options={ORDER_TYPES}
      value={orderBy}
      handleChange={handleChange}
    />
  )
}

export default LibraryBlockOrder
