import { useContext, useState } from 'react'
import Link from 'next/link'
import { UserContext } from '@/components/profile/store/UserContext'

import Icon from '@/components/shared/Icon'
import ButtonPrimary from '@/components/shared/ButtonPrimary'
import TopMenu from '@/components/layout/TopMenu'
import ProfileSettings from '@/components/profile/ProfileSettings'
import NotificationSettings from '@/components/profile/NotificationSettings'
import UniversitySettings from '@/components/profile/UniversitySettings'
import useUrl from '@/utils/hooks/useUrl'
import router from 'next/router'

const DesktopSettings = () => {
  const { user } = useContext(UserContext)
  const { toOpenCogGenerator } = useUrl()

  return (
    <div className="w-full">
      <TopMenu
        buttonsRight={
          <ButtonPrimary
            label="Generate"
            icon="stars"
            iconPosition="right"
            onClick={() => {
              toOpenCogGenerator()
            }}
          />
        }
        buttonsMobile={
          <ButtonPrimary
            label="Generate"
            icon="cog"
            iconPosition="right"
            onClick={() => {
              toOpenCogGenerator()
            }}
            classNames=" justify-end"
            size="small"
          />
        }
        handleBackClick={() => router.back()}
      />
      {!!user && (
        <div className="page-spacing relative flex flex-col pb-10 md:flex-row">
          <div className="flex h-min w-full justify-center md:sticky md:top-3 md:w-min">
            <div className="relative w-full pb-10 xs:min-w-[450px] md:pb-0">
              <div className="absolute left-5 top-5 ">
                <Link href={`/user/${user?.id}`} legacyBehavior>
                  <div className="flex w-fit cursor-pointer items-center justify-center text-day-text-label-primary dark:text-white">
                    <div className="flex items-center justify-center">
                      <Icon width={10} height={20} type="chevronLeft" />
                    </div>
                    <h2 className="ml-3 text-lg font-semibold">Profile</h2>
                  </div>
                </Link>
              </div>

              {/* <div className="absolute right-5 top-5 text-night-base-secondary">
                <Icon type="settings" width={22} height={22} />
              </div> */}

              <div className="flex h-full w-full flex-1 items-stretch">
                <ProfileSettings />
              </div>
            </div>
          </div>

          <div className=" ml-0 grow md:ml-5">
            <div className="hidden sm:block">
              <UniversitySettings />
            </div>

            <div className="w-full pt-5">
              <NotificationSettings />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DesktopSettings
