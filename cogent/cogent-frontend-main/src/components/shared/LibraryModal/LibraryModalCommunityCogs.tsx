import React, { useState, useContext } from 'react'
import LibraryModalCogsSearchContext from '@/components/shared/LibraryModal/state/LibraryModalCogsSearchContext'

import { Dialog } from '@headlessui/react'
import { default as LibraryCog } from '@/components/shared/Cog/index'
import Spinner from '@/components/shared/Spinner'
import Icon from '@/components/shared/Icon'
import Pagination from '@/components/shared/Pagination'
import SearchBox from '@/components/shared/SearchBox'
import DropdownInput from '@/components/shared/DropdownInput'
import CogFiltersMobile from '@/components/shared/LibraryModal/CogFiltersMobile'
import ButtonPrimary from '@/components/shared/ButtonPrimary'
import CogAuthor from '@/components/shared/Cog/CogAuthor'
import Tags from '@/components/shared/Tags'
import CommunitySearchContext from "@/components/community/store/CommunitySearchContext";

interface LibraryModalCogsProps {
  title: string
  toggleModal: () => void
  onSelect: (item: any) => void
}

export const ORDER_TYPES = [
  { label: 'From old to new', value: 'created_at asc' },
  { label: 'From new to old', value: 'created_at desc' }
]

const LibraryModalCommunityCogs: React.FC<LibraryModalCogsProps> = ({
  title,
  toggleModal,
  onSelect
}) => {
  const {
    cogs,
    refetchCogs,
    paginationMetadata,
    onPageChange,
    orderBy,
    onOrderChange,
    limit,
    onLimitChange,
    query,
    onQueryChange
  } = useContext(CommunitySearchContext)

  const [searchInput, setSearchInput] = useState<string>('')
  const [timer, setTimer] = useState<any>(null)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSearchInput(value)
    clearTimeout(timer)
    const newTimer = setTimeout(() => {
      onQueryChange(value)
    }, 1000)
    setTimer(newTimer)
  }

  const handleOrderChange = (value: string) => {
    onOrderChange(value)
  }

  return (
    <div className="scrollbar--hidden h-full overflow-hidden overflow-y-auto text-night-text">
      <div className="flex items-center justify-between gap-6 xl:gap-12">
        <div className="pointer-events-none absolute inset-x-0 bottom-0	z-[1] h-[50px] bg-gradient-to-t from-[#1E1E2C] opacity-90 sm:h-[8%] sm:h-1/4"></div>

        <div
          className="cursor-pointer rounded-full bg-white p-3 text-day-text-label-primary dark:bg-night-base-04 dark:text-white sm:hidden sm:p-2.5"
          onClick={() => toggleModal()}
        >
          <Icon type="remove" classNames="w-6 h-6 sm:w-5 sm:h-5" />
        </div>


      </div>

      <div className="flex h-full w-full justify-center pt-4 sm:hidden">
        <div className="flex w-full gap-2">
          <SearchBox
            placeholder="Search for cards or blocks"
            name="search"
            value={searchInput}
            handleChange={handleSearch}
          />
          <CogFiltersMobile />
        </div>
      </div>

      {!!cogs ? (
        <>
          {cogs.length ? (
            <div className="my-6 grid grid-cols-1 items-center justify-center gap-y-4 overflow-y-auto pb-10 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-6 lg:grid-cols-3 2xl:grid-cols-4">
              {cogs.map((cog: any) => (
                <div
                  key={cog.id}
                  className="cursor-pointer"
                  onClick={() => onSelect(cog)}
                >
                  <div className="pointer-events-none">
                    <LibraryCog
                      cog={cog}
                      key={`cog-${cog.id}`}
                      topLeft={<Tags tags={cog?.tags} />}
                      bottomLeft={
                        <CogAuthor
                          photoUrl={cog?.user?.photoUrl}
                          user={cog?.user}
                          iconPosition="left"
                        />
                      }
                      bottomRight={
                        <ButtonPrimary
                          classNames="bottom-4 right-8 radius-xl outline-none"
                          label="Play"
                          size="small"
                          iconPosition="right"
                          icon="play"
                        />
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full w-full py-20 text-center text-sm italic opacity-50">
              No cogs found.
            </div>
          )}
          <div className="text flex w-full text-night-text">
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
        </>
      ) : (
        <div className="flex h-[40vh] w-full  items-center justify-center text-night-text">
          <Spinner />
        </div>
      )}
    </div>
  )
}

export default LibraryModalCommunityCogs
