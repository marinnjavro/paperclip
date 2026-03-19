import { useState } from 'react'
import _ from 'lodash'
import { Card } from 'src/__generated__/graphql'

import { Transition } from '@headlessui/react'
import Checkbox from '@/components/shared/Checkbox'
import Icon from '@/components/shared/Icon'
import SmallCard from '@/components/shared/SmallCard'
import SettingsMenu from '@/components/shared/SettingsMenu'
import { useRouter } from 'next/router'

interface LibraryCardProps {
  card: Card
  isMassEditing: boolean
  isSelected: boolean
  addToCog: (card: Card) => void
  toggleSelection: (card: Card) => void
  openMassEditor: () => void
}
const LibraryCard: React.FC<LibraryCardProps> = ({
  card,
  isMassEditing,
  isSelected,
  addToCog,
  toggleSelection,
  openMassEditor
}) => {
  const router = useRouter()

  const [showMenu, setShowMenu] = useState<boolean>(false)

  const openMenu = () => {
    setShowMenu(true)
  }

  const closeMenu = () => {
    setShowMenu(false)
  }

  const toCard = () => {
    router.push({
      pathname: `/cogs/${card?.block?.cogId}/blocks/${card.blockId}/edit`,
      query: { focusedCard: card?.id }
    })
  }

  const handleSelect = () => {
    closeMenu()
    openMassEditor()
    toggleSelection(card)
  }

  return (
    <div className="group relative" key={card.id}>
      <Transition
        appear={true}
        show={showMenu}
        className="absolute top-0 right-0 z-10 sm:w-[190px]"
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
                onClick: () => addToCog(card)
              },
              {
                label: 'Edit',
                icon: 'editWrite',
                classNames:
                  'text-day-text-label-secondary-inverse dark:text-dark-text-secondary-02 dark:hover:text-white',
                onClick: () => toCard()
              }
              // {
              //   label: 'Pin',
              //   icon: 'pin',
              //   classNames:
              //     'text-day-text-label-secondary-inverse dark:text-dark-text-secondary-02 dark:hover:text-white',
              //   onClick: () => {}
              // }
            ]}
            closeMenu={closeMenu}
          />
        </Transition.Child>
      </Transition>

      {isMassEditing ? (
        <div
          className="group absolute top-3 right-3 z-[1] cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        >
          <Checkbox
            name={`checkbox-${card.id}`}
            isChecked={isSelected}
            handleCheck={handleSelect}
            size="lg"
          />
        </div>
      ) : (
        <div
          className="group absolute top-3 right-3 z-[1] hidden cursor-pointer group-hover:block"
          onClick={(e) => {
            e.stopPropagation()
            openMenu()
          }}
        >
          <Icon
            type="settingsMenu"
            width={20}
            height={20}
            className="text-day-text-label-secondary-inverse hover:text-day-text-label-primary dark:text-night-text "
          />
        </div>
      )}

      <div className="h-[278px] sm:h-[350px] sm:w-[182px]">
        <SmallCard card={card} />
      </div>
    </div>
  )
}

export default LibraryCard
