import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useQuery } from '@apollo/client'
import { gql } from 'src/__generated__/gql'
import { useMutation } from '@apollo/client'
import {
  FetchMeQuery,
  UpdateUserMutation,
  FetchMeQueryVariables,
  UpdateUserMutationVariables
} from 'src/__generated__/graphql'
import { UserContext } from '@/components/profile/store/UserContext'
import { useToast } from '@/components/shared/Toast'
import { UserData } from '@/components/profile/ProfileSettings'

import MobileSettings from '@/components/profile/MobileSettings'
import DesktopSettings from '@/components/profile/DesktopSettings'

const FETCH_ME_SETTINGS = gql(`
  query fetchMe {
    me {
      id
      name
      bio
      email
      roles
      photoUrl(width: 1000, height: 1000)
      organization {
        id
        name
      }
    }
  }
`)

const UPDATE_USER = gql(`
  mutation updateUser($updateUser: UpdateUserInput!) {
    updateUser(input: $updateUser) {
      user {
        id
        name
        bio
        photoUrl(width: 1000, height: 1000)
      }
    }
  }
`)

const Settings: NextPage = () => {
  const toast = useToast()

  const [width, setWidth] = useState(window.innerWidth)
  const breakpoint = 640
  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth)
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener('resize', handleResizeWindow)
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener('resize', handleResizeWindow)
    }
  }, [])

  const { loading, data } = useQuery<FetchMeQuery, FetchMeQueryVariables>(
    FETCH_ME_SETTINGS,
    {
      onError: (err) => toast.open('error', err.message)
    }
  )

  const [updateUserData] = useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(UPDATE_USER, {
    onError: (err) => {
      toast.open('error', err.message)
    },
    onCompleted: (data) => {
      toast.open('success', 'Your profile has been updated')
    }
  })

  const updateUser = async (userData: UserData) => {
    await updateUserData({
      variables: {
        updateUser: {
          attributes: {
            name: userData.name,
            bio: userData.bio
          }
        }
      }
    })
  }

  const updateUserPhoto = async (files: FileList) => {
    await updateUserData({
      variables: {
        updateUser: {
          attributes: {
            name: data?.me?.name as string,
            photo: files[0]
          }
        }
      }
    })
  }

  const deleteUserPhoto = async () => {
    await updateUserData({
      variables: {
        updateUser: {
          attributes: {
            name: data?.me?.name as string,
            photo: null
          }
        }
      }
    })
  }

  return (
    <>
      {!loading && !!data?.me && (
        <UserContext.Provider
          value={{
            user: data?.me,
            updateUser: updateUser,
            updateUserPhoto: updateUserPhoto,
            deleteUserPhoto: deleteUserPhoto
          }}
        >
          {width < breakpoint ? <MobileSettings /> : <DesktopSettings />}
        </UserContext.Provider>
      )}
    </>
  )
}

export default Settings
