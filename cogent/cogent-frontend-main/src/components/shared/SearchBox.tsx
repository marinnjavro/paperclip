import React, { ForwardRefRenderFunction, InputHTMLAttributes } from 'react'
import Icon from '@/components/shared/Icon'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  name: string
  placeholder: string
  autofocus?: boolean
  type?: string
  ref: string
}

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, placeholder, value, handleChange, autofocus = false, ...props },
  ref
) => {
  return (
    <div className="text-input group relative w-full">
      <input
        autoFocus={autofocus}
        name={name}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleChange(e)}
        {...props}
        id={name}
        ref={ref}
        required
        autoComplete="do-not-autofill"
        className="peer w-full rounded-[14px] border border-day-base-06
          bg-day-base-02 py-4 pl-12 pr-3 pr-9 text-sm text-support-gray-006 outline-none placeholder:text-support-gray-001 focus:ring-1 focus:ring-inset focus:ring-day-base-primary dark:border-white dark:border-opacity-10 dark:bg-night-base-02 dark:text-white"
      />
      <div className="absolute inset-y-0 left-0 flex items-center justify-center px-4 text-day-text-label-secondary-inverse">
        <Icon type="search" width={18} height={18} />
      </div>
    </div>
  )
}

const SearchBox = React.forwardRef(Input)

export default SearchBox
