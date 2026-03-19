import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { useQuery } from '@apollo/client'
import { gql } from 'src/__generated__/gql'
import {
  FetchCogViewQuery,
  FetchCogViewQueryVariables
} from 'src/__generated__/graphql'
import { useAuth } from 'lib/auth'
import { useToast } from '@/components/shared/Toast'
import UserContext from '@/store/UserContext'

import MobileCogViewer from '@/components/view/MobileCogViewer'
import QrCodeModal from "@/components/shared/QrCodeModal";

const ViewCog: NextPage = () => {
  const router = useRouter()
  const { cogId } = router.query
  const userCtx: { isStudent: boolean } = useContext(UserContext)
  const { isSignedIn } = useAuth()
  const toast = useToast()

  const [shouldSkip, setShouldSkip] = useState(true)
  const [isQRModalOpen, setIsQRModalOpen] = useState(false)
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      if (!mobile) {
        setIsQRModalOpen(true);
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    if (!!cogId) {
      setShouldSkip(false);
    }
  }, [cogId]);

  /* fetch cog */
  const FETCH_COG_VIEW = gql(`
    query fetchCogView($cogId: ID!) {
      cog(id: $cogId) {
        id
        name
        user {
          id
          name
          email
          roles
          photoUrl
          organization {
            id
            name
          }
        }
        cards {
          id
          cardType
          actions
        }
        blocks {
          collection {
            id
            name
            position
            cogId
            cards(page: 1, limit: 100) {
              metadata {
                currentPage
                limitValue
                totalCount
                totalPages
              }
              collection {
                id
                blockId
                parentCardId
                name
                cardType
                text
                position
                photoUrl
                videoUrl
                audioUrl
                actions
                block {
                  cogId
                }
              }
            }
          }
        }
      }
    }
  `)

  const { loading, data, error } = useQuery<
    FetchCogViewQuery,
    FetchCogViewQueryVariables
  >(FETCH_COG_VIEW, {
    variables: {
      cogId: cogId as string
    },
    onError: (err) => toast.open('error', err.message),
    skip: shouldSkip
  })

  // Don't render anything until we know the device type
  if (isMobile === null) {
    return null
  }

  return (
    <>
      {isMobile ? (
        <div className="h-screen w-full">
          {loading && (
            <div className="flex h-full items-center justify-center">
              <p className="text-white">Loading cog...</p>
            </div>
          )}
          {error && (
            <div className="flex h-full items-center justify-center p-4">
              <p className="text-red-400">Error: {error.message}</p>
            </div>
          )}
          {!!data?.cog && <MobileCogViewer cog={data?.cog} />}
        </div>
      ) : (
        <QrCodeModal
          setIsModalOpen={setIsQRModalOpen}
          text="QR code for playing this cog"
          showClose={false}
          isModalOpen={isQRModalOpen}
          manualCogId={data?.cog?.id}
        />
      )}
    </>
  )
}

export default ViewCog
