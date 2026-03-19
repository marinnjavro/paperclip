import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import useUrl from '@/utils/hooks/useUrl'
import { UserContext } from '@/components/profile/store/UserContext'

import BottomMenu from '@/components/layout/BottomMenu'
import Profile from '@/components/profile/MobileSettings/Profile'
import AccountSettings from '@/components/profile/MobileSettings/AccountSettings'
import NotificationSettingsMobile from '@/components/profile/MobileSettings/NotificationSettingsMobile'

export interface MobileSettingsInterface {
  title: string
  type: string
}

const MobileSettings = () => {
  const { user } = useContext(UserContext)

  const { toCommunity, toLibrary, toProfile } = useUrl()

  const [activeTab, setActiveTab] = useState('profile')

  const handleTabChange = (type: string) => {
    setActiveTab(type)
  }

  return (
    <div className="h-screen">
      {activeTab === 'profile' && <Profile handleTabChange={handleTabChange} />}
      {activeTab === 'account' && (
        <AccountSettings handleTabChange={handleTabChange} />
      )}
      {activeTab === 'notification' && (
        <NotificationSettingsMobile handleTabChange={handleTabChange} />
      )}
      <BottomMenu
        buttons={[
          {
            label: 'Community',
            icon: 'community',
            action: toCommunity
          },
          {
            label: 'Library',
            icon: 'multipleFiles',
            action: toLibrary
          },
          {
            label: 'Create card',
            icon: 'addItem',
            action: () => {}
          },

          {
            label: 'Profile',
            icon: 'profileCircle',
            action: () => toProfile(user?.id)
          }
        ]}
      />
    </div>
  )
}

export default MobileSettings
