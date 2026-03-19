import Icon from '@/components/shared/Icon'

interface ButtonPrimaryProps {
  size?: 'small' | 'medium' | 'large'
  label: string
  type?: 'button' | 'submit' | 'reset' | undefined
  icon?: string
  iconPosition?: 'left' | 'right'
  formId?: string
  isLoading?: boolean
  height?: string
  width?: string
  classNames?: string
  disabled?: boolean
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
}

const buttonStyle =
  'flex items-center justify-center bg-day-base-primary font-bold text-white hover:brightness-110 active:brightness-90 disabled:bg-support-gray-005 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-day-base-primary'

const buttonSizing = {
  large: 'h-14 py-6 px-7 rounded-[20px] text-base',
  medium: 'h-12 py-4 px-5 rounded-[20px] text-sm',
  small: 'rounded-xl px-3 py-1.5 text-sm'
}

const iconSize = {
  medium: 22,
  small: 16
}

const iconSpacingLeft = {
  medium: 'mr-2',
  small: 'mr-1'
}

const iconSpacingRight = {
  medium: 'ml-2',
  small: 'ml-1'
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  size = 'medium',
  label,
  icon,
  iconPosition = 'right',
  type,
  isLoading = false,
  formId,
  height,
  width,
  classNames,
  disabled = false,
  onClick
}) => {
  const style = `${buttonStyle} ${buttonSizing[size]} ${classNames}`
  return (
    <button
      type={type}
      form={formId}
      className={style}
      style={{
        height: height,
        width: width
      }}
      disabled={disabled}
      onClick={onClick}
    >
      {isLoading && (
        <svg
          className="mr-1.5 -ml-1 h-5 w-5 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {!!icon && iconPosition === 'left' && (
        <Icon
          width={iconSize[size]}
          height={iconSize[size]}
          classNames={`${iconSpacingLeft[size]} shrink-0 `}
          type={icon}
        />
      )}
      <span>{label}</span>
      {!!icon && iconPosition === 'right' && (
        <Icon
          width={iconSize[size]}
          height={iconSize[size]}
          classNames={`${iconSpacingRight[size]} shrink-0 `}
          type={icon}
        />
      )}
    </button>
  )
}

export default ButtonPrimary
