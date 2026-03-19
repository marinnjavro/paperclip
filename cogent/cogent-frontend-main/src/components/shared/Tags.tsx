import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { Transition } from '@headlessui/react'
import Tag from '@/components/shared/Tag'
import AllTagsMenu from '@/components/shared/AllTagsMenu/index'
import { useRouter } from 'next/router'

interface TagsProps {
  tags: any | undefined | null
  onEdit?: () => void
}

const rightGap = 30

const getLastVisibleTag = ({
  necessaryWidths,
  containerWidth,
  moreWidth
}: {
  necessaryWidths: number[]
  containerWidth: number
  moreWidth: number
}) => {
  if (!necessaryWidths?.length) return 0
  // if the last width is less than the container width
  // then we're good - everything will fit
  if (necessaryWidths[necessaryWidths.length - 1] < containerWidth) {
    return necessaryWidths.length - 1
  }

  const visibleTags = necessaryWidths.filter((width) => {
    return width + moreWidth < containerWidth
  })

  return visibleTags.length ? visibleTags.length - 1 : 0
}

const getPrecalculatedWidths = (element: HTMLElement) => {
  const { width: containerWidth, left: containerLeft } =
    element.getBoundingClientRect()
  const children = Array.from(element.childNodes) as HTMLElement[]

  let moreWidth = 0
  const necessaryWidths = children.reduce<number[]>((result, node) => {
    // extract "more" button width and skip the calculations
    if (node.getAttribute('id') === 'more') {
      moreWidth = node.getBoundingClientRect().width
      return result
    }

    const rect = node.getBoundingClientRect()
    const width = rect.width + (rect.left - containerLeft) + rightGap

    return [...result, width]
  }, [])

  return {
    moreWidth,
    necessaryWidths,
    containerWidth
  }
}

const Tags: React.FC<TagsProps> = ({ tags, onEdit }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [lastVisibleMenuTag, setLastVisibleMenuTag] = useState(-1)
  const [showTagsMenu, setShowTagsMenu] = useState<boolean>(false)
  const [dimensions, setDimensions] = useState<{
    necessaryWidths: number[]
    moreWidth: number
  }>({
    necessaryWidths: [],
    moreWidth: 0
  })
  const router = useRouter()

  const handleTagClick = (name: string) => {
    const currentQuery = { ...router.query }
    currentQuery.query = name
    router.push({
      pathname: router.pathname,
      query: currentQuery
    })
  }

  // calculate last visible element here
  useLayoutEffect(() => {
    if (!ref.current) return
    const { moreWidth, necessaryWidths, containerWidth } =
      getPrecalculatedWidths(ref.current)

    const tagIndex = getLastVisibleTag({
      containerWidth,
      necessaryWidths,
      moreWidth
    })
    setDimensions({ moreWidth, necessaryWidths })
    setLastVisibleMenuTag(tagIndex)
  }, [])

  // listen for resize here and re-calculate the last visible element
  useEffect(() => {
    const listener = () => {
      if (!ref.current) return
      const newIndex = getLastVisibleTag({
        containerWidth: ref.current.getBoundingClientRect().width,
        necessaryWidths: dimensions.necessaryWidths,
        moreWidth: dimensions.moreWidth
      })

      if (newIndex !== lastVisibleMenuTag) {
        setLastVisibleMenuTag(newIndex)
      }
    }

    window.addEventListener('resize', listener)

    return () => {
      window.removeEventListener('resize', listener)
    }
  }, [lastVisibleMenuTag, dimensions, ref])

  const moreButtonElement = (
    <div
      onClick={(e) => {
        e.stopPropagation()
        e.nativeEvent.preventDefault()
        openTagsMenu()
      }}
      className="cursor-pointer whitespace-nowrap rounded-xl border border-solid border-day-text-label-secondary-inverse px-2.5 py-1.5 text-xs text-day-text-label-secondary-inverse hover:bg-day-base-04 dark:border-white dark:border-opacity-10 dark:hover:border-opacity-20 dark:hover:bg-night-base-02 dark:hover:text-white"
      id="more"
    >
      All {tags.length} tags
    </div>
  )

  const isMoreVisible = lastVisibleMenuTag < tags.length - 1
  const filteredTags = tags.filter(
    (tag: any, index: number) => index <= lastVisibleMenuTag
  )

  if (lastVisibleMenuTag === -1) {
    return (
      <div className="flex w-full gap-2" ref={ref}>
        {tags.map((tag: string, index: any) => (
          <Tag key={`tag-${index}`} name={tag} />
        ))}
        {moreButtonElement}
      </div>
    )
  }

  const openTagsMenu = () => {
    setShowTagsMenu(true)
  }

  const closeTagsMenu = () => {
    setShowTagsMenu(false)
  }

  return (
    <div
      className="flex gap-2"
      ref={ref}
      onClick={(e) => {
        e.stopPropagation()
        e.nativeEvent.preventDefault()
      }}
    >
      <Transition
        appear={true}
        show={showTagsMenu}
        className="absolute z-10 w-4/5 xs:w-1/2"
      >
        <Transition.Child
          className="duration-00 ease-in-out"
          enter="transition-opacity duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <AllTagsMenu tags={tags} closeMenu={closeTagsMenu} onEdit={onEdit} />
        </Transition.Child>
      </Transition>
      {filteredTags.map((tag: string, index: any) => (
        <Tag
          key={`tag-${index}`}
          name={tag}
          onClick={() => handleTagClick(tag)}
        />
      ))}
      {isMoreVisible && moreButtonElement}
    </div>
  )
}

export default Tags
