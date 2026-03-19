import React, { useEffect } from 'react'
import useLocalStorage from '@/utils/hooks/useLocalStorage'
import router from 'next/router'

interface RestrictedProps {
  to: 'staff' | 'student'
  children: JSX.Element
}

// This component is meant to be used everywhere a restriction based on user role is needed
const RoleRestricted: React.FC<RestrictedProps> = ({ to, children }) => {
  const [cogentUser] = useLocalStorage('cogentUser', '')

  const hasPermission =
    cogentUser.roles.includes('super_admin') ||
    cogentUser.roles.includes('admin') ||
    cogentUser.roles.includes(to)

  useEffect(() => {
    if (!hasPermission) {
      router.push('/not-found')
    }
  }, [])

  if (hasPermission) {
    return children
  }
}

export default RoleRestricted
