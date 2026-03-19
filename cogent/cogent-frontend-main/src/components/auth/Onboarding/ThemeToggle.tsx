import { useContext } from 'react'
import ThemeContext from '@/store/ThemeContext'
import ThemeDark from '@/public/assets/icons/theme-dark.svg'
import ThemeLight from '@/public/assets/icons/theme-light.svg'

const ThemeToggle = () => {
  const themeCtx: { isDarkTheme?: boolean; toggleThemeHandler: () => void } =
    useContext(ThemeContext)

  const toggleThemeHandler = (): void => {
    themeCtx.toggleThemeHandler()
  }

  const ThemeRadio = ({ isSelected }: { isSelected: boolean }) => (
    <div
      className={`${
        isSelected
          ? 'border-day-base-primary bg-day-base-primary'
          : 'border-day-base-06 dark:border-white dark:border-opacity-10 dark:bg-white dark:bg-opacity-10'
      } flex h-5 w-5 items-center justify-center rounded-full border border-solid`}
    >
      {isSelected && <div className="h-2.5 w-2.5 rounded-full bg-white"></div>}
    </div>
  )

  const ThemeButton = ({
    label,
    icon,
    isActive
  }: {
    label: string
    icon: JSX.Element
    isActive: boolean
  }) => (
    <button
      className={`${
        isActive
          ? 'border-day-base-primary'
          : 'border-day-base-06 dark:border-white dark:border-opacity-10'
      } flex w-full items-center justify-between rounded-2xl border px-3 py-4 xxs:px-8 xxs:py-4 xs:px-6`}
      onClick={() => toggleThemeHandler()}
    >
      <div className="flex items-center">
        {icon}
        <span
          className={`${
            isActive
              ? 'text-support-gray-006 dark:text-white'
              : 'text-night-text'
          } ml-3 mr-2`}
        >
          {label}
        </span>
      </div>
      <ThemeRadio isSelected={isActive} />
    </button>
  )

  return (
    <div className="border-b border-solid border-day-base-06 pb-10 dark:border-white dark:border-opacity-[15%] ">
      <h3 className="pb-5 text-sm font-bold text-support-gray-006 dark:text-white">
        Choose a theme
      </h3>
      <div className="flex w-full flex-col gap-5 sm:flex-row">
        <ThemeButton
          isActive={!!themeCtx.isDarkTheme}
          icon={
            <ThemeDark
              className={`${
                !!themeCtx.isDarkTheme
                  ? 'text-day-base-primary'
                  : 'text-day-base-05'
              } h-10 w-10 sm:h-14 sm:w-14`}
            />
          }
          label="Dark version"
        />
        <ThemeButton
          isActive={!themeCtx.isDarkTheme}
          icon={
            <ThemeLight
              className={`${
                !themeCtx.isDarkTheme
                  ? 'text-day-base-primary'
                  : 'text-night-base-06'
              } h-10 w-10 sm:h-14 sm:w-14`}
            />
          }
          label="Light version"
        />
      </div>
    </div>
  )
}

export default ThemeToggle
