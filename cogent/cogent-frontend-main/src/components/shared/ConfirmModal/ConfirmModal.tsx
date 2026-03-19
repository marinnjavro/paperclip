import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useRef, useState } from 'react'
import Icon from '@/components/shared/Icon'
import ButtonPrimary from '@/components/shared/ButtonPrimary'

interface ConfirmModalProps {
  isOpen: boolean
  message: string
  onConfirm: () => void
  onCancel: () => void
  setIsOpen: (value: boolean) => void
  showClose?: boolean
  showInfo?: boolean
}
const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
  setIsOpen,
  showClose = true,
  showInfo = false
}) => {
  const closeButtonRef: any = useRef()
  const [showText, setShowText] = useState(true)

  function toggle() {
    setShowText((showText) => !showText)
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        initialFocus={closeButtonRef}
        className="relative z-50"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 opacity-100 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />
        </Transition.Child>
        <div className="fixed inset-x-3 bottom-3 flex items-center justify-center sm:inset-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="text:night-base-01 relative w-[454px] rounded-3xl border border-solid border-opacity-silver border-opacity-20 bg-day-base-02 p-4 dark:border-night-base-05 dark:bg-night-base-02 dark:text-white">
              <div className="flex justify-between">
                <Dialog.Title
                  className={`${showClose && 'mr-14'} mb-4 text-xl font-bold`}
                >
                  {message}
                </Dialog.Title>
                {showInfo && (
                  <div className="mr-12 h-10 w-10 cursor-pointer rounded-full bg-white text-day-text-label-primary dark:bg-night-base-04 dark:text-white">
                    <div className="flex h-full w-full items-center justify-center">
                      <Icon
                        type="info"
                        width={24}
                        height={24}
                        onClick={toggle}
                      />
                    </div>
                  </div>
                )}
              </div>
              {!showText && (
                <div className="mt-4 text-sm opacity-60">
                  Deleting a cog will remove all cards from it, are you sure you
                  want to delete this cog?
                </div>
              )}
              {showClose && (
                <div
                  className="absolute right-3.5 top-4 h-10 w-10 cursor-pointer rounded-full bg-white text-day-text-label-primary dark:bg-night-base-04 dark:text-white"
                  ref={closeButtonRef}
                  onMouseDown={() => setIsOpen(false)}
                >
                  <div className="flex h-full w-full items-center justify-center">
                    <Icon type="remove" width={24} height={24} />
                  </div>
                </div>
              )}
              <div className="flex w-full flex-col gap-4">
                <button
                  className="mt-4 mb-2 w-full rounded-[20px] p-4 hover:bg-night-base-03"
                  onClick={onCancel}
                >
                  Cancel
                </button>
                <div>
                  <ButtonPrimary
                    label="Delete"
                    classNames="w-full"
                    onClick={onConfirm}
                  />
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default ConfirmModal
