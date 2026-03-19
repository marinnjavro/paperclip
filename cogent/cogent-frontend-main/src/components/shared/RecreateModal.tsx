import { Fragment, useEffect, useRef, useState } from 'react'
import _ from 'lodash'
import { Transition, Dialog } from '@headlessui/react'

import Icon from '@/components/shared/Icon'
import ButtonPrimary from '@/components/shared/ButtonPrimary'
import TextArea from '@/components/shared/TextArea'
import Tag from '@/components/shared/Tag'
import { Card } from 'src/__generated__/graphql'
import SelectInput from './SelectInput'

const imageOptions = [
  { value: 'stable_diffusion_core', label: 'Stable Diffusion Core' },
  { value: 'stable_diffusion_sd3', label: 'Stable Diffusion SD3' },
  { value: 'dalle3', label: 'DALL·E 3' }
]

interface RecreateModalProps {
  card: Card
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  recreate: (query: string, generatorType: string) => void
}

export interface CogData {
  generatorType: string
}

const RecreateModal: React.FC<RecreateModalProps> = ({
  card,
  isOpen,
  setIsOpen,
  recreate
}) => {
  const closeButtonRef: any = useRef()

  const [cogData, setCogData] = useState<CogData>({
    generatorType: 'stable_diffusion_core'
  })
  const [query, setQuery] = useState<string>(card?.name || '')

  useEffect(() => {
    setQuery(card?.name || '')
  }, [card])

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(event.target.value)

    // const clearErrors = () => {
    //   setErrors(_.mapValues(errors, () => ''))
  }

  const handleOptionChange = (value: string) => {
    setCogData((prevState) => ({
      ...prevState,
      generatorType: value
    }))
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
            className="fixed opacity-100 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />
        </Transition.Child>
        <div className="fixed inset-x-3 bottom-3 flex items-center justify-center sm:bottom-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="text:night-base-01 relative w-full rounded-3xl border border-solid border-opacity-silver border-opacity-20 bg-day-base-02 p-4 dark:border-night-base-05 dark:bg-night-base-02 dark:text-white sm:w-[816px]">
              <Dialog.Title className="mr-14 mb-4 flex justify-between text-xl font-bold">
                Generate Image
                <div className="mt-1.5">
                  <Tag name={'Al beta'} />
                </div>
              </Dialog.Title>

              <div className="w-full">
                <h1>Image Source</h1>
                <div className="mt-2">
                  <SelectInput
                    options={imageOptions}
                    value={cogData.generatorType}
                    handleChange={handleOptionChange}
                    name={'image-options'}
                    position={'down'}
                  />
                </div>
              </div>

              <div
                className="absolute right-3.5 top-3.5 h-10 w-10 cursor-pointer rounded-full bg-white text-day-text-label-primary dark:bg-night-base-04 dark:text-white"
                ref={closeButtonRef}
                onMouseDown={() => setIsOpen(false)}
              >
                <div className="flex h-full w-full items-center justify-center">
                  <Icon type="remove" width={24} height={24} />
                </div>
              </div>

              <div className="mt-4 border-t border-solid border-night-text border-opacity-20 py-4">
                <TextArea
                  placeholder="Enter a description for the new image?"
                  name="generate image"
                  value={query}
                  handleChange={handleChange}
                />
              </div>
              <ButtonPrimary
                label="Generate"
                classNames="w-full rounded-[20px]"
                onClick={() => recreate(query, cogData.generatorType)}
                disabled={!query}
              />
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default RecreateModal
