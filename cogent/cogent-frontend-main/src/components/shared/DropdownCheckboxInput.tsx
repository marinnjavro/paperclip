import React, { useState, Fragment, forwardRef, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import Icon from '@/components/shared/Icon'
import Checkbox from '@/components/shared/Checkbox'

interface InputProps {
  options: { label: string; value: string }[]
  values: string[]
  icon?: string
  onChange: (value: string[]) => void
}

const DropdownCheckboxInput: React.FC<InputProps> = ({
  options,
  values,
  icon,
  onChange
}) => {
  const [shouldRotate, setShouldRotate] = useState(false)

  const isSelected = (value: string) => values.includes(value)

  const handleToggleCheck = (value: string) => {
    const selected = [...values]
    if (!isSelected(value)) {
      onChange([...selected, value])
    } else {
      onChange([...selected.filter((item) => item !== value)])
    }
  }

  return (
    <Menu>
      {({ open }) => (
        <>
          <div className="input-select relative">
            <Menu.Button
              className="peer relative w-full px-3 pr-10 text-sm text-white outline-none focus:border-day-base-primary"
              onClick={() => setShouldRotate(true)}
            >
              <span className="block flex items-center truncate text-left text-sm text-support-gray-001 text-day-text-label-secondary-inverse">
                {!!icon && <Icon classNames="w-6 h-6 mr-3" type={icon} />}
                Filters
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
              </span>
            </Menu.Button>

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
                <Menu.Items className="scrollbar--sm flex w-full list-none flex-col gap-1 overflow-y-scroll rounded-[8px] bg-day-base-02 px-2.5 py-2 focus:outline-none focus:ring-0 dark:bg-night-base-02">
                  {options.map((option, i) => (
                    <Menu.Item
                      key={`option-${i}`}
                      as={CheckBoxItem}
                      label={option.label}
                      value={option.value}
                      isChecked={isSelected(option.value)}
                      toggleCheck={handleToggleCheck}
                    ></Menu.Item>
                  ))}
                </Menu.Items>
              </div>
            </Transition>
          </div>
        </>
      )}
    </Menu>
  )
}

const CheckBoxItem = forwardRef(function (
  {
    label,
    value,
    isChecked,
    toggleCheck
  }: {
    label: string
    value: string
    isChecked: boolean
    toggleCheck: (value: string) => void
  },
  ref: any
) {
  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    toggleCheck(value)
  }

  return (
    <div
      className="relative flex w-full cursor-pointer select-none items-center rounded-[8px] px-1.5 py-2"
      ref={ref}
    >
      <Checkbox
        name={`${value}-checkbox`}
        isChecked={isChecked}
        handleCheck={handleCheck}
      />
      <span className="ml-2 text-sm text-support-gray-001 text-day-text-label-primary dark:bg-night-base-02 dark:text-white dark:opacity-60">
        {label}
      </span>
    </div>
  )
})

CheckBoxItem.displayName = 'CheckBoxItem'

export default DropdownCheckboxInput
