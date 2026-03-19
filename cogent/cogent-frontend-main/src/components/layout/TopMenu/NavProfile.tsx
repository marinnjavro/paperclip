import { useRouter } from 'next/router'
import useLocalStorage from '@/utils/hooks/useLocalStorage'
import Icon from '@/components/shared/Icon'
import UserIconPlaceholder from '@/components/shared/UserIconPlaceholder'

const NavProfile: React.FC = () => {
  const router = useRouter()
  const { asPath } = router

  const [cogentUser] = useLocalStorage('cogentUser', '')

  const toProfile = () => {
    if (asPath === `/user/${cogentUser?.id}`) return
    router.push(`/user/${cogentUser?.id}`)
  }

  return (
    <div
      className="mx-3 mb-5 flex cursor-pointer items-center justify-between rounded-2xl bg-day-base-04 p-2.5 dark:bg-night-base-04"
      onClick={() => toProfile()}
    >
      <div className="flex items-center gap-3">
        <div className="h-14 w-14 shrink-0 overflow-hidden  rounded-full border border-solid border-white border-opacity-10 bg-day-text-label-tertirary-inverse">
          <div className="flex h-full w-full items-center justify-center rounded-full text-white">
            {!!cogentUser.photoUrl ? (
              <img
                src={cogentUser.photoUrl}
                alt="User Image"
                className="h-full w-full object-cover "
              />
            ) : (
              <img
                className="h-full h-full object-cover"
                src="/assets/static/images/avatar-placeholder.png"
                alt=""
              />
            )}
          </div>
        </div>

        <div>
          <div className="text-base font-bold text-day-text-label-primary dark:text-white">
            {!!cogentUser.name ? cogentUser.name : '-'}
          </div>
          <div className="text-sm">{cogentUser.email}</div>
        </div>
      </div>

      <div className="pr-2">
        <Icon
          type="settingsMenu"
          width={24}
          height={24}
          className="cursor-pointer text-day-text-label-primary hover:text-night-base-06 dark:text-day-static-icon  dark:hover:text-white"
        />
      </div>
    </div>
  )
}

export default NavProfile
