import { CogData } from '@/components/shared/CogEditor'
import BottomMenu from '@/components/layout/BottomMenu'
import TopMenu from '@/components/layout/TopMenu'
import ButtonPrimary from '@/components/shared/ButtonPrimary'
import Icon from '@/components/shared/Icon'
import { useAuth } from 'lib/auth'
import Link from 'next/link'
import router, { useRouter } from 'next/router'
import useUrl from '@/utils/hooks/useUrl'

interface ProfileProps {
  handleTabChange: (type: string) => void
}

const Profile: React.FC<ProfileProps> = ({ handleTabChange }) => {
  const { signOut } = useAuth()

  const { toOpenCogGenerator } = useUrl()

  const signOutUser = () => {
    signOut()
    router.push('/')
  }

  return (
    <div className="relative mb-32 h-[100%]">
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
            icon="stars"
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
      <div className="flex justify-between p-4">
        <h1 className="text-xl font-bold text-day-text-label-primary dark:text-white">
          Profile
        </h1>
        <div className="cursor-pointer  text-day-base-primary dark:text-night-base-secondary">
          <Icon type="settings" width={24} height={24} />
        </div>
      </div>
      <div className="mx-4 flex flex-col gap-2 border-b border-solid border-opacity-silver border-opacity-20  dark:border-white dark:border-opacity-10">
        <div
          onClick={() => handleTabChange('account')}
          className="flex py-4 text-xl text-day-text-label-primary dark:text-white"
        >
          <Icon
            className="text-day-text-label-primary dark:text-white"
            type="account"
          />
          <h2 className="ml-2">Account Settings</h2>
        </div>
        {/* <div className="flex py-4 text-xl  text-day-text-label-primary dark:text-white">
          <Icon
            className="text-day-text-label-primary dark:text-white"
            type="security"
          />
          <h2 className="ml-2">Access and Security</h2>
        </div>
        <div className=" flex py-4 text-xl  text-day-text-label-primary dark:text-white">
          <Icon
            className="text-day-text-label-primary dark:text-white"
            type="dataPrivacy"
          />
          <h2 className="ml-2">Data Privacy</h2>
        </div> */}
        <div
          onClick={() => handleTabChange('notification')}
          className="flex py-4 text-xl  text-day-text-label-primary dark:text-white"
        >
          <Icon
            className="text-day-text-label-primary dark:text-white"
            type="notification"
          />
          <h2 className="ml-2">Notification Settings</h2>
        </div>
      </div>
      <div className="flex flex-col p-4 text-base  text-day-text-label-primary dark:text-white">
        <h3 className="py-4">Privacy Policy</h3>
        <h3 className="py-4">Deleting or deactivating a profile</h3>
      </div>
      <div className="absolute bottom-24 flex px-4 text-base text-support-red-401">
        <Icon className="mt-1.5 bg-transparent" type="logoutLeft" />
        <h3 onClick={() => signOutUser()}>Log out</h3>
      </div>
    </div>
  )
}

export default Profile

const ButtonsMobile = ({
  addCog
}: {
  addCog: (cogData?: CogData) => void
}): JSX.Element => (
  <>
    <ButtonPrimary
      label="Generate"
      icon="stars"
      iconPosition="right"
      onClick={() => {}}
      classNames="hidden xs:flex"
    />
    <ButtonPrimary
      label="Generate"
      icon="stars"
      iconPosition="right"
      onClick={() => {}}
      classNames="xs:hidden justify-end"
      size="small"
    />
  </>
)
