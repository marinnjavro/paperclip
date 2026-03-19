import React, { Fragment, useState, useContext } from 'react'
import _ from 'lodash'
import { Cog, Block } from 'src/__generated__/graphql'
import { SORTING_TYPES } from '@/pages/library'
import BlocksSearchContext from '@/components/library/store/BlocksSearchContext'

import { Transition, Dialog } from '@headlessui/react'
import SearchBox from '@/components/shared/SearchBox'
import DropdownInput from '@/components/shared/DropdownInput'
import Icon from '@/components/shared/Icon'
import LibraryBlock from '@/components/library/blocks/LibraryBlock'
import BlockFiltersMobile from './BlockFiltersMobile'

export const ORDER_TYPES = [
  { label: 'From old to new', value: 'asc' },
  { label: 'From new to old', value: 'desc' }
]

interface LibraryModalBlocksProps {
  blocks?: Block[]
  toggleModal: () => void
  onCancel: () => void
  onSelect: (item: any) => void
}

const LibraryModalBlocks: React.FC<LibraryModalBlocksProps> = ({
  blocks,
  onCancel,
  onSelect,
  toggleModal
}) => {
  const [blocksSearch, setBlocksSearch] = useState(() => {
    return !!blocks ? blocks : []
  })

  const [searchInput, setSearchInput] = useState<string>('')
  const [orderBy, setOrderBy] = useState<string>('desc')

  const [timer, setTimer] = useState<any>(null)

  const searchBlocks = (value: string) => {
    if (!blocks) return []
    setBlocksSearch(
      blocks.filter((block) => block.name.toLowerCase().includes(value))
    )
  }

  const sortByDate = (blocks: Block[], orderBy: string) => {
    if (orderBy === 'asc') {
      return _.sortBy(blocks, ['createdAt'])
    } else {
      return _.sortBy(blocks, ['createdAt']).reverse()
    }
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSearchInput(value)
    clearTimeout(timer)
    const newTimer = setTimeout(() => {
      searchBlocks(value)
    }, 1000)
    setTimer(newTimer)
  }

  const handleOrderChange = (value: string) => {
    setOrderBy(value)
  }

  const clearAllFilters = () => {
    setOrderBy('desc')
  }

  return (
    <div className="scrollbar--hidden h-full overflow-hidden overflow-y-auto text-night-text">
      <div className="flex w-full items-center justify-between gap-12">
        <Dialog.Title
          as="h3"
          className="min-w-[144px] text-lg font-bold leading-6 text-white sm:text-xl"
        >
          <button className="flex items-center" onClick={() => onCancel()}>
            <Icon width={12} height={24} type="chevronLeft" />
            <div className="flex items-center">
              <h2 className="ml-2 pr-3 text-2xl font-semibold text-day-text-label-primary dark:text-white">
                Blocks
              </h2>
            </div>
          </button>
        </Dialog.Title>

        <div
          className="cursor-pointer rounded-full bg-white p-3 text-day-text-label-primary dark:bg-night-base-04 dark:text-white sm:hidden sm:p-2.5"
          onClick={() => toggleModal()}
        >
          <Icon type="remove" classNames="w-6 h-6 sm:w-5 sm:h-5" />
        </div>

        <div className="hidden flex-1 sm:block">
          <SearchBox
            placeholder="Search for cards or blocks"
            name="search"
            value={searchInput}
            handleChange={handleSearch}
          />
        </div>

        <div className="hidden items-center sm:flex">
          <DropdownInput
            name="order"
            options={ORDER_TYPES}
            value={orderBy}
            handleChange={handleOrderChange}
          />
        </div>
      </div>

      <div className="flex w-full justify-center pt-4 sm:hidden">
        <div className="flex w-full gap-2">
          <SearchBox
            placeholder="Search"
            name="search"
            value={searchInput}
            handleChange={handleSearch}
          />
          <BlockFiltersMobile
            orderBy={orderBy}
            onOrderChange={handleOrderChange}
            clearAllFilters={clearAllFilters}
          />
        </div>
      </div>

      {!!blocksSearch.length ? (
        <div className="mt-4 grid grid-cols-1 gap-4 pb-10 sm:mt-12 sm:gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {sortByDate(blocksSearch, orderBy).map((block) => (
            <div key={block.id} onClick={() => onSelect(block)}>
              <LibraryBlock block={block} hoverable={false} />
            </div>
          ))}
        </div>
      ) : (
        <div className="h-full w-full py-20 text-center text-sm italic opacity-50">
          No blocks found.
        </div>
      )}
    </div>
  )
}

export default LibraryModalBlocks
