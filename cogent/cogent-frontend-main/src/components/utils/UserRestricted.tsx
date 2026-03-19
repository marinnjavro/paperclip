import React, { useEffect } from 'react'
import router from 'next/router'
import { Cog } from 'src/__generated__/graphql'
import useLocalStorage from '@/utils/hooks/useLocalStorage'

interface RestrictedProps {
  cog: Cog
  children: JSX.Element
}

// This component is meant to be used in editor where a restriction based on user verification and id is needed
const UserRestricted: React.FC<RestrictedProps> = ({ cog, children }) => {
  const [cogentUser] = useLocalStorage('cogentUser', '')

  const hasPermission = cog?.user?.id === cogentUser.id && !!cogentUser.roles

  useEffect(() => {
    if (!hasPermission) {
      router.push(`/cogs/${cog?.id}`)
    }
  }, [])

  if (hasPermission) {
    return children
  }
}

export default UserRestricted
