import React, { useContext, useState } from 'react'
import _ from 'lodash'
import { validateInputUser } from '@/components/profile/state/validate'
import { UserContext } from '@/components/profile/store/UserContext'
import Icon from '@/components/shared/Icon'
import TextInput from '@/components/shared/TextInput'
import TextArea from '@/components/shared/TextArea'
import ButtonPrimary from '@/components/shared/ButtonPrimary'
import FileUpload from '@/components/shared/FileUpload'
import UserIconPlaceholder from '@/components/shared/UserIconPlaceholder'

export type UserData = {
  name: string
  bio: string
  email: string
}

const ProfileSettings = () => {
  const { user, updateUser, updateUserPhoto, deleteUserPhoto } =
    useContext(UserContext)

  const [isLoading, setIsLoading] = useState(false)

  const [dragActive, setDragActive] = useState<boolean>(false)

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
    <div className="h-full w-full rounded-[32px] bg-day-base-04 bg-[url('/assets/static/elements/gradient-background-light.png')] bg-cover bg-cover bg-no-repeat pb-10 dark:bg-night-base-03 dark:bg-[url('/assets/static/elements/gradient-background.png')]">
      <div className="flex flex-col items-center justify-center px-6 pt-14 xs:px-14">
        <div className="h-36 w-36 shrink-0 overflow-hidden rounded-full border border-solid border-white border-opacity-10 bg-day-base-05 dark:bg-day-text-label-tertirary-inverse">
          <div className="flex h-full w-full items-center justify-center text-white">
            {!!user?.photoUrl ? (
              <img
                src={user?.photoUrl}
                alt="User Image"
                className="h-full w-full object-cover"
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

        <div className="mt-5 flex flex-col gap-3 text-sm font-bold xxs:flex-row xs:gap-12">
          <FileUpload
            accepts={['image']}
            handleFiles={handleMediaChange}
            dragActive={dragActive}
            setDrag={setDragActive}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex cursor-pointer items-center gap-1 text-night-text-label-primary dark:text-white"
            >
              <Icon type="profile" width={16} height={16} />
              <span>Change photo</span>
            </div>
          </FileUpload>
          <div
            onClick={(e) => deleteUserPhoto()}
            className="flex shrink-0 cursor-pointer items-center gap-1 text-night-text-label-secondary dark:text-white dark:opacity-60"
          >
            <Icon type="delete" width={16} height={16} />
            <span>Delete photo</span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex w-full flex-col gap-5 px-5 text-center">
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

        <div className="flex w-full justify-center pb-10">
          <ButtonPrimary
            label="Save Changes"
            isLoading={isLoading}
            onClick={() => handleSubmit()}
          />
        </div>
      </div>
    </div>
  )
}

export default ProfileSettings
