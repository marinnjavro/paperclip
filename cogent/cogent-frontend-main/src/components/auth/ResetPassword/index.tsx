import React, { useState } from 'react'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { gql } from 'src/__generated__/gql'
import {
  UserSendPasswordResetWithTokenMutation,
  UserSendPasswordResetWithTokenMutationVariables
} from 'src/__generated__/graphql'
import { useToast } from '@/components/shared/Toast'
import { is, getErrors } from '@/utils/validation'
import ButtonPrimary from '@/components/shared/ButtonPrimary'
import TextInput from '@/components/shared/TextInput'
import AuthHeader from '@/components/auth/AuthHeader'
import AuthFooter from '@/components/auth/AuthFooter'
import TokenSentSuccess from '@/components/auth/ResetPassword/TokenSentSuccess'
import ResetSuccess from '@/components/auth/ResetPassword/ResetSuccess'
import NewPasswordFrom from '@/components/auth/ResetPassword/NewPasswordForm'

const url = `${process.env.NEXT_PUBLIC_BASE_URL}/reset`

export default function ResetPassword() {
  const router = useRouter()
  const { emailSent, reset_password_token, success } = router.query
  const toast = useToast()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [resend, setResend] = useState<boolean>(false)

  const [passwordResetData, setPasswordResetData] = useState<{
    email: string
  }>({
    email: ''
  })

  const [errors, setErrors] = useState({
    email: ''
  })

  const REQUEST_PASSWORD_TOKEN = gql(/* GraphQL */ `
    mutation userSendPasswordResetWithToken(
      $email: String!
      $redirectUrl: String!
    ) {
      userSendPasswordResetWithToken(email: $email, redirectUrl: $redirectUrl) {
        message
      }
    }
  `)

  const [sendPasswordResetWithToken] = useMutation<
    UserSendPasswordResetWithTokenMutation,
    UserSendPasswordResetWithTokenMutationVariables
  >(
    REQUEST_PASSWORD_TOKEN,
    {
      onError: (err) => {
        toast.open('error', err.message)
      },
      onCompleted: (data) => {
        if (resend) {
          toast.open(
            'success',
            'An email with password reset instructions has been sent to your email address.'
          )
        } else {
          setResend(true)
          router.push({ href: router.pathname, query: { emailSent: true } })
        }
      }
    }
    // pollInterval: 1000,
    // notifyOnNetworkStatusChange: true,
  )

  const requestResetToken = async (email: string) => {
    await sendPasswordResetWithToken({
      variables: {
        email: email,
        redirectUrl: url
      }
    })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setPasswordResetData((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    })

    setErrors({ ...errors, [name]: '' })
  }

  const validateInputEmail = () => {
    const inputErrors: any = getErrors(passwordResetData, {
      email: [is.required(), is.email()]
    })
    return inputErrors
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    const inputErrors = validateInputEmail()
    const hasErrors = !_.values(inputErrors).every(_.isEmpty)
    if (hasErrors) {
      setIsLoading(false)
      setErrors(inputErrors)
      return
    }

    requestResetToken(passwordResetData.email)
    setIsLoading(false)
  }

  const renderRequestTokenForm = () => (
    <>
      <AuthHeader
        title="Restore password"
        text={
          <span>
            Have you forgotten your password? Don&apos;t worry, enter your email
            and we&apos;ll send you a link to reset your password.
          </span>
        }
        backTo="signin"
      />
      <div className="mt-10 flex flex-1 flex-col justify-between">
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
                value={passwordResetData.email}
                handleChange={handleChange}
                error={errors.email}
              />
            </div>

            <div className="flex w-full flex-col items-center pt-5 ">
              <ButtonPrimary
                label="Send to mail"
                classNames="min-w-[55%] leading-4 2xl:w-1/3"
                isLoading={isLoading}
                onClick={(e) => {
                  e.preventDefault()
                  handleSubmit()
                }}
              />
            </div>
          </form>
        </div>
        <div className="pb-8 pt-[15%]">
          <AuthFooter />
        </div>
      </div>
    </>
  )

  const renderResetForm = () => {
    if (!!emailSent && !!passwordResetData.email) {
      return (
        <TokenSentSuccess
          email={passwordResetData.email}
          requestResetToken={requestResetToken}
        />
      )
    }
    if (!!reset_password_token) {
      return <NewPasswordFrom />
    }
    if (!!success) {
      return <ResetSuccess />
    }
    return renderRequestTokenForm()
  }

  return (
    <>
      <div className="sign-in mx-auto flex h-full w-full flex-col bg-night-base-01 rounded-3xl px-8 py-11">
        {renderResetForm()}
      </div>
    </>
  )
}
