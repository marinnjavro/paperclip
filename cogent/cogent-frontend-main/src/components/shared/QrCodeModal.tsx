import { Fragment, useRef } from 'react'
import dynamic from 'next/dynamic'
import { Transition, Dialog } from '@headlessui/react'
import { useToast } from '@/components/shared/Toast'

import Icon from '@/components/shared/Icon'
import router from 'next/router'
import ButtonPrimary from './ButtonPrimary'

const QRCodeStylingNoSSRWrapper = dynamic(
  import('@/components/shared/QrCodeShareCog'),
  {
    ssr: false
  }
)

interface QrCodeModalProps {
  isModalOpen: boolean
  setIsModalOpen: (value: boolean) => void
  text: string
  showClose?: boolean
  showButton?: boolean
  manualCogId?: string
}

const QrCodeModal: React.FC<QrCodeModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  text,
  showClose = true,
  showButton = true,
  manualCogId = null
}) => {
  const closeButtonRef: any = useRef()
  const { queryCogId } = router.query
  const cogId = manualCogId || (queryCogId as string)
  const toast = useToast()

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/cogs/${cogId}`

  const shareCog = () => {
    navigator.clipboard.writeText(url)
    toast.open('success', 'Cog link was copied to clipboard')
    setIsModalOpen(false)
  }

  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
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
            <Dialog.Panel className="text:night-base-01 relative w-full rounded-3xl border border-solid border-opacity-silver border-opacity-20 bg-day-base-02 p-4 dark:border-night-base-05 dark:bg-night-base-02 dark:text-white sm:w-[453px]">
              <Dialog.Title
                className={`${showClose && 'mr-14'} mb-4 text-xl font-bold`}
              >
                {text}
              </Dialog.Title>
              {showClose && (
                <div
                  className="absolute right-3.5 top-3.5 h-10 w-10 cursor-pointer rounded-full bg-white text-day-text-label-primary dark:bg-night-base-04 dark:text-white"
                  ref={closeButtonRef}
                  onMouseDown={() => setIsModalOpen(false)}
                >
                  <div className="flex h-full w-full items-center justify-center">
                    <Icon type="remove" width={24} height={24} />
                  </div>
                </div>
              )}
              <div className="flex w-full justify-center pt-4">
                <QRCodeStylingNoSSRWrapper url={url} />
              </div>
              {showButton && (
                <div className="flex w-full justify-center p-3">
                  <ButtonPrimary
                    label="Copy link"
                    icon=""
                    size="medium"
                    onClick={() => shareCog()}
                  />
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default QrCodeModal
