import React from 'react'
import Icon from '@/components/shared/Icon'
import router from 'next/router'
import { User } from 'src/__generated__/graphql'

interface CogAuthorProps {
  photoUrl?: string | undefined | null
  user: User | undefined | null
  iconPosition?: 'left' | 'right'
}

const CogAuthor: React.FC<CogAuthorProps> = ({
  user,
  photoUrl,
  iconPosition = 'right'
}) => {
  const redirectToProfile = () => {
    router.push(`/user/${user?.id}`)
  }

  return (
    <div
      className="flex items-center gap-3"
      onClick={(e) => {
        e.stopPropagation()
        e.nativeEvent.preventDefault()
        redirectToProfile()
      }}
    >
      {!!Icon && iconPosition === 'left' && (
        <div className="h-9 w-9 overflow-hidden rounded-full bg-day-text-label-tertirary-inverse">
          {!!photoUrl ? (
            <img className="h-full w-full object-cover" src={photoUrl} alt="" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-white">
              <img
                className="h-full w-full object-cover"
                src="/assets/static/images/avatar-placeholder.png"
                alt=""
              />
            </div>
          )}
        </div>
      )}
      <div>
        <div className="text-sm font-bold text-day-text-label-primary dark:text-white">
          {user?.name}
        </div>
        {/* {user?.title && <div className="text-xxs">{user?.title}</div>} */}
      </div>

      {!!Icon && iconPosition === 'right' && (
        <div className="h-9 w-9 overflow-hidden rounded-full bg-day-text-label-tertirary-inverse">
          {!!photoUrl ? (
            <img className="h-full w-full object-cover" src={photoUrl} alt="" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-white">
              <Icon type="user" width={50} height={50} classNames="mt-[25px]" />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CogAuthor
