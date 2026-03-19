import { Fragment, MutableRefObject, useRef } from 'react'
import { Transition, Dialog } from '@headlessui/react'

import Icon from '@/components/shared/Icon'

interface PromptProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  text: string
  alignContent?: 'left' | 'right' | 'center'
  showClose?: boolean
  actions: { text: string; icon?: string; function: () => void }[]
}

const Prompt: React.FC<PromptProps> = ({
  isOpen,
  setIsOpen,
  text,
  alignContent = 'left',
  showClose = true,
  actions
}) => {
  const closeButtonRef: any = useRef()

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
            <Dialog.Panel className="text:night-base-01 relative w-full rounded-3xl border border-solid border-opacity-silver border-opacity-20 bg-day-base-02 p-4 dark:border-night-base-05 dark:bg-night-base-02 dark:text-white sm:w-[528px]">
              <Dialog.Title
                className={`${showClose && 'mr-14'} mb-4 text-xl font-bold`}
              >
                {text}
              </Dialog.Title>
              {showClose && (
                <div
                  className="absolute right-3.5 top-3.5 h-10 w-10 cursor-pointer rounded-full bg-white text-day-text-label-primary dark:bg-night-base-04 dark:text-white"
                  ref={closeButtonRef}
                  onMouseDown={() => setIsOpen(false)}
                >
                  <div className="flex h-full w-full items-center justify-center">
                    <Icon type="remove" width={24} height={24} />
                  </div>
                </div>
              )}
              <div className="flex w-full flex-col gap-4">
                {actions.map((action, index) => (
                  <div
                    key={`action-${index}`}
                    className={`justify-${alignContent} group flex w-full cursor-pointer items-center gap-2 rounded-[16px] px-2 py-3 hover:bg-day-base-04 dark:hover:bg-night-base-03`}
                    onMouseDown={() => {
                      setIsOpen(false)
                      action.function()
                    }}
                  >
                    {!!action.icon && (
                      <span className="text-night-text group-hover:text-day-text-label-primary dark:group-hover:text-white">
                        <Icon type={action.icon} />
                      </span>
                    )}
                    {action.text}
                  </div>
                ))}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Prompt
