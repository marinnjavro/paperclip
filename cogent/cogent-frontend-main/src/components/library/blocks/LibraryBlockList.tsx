import { useState, useContext } from 'react'
import { gql } from 'src/__generated__/gql'
import { useMutation } from '@apollo/client'
import {
  DuplicateBlockMutation,
  DuplicateBlockMutationVariables,
  Cog,
  Block
} from 'src/__generated__/graphql'
import BlocksSearchContext from '@/components/library/store/BlocksSearchContext'

import { useToast } from '@/components/shared/Toast'

import Spinner from '@/components/shared/Spinner'
import LibraryModal from '@/components/shared/LibraryModal'
import MassEditorMenu from '@/components/library/MassEditor/MassEditorMenu'
import LibraryBlock from '@/components/library/blocks/LibraryBlock'
import Pagination from '@/components/shared/Pagination'

const DUPLICATE_BLOCK = gql(`
    mutation duplicateBlock($duplicateBlock: DuplicateBlockInput!) {
      duplicateBlock(input: $duplicateBlock) {
        block {
          id
          name
          cogId
        }
      }
    }
 `)

const LibraryBlockList = () => {
  const toast = useToast()
  const { blocks, onPageChange, limit, onLimitChange, paginationMetadata } =
    useContext(BlocksSearchContext)

  const [isMassEditing, setIsMassEditing] = useState<boolean>(false)
  const [selectedBlocks, setSelectedBlocks] = useState<Block[]>([])
  const [isLibraryModalVisible, setIsLibraryModalVisible] =
    useState<boolean>(false)
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null)

  const [duplicateBlock] = useMutation<
    DuplicateBlockMutation,
    DuplicateBlockMutationVariables
  >(DUPLICATE_BLOCK, {
    onError: (err) => toast.open('error', err.message),
    onCompleted: (data) => {
      toast.open(
        'success',
        `Block '${data.duplicateBlock?.block?.name}' was added to the cog successfully!`
      )
    }
    // refetchQueries: [
    //   {
    //     query: SEARCH_BLOCKS,
    //     variables: {
    //       filters: {
    //         query: '',
    //         card_type: []
    //       },
    //       order: 'blocks.created_at asc'
    //     }
    //   }
    // ]
    // update(cache, { data }) {
    //   const query = cache.readQuery({
    //     query: SEARCH_COGS,
    //     variables: {
    //       filters: {
    //         query: '',
    //         card_type: []
    //       },
    //       order: 'cogs.created_at asc',
    //       user: 'ALL'
    //     }
    //   })

    //   // cache.writeQuery({
    //   //   query: FETCH_BLOCK,
    //   //   variables: {
    //   //     blockId: blockId as string
    //   //   },
    //   //   data: {
    //   //     block: {
    //   //       ...query!.block,
    //   //       cards: !!query?.block?.cards
    //   //         ? [data?.duplicateCard?.card, ...query?.block?.cards]
    //   //         : [data?.createduplicateCardCard?.card]
    //   //     }
    //   //   }
    //   // })
    // }
  })

  const isBlockSelected = (block: Block) => {
    return !!selectedBlocks.find(
      (selectedBlock) => selectedBlock.id === block.id
    )
  }

  const openMassEditor = () => {
    setIsMassEditing(true)
  }

  const closeMassEditor = () => {
    setIsMassEditing(false)
  }

  const toggleLibraryModal = () => {
    setIsLibraryModalVisible(!isLibraryModalVisible)
  }

  const toggleBlockSelection = (block: Block) => {
    if (isBlockSelected(block)) {
      setSelectedBlocks(
        selectedBlocks.filter((selectedBlock) => selectedBlock.id !== block.id)
      )
    } else {
      setSelectedBlocks([...selectedBlocks, block])
    }
  }

  const handleDeselect = () => {
    setSelectedBlocks([])
  }

  const handleAddToCog = (block: Block) => {
    setSelectedBlock(block)
    toggleLibraryModal()
  }

  const handleSelectCog = async (cog: Cog) => {
    if (!cog) {
      toast.open(
        'error',
        'An error occurred while trying to duplicate block. Please try again.'
      )
      return
    }

    if (!!selectedBlock) {
      await duplicateBlock({
        variables: {
          duplicateBlock: {
            id: selectedBlock?.id,
            attributes: {
              name: selectedBlock?.name || '',
              cogId: cog.id
            }
          }
        }
      })
      setSelectedBlock(null)
    }

    if (selectedBlocks.length) {
      selectedBlocks.forEach(
        async (selectedBlock) =>
          await duplicateBlock({
            variables: {
              duplicateBlock: {
                id: selectedBlock?.id,
                attributes: {
                  name: selectedBlock?.name || '',
                  cogId: cog.id
                }
              }
            }
          })
      )
      setSelectedBlocks([])
      closeMassEditor()
    }

    toggleLibraryModal()
  }

  return (
    <>
      <LibraryModal
        module="select"
        selectTarget="cog"
        isOpen={isLibraryModalVisible}
        toggleModal={toggleLibraryModal}
        onSelect={handleSelectCog}
      />

      {isMassEditing && (
        <div className="fixed inset-x-0 bottom-0 z-10 mb-[70px] w-full py-4 sm:mb-0">
          <MassEditorMenu
            type="block"
            batchAddToCog={toggleLibraryModal}
            selected={selectedBlocks}
            deselect={handleDeselect}
            closeMenu={closeMassEditor}
          />
        </div>
      )}

      {!!blocks ? (
        blocks.length ? (
          <>
            <div className="mt-6 grid grid-cols-1 items-center justify-center gap-x-6 gap-y-8 overflow-hidden pb-10 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {blocks?.map((block) => (
                <LibraryBlock
                  key={block.id}
                  block={block}
                  isSelected={isBlockSelected(block)}
                  isMassEditing={isMassEditing}
                  deleteBlock={() => {}}
                  addToCog={handleAddToCog}
                  toggleSelection={toggleBlockSelection}
                  openMassEditor={openMassEditor}
                  showCogName={true}
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
            No blocks found.
          </div>
        )
      ) : (
        <div className="flex h-[40vh] w-full items-center justify-center">
          <Spinner />
        </div>
      )}
    </>
  )
}

export default LibraryBlockList
