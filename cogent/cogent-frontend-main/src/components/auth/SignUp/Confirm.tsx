import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import _ from 'lodash'
import { useMutation } from '@apollo/client'
import { gql } from 'src/__generated__/gql'
import {
  UserConfirmRegistrationWithTokenMutation,
  UserConfirmRegistrationWithTokenMutationVariables
} from 'src/__generated__/graphql'
import Spinner from '@/components/shared/Spinner'

interface ConfirmProps {
  email: string
  resendConfirmation: (email: string) => void
}

const Confirm = ({ email, resendConfirmation }: ConfirmProps) => {
  const router = useRouter()
  const { confirmationToken } = router.query

  const [isLoading, setIsLoading] = useState(true)
  const [isConfirmed, setIsConfirmed] = useState(false)

  // prettier-ignore
  const CONFIRM_USER = gql(/* GraphQL */ `
    mutation UserConfirmRegistrationWithToken($confirmationToken: String!) {
      userConfirmRegistrationWithToken(
        confirmationToken: $confirmationToken
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

  const [userConfirm] = useMutation<
    UserConfirmRegistrationWithTokenMutation,
    UserConfirmRegistrationWithTokenMutationVariables
  >(
    CONFIRM_USER,
    {
      onError: (err) => {
        setIsConfirmed(false)
        setIsLoading(false)
      },
      onCompleted: (data) => {
        setIsConfirmed(true)
        setIsLoading(false)
      }
    }
    // pollInterval: 1000,
    // notifyOnNetworkStatusChange: true,
  )

  const confirmUser = async (confirmationToken: string) => {
    await userConfirm({
      variables: {
        confirmationToken: confirmationToken
      }
    })
  }

  useEffect(() => {
    if (!confirmationToken) return
    let token
    if (_.isString(confirmationToken)) {
      token = confirmationToken
    } else {
      token = confirmationToken[0]
    }
    confirmUser(token)
  }, [])

  return (
    <div>
      <div className="mt-8 flex items-center">
        <h2 className="text-4xl font-bold leading-10 tracking-tight text-white">
          Email confirmation
        </h2>
      </div>
      <div className="leading-2 mt-2 flex flex-col gap-8 pt-10 text-base text-base font-normal text-support-gray-003">
        {isLoading ? (
          <div className="flex">
            <span className="mr-3 -ml-1">
              <Spinner color="white" />
            </span>
            We are confirming your email. Please wait.
          </div>
        ) : (
          <>
            {isConfirmed ? (
              <>
                <p className="flex flex-col gap-2">
                  Welcome to Cogent! You have successfully confirmed your email
                  address.
                </p>
                <div>
                  To get started{' '}
                  <Link href="/signin">

                    <span className="link--grey text-base">
                      sign in to your new account.
                    </span>

                  </Link>
                </div>
              </>
            ) : (
              <>
                <p className="flex flex-col gap-2">
                  An error occurred while trying to confirm your email. Your
                  verification link might be invalid.
                </p>
                <p className="mt-2  text-base font-normal leading-5 text-support-gray-003">
                  <div>
                    Request a new
                    <span className="ml-1">
                      <a
                        className="cursor-pointer text-base"
                        onClick={(e) => {
                          e.preventDefault()
                          resendConfirmation(email)
                        }}
                      >
                        confirmation link.
                      </a>
                    </span>
                  </div>
                  <div>
                    <Link href="/signin" className="text-base">
                      Back to Sign in page.
                    </Link>
                  </div>
                </p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Confirm
