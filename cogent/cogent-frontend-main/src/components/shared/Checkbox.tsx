import React, {
  useState,
  ForwardRefRenderFunction,
  InputHTMLAttributes
} from 'react'

interface InputProps {
  name: string
  label?: string
  ref: string
  isChecked: boolean
  isDisabled?: boolean
  size?: 'base' | 'lg' | '2xl'
  handleCheck: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    name,
    label,
    isChecked,
    isDisabled = false,
    handleCheck,
    size = 'base',
    ...otherProps
  },
  ref
) => {
  const [pressed, setPressed] = useState<boolean>(false)

  // prettier-ignore
  const style = {
    'base': 'h-5 w-5',
    'lg': 'h-[18px] w-[18px]',
    '2xl': 'h-[24px] w-[24px]'
  }

  return (
    <div className="group flex items-center text-support-gray-001 hover:text-day-text-label-primary dark:hover:text-white">
      <input
        id={name}
        type="checkbox"
        disabled={isDisabled}
        checked={isChecked}
        onChange={(e) => handleCheck(e)}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        className={` ${
          style[size]
        } cursor-pointer rounded border-opacity-silver border-opacity-20 bg-day-base-02 text-day-base-primary focus:ring-0 focus:ring-offset-0 
          
            ${
              isDisabled
                ? 'border-opacity-silver border-opacity-60 bg-opacity-silver bg-opacity-10'
                : isChecked
                ? 'bg-day-base-primary'
                : 'bg-day-base-02 dark:bg-night-base-04'
            } 
        }  dark:border-night-base-06 `}
        {...otherProps}
      />
      {!!label && (
        <label
          htmlFor={name}
          className="ml-3 block cursor-pointer text-sm leading-6"
        >
          {label}
        </label>
      )}
    </div>
  )
}

const Checkbox = React.forwardRef(Input)

export default Checkbox
