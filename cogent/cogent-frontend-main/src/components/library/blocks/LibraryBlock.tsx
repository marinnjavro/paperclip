import { useState } from 'react'
import { useRouter } from 'next/router'
import { Card, Block } from 'src/__generated__/graphql'
import { sortByPosition } from '@/utils/functions'
import useUrl from '@/utils/hooks/useUrl'

import { Transition } from '@headlessui/react'
import Icon from '@/components/shared/Icon'
import BlockElements from '@/assets/static/elements/block-elements.svg'
import BlockElementsLight from '@/assets/static/elements/block-elements-light.svg'
import BlockPreview from '@/components/shared/BlockPreview'
import SettingsMenu from '@/components/shared/SettingsMenu'
import Checkbox from '@/components/shared/Checkbox'

interface LibraryBlockProps {
  block: Block
  isSelected?: boolean
  isMassEditing?: boolean
  deleteBlock?: (id: string) => void
  toggleSelection?: (block: Block) => void
  addToCog?: (block: Block) => void
  openMassEditor?: () => void
  hoverable?: boolean
  showCogName?: boolean
}

const LibraryBlock: React.FC<LibraryBlockProps> = ({
  block,
  isSelected = false,
  isMassEditing = false,
  deleteBlock = () => {},
  addToCog = () => {},
  toggleSelection = () => {},
  openMassEditor = () => {},
  hoverable = true,
  showCogName = false
}) => {
  const router = useRouter()
  const { toCog } = useUrl()

  const [showMenu, setShowMenu] = useState<boolean>(false)

  const getSortableCards = (cards: Card[] | undefined | null) => {
    if (!cards) return []

    const sortableCards = sortByPosition(
      cards.filter((card) => card.cardType !== 'opening' && !card.parentCardId)
    )
    if (!!sortableCards) {
      return sortableCards
    }
    return []
  }

  const openMenu = () => {
    setShowMenu(true)
  }

  const closeMenu = () => {
    setShowMenu(false)
  }

  const toBlock = () => {
    router.push({
      pathname: `/cogs/${block?.cogId}/blocks`,
      query: { blockId: block?.id }
    })
  }

  const handleSelect = () => {
    closeMenu()
    openMassEditor()
    toggleSelection(block)
  }

  return (
    <div className="text-night-text">
      <div className="cog-header mx-1.5 font-bold text-day-text-label-primary dark:text-white">
        <p className="truncate pb-3 text-xs sm:pb-4 sm:text-lg">
          {block?.name}
        </p>
      </div>

      <div
        className={`${
          hoverable ? 'hover:bg-day-base-04 dark:hover:bg-night-base-02 ' : ''
        } group relative flex h-[200px] h-full w-full cursor-pointer flex-col justify-center rounded-3xl border border-solid border-opacity-silver border-opacity-20 bg-day-base-03 dark:border-white dark:border-opacity-10 dark:bg-night-base-03 xs:h-[270px] sm:h-[260px]`}
      >
        <Transition
          appear={true}
          show={showMenu}
          className="absolute top-0 right-0 z-10 w-[237px] sm:top-1.5 sm:right-1.5"
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
            <SettingsMenu
              actions={[
                {
                  label: 'Choose',
                  icon: 'choose',
                  classNames:
                    'text-day-text-label-secondary-inverse dark:text-dark-text-secondary-02 dark:hover:text-white',
                  onClick: () => handleSelect()
                },
                {
                  label: 'Add To Cog',
                  icon: 'arrowsMoveRight',
                  classNames:
                    'text-day-text-label-secondary-inverse dark:text-dark-text-secondary-02 dark:hover:text-white',
                  onClick: () => addToCog(block)
                },
                {
                  label: 'Edit',
                  icon: 'editWrite',
                  classNames:
                    'text-day-text-label-secondary-inverse dark:text-dark-text-secondary-02 dark:hover:text-white',
                  onClick: () => toBlock()
                },
                {
                  label: 'Pin',
                  icon: 'pin',
                  classNames:
                    'text-day-text-label-secondary-inverse dark:text-dark-text-secondary-02 dark:hover:text-white',
                  onClick: () => {}
                }
              ]}
              closeMenu={closeMenu}
            />
          </Transition.Child>
        </Transition>

        {hoverable &&
          (isMassEditing ? (
            <div className="group absolute top-1 right-1 cursor-pointer p-2 sm:top-2.5 sm:right-2.5">
              <div className="sm:hidden">
                <Checkbox
                  name={`checkbox-${block?.id}`}
                  isChecked={isSelected}
                  handleCheck={handleSelect}
                  size="2xl"
                />
              </div>
              <div className="hidden sm:block">
                <Checkbox
                  name={`checkbox-${block?.id}`}
                  isChecked={isSelected}
                  handleCheck={handleSelect}
                  size="lg"
                />
              </div>
            </div>
          ) : (
            <div
              className="group absolute top-1 right-1 hidden cursor-pointer p-2 group-hover:block sm:top-2.5 sm:right-2.5"
              onClick={(e) => {
                e.stopPropagation()
                openMenu()
              }}
            >
              <Icon
                type="settingsMenu"
                className="text-day-text-label-secondary-inverse hover:text-day-text-label-primary dark:text-night-text "
              />
            </div>
          ))}

        <div className="flex h-full w-full items-center justify-center">
          {!!block?.cards?.collection &&
          getSortableCards(block?.cards?.collection).length !== 0 ? (
            <div className="flex w-full items-center justify-center px-7 py-9 sm:px-8 sm:py-10">
              <BlockPreview
                cards={getSortableCards(block?.cards?.collection)}
                length={5}
              />
            </div>
          ) : (
            <div className="flex w-full items-center justify-center px-7 py-9 sm:px-8 sm:py-10">
              <div className="hidden w-full dark:block">
                <BlockElements width="100%" height="100%" />
              </div>
              <div className="h-full w-full dark:hidden">
                <BlockElementsLight width="100%" height="100%" />
              </div>
            </div>
          )}
        </div>
      </div>
      {showCogName && (
        <div
          className="mx-1.5 flex cursor-pointer gap-1 pt-4 text-opacity-turquoise"
          onClick={() => (!!block?.cog?.id ? toCog(block?.cog?.id) : null)}
        >
          <Icon classNames="sm:hidden" width={16} height={16} type="cog" />
          <Icon classNames="hidden sm:inline-block" type="cog" />
          <p className="truncate text-xxs underline underline-offset-4 sm:text-base">
            {block?.cog?.name}
          </p>
        </div>
      )}
    </div>
  )
}

export default LibraryBlock
