import React, { useContext } from 'react'
import CogsSearchContext from '@/components/library/store/CogsSearchContext'

import DropdownToggleInput from '@/components/shared/DropdownToggleInput'

export const COG_TYPES = [
  { value: 'ME', label: 'Created by me' },
  { value: 'ALL', label: 'Duplicated cogs' }
]

const LibraryBlockTypeFilters = () => {
  const { user, onUserChange } = useContext(CogsSearchContext)

  const handleChange = (values: string[]) => {
    // onUserChange(values)
  }

  return (
    <DropdownToggleInput
      icon="filters"
      options={COG_TYPES}
      values={[user]}
      onChange={handleChange}
    />
  )
}

export default LibraryBlockTypeFilters
