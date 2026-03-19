import React from 'react'
import Link from 'next/link'
import Logo from '@/components/shared/Logo'
import SignIn from '@/components/auth/SignIn'
import SignUp from '@/components/auth/SignUp'
import ResetPassword from '@/components/auth/ResetPassword'
import Onboarding from '@/components/auth/Onboarding'

interface AuthProps {
  type: 'signin' | 'signup' | 'reset' | 'onboarding'
}

const renderComponent: { [key: string]: JSX.Element } = {
  signin: <SignIn />,
  signup: <SignUp />,
  reset: <ResetPassword />,
  onboarding: <Onboarding />
}

export default function Auth({ type }: AuthProps) {
  return (
    <div className="min-h-screen bg-night-base-01 text-white">
      {/* Nav */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 sm:px-10">
        <Link href="/home" className="h-7 w-24">
          <Logo />
        </Link>
        <Link
          href="/home"
          className="text-sm text-white/60 transition hover:text-white"
        >
          Back to home
        </Link>
      </nav>

      {/* Form Container */}
      <main className="mx-auto flex max-w-md flex-col px-6 py-12 sm:px-0 sm:py-16">
        {renderComponent[type]}
      </main>
    </div>
  )
}
