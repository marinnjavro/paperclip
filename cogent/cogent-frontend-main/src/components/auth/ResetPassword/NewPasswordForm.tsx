import React, { useState } from 'react'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { gql } from 'src/__generated__/gql'
import {
  UserUpdatePasswordWithTokenMutation,
  UserUpdatePasswordWithTokenMutationVariables
} from 'src/__generated__/graphql'
import { useToast } from '@/components/shared/Toast'
import { is, getErrors } from '@/utils/validation'
import ButtonPrimary from '@/components/shared/ButtonPrimary'
import TextInput from '@/components/shared/TextInput'
import AuthHeader from '@/components/auth/AuthHeader'
import AuthFooter from '@/components/auth/AuthFooter'

const url = `${process.env.NEXT_PUBLIC_BASE_URL}/reset`

export default function NewPasswordFrom() {
  const router = useRouter()
  const { success, reset_password_token } = router.query
  const toast = useToast()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [passwordResetData, setPasswordResetData] = useState<{
    password: string
    passwordConfirmation: string
  }>({
    password: '',
    passwordConfirmation: ''
  })

  const [errors, setErrors] = useState({
    password: '',
    passwordConfirmation: ''
  })

  const RESET_PASSWORD = gql(/* GraphQL */ `
    mutation UserUpdatePasswordWithToken(
      $password: String!
      $passwordConfirmation: String!
      $resetPasswordToken: String!
    ) {
      userUpdatePasswordWithToken(
        password: $password
        passwordConfirmation: $passwordConfirmation
        resetPasswordToken: $resetPasswordToken
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

  const [resetPasswordWithToken] = useMutation<
    UserUpdatePasswordWithTokenMutation,
    UserUpdatePasswordWithTokenMutationVariables
  >(RESET_PASSWORD, {
    onError: (err) => {
      toast.open('error', err.message)
    },
    onCompleted: (data) => {
      router.push({ href: router.pathname, query: { success: true } })
    }
  })

  const resetPassword = async (
    password: string,
    passwordConfirmation: string
  ) => {
    if (!reset_password_token) return
    let token
    if (_.isString(reset_password_token)) {
      token = reset_password_token
    } else {
      token = reset_password_token[0]
    }
    await resetPasswordWithToken({
      variables: {
        password: password,
        passwordConfirmation: passwordConfirmation,
        resetPasswordToken: token
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

  const validateInputPassword = () => {
    const re = new RegExp(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,70}$/
    )
    const inputErrors: any = getErrors(passwordResetData, {
      password: [
        is.required(),
        is.min(8),
        is.match(
          (password) => re.test(password),
          'Password must include 1 uppercase, 1 digit and 1 special character'
        )
      ],
      passwordConfirmation: [
        is.required(),
        is.min(8),
        is.match(
          (passwordConfirmation) =>
            passwordConfirmation === passwordResetData.password,
          'Passwords must match'
        )
      ]
    })
    return inputErrors
  }

  const submitNewPassword = async () => {
    setIsLoading(true)

    const inputErrors = validateInputPassword()
    const hasErrors = !_.values(inputErrors).every(_.isEmpty)
    if (hasErrors) {
      setIsLoading(false)
      setErrors(inputErrors)
      return
    }
    resetPassword(
      passwordResetData.password,
      passwordResetData.passwordConfirmation
    )
    setIsLoading(false)
  }

  return (
    <>
      <div className="sign-in mx-auto flex h-full w-full flex-col">
        <AuthHeader
          title="Create a new password"
          text={
            <span>
              The password must be at least 8 characters long (the longer the
              password the better). Use a combination of at least 1 capital
              letter, 1 number and 1 special character (#, @, &)
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
                  label="Enter your password"
                  name="password"
                  hideInput={true}
                  value={passwordResetData.password}
                  handleChange={handleChange}
                  error={errors.password}
                />
              </div>

              <div>
                <TextInput
                  label="Repeat your password"
                  name="passwordConfirmation"
                  hideInput={true}
                  value={passwordResetData.passwordConfirmation}
                  handleChange={handleChange}
                  error={errors.passwordConfirmation}
                />
              </div>

              <div className="flex w-full flex-col items-center pt-5">
                <ButtonPrimary
                  label="Continue"
                  classNames="w-[55%] 2xl:w-1/3"
                  isLoading={isLoading}
                  onClick={(e) => {
                    e.preventDefault()
                    submitNewPassword()
                  }}
                />
              </div>
            </form>
          </div>
          <div className="pb-8 pt-[15%]">
            <AuthFooter />
          </div>
        </div>
      </div>
    </>
  )
}
