import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Icon from '@/components/shared/Icon'
import ButtonPrimary from '@/components/shared/ButtonPrimary'
import SelectInput from '@/components/shared/SelectInput'

type FiltersType = {
  name: string
  label: string
  options: any[]
  value: string | number | any
  onChange: (value: any) => void
}

interface FiltersModalProps {
  open: boolean
  toggleModal: () => void
  filters: FiltersType[]
  clearAllFilters: () => void
}

export const ORDER_TYPES = [
  { label: 'From old to new', value: 'created_at asc' },
  { label: 'From new to old', value: 'created_at desc' }
]

const FiltersModal: React.FC<FiltersModalProps> = ({
  open,
  toggleModal,
  filters,
  clearAllFilters
}) => {
  return (
    <Transition.Root show={open} as={Fragment}>
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

        <div className="fixed inset-0 z-10">
          <div className="flex min-h-full items-start justify-center text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative mt-[7vh] flex h-[93vh] w-full flex-grow transform flex-col justify-between rounded-t-4xl border-2 border-solid border-white border-opacity-10 bg-day-base-02 pt-4 text-left shadow-xl transition-all dark:bg-night-base-02 sm:max-w-2xl sm:border-none sm:p-8">
                <div className="flex justify-between border-b-2 border-solid border-white border-opacity-10 p-4">
                  <div className="pb-4 text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-bold leading-6 text-day-text-label-primary dark:text-white sm:text-xl"
                    >
                      Filters
                    </Dialog.Title>
                  </div>
                  <div
                    className="absolute top-5 right-4 cursor-pointer rounded-full bg-white p-3 text-day-text-label-primary dark:bg-night-base-04 dark:text-white sm:right-7 sm:top-7 sm:p-3"
                    onClick={() => toggleModal()}
                  >
                    <Icon type="remove" width={24} height={24} />
                  </div>
                </div>
                <div className="scrollbar--sm h-full overflow-y-auto pt-4">
                  <div className="flex flex-col gap-y-6">
                    {filters.map((filter, i) => (
                      <div
                        className="mx-4 flex flex-col gap-y-4"
                        key={`${filter.name}-${i}`}
                      >
                        <label
                          className="font-bold text-white"
                          htmlFor={filter.name}
                        >
                          {filter.label}
                        </label>
                        <SelectInput
                          name={filter.name}
                          options={filter.options}
                          value={filter.value}
                          handleChange={filter.onChange}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t-2 border-solid border-white border-opacity-10 py-4 px-4">
                  <div className="flex w-full items-center justify-between">
                    <div
                      className="border-b border-solid border-white pb-0.5 text-xs font-bold text-white"
                      onClick={() => clearAllFilters()}
                    >
                      Clear all
                    </div>
                    <div className="w-[131px]">
                      <ButtonPrimary
                        classNames="w-full"
                        label="Search"
                        onClick={toggleModal}
                      />
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default FiltersModal
