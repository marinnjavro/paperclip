import React, { useState } from 'react'
import _ from 'lodash'
import Link from 'next/link'
import { useAuth } from 'lib/auth'
import { useRouter } from 'next/router'
import { useToast } from '@/components/shared/Toast'
import useLocalStorage from '@/utils/hooks/useLocalStorage'
import { is, getErrors } from '@/utils/validation'
import ButtonPrimary from '@/components/shared/ButtonPrimary'
import TextInput from '@/components/shared/TextInput'
import Checkbox from '@/components/shared/Checkbox'
import AuthHeader from '@/components/auth//AuthHeader'
import AuthFooter from '@/components/auth//AuthFooter'

export default function SignIn() {
  const router = useRouter()
  const { signIn } = useAuth()
  const toast = useToast()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [rememberMe, setRememberMe] = useLocalStorage('rememberMeCogent', false)

  const [loginData, setLoginData] = useState<{
    email: string
    password: string
  }>({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  })

  const handleRememberMeCheck = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRememberMe((current: boolean) => !current)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setLoginData((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    })

    setErrors({ ...errors, [name]: '' })
  }

  const validateInput = () => {
    const loginErrors: any = getErrors(loginData, {
      email: [is.required(), is.email()],
      password: [is.required()]
    })
    return loginErrors
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    const loginErrors = validateInput()
    const hasErrors = !_.values(loginErrors).every(_.isEmpty)
    if (hasErrors) {
      setIsLoading(false)
      setErrors(loginErrors)
      return
    }
    logIn(loginData.email, loginData.password)
  }

  const logIn = async (email: string, password: string) => {
    if (errors.email || errors.password) return

    const signInRes = await signIn({ email, password })

    if (signInRes.hasOwnProperty('success')) {
      const signInCount =
        signInRes?.success?.userLogin?.authenticatable?.signInCount

      /* on first sign in, send user to onboarding page */
      // if (signInCount === '0') {
      //   router.push('/onboarding')
      // } else {
      //   router.push('/')
      // }

      router.push('/')
    } else {
      setIsLoading(false)
      toast.open('error', signInRes.error)
    }
  }

  return (
    <>
      <div className="sign-in mx-auto flex flex-col rounded-3xl bg-night-base-01 px-8 py-11">
        <AuthHeader
          title="Sign in"
          text={
            <span>
              Teaching is storytelling. With Cogent – start creating stories in
              minutes in ways never imagined before
            </span>
          }
        />
        <div className="mt-10 flex flex-1 flex-col">
          <div>
            <form
              className="space-y-6"
              autoComplete="off"
              action="#"
              method="POST"
            >
              <div>
                <TextInput
                  label="Enter your email"
                  name="email"
                  value={loginData.email}
                  handleChange={handleChange}
                  error={errors.email}
                />
              </div>

              <div>
                <TextInput
                  label="Enter password"
                  name="password"
                  hideInput={true}
                  value={loginData.password}
                  handleChange={handleChange}
                  error={errors.password}
                />
              </div>

              <div className="flex items-center justify-center">
                {/* <Checkbox
                  name="remember-me"
                  label="Remember me"
                  isChecked={rememberMe}
                  handleCheck={handleRememberMeCheck}
                /> */}
                <div className="text-sm xs:pt-0">
                  <Link href="/reset">Forgot your password?</Link>
                </div>
              </div>

              <div className="flex w-full flex-col items-center pt-4">
                <ButtonPrimary
                  label="Log In"
                  classNames="w-[55%]"
                  isLoading={isLoading}
                  onClick={(e) => {
                    e.preventDefault()
                    handleSubmit()
                  }}
                />

                <div className="mt-4 flex flex-col items-center text-sm dark:text-white">
                  <p className="mb-1 text-center text-base">
                    Don't have an account yet?
                  </p>
                  <Link
                    className="underline decoration-[0.5px] underline-offset-[7px]"
                    href="/signup"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </form>
          </div>
          <div className="mt-32 pb-8 max-md:mt-16 max-lg:mt-14 max-xl:mt-24">
            <AuthFooter />
          </div>
        </div>
      </div>
    </>
  )
}
