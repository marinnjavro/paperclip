import { Fragment } from 'react'
import Link from 'next/link'

import { Menu, Transition } from '@headlessui/react'
import Logo from '@/components/shared/Logo'
import Icon from '@/components/shared/Icon'
import MenuHeader from '@/components/layout/TopMenu/MenuHeader'
import { NavItem } from '@/components/layout/TopMenu/NavItem'
import NavProfile from '@/components/layout/TopMenu/NavProfile'

import ButtonSecondary from '@/components/shared/ButtonSecondary'

type StudentNavProps = {
  buttonsLeft?: JSX.Element
  buttonsRight?: JSX.Element
  buttonsMobile?: JSX.Element
  handleBackClick?: () => void
  signOut: () => void
}

const StudentNav: React.FC<StudentNavProps> = ({
  buttonsLeft,
  buttonsRight,
  buttonsMobile,
  signOut
}) => {
  return (
    <div className ="sticky top-0 z-50 bg-night-base-01 w-full hidden sm:block">
    <Menu as="div" className="relative hidden w-full text-left sm:inline-block">
      <div className="flex min-h-[4rem] w-full items-center justify-between border-b border-solid border-opacity-silver border-opacity-20 px-3 dark:border-white dark:border-opacity-10">
        <div className="mr-4 flex items-center">
          <Menu.Button className="cursor-pointer rounded-xl bg-day-base-02 p-3 text-day-text-label-primary-inverse dark:bg-night-base-02 dark:text-white">
            <Icon type="burgerMenu" width={25} height={25} />
          </Menu.Button>
          <div className="ml-2 mt-1 h-[40px] w-[80px] sm:h-[32px] sm:w-[130px]">
            <Link href="/">
              <Logo />
            </Link>
          </div>
        </div>
        <div className="hidden flex-1 flex-row justify-end sm:flex">
          <div className="flex gap-x-5">{buttonsLeft}</div>
          <div className="flex gap-x-5">
            <ButtonSecondary
              label="Sign Out"
              icon="logout"
              onClick={() => signOut()}
            />
            {buttonsRight}
          </div>
        </div>
        <div className="flex flex-1 flex-row justify-end sm:hidden">
          <div className="flex gap-x-5">{buttonsMobile}</div>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-100"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-100"
        >
          <Menu.Items className="fixed inset-y-0 left-0 z-50 flex h-full h-screen w-full max-w-sm flex-col justify-between gap-1.5 divide-gray-100 bg-day-base-02 shadow-lg ring-1 ring-support-gray-006 ring-opacity-5 focus:outline-none dark:bg-night-base-02 xxs:w-10/12">
            <div>
              <Menu.Item>
                {({ close }) => (
                  <div onClick={close}>
                    <MenuHeader />
                  </div>
                )}
              </Menu.Item>

              <div>
                <Menu.Item>
                  {({ active }) => (
                    <NavItem
                      label="Community"
                      icon="community"
                      href="/community"
                    />
                  )}
                </Menu.Item>
              </div>

              <div>
                <Menu.Item>
                  {({ active }) => (
                    <NavItem label="My cogs" icon="library" href="/cogs" />
                  )}
                </Menu.Item>
              </div>
            </div>

            <div>
              <NavProfile />
            </div>
          </Menu.Items>
        </Transition>
      </div>
    </Menu>
  </div>
  )
}

export default StudentNav
