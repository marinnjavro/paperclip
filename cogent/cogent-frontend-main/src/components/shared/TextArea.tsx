import React, { ForwardRefRenderFunction, InputHTMLAttributes } from 'react'
import Error from '@/public/assets/icons/error.svg'

interface InputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  value: any
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  error?: string
  name: string
  rows?: number
  cols?: number
  placeholder: string
  type?: string
  ref: string
}

const Input: ForwardRefRenderFunction<HTMLTextAreaElement, InputProps> = (
  {
    name,
    placeholder,
    value,
    rows = 4,
    cols = 1,
    handleChange,
    error = '',
    ...props
  },
  ref
) => {
  return (
    <div className="h-full">
      <div className="text-input group relative h-full w-full">
        <textarea
          name={name}
          value={value}
          placeholder={placeholder}
          cols={cols}
          rows={rows}
          onChange={(e) => handleChange(e)}
          {...props}
          id={name}
          ref={ref}
          required
          autoComplete="do-not-autofill"
          tabIndex={-1}
          className={`${
            !!error
              ? 'border-support-red-402'
              : 'border-opacity-silver border-opacity-20 focus:border-day-base-primary dark:border-white dark:border-opacity-10'
          } scrollbar--hidden peer relative w-full rounded-[14px] border bg-white px-3 pt-2 pb-2 pr-9 text-sm text-support-gray-006 outline-none placeholder:text-support-gray-001 focus:ring-1 focus:ring-inset focus:ring-day-base-primary dark:bg-night-base-04 dark:text-white`}
        />
        {/* <label
          htmlFor={name}
          className="absolute top-0 left-0 mx-3 flex h-1/2 transform items-center text-sm text-support-gray-006 transition-all group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-xs peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-xs dark:text-support-gray-001"
        >
          {label}
        </label> */}
      </div>
      {!!error && (
        <div className="ml-0.5 mt-1 flex gap-x-1 text-xs text-support-red-402">
          <div className="pt-[1px]">
            <Error width={16} height={16} className="stroke-support-red-402" />
          </div>
          {error}
        </div>
      )}
    </div>
  )
}

const TextArea = React.forwardRef(Input)

export default TextArea
