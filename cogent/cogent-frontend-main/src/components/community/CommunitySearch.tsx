import React, { useState, useLayoutEffect, useContext } from 'react'
import { useSearchParams } from 'next/navigation'
import CommunitySearchContext from '@/components/community/store/CommunitySearchContext'

import SearchBox from '@/components/shared/SearchBox'

const CommunitySearch: React.FC = () => {
  const searchParams = useSearchParams()
  const prevQuery = searchParams.get('query')
  const { query, onQueryChange } = useContext(CommunitySearchContext)

  const [searchInput, setSearchInput] = useState<string>('')
  const [timer, setTimer] = useState<any>(null)

  useLayoutEffect(() => {
    if (!prevQuery) return
    setSearchInput(prevQuery)
  }, [prevQuery])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSearchInput(value)
    clearTimeout(timer)
    const newTimer = setTimeout(() => {
      onQueryChange(value)
    }, 1000)
    setTimer(newTimer)
  }

  return (
    <div className="w-full max-w-[654px]">
      <SearchBox
        placeholder="Search everything in community"
        name="search"
        value={searchInput}
        handleChange={handleSearch}
      />
    </div>
  )
}

export default CommunitySearch
