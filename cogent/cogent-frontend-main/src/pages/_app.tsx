import { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import { ThemeContextProvider } from '@/store/ThemeContext'
import { AuthProvider } from '../../lib/auth'
import { UserContextProvider } from '@/store/UserContext'
import { ToastProvider } from '@/components/shared/Toast'
import Layout from '@/components/layout'
import RouteGuard from '@/components/utils/RouteGuard'
import '@/styles/globals.scss'

/* pages that don't require authentication to access */
const excludedRoutes = [
  '/home',
  '/signin',
  '/signup',
  '/reset',
  '/cogs/[cogId]'
]

function MyApp({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false)
  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    return null
  }

  if (typeof window === 'undefined') {
    return <></>
  } else {
    return (
      <AuthProvider>
        <ThemeContextProvider>
          <Layout>
            <RouteGuard excludedRoutes={excludedRoutes}>
              <UserContextProvider>
                <ToastProvider>
                  <Component {...pageProps} />
                </ToastProvider>
              </UserContextProvider>
            </RouteGuard>
          </Layout>
        </ThemeContextProvider>
      </AuthProvider>
    )
  }
}

export default MyApp
