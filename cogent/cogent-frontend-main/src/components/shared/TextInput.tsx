import React, {
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  useState,
  useEffect
} from 'react'
import Error from '@/public/assets/icons/error.svg'
import InputHide from '@/public/assets/icons/input-hide.svg'
import InputShow from '@/public/assets/icons/input-show.svg'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  name: string
  label: string
  type?: string
  ref: string
  hideInput?: boolean
  disabled?: boolean
}

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    name,
    label,
    value,
    handleChange,
    hideInput = false,
    error = '',
    disabled = false,
    ...props
  },
  ref
) => {
  const [showInput, setShowInput] = useState<boolean>(true)

  useEffect(() => {
    if (hideInput) {
      setShowInput(false)
    }
  }, [])

  const toggleShowInput = () => {
    setShowInput(!showInput)
  }

  const HideInputValue = () => (
    <div
      className="absolute right-3 top-[38%] text-day-text-label-secondary-inverse"
      onClick={toggleShowInput}
    >
      <InputHide width={14} height={14} />
    </div>
  )

  const ShowInputValue = () => (
    <div
      className="absolute right-3 top-[38%] text-day-text-label-secondary-inverse"
      onClick={toggleShowInput}
    >
      <InputShow width={14} height={14} />
    </div>
  )

  return (
    <div>
      <div className="text-input group relative w-full">
        <input
          name={name}
          type={showInput ? 'text' : 'password'}
          value={value}
          onChange={(e) => handleChange(e)}
          {...props}
          id={name}
          ref={ref}
          required
          autoComplete="do-not-autofill"
          disabled={disabled}
          className={`${
            !!error
              ? 'border-support-red-402'
              : 'border-opacity-silver border-opacity-20 focus:border-day-base-primary dark:border-white dark:border-opacity-10'
          } ${
            disabled
              ? 'bg-opacity-silver bg-day-base-03 text-day-text-label-tertirary-inverse dark:bg-[#414258] dark:text-night-text'
              : 'bg-white text-support-gray-006 dark:bg-night-base-04 dark:text-white'
          } peer relative w-full rounded-[14px] border px-3 pt-6 pb-2 pr-9 text-sm outline-none focus:ring-1 focus:ring-inset focus:ring-day-base-primary`}
        />
        <label
          htmlFor={name}
          className={`${
            disabled && !!value
              ? 'h-1/2 pl-0 text-xs text-day-text-label-tertirary-inverse'
              : ''
          } absolute top-0 left-0 mx-3 flex h-full transform items-center text-sm text-day-text-label-secondary-inverse transition-all group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-xs peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-xs dark:text-support-gray-006 dark:text-support-gray-001`}
        >
          {label}
        </label>
        {hideInput && (!showInput ? <HideInputValue /> : <ShowInputValue />)}
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

const TextInput = React.forwardRef(Input)

export default TextInput
