import React, { useContext, useState } from 'react'
import _ from 'lodash'
import { User } from 'src/__generated__/graphql'
import { validateInputUser } from '@/components/profile/state/validate'
import Icon from '@/components/shared/Icon'
import TextInput from '@/components/shared/TextInput'
import TextArea from '@/components/shared/TextArea'
import ButtonPrimary from '@/components/shared/ButtonPrimary'
import OrganizationCard from '../OrganizationCard'
import UniversitySettingsMobile from '../UniversitySettingsMobile'
import BottomMenu from '@/components/layout/BottomMenu'
import router from 'next/router'
import TopMenu from '@/components/layout/TopMenu'
import { CogData } from '@/components/shared/CogEditor'
import { UserContext } from '@/components/profile/store/UserContext'
import FileUpload from '@/components/shared/FileUpload'
import UserIconPlaceholder from '@/components/shared/UserIconPlaceholder'
import useUrl from '@/utils/hooks/useUrl'

interface AccountSettingsProps {
  handleTabChange: (type: string) => void
}

export type UserData = {
  name: string
  bio: string
  email: string
}

const AccountSettings: React.FC<AccountSettingsProps> = ({
  handleTabChange
}) => {
  const { user, updateUser, updateUserPhoto, deleteUserPhoto } =
    useContext(UserContext)
  const [isLoading, setIsLoading] = useState(false)

  const [dragActive, setDragActive] = useState<boolean>(false)

  const [isOpen, setIsOpen] = useState(false)

  const { toOpenCogGenerator } = useUrl()

  const [userData, setUserData] = useState<UserData>({
    name: user?.name || '',
    bio: user?.bio || '',
    email: user?.email || ''
  })

  const [errors, setErrors] = useState({
    name: '',
    bio: '',
    email: ''
  })

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target

    setUserData((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    })

    setErrors({ ...errors, [name]: '' })
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    const { errors: dataErrors, isValid } = validateInputUser(userData)
    if (!isValid) {
      setIsLoading(false)
      setErrors(dataErrors)
      return
    }

    updateUser(userData)
    setIsLoading(false)
  }

  const handleMediaChange = (files: FileList) => {
    if (!files) return
    updateUserPhoto(files)
  }

  return (
    <div className="h-full w-full overflow-hidden overflow-y-auto pb-24">
      <TopMenu
        buttonsRight={
          <ButtonPrimary
            label="Generate"
            icon="stars"
            iconPosition="right"
            width="4"
            height="4"
            onClick={() => {
              toOpenCogGenerator()
            }}
          />
        }
        buttonsMobile={
          <ButtonPrimary
            label="Generate"
            icon="stars"
            width="4"
            height="4"
            iconPosition="right"
            onClick={() => {
              toOpenCogGenerator()
            }}
            classNames=" justify-end"
            size="small"
          />
        }
        handleBackClick={() => handleTabChange('profile')}
      />
      <div className="flex justify-between p-4">
        <h1 className="text-xl font-bold text-night-text-label-primary dark:text-white">
          Account Settings
        </h1>
        <div className=" text-day-base-primary dark:text-night-base-secondary">
          <Icon type="settings" width={24} height={24} />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center px-6  pt-4 xs:px-14">
        <div className="h-36 w-36 shrink-0 overflow-hidden rounded-full border border-solid border-white border-opacity-10 bg-day-base-05 dark:bg-day-text-label-tertirary-inverse">
          <div className="flex h-full w-full items-center justify-center text-white">
            {!!user?.photoUrl ? (
              <img
                src={user?.photoUrl}
                alt="User Image"
                className="h-full w-full object-cover"
              />
            ) : (
              <UserIconPlaceholder size="2xl" />
            )}
          </div>
        </div>

        <div className="mt-4 flex w-full flex-col justify-between gap-3 text-sm font-bold xxs:flex-row xs:gap-8">
          <div className="flex-1">
            <FileUpload
              accepts={['image']}
              handleFiles={handleMediaChange}
              dragActive={dragActive}
              setDrag={setDragActive}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="font-base flex items-center gap-1 text-night-text-label-primary dark:text-white"
              >
                <span>Change photo</span>
                <Icon type="profile" width={16} height={16} />
              </div>
            </FileUpload>
          </div>
          <div
            onClick={(e) => deleteUserPhoto()}
            className="font-base flex flex-1 shrink-0 items-center justify-end gap-1 text-night-text-label-secondary dark:text-white dark:opacity-60"
          >
            <span>Delete photo</span>
            <Icon type="delete" width={16} height={16} />
          </div>
        </div>
      </div>

      <div className="mt-4 flex w-full flex-col gap-4 px-5 text-center">
        <div>
          <TextInput
            label="Name"
            name="name"
            value={userData.name}
            handleChange={handleChange}
            error={errors.name}
          />
        </div>

        <div>
          <TextArea
            placeholder="About me"
            name="bio"
            value={userData.bio}
            handleChange={handleChange}
            error={errors.bio}
          />
        </div>

        <div className="border-t border-solid border-white border-opacity-10 pt-5">
          <TextInput
            label="Email"
            name="email"
            value={userData.email}
            handleChange={handleChange}
            error={errors.email}
            disabled
          />
        </div>

        <UniversitySettingsMobile />
        {/* <div className="flex w-full justify-center pb-8">
          <ButtonPrimary
            label="Add school"
            icon="plus"
            isLoading={isLoading}
            onClick={() => handleSubmit()}
            classNames="w-full"
          />
        </div> */}

        <div className="flex w-full justify-center pb-10">
          <ButtonPrimary
            label="Save Changes"
            isLoading={isLoading}
            onClick={() => handleSubmit()}
            classNames="w-full"
          />
        </div>
      </div>
    </div>
  )
}

export default AccountSettings

const ButtonsMobile = (): JSX.Element => (
  <>
    <ButtonPrimary
      label="Add new cog"
      icon="cog"
      iconPosition="right"
      onClick={() => {}}
      classNames="hidden xs:flex"
    />
    <ButtonPrimary
      label="Add new cog"
      icon="cog"
      iconPosition="right"
      onClick={() => {}}
      classNames="xs:hidden justify-end"
      size="small"
    />
  </>
)
