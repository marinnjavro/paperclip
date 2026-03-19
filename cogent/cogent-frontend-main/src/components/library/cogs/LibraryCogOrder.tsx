import React, { useContext } from 'react'
import CogsSearchContext from '@/components/library/store/CogsSearchContext'

import DropdownInput from '@/components/shared/DropdownInput'

export const ORDER_TYPES = [
  { label: 'From old to new', value: 'created_at asc' },
  { label: 'From new to old', value: 'created_at desc' }
]

const LibraryCogOrder = () => {
  const { orderBy, onOrderChange } = useContext(CogsSearchContext)

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

export default LibraryCogOrder
