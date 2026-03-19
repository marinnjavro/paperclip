import React, { useContext } from 'react'
import CommunitySearchContext from '@/components/community/store/CommunitySearchContext'

import DropdownInput from '@/components/shared/DropdownInput'

const ORDER_TYPES = [
  { label: 'Popular', value: '' },
  { label: 'From old to new', value: 'created_at asc' },
  { label: 'From new to old', value: 'created_at desc' }
]

const CommunityOrder = () => {
  const { orderBy, onOrderChange } = useContext(CommunitySearchContext)

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

export default CommunityOrder
