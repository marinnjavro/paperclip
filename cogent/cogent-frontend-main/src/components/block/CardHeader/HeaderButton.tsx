import Icon from '@/components/shared/Icon'

interface HeaderButtonProps {
  label: string
  icon: string
  classNames?: string
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
}

const buttonStyle =
  'flex items-center px-2 py-3 rounded-[12px] text-xs justify-center bg-day-base-primary font-bold text-white hover:brightness-110 active:brightness-90 disabled:bg-support-gray-005 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-day-base-primary'

const HeaderButton: React.FC<HeaderButtonProps> = ({
  label,
  icon,
  classNames,
  onClick
}) => {
  const style = `${buttonStyle} ${classNames}`
  return (
    <button className={style} onClick={onClick}>
      <span>{label}</span>
      <Icon width={16} height={16} classNames={`shrink-0 ml-1`} type={icon} />
    </button>
  )
}

export default HeaderButton
