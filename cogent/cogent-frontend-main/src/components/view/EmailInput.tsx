import { useState, MutableRefObject, useRef } from 'react'
import { Dialog } from '@headlessui/react'

import Icon from '@/components/shared/Icon'
import ButtonPrimary from '@/components/shared/ButtonPrimary'
import TextInput from '@/components/shared/TextInput'

interface EmailInputProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  alignContent?: 'left' | 'right' | 'center'
}

const EmailInput: React.FC<EmailInputProps> = ({
  isOpen,
  setIsOpen,
  alignContent = 'left'
}) => {
  const closeButtonRef: any = useRef()
  const [email, setEmail] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setEmail(value)

    // setErrors({ ...errors, [name]: '' })
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      initialFocus={closeButtonRef}
      className="relative z-50"
    >
      <div
        className="fixed inset-0 opacity-100 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />
      <div className="fixed inset-x-3 bottom-3 flex items-center justify-center">
        <Dialog.Panel className="text:night-base-01 relative w-full max-w-[350px] rounded-3xl border border-solid border-opacity-silver border-opacity-20 bg-day-base-02 py-5 dark:border-night-base-05 dark:bg-night-base-02 dark:text-white sm:w-[400px]">
          <Dialog.Title className={`mr-14 mb-6 px-4 font-bold`}>
            Enter your email
          </Dialog.Title>
          <div
            className="absolute right-3.5 top-3.5 cursor-pointer rounded-full bg-white p-2 text-day-text-label-primary dark:bg-night-base-04 dark:text-white"
            ref={closeButtonRef}
            onMouseDown={() => setIsOpen(false)}
          >
            <Icon type="remove" width={18} height={18} />
          </div>
          <div className="flex w-full flex-col gap-2 px-3">
            <TextInput
              name="email"
              label="Email"
              value={email}
              handleChange={handleChange}
            />
          </div>
          <div className="flex w-full items-center px-3 pt-4">
            <ButtonPrimary
              label="Submit result"
              icon="chevronRight"
              classNames="w-full"
              onClick={() => setIsOpen(false)}
              disabled
            />
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default EmailInput
