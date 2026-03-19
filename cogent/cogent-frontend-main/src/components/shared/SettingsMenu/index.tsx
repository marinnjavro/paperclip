import Icon from '@/components/shared/Icon'
import SettingsMenuItem from '@/components/shared/SettingsMenu/SettingsMenuItem'

interface SettingsMenuProps {
  closeMenu: () => void
  actions: {
    label: string
    icon: string
    classNames: string
    onClick: () => void
  }[]
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({ closeMenu, actions }) => {
  return (
    <>
      <div
        className="fixed inset-0"
        onClick={(e) => {
          e.stopPropagation()
          closeMenu()
        }}
      ></div>
      <div
        className="rounded-2xl border border-solid border-opacity-silver border-opacity-20 bg-white text-xs drop-shadow-md dark:border-white dark:border-opacity-10 dark:bg-night-base-04 sm:rounded-2xl sm:text-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between border-b border-solid border-opacity-silver border-opacity-20 px-4 py-3 font-bold text-day-text-label-primary dark:border-white dark:border-opacity-10 dark:text-white">
          <span>Settings</span>
          <div
            className="group cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              closeMenu()
            }}
          >
            <Icon
              type="settingsMenu"
              width={24}
              height={24}
              className="text-day-text-label-secondary dark:text-night-static-icon hover:text-day-text-label-primary dark:group-hover:text-white"
            />
          </div>
        </div>

        <div className="z-50 flex flex-col">
          {actions.map((action) => (
            <div
              key={`block-menu-item-${action.label}`}
              onClick={action.onClick}
            >
              <SettingsMenuItem
                label={action.label}
                icon={action.icon}
                classNames={action.classNames}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default SettingsMenu
