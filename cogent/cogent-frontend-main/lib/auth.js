import React, { useState, useContext, useMemo, createContext } from 'react'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  gql
} from '@apollo/client'
import { setCookie, getCookie, deleteCookie } from 'cookies-next'
import { createUploadLink } from 'apollo-upload-client'
import useLocalStorage from '@/utils/hooks/useLocalStorage'

const authContext = createContext()

export function AuthProvider({ children }) {
  const auth = useProvideAuth()

  return (
    <authContext.Provider value={auth}>
      <ApolloProvider client={auth.useApollo()}>{children}</ApolloProvider>
    </authContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(authContext)
}

function useProvideAuth() {
  const [cogentUser, setCogentUser] = useLocalStorage('cogentUser', '')

  const isSignedIn = () => {
    return getCookie('cogent_login')
  }

  const createApolloClient = () => {
    const link = createUploadLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_HOST,
      credentials: 'include'
    })

    return new ApolloClient({
      link,
      cache: new InMemoryCache()
    })
  }

  const useApollo = () => {
    return useMemo(() => createApolloClient(), [])
  }

  const signIn = async ({ email, password }) => {
    const client = createApolloClient()

    const LoginMutation = gql`
      mutation LoginMutation($email: String!, $password: String!) {
        userLogin(email: $email, password: $password) {
          authenticatable {
            id
            email
            name
            bio
            roles
            signInCount
            photoUrl
            id
          }
          credentials {
            accessToken
            expiry
            tokenType
            client
            uid
          }
        }
      }
    `

    try {
      const result = await client.mutate({
        mutation: LoginMutation,
        variables: { email, password }
      })
      if (result?.data?.userLogin?.credentials?.accessToken) {
        setCookie('cogent_login', true, { maxAge: 60 * 60 * 24, path: '/' })
        setCogentUser(result?.data?.userLogin?.authenticatable)
        return { success: result?.data }
      }
    } catch (err) {
      return { error: err.message }
    }
  }

  const signOut = () => {
    deleteCookie('cogent_login', { path: '/' })
    setCogentUser('')
  }

  return {
    useApollo,
    isSignedIn,
    signIn,
    signOut
  }
}
