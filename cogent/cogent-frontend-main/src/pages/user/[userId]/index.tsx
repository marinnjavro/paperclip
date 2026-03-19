import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { useQuery } from '@apollo/client'
import { gql } from 'src/__generated__/gql'
import { Cog, UserQuery, UserQueryVariables } from 'src/__generated__/graphql'
import { useToast } from '@/components/shared/Toast'
import useLocalStorage from '@/utils/hooks/useLocalStorage'
import useUrl from '@/utils/hooks/useUrl'

import Link from 'next/link'
import TopMenu from '@/components/layout/TopMenu'
import Icon from '@/components/shared/Icon'
import { default as ProfileCog } from '@/components/shared/Cog/index'
import ProfileCard from '@/components/profile/ProfileCard'
import OrganizationCard from '@/components/profile/OrganizationCard'
import ButtonPrimary from '@/components/shared/ButtonPrimary'
import BottomMenu from '@/components/layout/BottomMenu'
import Stats from '@/components/shared/Stats'

// prettier-ignore
const FETCH_USER = gql(/* GraphQL */ `
  query user($userId: ID!) {
    user(id: $userId) {
      id
      name
      bio
      email
      roles
      photoUrl(width: 1000, height: 1000)
      organization {
        id 
        name
        photoUrl
      }
      cogs {
        id
        name
        description
        photoUrl(width: 1000, height: 1000)
        tags
        isPinned
        isPublic
        createdAt
      }
    }
  }
`)

const UserProfile: NextPage = () => {
  const toast = useToast()
  const router = useRouter()
  const { query } = router
  const userId = query?.userId?.toString() || ''

  const [cogentUser] = useLocalStorage('cogentUser', '')

  const [shouldSkip, setShouldSkip] = useState(true)

  const { toCommunity, toLibrary, toProfile, toOpenCogGenerator } = useUrl()

  useEffect(() => {
    if (!!userId) {
      setShouldSkip(false)
    }
  }, [userId])

  const { loading, data } = useQuery<UserQuery, UserQueryVariables>(
    FETCH_USER,
    {
      variables: {
        userId: userId
      },
      skip: shouldSkip,
      onError: (err) => toast.open('error', err.message)
    }
  )

  const SettingsLink = () => (
    <Link href="/settings" legacyBehavior>
      <div className="absolute absolute right-5 right-5 top-5 top-5 cursor-pointer cursor-pointer text-day-text-label-primary hover:text-night-base-secondary hover:text-day-base-primary dark:text-white  dark:hover:text-night-base-secondary">
        <Icon type="settings" width={24} height={24} />
      </div>
    </Link>
  )

  return (
    <>
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
      {!loading && !!data?.user && (
        <section className="page-spacing p-4">
          <div className="relative flex flex-col pb-10 md:flex-row">
            <div className="relative sm:hidden">
              <h2 className="text-xl font-bold text-day-text-label-primary dark:text-white">
                My schools
              </h2>
              <div className="scrollbar-hidden mt-5 mb-6 flex gap-5 overflow-x-auto overflow-y-hidden sm:flex-wrap">
                {/* {organizations.map((organization) => (
                    <OrganizationCard
                      key={organization.id}
                      organization={organization}
                    />
                  ))} */}
                {!!data.user.organization ? (
                  <OrganizationCard organization={data.user.organization} />
                ) : (
                  '-'
                )}
              </div>
            </div>
            <div className="-md:sticky flex h-min w-full justify-center md:top-3 md:w-min">
              <div className="relative w-full  xs:min-w-[450px] md:pb-0">
                {cogentUser?.id === query?.userId && <SettingsLink />}
                <ProfileCard user={data?.user} />
              </div>
            </div>

            <div className="ml-0 grow pb-[50px] md:ml-5">
              <div className="mt-5 hidden rounded-4xl bg-day-base-02 p-6 dark:bg-night-base-02 sm:block md:mt-0">
                <div className="relative">
                  <h2 className="text-xl font-bold text-day-text-label-primary dark:text-white">
                    My schools
                  </h2>
                  {/* <div className="absolute top-2 right-2 flex">
                    <span className="mr-1 text-sm text-night-text-label-secondary dark:text-white dark:opacity-60">
                      View all schools
                    </span>
                    <Icon
                      classNames="mt-0.5"
                      type="arrowsDown"
                      width={16}
                      height={16}
                    />
                  </div> */}
                </div>
                <div className="mt-5 flex flex-wrap gap-5">
                  {/* {organizations.map((organization) => (
                    <OrganizationCard
                      key={organization.id}
                      organization={organization}
                    />
                  ))} */}
                  {!!data.user.organization ? (
                    <OrganizationCard organization={data.user.organization} />
                  ) : (
                    '-'
                  )}
                </div>
              </div>

              <div className="mt-6 w-full pb-20  sm:rounded-4xl sm:bg-day-base-02 sm:p-6 sm:dark:bg-night-base-02">
                <h2 className="text-xl font-bold  text-day-text-label-primary dark:text-white">
                  My best cogs
                </h2>

                <div className=" mt-5 grid w-full grid-cols-1 flex-row flex-wrap content-center gap-6 lg:grid-cols-2 2xl:grid-cols-3 ">
                  {!!data.user.cogs &&
                    data.user.cogs.slice(0, 2).map((cog: Cog) => (
                      <ProfileCog
                        cog={cog}
                        key={`cog-${cog.id}`}
                        bottomLeft={<Stats />}
                        bottomRight={
                          <Link
                            href={`/cogs/${cog.id}`}
                            passHref
                            legacyBehavior
                          >
                            <a
                              className="no-border-link"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ButtonPrimary
                                classNames="bottom-4 right-8 radius-xl outline-none"
                                label="Play"
                                size="small"
                                iconPosition="right"
                                icon="play"
                              />
                            </a>
                          </Link>
                        }
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
          <BottomMenu
            buttons={[
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
              { label: 'Create card', icon: 'addItem', action: () => {} },

              {
                label: 'Profile',
                icon: 'profileCircle',
                action: () => toProfile(data?.user?.id)
              }
            ]}
          />
        </section>
      )}
    </>
  )
}

export default UserProfile
