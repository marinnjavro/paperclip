import { useContext } from 'react'
import { useAuth } from 'lib/auth'
import { useRouter } from 'next/router'
import Link from 'next/link'
import ThemeContext from '@/store/ThemeContext'
import useLocalStorage from '@/utils/hooks/useLocalStorage'

import Logo from '@/components/shared/Logo'
import Icon from '@/components/shared/Icon'
import StaffNav from '@/components/layout/TopMenu/StaffNav'
import StudentNav from '@/components/layout/TopMenu/StudentNav'

type TopMenuProps = {
  buttonsLeft?: JSX.Element
  buttonsRight?: JSX.Element
  buttonsMobile?: JSX.Element
  buttonPrimary?: JSX.Element
  handleBackClick?: () => void
}

export default function TopMenu(props: TopMenuProps): JSX.Element {
  const { buttonsMobile, handleBackClick } = props
  const router = useRouter()
  const { signOut } = useAuth()

  const [cogentUser] = useLocalStorage('cogentUser', '')

  const themeCtx: { isDarkMode?: boolean; toggleThemeHandler: () => void } =
    useContext(ThemeContext)

  function toggleThemeHandler(): void {
    themeCtx.toggleThemeHandler()
  }

  const signOutUser = () => {
    signOut()
    router.push('/')
  }

  const getNavType = () => {
    if (
      cogentUser.roles.includes('staff') ||
      cogentUser.roles.includes('admin') ||
      cogentUser.roles.includes('super_admin')
    ) {
      return 'staff'
    }

    return 'student'
  }

  // prettier-ignore
  const nav: { [key: string]: JSX.Element } = {
    'staff': <StaffNav {...props} signOut={signOutUser} />,
    'student': <StudentNav {...props} signOut={signOutUser} />
  }

  return (
    <>
      <div className="sticky top-0 z-50 bg-night-base-01 flex w-full items-center justify-between gap-2 border-b border-solid border-white border-opacity-10 px-3 sm:hidden">
        <div>
          {!!handleBackClick && (
            <div className="flex items-center" onClick={handleBackClick}>
              <div className="flex items-center">
                <Icon
                  type="chevronLeft"
                  classNames="opacity-70 dark:opacity-100 text-day-text-label-primary
              dark:text-white"
                />
                <h2 className="ml-2 text-xl font-semibold text-day-text-label-primary dark:text-white">
                  Back
                </h2>
              </div>
            </div>
          )}
        </div>
        <div className=" mt-1 h-[60px] w-[95px] p-0 sm:h-[32px] sm:w-[130px]">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className=" flex gap-x-5">{buttonsMobile}</div>
      </div>

      {nav[getNavType()]}
    </>
  )
}
