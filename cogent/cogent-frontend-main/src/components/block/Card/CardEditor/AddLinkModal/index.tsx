import React, { useState, useContext, Fragment } from 'react'
import { CARD_TYPES } from '@/pages/library'
import { filterOpeningCards } from '@/utils/filterData'
import LibraryModalCardsSearchContext from '@/components/shared/LibraryModal/state/LibraryModalCardsSearchContext'

import { Dialog, Transition } from '@headlessui/react'
import Spinner from '@/components/shared/Spinner'
import Pagination from '@/components/shared/Pagination'
import SearchBox from '@/components/shared/SearchBox'
import Icon from '@/components/shared/Icon'
import SmallCard from '@/components/shared/SmallCard'
import DropdownCheckboxInput from '@/components/shared/DropdownCheckboxInput'
import CardFiltersMobile from '@/components/shared/LibraryModal/CardFiltersMobile'
import AddLinkTabs from '@/components/block/Card/CardEditor/AddLinkModal/AddLinkTabs'
import { AddLinkContextProvider } from '@/components/block/Card/CardEditor/AddLinkModal/AddLinkContext'

export type AddLinkTabType = {
  title: string
  type: 'cards' | 'cogs' | 'community' | 'create'
}

export const ADD_LINK_TABS: AddLinkTabType[] = [
  { title: 'Cards', type: 'cards' },
  { title: 'My cogs', type: 'cogs' },
  { title: 'Community', type: 'community' },
  { title: 'Create card +', type: 'create' }
]

interface AddLinkModalProps {
  toggleModal: () => void
  title: string
  isOpen: boolean
  isVisible: boolean
  formatLink: (cogId: string, verticalCardId: string, blockId: string) => void
  onSelect: (item: any) => void
}

const AddLinkModal: React.FC<AddLinkModalProps> = ({
  toggleModal,
  title,
  isOpen,
  isVisible,
  formatLink,
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
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={toggleModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-x-0 top-0 h-full overflow-y-auto sm:overflow-hidden">
          <div className="flex min-h-full justify-center pt-10 text-center sm:px-6 sm:py-[65px]">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="h-full w-full transform overflow-hidden rounded-2xl border border-solid border-white border-opacity-10 bg-night-base-02 p-4 text-left align-middle shadow-xl transition-all sm:h-[85vh] sm:border-none sm:p-6">
                <div className="scrollbar--hidden h-full overflow-hidden overflow-y-auto text-night-text">
                  <div className="flex items-center justify-between gap-6 xl:gap-12">
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
                      <CardFiltersMobile />
                    </div>
                  </div>

                  <AddLinkContextProvider>
                    <AddLinkTabs onSelect={onSelect} />
                  </AddLinkContextProvider>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default AddLinkModal
