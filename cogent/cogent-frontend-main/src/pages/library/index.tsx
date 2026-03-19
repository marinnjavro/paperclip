import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import _ from 'lodash'
import useLocalStorage from '@/utils/hooks/useLocalStorage'
import useUrl from '@/utils/hooks/useUrl'
import { LibraryContextProvider } from '@/components/library/store/LibraryContext'

import ButtonPrimary from '@/components/shared/ButtonPrimary'
import RoleRestricted from '@/components/utils/RoleRestricted'
import TopMenu from '@/components/layout/TopMenu'
import BottomMenu from '@/components/layout/BottomMenu'
import PageHeader from '@/components/shared/PageHeader'
import LibraryTab from '@/components/library'

export type LibraryTabType = {
  title: string
  type: 'cogs' | 'blocks' | 'cards'
}

export const LIBRARY_TABS: LibraryTabType[] = [
  { title: 'My cogs', type: 'cogs' },
  { title: 'Blocks', type: 'blocks' },
  { title: 'Cards', type: 'cards' }
]

export const SORTING_TYPES = [
  { label: 'From old to new', value: 'created_at asc' },
  { label: 'From new to old', value: 'created_at desc' }
]

export const CARD_CATEGORIES = [
  { value: 'teaching', label: 'Teaching Cards' },
  { value: 'testing', label: 'Testing Cards' }
]

export const CARD_TYPES = [
  // { value: '', label: 'All Cards' },
  { value: 'audio', label: 'Audio Cards', category: 'teaching' },
  { value: 'multimedia', label: 'Video/Photo Cards', category: 'teaching' },
  {
    value: 'media and text',
    label: 'Media/Text Cards',
    category: 'teaching'
  },
  // { value: 'text', label: 'Text Cards', category: 'teaching' },
  // { value: 'photo and text', label: 'Photo/Text Cards', category: 'teaching' },
  // { value: 'video and text', label: 'Video/Text Cards', category: 'teaching' },
  { value: 'action', label: 'Quiz Cards', category: 'testing' }
  // { value: 'preview', label: 'Preview Cards' }
]

const Library: NextPage = () => {
  const router = useRouter()

  const [cogentUser] = useLocalStorage('cogentUser', '')
  const { toFeed, toCommunity, toLibrary, toProfile, toOpenCogGenerator } = useUrl()

  const redirectToCommunity = () => {
    router.push('/community')
  }

  const redirectToLibrary = () => {
    router.push('/library')
  }

  const redirectToProfile = () => {
    router.push(`/user/${cogentUser?.id}`)
  }

  return (
    <RoleRestricted to="staff">
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
        <div className="page-spacing pb-36">
          <div className="hidden sm:block">
            <PageHeader
              title="Library of your work"
              subtitle="Store, create new cards or blocks, use and connect your work to different projects"
            />
          </div>
          <LibraryContextProvider>
            <LibraryTab />
          </LibraryContextProvider>

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
                action: () => toProfile(cogentUser?.id)
              }
            ]}
          />
        </div>
      </>
    </RoleRestricted>
  )
}

export default Library
