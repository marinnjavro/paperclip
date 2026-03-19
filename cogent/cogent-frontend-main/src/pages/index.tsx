import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import { useAuth } from 'lib/auth.js'
import { gql, useQuery } from '@apollo/client'
import TopMenu from '@/components/layout/TopMenu'
import styles from '@/styles/Home.module.scss'

const HomePage = () => {
  const { signOut } = useAuth()

  // const CogsQuery = gql`
  //   query fetchCogs {
  //     cogs {
  //       id
  //       name
  //       blocks {
  //         id
  //         name
  //         cards {
  //           id
  //           name
  //           cardType
  //           text
  //         }
  //       }
  //     }
  //   }
  // `

  // const { data } = useQuery(CogsQuery)

  return (
    <>
      <h1>Logged in</h1>
      <button onClick={() => signOut()}>Sign Out</button>
    </>
  )
}

const Home: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/feed')
  }, [])

  return (
    <>
      <div className="page-spacing"></div>
    </>
  )
}

export default Home
