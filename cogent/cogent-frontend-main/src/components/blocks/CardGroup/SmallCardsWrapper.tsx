import React, { useState, useEffect, useRef, useContext } from 'react'
import { useRouter } from 'next/router'
import { useToast } from '@/components/shared/Toast'
import { Block, Card, User } from 'src/__generated__/graphql'
import Icon from '@/components/shared/Icon'
import OpeningCard from '@/components/shared/OpeningCard'
import ActionButton from '@/components/shared/ActionButton'
import { stripHTML } from '@/utils/textUtils'
import EditorBlocksContext from '@/components/blocks/state/EditorBlocksContext'

const MAX_CHARS_BLOCK_NAME = 46

type SmallCardsWrapperProps = {
  block: Block
  isFocused: boolean
  toggleModal: () => void
  children: JSX.Element
}

const SmallCardsWrapper = ({
  block,
  isFocused,
  toggleModal,
  children
}: SmallCardsWrapperProps) => {
  const router = useRouter()
  const { blockId } = router.query
  const ref = useRef<any>(null)
  const toast = useToast()

  const { onBlockClick, renameBlock } = useContext(EditorBlocksContext)

  const [isEditingName, setIsEditingName] = useState<boolean>(false)
  const [newName, setNewName] = useState<string>(block.name || '')

  useEffect(() => {
    const element = ref.current
    if (element && element.id === blockId) {
      element.scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      })
    }
  }, [blockId])

  const openingCard = block?.cards?.collection.find(
    (card) => card.cardType === 'opening'
  )

  const handleEditOnClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    setIsEditingName(true)
  }

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value)
  }

  const saveNameChanges = (
    e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => {
    e.stopPropagation()
    if (newName === block.name) return setIsEditingName(false)
    if (!newName) return toast.open('error', 'Please enter Block name')
    if (newName.length > MAX_CHARS_BLOCK_NAME) {
      toast.open(
        'error',
        `Block name must be at most ${MAX_CHARS_BLOCK_NAME} characters`
      )
      return
    }

    renameBlock(newName)
    setIsEditingName(false)
  }

  const getSortableCards = (cards: Card[]) =>
    cards.filter((card) => !card.parentCardId)

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveNameChanges(e)
    }
  }

  const addCard = (e: React.MouseEvent) => {
    if (isFocused) {
      e.stopPropagation()
    }
    toggleModal()
  }

  return (
    <div ref={ref} id={block.id} className="w-full">
      <section
        className={`relative h-min w-full cursor-pointer rounded-[40px] border border-solid bg-white px-5 pb-5 dark:bg-night-base-02 ${
          isFocused
            ? 'border-2 border-day-base-primary dark:border-day-base-secondary'
            : 'border-opacity-silver border-opacity-70 dark:border-white dark:border-opacity-10'
        }`}
        onClick={() => {
          setIsEditingName(false)
          onBlockClick(block, isFocused)
        }}
      >
        <div
          className="flex items-center gap-1 px-2.5 pt-5 pb-3.5"
          onClick={(e) => {
            if (!isEditingName) return

            e.stopPropagation()
          }}
        >
          {isEditingName ? (
            <>
              <div className="w-full border-b border-dashed border-opacity-silver border-opacity-70 dark:border-white dark:border-opacity-10 sm:w-1/2 lg:w-1/3">
                <input
                  className="w-full border-none bg-transparent px-0 pb-1 text-lg font-bold text-night-base-01 placeholder:font-normal placeholder:italic focus:outline-none focus:outline-none focus:ring-0 dark:text-white"
                  style={{ background: 'transparent' }}
                  type="text"
                  placeholder="Enter a new name"
                  aria-label="Block Name"
                  value={newName}
                  onChange={onNameChange}
                  onKeyPress={(e) => handleKeyPress(e)}
                />
              </div>
              <div
                className="text-support-gray-02 mx-1 mt-2 pl-2 hover:text-day-base-primary dark:hover:text-night-base-secondary"
                onClick={(e: React.MouseEvent<HTMLElement>) =>
                  saveNameChanges(e)
                }
              >
                <Icon height={14} width={14} type="checkMark" />
              </div>
            </>
          ) : (
            <>
              <span className="text-lg font-bold text-night-base-01 dark:text-white">
                {block.name}
              </span>
              <div
                className="text-support-gray-02 p-2 hover:text-day-base-primary dark:hover:text-night-base-secondary"
                {...(isFocused && {
                  onClick: (e: React.MouseEvent<HTMLElement>) =>
                    handleEditOnClick(e)
                })}
              >
                <Icon height={15} width={15} type="edit" />
              </div>
            </>
          )}
        </div>
        <div className="my-9 grid grid-cols-2 gap-4 xs:grid-cols-3 sm:flex sm:flex-wrap sm:gap-x-3 sm:gap-y-8">
          {!!block?.cards?.collection &&
            getSortableCards(block?.cards?.collection).length > 6 && (
              <div className="aspect-ratio--wrapper--9-16 flex w-full justify-center sm:h-[350px] sm:w-[181px]">
                <div className="aspect-ratio--content">
                  <ActionButton
                    icon="add"
                    alignContent="vertical"
                    label="New Card"
                    borderRadius="2xl"
                    handleOnClick={addCard}
                  />
                </div>
              </div>
            )}

          {!!openingCard && (
            <div className="w-full overflow-hidden rounded-2xl bg-night-base-03 dark:border dark:border-solid dark:border-white dark:border-opacity-10 sm:h-[350px] sm:w-[181px]">
              <div className="h-full w-full overflow-hidden">
                <div className="flex h-full w-full text-sm">
                  {!!block?.cog?.user && (
                    <OpeningCard
                      blockName={openingCard?.name || ''}
                      author={block?.cog?.user.name}
                      organization={block?.cog?.user?.organization?.name}
                      small
                      photoUrl={block?.cog?.user?.photoUrl || ''}
                    />
                  )}
                </div>
              </div>
            </div>
          )}

          {children}

          <div className="aspect-ratio--wrapper--9-16 flex w-full justify-center sm:h-[350px] sm:w-[181px]">
            <div className="aspect-ratio--content">
              <ActionButton
                icon="add"
                alignContent="vertical"
                label="New Card"
                borderRadius="2xl"
                handleOnClick={addCard}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SmallCardsWrapper
