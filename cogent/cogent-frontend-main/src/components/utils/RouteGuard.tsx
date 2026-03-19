import { useLayoutEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from 'lib/auth'

interface RouteGuardProps {
  children: JSX.Element
  excludedRoutes?: string[]
}

const RouteGuard = ({ children, excludedRoutes }: RouteGuardProps) => {
  const { isSignedIn } = useAuth()
  const router = useRouter()

  useLayoutEffect(() => {
    if (!isSignedIn() && !excludedRoutes?.includes(router.pathname)) {
      router.push('/home')
    }
  }, [router])

  return (
    <>
      {excludedRoutes?.includes(router.pathname) ? (
        children
      ) : (
        <>{isSignedIn() && children}</>
      )}
    </>
  )
}

export default RouteGuard
