import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { Cog } from 'src/__generated__/graphql'

import SettingsMenu from '@/components/shared/SettingsMenu'
import useConfirm from '@/components/shared/ConfirmModal/useConfirm'
import Icon from '@/components/shared/Icon'

const Prompt = dynamic(() => import('@/components/shared/Prompt'))

interface CogSettingsMenuProps {
  cog: Cog
  deleteCog: () => void
  pinCog: (isPinned: boolean, id: string) => void
  editCog?: () => void
  duplicateCog: () => void
  onClick?: () => void
}

const CogSettingsMenu: React.FC<CogSettingsMenuProps> = ({
  cog,
  deleteCog,
  pinCog,
  editCog,
  duplicateCog,
  onClick
}) => {
  const router = useRouter()

  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [showTagsMenu, setShowTagsMenu] = useState<boolean>(false)
  const [shouldRenderTags, setShouldRenderTags] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { RenderConfirmModal, requestConfirm } = useConfirm(
    'Delete this cog?',
    true
  )

  const handleDeleteCog = async () => {
    const result = await requestConfirm()
    if (result) {
      deleteCog()
    }
  }

  useEffect(() => {
    setShouldRenderTags(true)
  }, [])

  const openMenu = () => {
    setShowMenu(true)
  }

  const closeMenu = () => {
    setShowMenu(false)
  }

  const openTagsMenu = () => {
    setShowTagsMenu(true)
  }

  const closeTagsMenu = () => {
    setShowTagsMenu(false)
  }

  const togglePinned = (isPinned: boolean) => {
    !!isPinned ? setIsModalOpen(true) : pinCog(!!cog.isPinned, cog.id)
  }

  const unpinCog = () => {
    pinCog(!!cog.isPinned, cog.id)
  }

  const getTimePassed = () => {
    const startDate = new Date(cog.createdAt)
    const currentDate = new Date()

    const oneDay = 24 * 60 * 60 * 1000
    const diffInTime = currentDate.getTime() - startDate.getTime()
    const diffInDays = Math.floor(diffInTime / oneDay)
    const diffInMonths = Math.floor(diffInTime / (oneDay * 30))

    if (diffInDays === 0) {
      return 'Today'
    } else if (diffInDays < 30) {
      if (diffInDays === 1) return diffInDays + ' day ago'
      return diffInDays + ' days ago'
    } else if (diffInDays > 30) {
      if (diffInMonths === 1) return diffInMonths + ' month ago'
      return diffInMonths + ' months ago'
    }
  }

  const toCog = () => {
    router.push(`/cogs/${cog.id}/edit`)
  }

  return (
    <>
      <div
        className="group cursor-pointer"
        onClick={(e) => {
          e.stopPropagation()
          openMenu()
        }}
      >
        <Icon
          type="settingsMenu"
          width={20}
          height={20}
          className="text-day-text-label-secondary-inverse hover:text-day-text-label-primary dark:text-night-text dark:group-hover:text-white"
        />
      </div>
      <div
        className="absolute -top-4 -right-4 w-[237px] sm:-right-4 sm:-top-5"
        style={{ zIndex: '10' }}
      >
        <Prompt
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          text="Would you like to unpin the selected cog?"
          alignContent="center"
          showClose={false}
          actions={[
            {
              text: 'Unpin',
              function: unpinCog
            },
            {
              text: 'Cancel',
              function: () => setIsModalOpen(false)
            }
          ]}
        />

        {RenderConfirmModal}
        {showMenu && (
          <SettingsMenu
            actions={[
              {
                label: 'Duplicate',
                icon: 'duplicate',
                classNames:
                  'text-day-text-label-secondary-inverse dark:text-dark-text-secondary-02 dark:hover:text-white',
                onClick: () => duplicateCog()
              },
              {
                label: 'Edit',
                icon: 'editWrite',
                classNames:
                  'text-day-text-label-secondary-inverse dark:text-dark-text-secondary-02 dark:hover:text-white',
                onClick: !!editCog ? () => editCog() : () => {}
              },
              {
                label: `${!!cog?.isPinned ? 'Unpin' : 'Pin'}`,
                icon: 'pin',
                classNames:
                  'text-day-text-label-secondary-inverse dark:text-dark-text-secondary-02 dark:hover:text-white',
                onClick: () => pinCog(!!cog?.isPinned, cog.id)
              },
              {
                label: 'Delete',
                icon: 'delete',
                classNames:
                  'text-support-red-402 dark:hover:text-support-red-405',
                onClick: () => handleDeleteCog()
              }
            ]}
            closeMenu={closeMenu}
          />
        )}
      </div>
    </>
  )
}
export default CogSettingsMenu
