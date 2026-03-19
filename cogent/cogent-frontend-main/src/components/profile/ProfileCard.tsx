import React, { useState } from 'react'
import { User } from 'src/__generated__/graphql'
import Icon from '@/components/shared/Icon'
import ProfileBadge from './ProfileBadge'
import ButtonPrimary from '../shared/ButtonPrimary'
import UserIconPlaceholder from '@/components/shared/UserIconPlaceholder'

const badges = [
  {
    type: 'years',
    value: '372',
    text: 'Students'
  },
  {
    type: 'question',
    value: '2',
    text: 'Years on website'
  },
  {
    type: 'time',
    value: '10+',
    text: 'Used my cogs'
  },
  {
    type: 'cog',
    value: '13',
    text: 'Cogs created'
  },
  {
    type: 'like',
    value: '20+',
    text: 'Liked the tasks'
  },
  {
    type: 'cards',
    value: '98',
    text: 'Cards created'
  }
]

interface ProfileCardProps {
  user: User
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  const [showEmail, setShowEmail] = useState(false)

  const handleContactClick = () => {
    setShowEmail(true)
  }

  return (
    <div className="h-full w-full rounded-4xl bg-day-base-04 bg-[url('/assets/static/elements/gradient-background-light.png')] bg-cover bg-cover  bg-no-repeat pb-10 dark:bg-night-base-03 dark:bg-[url('/assets/static/elements/gradient-background.png')]">
      <div className="flex flex-col items-center justify-center px-4 pt-14">
        <div className="h-[175px] w-[175px] shrink-0 overflow-hidden rounded-full border border-solid border-white border-opacity-10 bg-day-base-05 dark:bg-day-text-label-tertirary-inverse sm:h-[150px] sm:w-[150px]">
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

        <div className="mt-6 w-full text-center">
          <span className="text-3xl font-bold text-day-text-label-primary dark:text-white">
            {user.name}
          </span>
          <p className="mt-3 mb-6 text-base text-night-text-label-secondary dark:text-night-text-01 dark:opacity-100 xs:px-4">
            {user.bio}
          </p>
          <div className="flex w-full items-center justify-center gap-2 text-base text-day-text-label-primary dark:text-white">
            {showEmail ? (
              <>
                <Icon type="email" width={24} height={24} />
                <p className="text-day-text-label-primary dark:text-white">
                  {user.email}
                </p>
              </>
            ) : (
              <ButtonPrimary
                classNames="w-[130px]"
                label="Contact"
                size="small"
                iconPosition="right"
                icon="email"
                onClick={handleContactClick}
              />
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 justify-between gap-y-4 gap-x-6 px-3">
        {badges.map((badge, i) => (
          <ProfileBadge
            key={`badge-${i}`}
            type={badge.type}
            value={badge.value}
            text={badge.text}
          />
        ))}
      </div>
    </div>
  )
}

export default ProfileCard
