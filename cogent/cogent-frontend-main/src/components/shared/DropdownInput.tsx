import React, { useState, Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpIcon } from '@heroicons/react/20/solid'
import Icon from '@/components/shared/Icon'

interface InputProps {
  name: string
  options: { label: string; value: any }[]
  value: any
  icon?: string
  handleChange: (value: any) => void
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const DropdownInput = (props: InputProps) => {
  const [shouldRotate, setShouldRotate] = useState(false)

  const getLabel = (value: string) =>
    props.options.find((option) => option.value === value)?.label

  return (
    <Listbox value={props.value} onChange={props.handleChange}>
      {({ open }) => (
        <>
          <div className="input-select relative">
            <Listbox.Button
              className="peer relative w-full px-3 pr-10 text-sm text-white outline-none focus:border-day-base-primary"
              onClick={() => setShouldRotate(true)}
            >
              <span
                className={`${
                  !props.value ? 'text-support-gray-001' : ''
                } block flex items-center truncate text-left text-sm text-day-text-label-secondary-inverse`}
              >
                {!!props.icon && (
                  <Icon classNames="w-6 h-6 mr-3" type={props.icon} />
                )}
                {getLabel(props.value)}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpIcon
                  className={`${
                    open
                      ? 'animate-rotate-180'
                      : `${shouldRotate ? 'animate-rotate-back' : ''}`
                  } h-6 w-6  text-day-text-label-secondary-inverse`}
                  aria-hidden="true"
                />
                {/* <Icon
                  type="chevronDown"
                  className={`${
                    open
                      ? 'animate-rotate-180'
                      : `${shouldRotate ? 'animate-rotate-back' : ''}`
                  } h-6 w-6  text-day-text-label-secondary-inverse`}
                  aria-hidden="true"
                /> */}
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-in duration-150"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute right-3 top-8 z-10 w-[196px] w-full overflow-hidden rounded-[8px]">
                <Listbox.Options className="scrollbar--sm flex w-full list-none flex-col gap-1 overflow-y-scroll rounded-[8px] bg-day-base-02 px-2.5 py-2 focus:outline-none focus:ring-0 dark:bg-night-base-02">
                  {props.options.map((option, i) => (
                    <Listbox.Option
                      key={`option-${i}`}
                      className={({ active }) =>
                        classNames(
                          active
                            ? 'bg-day-base-04 text-day-text-label-primary dark:bg-night-base-02 dark:text-white dark:brightness-125'
                            : 'text-support-gray-001',
                          'relative flex w-full cursor-pointer select-none items-center rounded-[8px] px-1.5 py-2 text-sm'
                        )
                      }
                      value={option.value}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected
                                ? 'font-semibold  text-day-text-label-primary  dark:text-white'
                                : 'font-normal',
                              'inline-block truncate'
                            )}
                          >
                            {option.label}
                          </span>

                          {/* {selected ? (
                            <span
                              className={classNames(
                                active
                                  ? ' text-day-text-label-primary  dark:text-white'
                                  : ' text-day-text-label-primary  dark:text-white',
                                'absolute inset-y-0 right-0 flex items-center pr-4'
                              )}
                            >
                              <CheckIcon
                                className="h-4 w-4"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null} */}
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

export default DropdownInput
