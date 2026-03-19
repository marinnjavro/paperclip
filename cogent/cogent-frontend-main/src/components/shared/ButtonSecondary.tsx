import Icon from '@/components/shared/Icon'

interface ButtonSecondaryProps {
  size?: 'small' | 'medium'
  label: string
  icon?: string
  iconPosition?: 'left' | 'right'
  classNames?: string
  height?: string
  width?: string
  isActive?: boolean
  onClick?: () => void
}

const buttonStyle =
  'h-12 text-sm flex items-center font-light text-support-gray-002 hover:brightness-75'

const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({
  size = 'medium',
  label,
  icon,
  iconPosition = 'right',
  classNames,
  height,
  width,
  isActive,
  onClick
}) => {
  const style = `${buttonStyle} ${classNames}`
  return (
    <button
      className={style}
      style={{
        height: height,
        width: width
      }}
      onClick={onClick}
    >
      {!!icon && iconPosition === 'left' && (
        <Icon
          width={22}
          height={22}
          classNames="mr-2"
          isActive={isActive}
          type={icon}
        />
      )}
      <span>{label}</span>
      {!!icon && iconPosition === 'right' && (
        <Icon
          width={22}
          height={22}
          classNames="ml-2"
          isActive={isActive}
          type={icon}
        />
      )}
    </button>
  )
}

export default ButtonSecondary
