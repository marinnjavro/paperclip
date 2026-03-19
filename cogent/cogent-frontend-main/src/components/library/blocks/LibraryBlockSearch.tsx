import React, { useState, useLayoutEffect, useContext } from 'react'
import { useSearchParams } from 'next/navigation'

import BlocksSearchContext from '@/components/library/store/BlocksSearchContext'

import SearchBox from '@/components/shared/SearchBox'

const LibrarySearch: React.FC = () => {
  const searchParams = useSearchParams()
  const prevQuery = searchParams.get('query')
  const { query, onQueryChange } = useContext(BlocksSearchContext)

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
    <SearchBox
      placeholder="Search for cards or blocks"
      name="search"
      value={searchInput}
      handleChange={handleSearch}
    />
  )
}

export default LibrarySearch
