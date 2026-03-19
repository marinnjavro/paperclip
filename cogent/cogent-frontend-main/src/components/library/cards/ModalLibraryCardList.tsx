import { useState, useContext } from 'react'
import { gql } from 'src/__generated__/gql'
import { useMutation } from '@apollo/client'
import {
  DuplicateCardMutation,
  DuplicateCardMutationVariables,
  Block,
  Card
} from 'src/__generated__/graphql'
import { filterOpeningCards } from '@/utils/filterData'
import { useToast } from '@/components/shared/Toast'

import Spinner from '@/components/shared/Spinner'
import Pagination from '@/components/shared/Pagination'
import LibraryModal from '@/components/shared/LibraryModal'
import MassEditorMenu from '@/components/library/MassEditor/MassEditorMenu'
import LibraryCard from '@/components/library/cards/LibraryCard'
import LibraryModalCardsSearchContext from '@/components/shared/LibraryModal/state/LibraryModalCardsSearchContext'

/* duplicate card */
const DUPLICATE_CARD = gql(`
    mutation duplicateCard($duplicateCard: DuplicateCardInput!) {
      duplicateCard(input: $duplicateCard) {
        card {
          id
          blockId
          parentCardId
          name
          cardType
          text
          position
          photoUrl(width: 1000, height: 1000)
          videoUrl
          audioUrl
          actions
        }
      }
    }
 `)

const ModalLibraryCardList = () => {
  const toast = useToast()

  const { cards, paginationMetadata, limit, onLimitChange, onPageChange } =
    useContext(LibraryModalCardsSearchContext)

  const [isMassEditing, setIsMassEditing] = useState<boolean>(false)
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)
  const [selectedCards, setSelectedCards] = useState<Card[]>([])
  const [isLibraryModalVisible, setIsLibraryModalVisible] =
    useState<boolean>(false)

  const [duplicateCard] = useMutation<
    DuplicateCardMutation,
    DuplicateCardMutationVariables
  >(DUPLICATE_CARD, {
    onError: (err) => toast.open('error', err.message),
    onCompleted: (data) => {
      toast.open(
        'success',
        `Card ${
          data?.duplicateCard?.card?.name
            ? `'${data?.duplicateCard?.card?.name}'`
            : ''
        } was added to the cog successfully!`
      )
    }
  })

  const isCardSelected = (card: Card) => {
    return !!selectedCards.find((selectedCard) => selectedCard.id === card.id)
  }

  const openMassEditor = () => {
    setIsMassEditing(true)
  }

  const closeMassEditor = () => {
    setIsMassEditing(false)
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

  const handleAddToCog = (card: Card) => {
    toggleLibraryModal()
    setSelectedCard(card)
  }

  const handleDeselect = () => {
    setSelectedCards([])
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
      await duplicateCard({
        variables: {
          duplicateCard: {
            id: selectedCard.id,
            attributes: {
              cardType: selectedCard.cardType,
              blockId: block.id
            }
          }
        }
      })
      setSelectedCard(null)
    }

    if (selectedCards.length) {
      selectedCards.forEach(
        async (selectedCard) =>
          await duplicateCard({
            variables: {
              duplicateCard: {
                id: selectedCard.id,
                attributes: {
                  cardType: selectedCard.cardType,
                  blockId: block.id
                }
              }
            }
          })
      )
      setSelectedCards([])
      closeMassEditor()
    }

    toggleLibraryModal()
  }

  const toggleLibraryModal = () => {
    setIsLibraryModalVisible(!isLibraryModalVisible)
  }

  return (
    <>
      <LibraryModal
        module="search"
        selectTarget="block"
        isOpen={isLibraryModalVisible}
        toggleModal={toggleLibraryModal}
        onSelect={handleSelectBlock}
      />

      {isMassEditing && (
        <div className="fixed inset-x-0 bottom-0 z-10 mb-[70px] w-full py-4 sm:mb-0">
          <MassEditorMenu
            type="card"
            batchAddToCog={toggleLibraryModal}
            selected={selectedCards}
            deselect={handleDeselect}
            closeMenu={closeMassEditor}
          />
        </div>
      )}

      {!!cards ? (
        <div>
          {cards.length ? (
            <>
              <div className="mt-9 grid grid-cols-2 gap-4 pb-10 xs:grid-cols-3 sm:flex sm:flex-wrap sm:gap-x-6 sm:gap-y-8">
                {filterOpeningCards(cards).map((card: Card) => (
                  <LibraryCard
                    key={card.id}
                    card={card}
                    isMassEditing={isMassEditing}
                    openMassEditor={openMassEditor}
                    isSelected={isCardSelected(card)}
                    addToCog={handleAddToCog}
                    toggleSelection={toggleCardSelection}
                  />
                ))}
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
            <div className="h-full w-full py-20 text-center text-sm italic opacity-50">
              No cards found.
            </div>
          )}
        </div>
      ) : (
        <div className="flex h-[40vh] w-full items-center justify-center">
          <Spinner />
        </div>
      )}
    </>
  )
}

export default ModalLibraryCardList
