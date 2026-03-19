import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { gql } from 'src/__generated__/gql'
import {
  RegisterUserMutationVariables,
  RegisterUserMutation,
  UserResendConfirmationWithTokenMutationVariables,
  UserResendConfirmationWithTokenMutation
} from 'src/__generated__/graphql'
import { validateEmail, validateSignUp } from '@/components/auth/state/validate'
import {
  initialState,
  initialErrors
} from '@/components/auth/state/initialState'
import { useToast } from '@/components/shared/Toast'
import AuthHeader from '@/components/auth/AuthHeader'
import AuthFooter from '@/components/auth/AuthFooter'
import Success from '@/components/auth/SignUp/Success'
import Confirm from '@/components/auth/SignUp/Confirm'
import ButtonPrimary from '@/components/shared/ButtonPrimary'
import TextInput from '@/components/shared/TextInput'
import SelectInput from '@/components/shared/SelectInput'

const url = `${process.env.NEXT_PUBLIC_BASE_URL}/signup`

/* TODO remove mock data */
const universities = [
  { id: '1', name: 'University of Oxford' },
  { id: '2', name: 'University of Cambridge' },
  { id: '3', name: 'University College London' },
  { id: '4', name: 'Eidgenössische Technische Hochschule Zürich' },
  { id: '5', name: 'University of Edinburgh' },
  { id: '6', name: 'University of Manchester' },
  { id: '7', name: 'The London School of Economics and Political Science' },
  { id: '8', name: 'Katholieke Universiteit Leuven' },
  { id: '9', name: 'University of Southampton' },
  { id: '10', name: 'Ludwig-Maximilians-Universität München' }
]

export interface UserData {
  email: string
  firstName: string
  lastName: string
  password: string
  passwordConfirmation: string
  universityId: string
}

export default function SignIn() {
  const router = useRouter()
  const { success, confirmationToken } = router.query
  const toast = useToast()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [submittedEmail, setSubmittedEmail] = useState<boolean>(false)

  const [userData, setUserData] = useState<UserData>({
    ...initialState
  })

  const [errors, setErrors] = useState({
    ...initialErrors
  })

  /* validate that user entered email address */
  useEffect(() => {
    if (userData.email) return
    setSubmittedEmail(false)
  }, [userData.email])

  const USER_REGISTER = gql(/* GraphQL */ `
    mutation RegisterUser(
      $email: String!
      $password: String!
      $passwordConfirmation: String!
      $confirmUrl: String!
    ) {
      userRegister(
        email: $email
        password: $password
        passwordConfirmation: $passwordConfirmation
        confirmUrl: $confirmUrl
      ) {
        credentials {
          accessToken
          expiry
          tokenType
          client
          uid
        }
      }
    }
  `)

  const [userRegister] = useMutation<
    RegisterUserMutation,
    RegisterUserMutationVariables
  >(USER_REGISTER, {
    onError: (err) => {
      toast.open('error', err.message)
    },
    onCompleted: (data) => {
      router.push({ href: router.pathname, query: { success: true } })
    }
  })

  const signUp = async (
    email: string,
    password: string,
    passwordConfirmation: string
  ) => {
    await userRegister({
      variables: {
        email: email,
        password: password,
        passwordConfirmation: passwordConfirmation,
        confirmUrl: url
      }
    })
  }

  const RESEND_CONFIRMATION = gql(/* GraphQL */ `
    mutation userResendConfirmationWithToken(
      $email: String!
      $confirmUrl: String!
    ) {
      userResendConfirmationWithToken(email: $email, confirmUrl: $confirmUrl) {
        message
      }
    }
  `)

  const [resendConfirmation] = useMutation<
    UserResendConfirmationWithTokenMutation,
    UserResendConfirmationWithTokenMutationVariables
  >(
    RESEND_CONFIRMATION,
    {
      onError: (err) => {
        toast.open('error', err.message)
      },
      onCompleted: (data) => {
        toast.open(
          'success',
          'You will receive an email with instructions for how to confirm your email address in a few minutes.'
        )
      }
    }
    // pollInterval: 1000,
    // notifyOnNetworkStatusChange: true,
  )

  const resendConfirmationToken = async (email: string) => {
    await resendConfirmation({
      variables: {
        email: email,
        confirmUrl: url
      }
    })
  }

  const handleUniversityChange = (id: string) => {
    setUserData({ ...userData, universityId: id })
    setErrors({ ...errors, universityId: '' })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setUserData((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    })

    setErrors({ ...errors, [name]: '' })
  }

  const submitEmail = () => {
    const inputErrors = validateEmail(userData)
    const hasErrors = !_.values(inputErrors).every(_.isEmpty)
    if (hasErrors) {
      setIsLoading(false)
      setErrors(inputErrors)
      return
    }
    setSubmittedEmail(true)
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    const inputErrors = validateSignUp(userData)
    const hasErrors = !_.values(inputErrors).every(_.isEmpty)
    if (hasErrors) {
      setIsLoading(false)
      setErrors(inputErrors)
      return
    }

    signUp(userData.email, userData.password, userData.passwordConfirmation)
    setIsLoading(false)
  }

  const renderSignUpForm = () => (
    <div className="flex h-full flex-col">
      <AuthHeader
        title="Create a new account"
        backTo="signin"
        text={
          <span className="flex gap-1">
            Do you already have an account?
            <div className="link--gray dark:link--white">
              <Link href="/signin">Sign In</Link>
            </div>
          </span>
        }
      ></AuthHeader>
      <div className="mt-10 flex h-full flex-col justify-between">
        <form className="space-y-6" action="/form" autoComplete="off">
          {!submittedEmail && (
            <div>
              <TextInput
                label="Enter your email"
                name="email"
                value={userData.email}
                handleChange={handleChange}
                error={errors.email}
              />
            </div>
          )}

          {submittedEmail && (
            <>
              <div className="flex w-full gap-5">
                <div className="flex-1">
                  <TextInput
                    label="Enter your name"
                    name="firstName"
                    value={userData.firstName}
                    handleChange={handleChange}
                    error={errors.firstName}
                  />
                </div>
                <div className="flex-1">
                  <TextInput
                    label="Enter your last name"
                    name="lastName"
                    value={userData.lastName}
                    handleChange={handleChange}
                    error={errors.lastName}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="flex w-full gap-5">
                <div className="flex-1">
                  <TextInput
                    hideInput={true}
                    label="Create a password"
                    name="password"
                    value={userData.password}
                    handleChange={handleChange}
                    error={errors.password}
                  />
                </div>
                <div className="flex-1">
                  <TextInput
                    hideInput={true}
                    label="Repeat password"
                    name="passwordConfirmation"
                    value={userData.passwordConfirmation}
                    handleChange={handleChange}
                    error={errors.passwordConfirmation}
                  />
                </div>
              </div>

              {/* <div className="flex-1">
                <SelectInput
                  name="university"
                  options={universities}
                  value={userData.universityId}
                  handleChange={handleUniversityChange}
                  error={errors.universityId}
                />
              </div> */}
            </>
          )}

          <div className="flex w-full flex-col items-center pt-2.5">
            {!submittedEmail ? (
              <ButtonPrimary
                label="Create a new account"
                classNames="min-w-[55%] 2xl:w-1/3"
                isLoading={isLoading}
                onClick={(e) => {
                  e.preventDefault()
                  submitEmail()
                }}
              />
            ) : (
              <ButtonPrimary
                label="Create a new account"
                classNames="min-w-[55%] 2xl:w-1/3"
                isLoading={isLoading}
                onClick={(e) => {
                  e.preventDefault()
                  handleSubmit()
                }}
              />
            )}

            <div className="mt-3.5 flex flex-col items-center text-sm text-support-gray-003">
              <p className="mx-[7%] text-center">
                By signing up, you acknowledge that you have read and
                understood, and agree to{' '}
                <Link href="#" legacyBehavior>{`Cogent's Terms`}</Link> and{' '}
                <Link href="#">Privacy Policy.</Link>
              </p>
            </div>
          </div>
        </form>

        <div className="mt-[15%] pb-8">
          <AuthFooter />
        </div>
      </div>
    </div>
  )

  if (!!success && !!userData.email) {
    return (
      <Success
        email={userData.email}
        resendConfirmation={resendConfirmationToken}
      />
    )
  } else if (!!confirmationToken) {
    return (
      <Confirm
        email={userData.email}
        resendConfirmation={resendConfirmationToken}
      />
    )
  } else {
    return <div className="mx-auto h-full w-full bg-night-base-01 rounded-3xl px-8 py-11">{renderSignUpForm()}</div>
  }
}

// class="sign-in mx-auto flex flex-col rounded-3xl bg-night-base-01 px-8 py-11"