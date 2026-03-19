import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { gql } from 'src/__generated__/gql'
import { useMutation } from '@apollo/client'
import {
  DuplicateCogMutation,
  DuplicateCogMutationVariables
} from 'src/__generated__/graphql'
import { useToast } from '@/components/shared/Toast'
import useUrl from '@/utils/hooks/useUrl'
import { CommunitySearchContextProvider } from '@/components/community/store/CommunitySearchContext'

import ButtonPrimary from '@/components/shared/ButtonPrimary'
import PageHeader from '@/components/shared/PageHeader'
import TopMenu from '@/components/layout/TopMenu'
import BottomMenu from '@/components/layout/BottomMenu'
import CommunitySearch from '@/components/community/CommunitySearch'
import CommunityCogs from '@/components/community/CommunityCogs'
import CommunityOrder from '@/components/community/CommunityOrder'
import CommunityFiltersMobile from '@/components/community/CommunityFiltersMobile'

const Community: NextPage = () => {
  const router = useRouter()
  const toast = useToast()

  const {
    toFeed,
    toCommunity,
    toLibrary,
    toMyProfile,
    toOpenCogEditor,
    toOpenCogGenerator
  } = useUrl()

  /* duplicate cog */
  const DUPLICATE_COG = gql(`
    mutation saveCog($duplicateCog: DuplicateCogInput!) {
      duplicateCog(input: $duplicateCog) {
        cog {
          id
          name
        }
      }
    }
 `)

  const [savePublicCog] = useMutation<
    DuplicateCogMutation,
    DuplicateCogMutationVariables
  >(DUPLICATE_COG, {
    onError: (err) =>
      toast.open(
        'error',
        `An error occurred while saving the cog. Please try again.`
      ),
    onCompleted: (data) => {
      toast.open('success', `Cog was saved`)
    }
  })

  const saveCog = async (id: string) => {
    await savePublicCog({
      variables: {
        duplicateCog: {
          id: id
        }
      }
    })
  }

  return (
    <CommunitySearchContextProvider>
      <TopMenu
        buttonsRight={
          <ButtonPrimary
            label="Generate"
            icon="stars"
            iconPosition="right"
            onClick={() => {
              toOpenCogGenerator()
            }}
          />
        }
        buttonsMobile={
          <ButtonPrimary
            label="Generate"
            icon="stars"
            iconPosition="right"
            onClick={() => {
              toOpenCogGenerator()
            }}
            classNames=" justify-end"
            size="small"
          />
        }
        handleBackClick={() => router.back()}
      />
      <section className="page-spacing pb-64">
        <div className="block py-4 sm:hidden">
          <h1 className="text-xl font-bold text-white">Community</h1>
        </div>
        <div className="hidden sm:block">
          <PageHeader
            title="Welcome to Cogent Community"
            subtitle="Build and share knowledge with our community"
          />
        </div>

        <div className="hidden w-full justify-center pb-16 sm:flex">
          <CommunitySearch />
        </div>

        <div className="flex w-full justify-center pb-4 sm:hidden">
          <div className="flex w-full gap-2">
            <CommunitySearch />
            <CommunityFiltersMobile />
          </div>
        </div>

        <div className="hidden justify-end pb-4 sm:flex">
          <CommunityOrder />
        </div>

        <div>
          <CommunityCogs saveCog={saveCog} />
        </div>

        <BottomMenu
          buttons={[
            {
              label: 'Feed',
              icon: 'home',
              action: toFeed
            },
            {
              label: 'Community',
              icon: 'community',
              action: toCommunity
            },
            {
              label: 'Library',
              icon: 'multipleFiles',
              action: toLibrary
            },
            {
              label: 'Profile',
              icon: 'profileCircle',
              action: toMyProfile
            }
          ]}
        />
      </section>
    </CommunitySearchContextProvider>
  )
}

export default Community
