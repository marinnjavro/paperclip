import React, { useState, useContext, createContext } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { Block, Card } from 'src/__generated__/graphql'
import { sortByPosition } from '@/utils/functions'
import { getOpeningCard } from '@/utils/filterData'
import { useToast } from '@/components/shared/Toast'
import useUrl from '@/utils/hooks/useUrl'
import EditorBlocksContext from '@/components/blocks/state/EditorBlocksContext'

import Spinner from '@/components/shared/Spinner'
import ButtonPrimary from '@/components/shared/ButtonPrimary'
import TopMenu from '@/components/layout/TopMenu'
import BottomMenu from '@/components/layout/BottomMenu'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import PageHeading from '@/components/shared/PageHeading'
import NewBlockButton from '@/components/blocks/NewBlockButton'
import MassEditorMenu from '@/components/library/MassEditor/MassEditorMenu'
import QrCodeModal from '@/components/shared/QrCodeModal'
import SmallCardsWrapper from '@/components/blocks/CardGroup/SmallCardsWrapper'
import SortableCards from '@/components/blocks/CardGroup/SortableCards'
import UserRestricted from '../utils/UserRestricted'

const Prompt = dynamic(() => import('@/components/shared/Prompt'))

const LibraryModal = dynamic(() => import('@/components/shared/LibraryModal'))

const CardTemplatesModal = dynamic(
  () => import('@/components/shared/CardTemplatesModal')
)

export const MassEditorContext = createContext({
  isMassEditing: false,
  openMassEditor: () => {},
  isCardSelected: (card: Card) => {},
  addToCog: (card: Card) => {},
  toggleSelection: (card: Card) => {}
})

const EditorBlocks = () => {
  const router = useRouter()
  const toast = useToast()

  const { toCog, toCommunity, toLibrary, toMyProfile } = useUrl()

  const {
    loading,
    cog,
    blocks,
    renameBlock,
    activeBlock,
    createBlock,
    updateCardOrder,
    createCard,
    duplicateCard,
    addCardToCog,
    isMassEditing,
    setIsMassEditing
  } = useContext(EditorBlocksContext)

  const [isQRModalOpen, setIsQRModalOpen] = useState(false)

  const [selectedCard, setSelectedCard] = useState<Card | null>(null)
  const [selectedCards, setSelectedCards] = useState<Card[]>([])

  const [isCardPromptVisible, setIsCardPromptVisible] = useState<boolean>(false)
  const [isTemplatesModalVisible, setIsTemplatesModalVisible] =
    useState<boolean>(false)
  const [isSearchLibraryModalVisible, setIsSearchLibraryModalVisible] =
    useState<boolean>(false)
  const [isLibraryModalVisible, setIsLibraryModalVisible] =
    useState<boolean>(false)

  const getSortableCards = (cards: Card[] | undefined | null) => {
    if (!cards) return []

    const sortableCards = sortByPosition(
      cards.filter((card) => card.cardType !== 'opening' && !card.parentCardId)
    )
    if (!!sortableCards) {
      return sortableCards
    }
    return []
  }

  const isCardSelected = (card: Card) => {
    return !!selectedCards.find((selectedCard) => selectedCard.id === card.id)
  }

  const shareCog = () => {
    setIsQRModalOpen(!isQRModalOpen)
  }

  const handleSelectBlock = async (block: Block) => {
    if (!block) {
      toast.open(
        'error',
        'An error occurred while trying to duplicate card. Please try again.'
      )
      return
    }

    if (!!selectedCard) {
      addCardToCog(selectedCard, block.id)
      setSelectedCard(null)
    }

    if (selectedCards.length) {
      selectedCards.forEach((selectedCard) =>
        addCardToCog(selectedCard, block.id)
      )
      setSelectedCards([])
      closeMassEditor()
    }

    toggleSearchLibraryModal()
  }

  const handleSelectCard = (card: Card) => {
    duplicateCard(card)
  }

  const handleAddToCog = (card: Card) => {
    toggleSearchLibraryModal()
    setSelectedCard(card)
  }

  const toggleCardSelection = (card: Card) => {
    if (isCardSelected(card)) {
      setSelectedCards(
        selectedCards.filter((selectedCard) => selectedCard.id !== card.id)
      )
    } else {
      setSelectedCards([...selectedCards, card])
    }
  }

  const handleDeselect = () => {
    setSelectedCards([])
  }

  const toggleNewCardPrompt = () => {
    setIsCardPromptVisible(!isCardPromptVisible)
  }

  const toggleCardTemplatesModal = () => {
    setIsTemplatesModalVisible(!isTemplatesModalVisible)
  }

  const toggleLibraryModal = () => {
    setIsLibraryModalVisible(!isLibraryModalVisible)
  }

  const toggleSearchLibraryModal = () => {
    setIsSearchLibraryModalVisible(!isSearchLibraryModalVisible)
  }

  const openMassEditor = () => {
    setIsMassEditing(true)
  }

  const closeMassEditor = () => {
    setIsMassEditing(false)
  }

  return (
    !!cog && (
      <UserRestricted cog={cog}>
        <>
          <TopMenu
            buttonsMobile={
              <ButtonPrimary
                label="Share Cog"
                icon="cog"
                iconPosition="right"
                onClick={() => shareCog()}
                classNames="justify-end"
                size="small"
              />
            }
            handleBackClick={() => router.back()}
            buttonsRight={
              <ButtonPrimary label="Share Cog" icon="cog" onClick={shareCog} />
            }
          />

          <QrCodeModal
            setIsModalOpen={setIsQRModalOpen}
            text="Share cog"
            isModalOpen={isQRModalOpen}
            manualCogId={cog.id}
          />

          <Prompt
            isOpen={isCardPromptVisible}
            setIsOpen={setIsCardPromptVisible}
            text="Add card"
            actions={[
              {
                text: 'Choose from your library',
                icon: 'multipleFiles',
                function: () => toggleLibraryModal()
              },
              {
                text: 'Create new',
                icon: 'addCircle',
                function: () => toggleCardTemplatesModal()
              }
            ]}
          />

          {!!activeBlock && (
            <CardTemplatesModal
              isOpen={isTemplatesModalVisible}
              toggleModal={toggleCardTemplatesModal}
              showOpeningCard={
                !!activeBlock?.cards?.collection
                  ? !getOpeningCard(activeBlock?.cards?.collection)
                  : true
              }
              handleTemplateOnClick={createCard}
            />
          )}

          {!!activeBlock && (
            <LibraryModal
              module="select"
              selectTarget="card"
              isOpen={isLibraryModalVisible}
              toggleModal={toggleLibraryModal}
              onSelect={handleSelectCard}
            />
          )}

          <LibraryModal
            module="search"
            selectTarget="block"
            isOpen={isSearchLibraryModalVisible}
            toggleModal={toggleSearchLibraryModal}
            onSelect={handleSelectBlock}
          />

          {isMassEditing && (
            <div className="fixed inset-x-0 bottom-0 z-10 mb-[70px] w-full py-4 sm:mb-0">
              <MassEditorMenu
                type="card"
                batchAddToCog={toggleSearchLibraryModal}
                selected={selectedCards}
                deselect={handleDeselect}
                closeMenu={closeMassEditor}
              />
            </div>
          )}

          <div className="page-spacing">
            {!!cog && (
              <>
                <div className="hidden sm:block">
                  <Breadcrumbs
                    breadcrumbs={[
                      {
                        label: 'My cogs',
                        path: '/library'
                      },
                      {
                        label: cog?.name,
                        path: `/cogs/${cog?.id}/edit`
                      },
                      {
                        label: 'Blocks'
                      }
                    ]}
                  />
                </div>

                <div className="mt-2 hidden sm:block">
                  <PageHeading
                    icon="chevronLeft"
                    label={cog?.name}
                    handleOnClick={() => toCog(cog?.id)}
                  />
                </div>
              </>
            )}

            {!!blocks ? (
              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-5 pb-10 pb-5 xs:justify-start">
                {sortByPosition(blocks).map((block: Block, i: number) => {
                  return (
                    <SmallCardsWrapper
                      key={`cards-wrapper-${block.id}`}
                      block={block}
                      isFocused={block.id === activeBlock?.id}
                      toggleModal={toggleNewCardPrompt}
                    >
                      <MassEditorContext.Provider
                        value={{
                          isMassEditing: isMassEditing,
                          openMassEditor: openMassEditor,
                          isCardSelected: isCardSelected,
                          addToCog: handleAddToCog,
                          toggleSelection: toggleCardSelection
                        }}
                      >
                        <SortableCards
                          key={`sortable-${block.id}`}
                          items={getSortableCards(block?.cards?.collection)}
                          updateOrder={updateCardOrder}
                        />
                      </MassEditorContext.Provider>
                    </SmallCardsWrapper>
                  )
                })}
                <div className="relative h-min w-full max-w-[14rem] cursor-pointer rounded-[40px] border border-solid border-opacity-silver px-5 pb-5 opacity-60 dark:border-white dark:border-opacity-10 dark:bg-night-base-02 dark:opacity-80 xs:w-min">
                  <NewBlockButton createNewBlock={createBlock} />
                </div>
              </div>
            ) : (
              <div className="flex h-[40vh] w-full items-center justify-center">
                <Spinner />
              </div>
            )}
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
                action: toMyProfile
              }
            ]}
          />
        </>
      </UserRestricted>
    )
  )
}

export default EditorBlocks
