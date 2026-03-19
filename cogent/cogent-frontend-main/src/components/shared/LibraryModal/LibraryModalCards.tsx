import React, { useState, useContext } from 'react'
import { CARD_TYPES } from '@/pages/library'
import { filterOpeningCards } from '@/utils/filterData'
import LibraryModalCardsSearchContext from '@/components/shared/LibraryModal/state/LibraryModalCardsSearchContext'

import { Dialog } from '@headlessui/react'
import Spinner from '@/components/shared/Spinner'
import Pagination from '@/components/shared/Pagination'
import SearchBox from '@/components/shared/SearchBox'
import Icon from '@/components/shared/Icon'
import SmallCard from '@/components/shared/SmallCard'
import DropdownCheckboxInput from '@/components/shared/DropdownCheckboxInput'
import CardFiltersMobile from '@/components/shared/LibraryModal/CardFiltersMobile'

interface LibraryModalCardsProps {
  title: string
  toggleModal: () => void
  onSelect: (item: any) => void
}

const LibraryModalCards: React.FC<LibraryModalCardsProps> = ({
  title,
  toggleModal,
  onSelect
}) => {
  const {
    cards,
    onCardTypeChange,
    cardTypes,
    limit,
    onLimitChange,
    onQueryChange,
    paginationMetadata,
    onPageChange
  } = useContext(LibraryModalCardsSearchContext)

  const [searchInput, setSearchInput] = useState<string>('')
  const [timer, setTimer] = useState<any>(null)

  const handleTypesChange = (value: string[]) => {
    onCardTypeChange(value)
  }

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target
    setSearchInput(value)
    clearTimeout(timer)
    const newTimer = setTimeout(() => {
      onQueryChange(value)
    }, 1000)
    setTimer(newTimer)
  }

  return (
    <div className="scrollbar--hidden h-full overflow-hidden overflow-y-auto text-night-text">
      {/* <div className="flex items-center justify-between gap-6 xl:gap-12">
        <Dialog.Title
          as="h3"
          className="w-full min-w-[160px] shrink-0	text-lg font-bold text-white sm:w-min sm:text-xl xl:whitespace-nowrap"
        >
          {title}
        </Dialog.Title>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[50px] bg-gradient-to-t from-[#1E1E2C] opacity-90 sm:h-[8%] sm:h-1/4"></div>

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
            handleChange={handleSearchInputChange}
          />
        </div>

        <div className="hidden items-center sm:flex">
          <DropdownCheckboxInput
            icon="filters"
            options={CARD_TYPES}
            values={!!cardTypes ? cardTypes : []}
            onChange={handleTypesChange}
          />
          <div
            className="ml-5 cursor-pointer rounded-full bg-white p-2.5 text-day-text-label-primary dark:bg-night-base-04 dark:text-white"
            onClick={() => toggleModal()}
          >
            <Icon type="remove" width={20} height={20} />
          </div>
        </div>
      </div>

      <div className="flex w-full justify-center pt-4 sm:hidden">
        <div className="flex w-full gap-2">
          <SearchBox
            placeholder="Search for cards or blocks"
            name="search"
            value={searchInput}
            handleChange={handleSearchInputChange}
          />
          <CardFiltersMobile />
        </div>
      </div> */}

      {!!cards ? (
        cards.length ? (
          <div>
            <div className="mx-0 mt-[30px] grid h-full grid-cols-2 gap-4  pb-10 text-night-text xs:grid-cols-3 sm:mx-7 sm:flex sm:flex-wrap sm:gap-6">
              {filterOpeningCards(cards).map((card: any) => (
                <div
                  key={card.id}
                  className="cursor-pointer"
                  onClick={() => onSelect(card)}
                >
                  <div className="aspect-ratio--wrapper--9-16 flex w-full justify-center sm:h-[350px] sm:w-[184px]">
                    <div className="aspect-ratio--content">
                      <SmallCard card={card} hoverable={false} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex h-full w-full justify-center text-night-text">
              <Pagination
                siblingCount={1}
                currentPage={paginationMetadata?.currentPage}
                totalPages={paginationMetadata?.totalPages}
                totalCount={paginationMetadata?.totalCount}
                pageSize={paginationMetadata?.limitValue}
                limit={limit}
                onLimitChange={(limit: number) => onLimitChange(limit)}
                onPageChange={(page: number) => onPageChange(page)}
              />
            </div>
          </div>
        ) : (
          <div className="h-full w-full py-20 text-center text-sm italic opacity-50">
            No cards found.
          </div>
        )
      ) : (
        <div className="flex h-[40vh] w-full  items-center justify-center text-night-text">
          <Spinner />
        </div>
      )}
    </div>
  )
}

export default LibraryModalCards
