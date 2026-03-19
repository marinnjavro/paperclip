import React, { useEffect, useState } from 'react'
import { useMemo } from 'react'

export const DOTS = '...'

const range = (start: number, end: number) => {
  let length = end - start + 1
  return Array.from({ length }, (_, idx) => idx + start)
}

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage
}: {
  totalCount: number
  pageSize: number
  siblingCount: number
  currentPage: number
}) => {
  const [siblings, setSiblings] = useState(siblingCount)

  useEffect(() => {
    const handleResizeWindow = () => {
      setSiblings(window.innerWidth <= 640 ? 0 : 1)
    }
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener('resize', handleResizeWindow)
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener('resize', handleResizeWindow)
    }
  }, [])

  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize)

    const totalPageNumbers = siblings + 5

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount)
    }

    const leftSiblingIndex = Math.max(currentPage - siblings, 1)
    const rightSiblingIndex = Math.min(currentPage + siblings, totalPageCount)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 1 + 2 * siblings
      let leftRange = range(1, leftItemCount)

      return [...leftRange, DOTS, totalPageCount]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 1 + 2 * siblings
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      )
      return [firstPageIndex, DOTS, ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }
  }, [totalCount, pageSize, siblings, currentPage])

  return paginationRange
}
