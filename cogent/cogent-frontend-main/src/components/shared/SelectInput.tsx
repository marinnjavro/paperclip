import React, { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import Error from '@/public/assets/icons/error.svg'

interface InputProps {
  options: { value: any; label: string }[]
  value: any
  handleChange: (value: any) => void
  error?: string
  name: string
  size?: 'small' | 'medium'
  position?: 'up' | 'down'
  isDisabled?: boolean
}

const inputSizing = {
  medium: 'px-3 py-4 rounded-[14px]',
  small: 'px-4 py-2.5 rounded-lg'
}

const optionsRadius = {
  medium: 'rounded-[14px] ',
  small: 'rounded-lg'
}

const dropdownPosition = {
  up: '-top-1.5 right-0 transform -translate-y-full',
  down: 'mt-1.5 overflow-hidden'
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const SelectInput: React.FC<InputProps> = ({
  options,
  value,
  handleChange,
  error,
  name,
  size = 'medium',
  position = 'down',
  isDisabled = false
}) => {
  const style = `${inputSizing[size]}`
  const selected = options.find((option) => option.value === value)

  return (
    <Listbox value={value} onChange={handleChange} disabled={isDisabled}>
      {({ open }) => (
        <>
          <div className="input-select relative mt-2">
            {/* <Listbox.Label className="absolute top-0 z-10 left-0 mx-3 flex h-full transform items-center text-sm text-support-gray-001 transition-all group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-xs peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-xs">
              Select university
            </Listbox.Label> */}
            <Listbox.Button
              className={`${
                !!error
                  ? 'border-support-red-402'
                  : 'border-white border-opacity-10 focus:border-day-base-primary'
              } ${
                isDisabled
                  ? 'bg-opacity-silver bg-day-base-03 text-day-text-label-tertirary-inverse dark:bg-[#2e3342] dark:text-[#82848d]'
                  : 'bg-white text-support-gray-006  dark:bg-night-base-04 dark:text-white dark:text-white'
              } peer relative w-full border pr-9 text-sm outline-none ${style}`}
            >
              <span
                className={`${!value ? 'text-support-gray-001' : ''} ${
                  isDisabled ? 'dark:text-[#82848d]' : 'dark:text-white'
                } block truncate bg-transparent text-left
             text-sm dark:text-white`}
              >
                {!!selected ? selected.label : 'Select'}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            {!!error && (
              <div className="ml-0.5 mt-1 flex gap-x-1 text-xs text-support-red-402">
                <div className="pt-[1px]">
                  <Error
                    width={16}
                    height={16}
                    className="stroke-support-red-402"
                  />
                </div>
                {error}
              </div>
            )}

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div
                className={`${dropdownPosition[position]} absolute right-0 z-10 max-h-60 w-full min-w-[125px]`}
              >
                <Listbox.Options
                  className={`${optionsRadius[size]} scrollbar--input max-h-60 w-full list-none overflow-y-scroll border border-solid border-white border-opacity-10 bg-night-base-04 px-0 py-2 focus:outline-none focus:ring-0`}
                >
                  {options.map((option, index) => (
                    <Listbox.Option
                      key={`option-${index}`}
                      className={({ active }) =>
                        classNames(
                          active
                            ? 'bg-night-base-04 text-white brightness-125'
                            : 'text-support-gray-001',
                          'relative my-1 mx-2 flex cursor-default select-none items-center rounded-[8px] py-2.5 pl-3 pr-4 text-sm'
                        )
                      }
                      value={option.value}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected
                                ? 'font-semibold text-white'
                                : 'font-normal',
                              'block truncate'
                            )}
                          >
                            {option.label}
                          </span>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? 'text-white' : 'text-white',
                                'absolute inset-y-0 right-0 ml-4 flex items-center pr-1'
                              )}
                            >
                              <CheckIcon
                                className="h-4 w-4"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

export default SelectInput
