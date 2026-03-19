import React, { useState } from 'react'
import { usePagination, DOTS } from '@/utils/hooks/usePagination'
import useScrollTo from '@/utils/hooks/useScroll'

import Icon from '@/components/shared/Icon'
import SelectInput from '@/components/shared/SelectInput'

const LIMIT_OPTIONS = [
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 15, label: '15' },
  { value: 20, label: '20' },
  { value: 25, label: '25' }
]

interface PaginationProps {
  limit: number
  onLimitChange: (value: number) => void
  totalPages: number
  onPageChange: (value: number) => void
  totalCount: number
  siblingCount: number
  currentPage: number
  pageSize: number
}

const Pagination: React.FC<PaginationProps> = ({
  limit,
  onLimitChange,
  totalPages,
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize
}) => {
  const [isVisible, setIsVisible] = useState(false)

  const { scrollToTop } = useScrollTo()
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  })

  if (!paginationRange) return

  // if (currentPage === 0 || paginationRange.length < 2) {
  //   return null
  // }

  const onNext = () => {
    onPageChange(currentPage + 1)
    scrollToTop()
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
    scrollToTop()
  }

  let lastPage = paginationRange[paginationRange.length - 1]

  let hasPrevPage = currentPage !== 1
  let hasNextPage = currentPage !== lastPage

  const selectedPage = new Array(totalPages).fill(0).map((_, index) => ({
    value: index + 1,
    label: `${index + 1}`
  }))

  const handlePageChange = (selectedPage: number) => {
    onPageChange(selectedPage)
    scrollToTop()
  }

  const toggleSelectInputs = () => {
    setIsVisible(!isVisible)
  }

  return (
    <>
      <div className="flex w-full flex-col items-center justify-between lg:flex-row">
        {!isVisible && (
          <div
            onClick={toggleSelectInputs}
            className="mb-4 flex self-end rounded-full p-3 text-white dark:bg-night-base-02 lg:hidden"
          >
            <Icon height={24} width={24} type="paginationMenu" />
          </div>
        )}
        <div className="order-2 flex max-w-[343px] items-center justify-center gap-2 lg:order-1 lg:justify-start">
          {totalCount > 0 && (
            <button
              className="mr-2 flex h-10 w-10 items-center gap-2 rounded-lg border border-solid border-[#47485e] bg-night-base-04 px-2 pt-1"
              disabled={!hasPrevPage}
              onClick={onPrevious}
            >
              <Icon type="paginationControlsLeft" />
            </button>
          )}
          {paginationRange.map((pageNumber: number | string, i) => {
            if (pageNumber === DOTS) {
              return (
                <div
                  className="h-10 w-10 rounded-lg bg-night-base-04 py-2.5 px-2 hover:text-white"
                  key={`pagination-${pageNumber}-${i}`}
                >
                  <Icon type="threeDots" />
                </div>
              )
            }

            return (
              <div
                key={`pagination-${pageNumber}-${i}`}
                className={`${
                  currentPage === pageNumber
                    ? 'h-10 rounded-lg bg-night-base-secondary-pressed py-2.5 px-4 text-black'
                    : 'h-10 cursor-pointer rounded-lg bg-night-base-04 py-2.5 px-4 text-[#c2c2c8] hover:text-white'
                }`}
                onClick={() => onPageChange(Number(pageNumber))}
              >
                {pageNumber}
              </div>
            )
          })}
          {totalCount > 0 && (
            <button
              className="ml-2 flex h-10 w-10 items-center gap-2 rounded-lg border border-solid border-[#47485e] bg-night-base-04 px-2.5 pt-1"
              disabled={!hasNextPage}
              onClick={onNext}
            >
              <Icon type="paginationControlsRight" />
            </button>
          )}
        </div>

        <div className="order-1 hidden lg:order-2 lg:flex">
          <div className="flex items-center justify-center gap-4">
            <h1>Choose page</h1>
            <div className="">
              <SelectInput
                options={selectedPage}
                value={currentPage}
                handleChange={handlePageChange}
                name={'page'}
                size={'small'}
                position={'up'}
              />
            </div>
            <h1>Display on page</h1>
            <div className="">
              <SelectInput
                options={LIMIT_OPTIONS}
                value={limit}
                handleChange={onLimitChange}
                name={'itemsPerPage'}
                size={'small'}
                position={'up'}
              />
            </div>
          </div>
        </div>

        {isVisible && (
          <div className="relative order-1 mb-4 flex w-[343px] rounded-[16px] bg-[#2b2c3e] p-3 lg:order-2 lg:hidden">
            <div
              className="absolute top-2 right-2 cursor-pointer rounded-full bg-white p-2 text-day-text-label-primary dark:bg-night-base-04 dark:text-white"
              onClick={toggleSelectInputs}
            >
              <Icon type="remove" width={16} height={16} />
            </div>
            <div className="mt-10 flex w-full flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div className="flex">
                  <h1>Choose page</h1>
                </div>
                <div className="flex">
                  <SelectInput
                    options={selectedPage}
                    value={currentPage}
                    handleChange={handlePageChange}
                    name={'page'}
                    size={'small'}
                    position={'up'}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <h1>Display on page</h1>
                <div className="">
                  <SelectInput
                    options={LIMIT_OPTIONS}
                    value={limit}
                    handleChange={onLimitChange}
                    name={'itemsPerPage'}
                    size={'small'}
                    position={'up'}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Pagination
