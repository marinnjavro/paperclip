import React, { useState } from 'react'
import _ from 'lodash'
import { User } from 'src/__generated__/graphql'
import { validateInputUser } from '@/components/profile/state/validate'
import Icon from '@/components/shared/Icon'
import TextInput from '@/components/shared/TextInput'
import TextArea from '@/components/shared/TextArea'
import ButtonPrimary from '@/components/shared/ButtonPrimary'
import Checkbox from '@/components/shared/Checkbox'
import router from 'next/router'
import BottomMenu from '@/components/layout/BottomMenu'
import TopMenu from '@/components/layout/TopMenu'
import useUrl from '@/utils/hooks/useUrl'

interface NotificationSettingsMobileProps {
  handleTabChange: (type: string) => void
}

export type UserData = {
  name: string
  bio: string
  email: string
}

const NotificationSettingsMobile: React.FC<NotificationSettingsMobileProps> = ({
  handleTabChange
}) => {
  const { toOpenCogGenerator } = useUrl()

  return (
    <div className="h-full w-full">
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
        handleBackClick={() => handleTabChange('profile')}
      />
      <div className="flex justify-between p-4">
        <h1 className="text-xl font-bold text-white">Notification Settings</h1>
        <div className="text-day-text-label-primarytext-day-base-primary cursor-pointer cursor-pointer dark:text-night-base-secondary">
          <Icon type="settings" width={24} height={24} />
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-6 px-4">
        <Checkbox
          name="cogent-updates"
          label="I want to receive information on how my students are doing"
          isChecked={true}
          handleCheck={() => {}}
        />
        <Checkbox
          name="published-updates"
          label="I want to know how my cogs are performing"
          isChecked={false}
          handleCheck={() => {}}
        />
        <Checkbox
          name="installation"
          label="I want to receive news and updates from cogent"
          isChecked={false}
          handleCheck={() => {}}
        />
      </div>

      <div className="fixed inset-x-0 bottom-20 flex w-full justify-center p-4">
        <ButtonPrimary
          label="Save Changes"
          isLoading={false}
          onClick={() => {}}
          classNames="w-full"
        />
      </div>
    </div>
  )
}

export default NotificationSettingsMobile

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
