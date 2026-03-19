import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import useUrl from '@/utils/hooks/useUrl'
import useLocalStorage from '@/utils/hooks/useLocalStorage'
import CogContext from '@/components/cog/state/CogContext'

import UserRestricted from '@/components/utils/UserRestricted'

import Spinner from '@/components/shared/Spinner'
import ButtonPrimary from '@/components/shared/ButtonPrimary'
import ActionButton from '@/components/shared/ActionButton'
import ActionButtonMobile from '@/components/shared/ActionButtonMobile'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import TopMenu from '@/components/layout/TopMenu'
import BottomMenu from '@/components/layout/BottomMenu'
import PageHeading from '@/components/shared/PageHeading'
import QrCodeModal from '@/components/shared/QrCodeModal'
import SortableBlockList from '@/components/cog/SortableBlockList'

const EditorCog = () => {
  const router = useRouter()

  const [cogentUser] = useLocalStorage('cogentUser', '')
  const { loading, cog, blocks, createBlock } = useContext(CogContext)
  const { toCommunity, toLibrary, toProfile } = useUrl()

  const [isQRModalOpen, setIsQRModalOpen] = useState(false)

  const shareCog = () => {
    setIsQRModalOpen(!isQRModalOpen)
  }

  return (
    !!cog && (
      <UserRestricted cog={cog}>
        <>
          <QrCodeModal
            setIsModalOpen={setIsQRModalOpen}
            text="Share cog"
            isModalOpen={isQRModalOpen}
            manualCogId={cog.id}
          />

          <TopMenu
            buttonsRight={
              <ButtonPrimary label="Share Cog" icon="cog" onClick={shareCog} />
            }
            buttonsMobile={
              <ButtonPrimary
                label="Share Cog"
                size="small"
                icon="cog"
                onClick={shareCog}
              />
            }
            handleBackClick={() => router.back()}
          />

          <div className="page-spacing">
            <div className="hidden sm:block">
              <Breadcrumbs
                breadcrumbs={[
                  {
                    label: 'My cogs',
                    path: '/library'
                  },
                  {
                    label: cog?.name
                  }
                ]}
              />
            </div>
            <div className="mt-2 hidden sm:block">
              <PageHeading
                icon="chevronLeft"
                label="All Cogs"
                handleOnClick={toLibrary}
              />
            </div>
            <div className="page-spacing mt-5">
              {loading ? (
                <div className="flex h-[40vh] w-full items-center justify-center">
                  <Spinner />
                </div>
              ) : (
                !!blocks && (
                  <section className="grid grid-cols-1 items-center justify-center gap-x-5 gap-y-5 overflow-hidden pb-10 sm:grid-cols-2 sm:gap-y-8 lg:grid-cols-3 2xl:grid-cols-4	">
                    <div className="mb-[7px] hidden h-[215px] sm:block xl:h-[250px]">
                      <ActionButton
                        icon="add"
                        label="New Block"
                        handleOnClick={() => createBlock()}
                      />
                    </div>
                    <div className="sm:hidden">
                      <ActionButtonMobile
                        icon="addSquare"
                        label="Create a new block"
                        handleOnClick={() => createBlock()}
                      />
                    </div>
                    <SortableBlockList />
                  </section>
                )
              )}
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
              {
                label: 'Create card',
                icon: 'addItem',
                action: () => {}
              },

              {
                label: 'Profile',
                icon: 'profileCircle',
                action: () => toProfile(cogentUser?.id)
              }
            ]}
          />
        </>
      </UserRestricted>
    )
  )
}

export default EditorCog
