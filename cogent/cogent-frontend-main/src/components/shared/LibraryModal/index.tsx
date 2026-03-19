import { Fragment } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import LibraryModalContextWrapper from './state/LibraryModalContextWrapper'

import LibrarySelectModule from '@/components/shared/LibraryModal/LibrarySelectModule'
import LibrarySearchModule from '@/components/shared/LibraryModal/LibrarySearchModule'

interface LibraryModalProps {
  module: 'select' | 'search'
  selectTarget: 'cog' | 'block' | 'card'
  onSelect: (item: any) => void
  selectedCog?: string
  selectedBlock?: string
  selectedCard?: string
  isOpen: boolean
  toggleModal: () => void
}

/**
 * Library modal functions as search and only returns id of the selected item.
 * Mutations should be handled by parent components.
 *
 * Two modules are available:
 *    1. Select:
 *       - user can select an item (cog, block or card) from a list
 *         depending on the select prop value
 *    2. Search:
 *       - user can select a cog to see a list of it's blocks,
 *         and block to see a list of it's cards,
 *         select prop value determines the depth
 *  */
const LibraryModal: React.FC<LibraryModalProps> = ({
  module,
  selectTarget,
  onSelect,
  isOpen,
  toggleModal
}) => {
  const isSelectModule = module === 'select'
  const isSearchModule = module === 'search'

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={toggleModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-x-0 top-0 h-full overflow-y-auto sm:overflow-hidden">
          <div className="flex min-h-full justify-center pt-10 text-center sm:px-6 sm:py-[65px]">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="h-full w-full transform overflow-hidden rounded-2xl border border-solid border-white border-opacity-10 bg-night-base-02 p-4 text-left align-middle shadow-xl transition-all sm:h-[85vh] sm:border-none sm:p-6">
                <LibraryModalContextWrapper>
                  <>
                    {isSelectModule && (
                      <LibrarySelectModule
                        target={selectTarget}
                        toggleModal={toggleModal}
                        onSelect={onSelect}
                      />
                    )}
                    {isSearchModule && (
                      <LibrarySearchModule
                        target={selectTarget}
                        toggleModal={toggleModal}
                        onSelect={onSelect}
                      />
                    )}
                  </>
                  {/* <LibraryModalCogs title="Copy to cog" closeModal={closeModal} /> */}
                  {/* {duplicate === 'block' && (
                  <CogList
                    cogs={cogs}
                    selectCog={handleSelectCog}
                    closeModal={closeModal}
                  />
                )}
                {duplicate === 'card' &&
                  (!selectedCog ? (
                    <CogList
                      cogs={cogs}
                      selectCog={handleSelectCog}
                      closeModal={closeModal}
                    />
                  ) : (
                    <BlockList
                      blocks={selectedCog?.blocks}
                      deselectCog={handleDeselectCog}
                      selectBlock={handleSelectBlock}
                      closeModal={closeModal}
                    />
                  ))} */}
                </LibraryModalContextWrapper>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default LibraryModal
