import { useState, useContext, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { parseAsBoolean, useQueryState } from 'nuqs'
import { gql } from 'src/__generated__/gql'
import { Transition } from '@headlessui/react'
import {
  PinCogMutationVariables,
  PinCogMutation,
  DestroyCogMutation,
  DestroyCogMutationVariables,
  DuplicateCogMutation,
  DuplicateCogMutationVariables,
  Cog
} from 'src/__generated__/graphql'
import { useToast } from '@/components/shared/Toast'
import CogsSearchContext from '@/components/library/store/CogsSearchContext'

import { default as LibraryCog } from '@/components/shared/Cog/index'
import Spinner from '@/components/shared/Spinner'
import Pagination from '@/components/shared/Pagination'
import ActionButton from '@/components/shared/ActionButton'
import ActionButtonMobile from '@/components/shared/ActionButtonMobile'
import CogEditor from '@/components/shared/CogEditor'
import CogAuthor from '@/components/shared/Cog/CogAuthor'
import Tags from '@/components/shared/Tags'
import ButtonPrimary from '@/components/shared/ButtonPrimary'
import CogSettingsMenu from '@/components/shared/CogSettingsMenu'
import Link from 'next/link'
import CogGenerator from '@/components/shared/CogGenerator'
import QrCodeModal from '@/components/shared/QrCodeModal'

interface LibraryCogListProps {
  cog: Cog
}

export const DUPLICATE_COG = gql(`
  mutation duplicateCog($duplicateCog: DuplicateCogInput!) {
    duplicateCog(input: $duplicateCog) {
      cog {
        id
        name
        description
        tags
        isPinned
        isPublic
        createdAt
        photoUrl(width: 1000, height: 1000)
        firstCard {
          id
        }
        firstBlock {
          id         
        }   
      }
    }
  }
`)

const PIN_COG = gql(`
  mutation pinCog($updateCog: UpdateCogInput!) {
    updateCog(input: $updateCog) {
      cog {
        id
        name
        description
        tags
        isPinned
        isPublic
        createdAt
        photoUrl(width: 1000, height: 1000)
      }
    }
  }
`)

const DESTROY_COG = gql(`
  mutation destroyCog($destroyCog: DestroyCogInput!) {
    destroyCog(input: $destroyCog) {
      id
      name
      description
      tags
      isPinned
      isPublic
      createdAt
      photoUrl(width: 1000, height: 1000)
    }
  }
`)

const LibraryCogList: React.FC<LibraryCogListProps> = ({ cog }) => {
  const toast = useToast()
  const router = useRouter()
  const {
    cogs,
    refetchCogs,
    paginationMetadata,
    limit,
    onLimitChange,
    onPageChange
  } = useContext(CogsSearchContext)

  const [focusedCog, setFocusedCog] = useState<Cog | undefined>(undefined)
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [openModal, setOpenModal] = useQueryState(
    'editor',
    parseAsBoolean.withDefault(false)
  )

  const [openGenerator, setOpenGenerator] = useQueryState(
    'generator',
    parseAsBoolean.withDefault(false)
  )

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  /* pin cog */
  const [pinCog] = useMutation<PinCogMutation, PinCogMutationVariables>(
    PIN_COG,
    {
      onError: (err) =>
        toast.open(
          'error',
          'An error occurred while trying to update the cog. Please try again.'
        ),
      onCompleted: (data) =>
        toast.open('success', 'The cog was updated successfully')
    }
  )

  const handlePinCog = async (isPinned: boolean, id: string) => {
    await pinCog({
      variables: {
        updateCog: {
          id: id,
          attributes: {
            isPinned: !isPinned
          }
        }
      }
    })
  }

  /* duplicate cog */
  const [duplicateCog] = useMutation<
    DuplicateCogMutation,
    DuplicateCogMutationVariables
  >(DUPLICATE_COG, {
    onError: (err) => toast.open('error', err.message),
    onCompleted: (data) => {
      toast.open(
        'success',
        `Cog '${data?.duplicateCog?.cog?.name}' was duplicated`
      )
      refetchCogs()
    }
    // update(cache, { data }) {
    //   const cacheQuery = cache.readQuery({
    //     query: SEARCH_COGS,
    //     variables: {
    //       filters: {
    //         query: query
    //       },
    //       order: orderBy
    //       // user: user
    //     }
    //   })

    //   cache.writeQuery({
    //     query: SEARCH_COGS,
    //     variables: {
    //       filters: {
    //         query: query
    //       },
    //       order: orderBy
    //       // user: user
    //     },
    //     data: {
    //       cogsSearch: [data?.duplicateCog?.cog, ...cacheQuery!.cogsSearch]
    //     }
    //   })
    // }
  })

  const handleDuplicateCog = async (id: string) => {
    await duplicateCog({
      variables: {
        duplicateCog: {
          id: id
        }
      }
    })
  }

  /* delete cog */
  const [destroyCog] = useMutation<
    DestroyCogMutation,
    DestroyCogMutationVariables
  >(DESTROY_COG, {
    onError: (err) => toast.open('error', err.message),
    onCompleted: (data) =>
      toast.open('success', `Cog '${data?.destroyCog?.name}' was deleted`)
  })

  const handleDeleteCog = async (id: string) => {
    await destroyCog({
      variables: {
        destroyCog: {
          id: id
        }
      },
      update(cache) {
        const normalizedId = cache.identify({ id, __typename: 'Cog' })
        cache.evict({ id: normalizedId })
        cache.gc()
      }
    })
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const sortByPinned = (array: Cog[]) =>
    array.slice().sort((a: any, b: any) => b.isPinned - a.isPinned)

  const toggleModal = () => {
    setOpenModal(!openModal)
    setFocusedCog(undefined)
  }

  const openCogEditor = (cog: Cog) => {
    toggleModal()
    setFocusedCog(cog)
  }

  const handleAddCog = () => {
    toggleModal()
  }

  const openMenu = () => {
    setShowMenu(true)
  }

  const toCog = (id: any) => {
    router.push(`/cogs/${id}/edit`)
  }

  const handlePlayClick = (e: React.MouseEvent, cog: Cog) => {
    e.stopPropagation() // Prevent parent click events from firing

    if (isMobile) {
      window.location.href = `/cogs/${cog.id}` // Redirect on mobile
    } else {
      setIsModalOpen(true)
    }
  }

  return (
    <>
      <CogEditor cog={focusedCog} open={openModal} toggleModal={toggleModal} />
      <CogGenerator isOpen={openGenerator} setIsOpen={setOpenGenerator} />

      {!!cogs ? (
        <>
          <div className="mt-6 grid grid-cols-1 items-center justify-center gap-y-4 overflow-hidden pb-10 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-6 lg:grid-cols-3 2xl:grid-cols-4">
            <div className="hidden h-full min-h-[264px] sm:block">
              <ActionButton
                icon="add"
                label="New Cog"
                handleOnClick={() => handleAddCog()}
              />
            </div>
            <div className="sm:hidden">
              <ActionButtonMobile
                icon="addSquare"
                label="Create a new cog"
                handleOnClick={() => handleAddCog()}
              />
            </div>

            {sortByPinned(cogs).map((cog) => (
              <div key={`cog-${cog.id}`} onClick={() => toCog(cog.id)}>
                <LibraryCog
                  cog={cog}
                  topLeft={
                    <Tags
                      tags={cog?.tags}
                      onEdit={() => {
                        openCogEditor(cog)
                      }}
                    />
                  }
                  topRight={
                    <CogSettingsMenu
                      cog={cog}
                      deleteCog={() => handleDeleteCog(cog.id)}
                      pinCog={handlePinCog}
                      duplicateCog={() => handleDuplicateCog(cog.id)}
                      editCog={() => {
                        openCogEditor(cog)
                      }}
                    />
                  }
                  bottomLeft={
                    <div onClick={(e) => e.stopPropagation()}>
                      <CogAuthor
                        photoUrl={cog?.user?.photoUrl}
                        user={cog?.user}
                        iconPosition="left"
                      />
                    </div>
                  }
                  bottomRight={
                    <ButtonPrimary
                      classNames="bottom-4 right-8 radius-xl outline-none"
                      label="Play"
                      size="small"
                      iconPosition="right"
                      icon="play"
                      onClick={(e) => handlePlayClick(e, cog)}
                    />
                  }
                />
                {!isMobile && (
                  <QrCodeModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    text="QR code for playing this cog"
                    showClose={true}
                    showButton={false}
                    manualCogId={cog.id}
                  />
                )}
              </div>
            ))}

            <div
              className="absolute -top-4 -right-4 w-[237px] sm:-right-2.5 sm:-top-1.5"
              style={{ zIndex: '10' }}
            >
              <Transition appear={true} show={showMenu} className="">
                <Transition.Child
                  className="duration-00 ease-in-out"
                  enter="transition-opacity duration-200"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                ></Transition.Child>
              </Transition>
            </div>
          </div>

          <div className="flex w-full">
            <Pagination
              siblingCount={1}
              currentPage={paginationMetadata?.currentPage}
              totalPages={paginationMetadata?.totalPages}
              totalCount={paginationMetadata?.totalCount}
              pageSize={paginationMetadata?.limitValue}
              limit={limit}
              onLimitChange={(limit: number) => onLimitChange(limit)}
              onPageChange={(page: number) => onPageChange(page)}
            />
          </div>
        </>
      ) : (
        <div className="flex h-[40vh] w-full items-center justify-center">
          <Spinner />
        </div>
      )}
    </>
  )
}

export default LibraryCogList
