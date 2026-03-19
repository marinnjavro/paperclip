import Icon from '@/components/shared/Icon'

interface UserIconPlaceholderProps {
  size?: 'sm' | 'lg' | 'xl' | '2xl'
}
const UserIconPlaceholder: React.FC<UserIconPlaceholderProps> = ({
  size = 'sm'
}) => {
  const width = {
    sm: 42,
    lg: 65,
    xl: 100,
    '2xl': 160
  }

  const height = {
    sm: 42,
    lg: 65,
    xl: 100,
    '2xl': 160
  }

  const classNames = {
    sm: 'mt-[10px]',
    lg: 'mt-[15px]',
    xl: 'mt-[20px]',
    '2xl': 'mt-[30px]'
  }

  return (
    <div className="flex h-full w-full items-center justify-center text-white">
      <Icon
        type="user"
        width={width[size]}
        height={height[size]}
        classNames={classNames[size]}
      />
    </div>
  )
}

export default UserIconPlaceholder
