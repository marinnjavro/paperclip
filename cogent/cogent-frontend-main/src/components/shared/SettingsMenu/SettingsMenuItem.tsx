import Icon from '@/components/shared/Icon'

interface MenuItemProps {
  label: string
  icon: string
  classNames: string
}

const SettingsMenuItem: React.FC<MenuItemProps> = ({
  label,
  icon,
  classNames
}) => {
  return (
    <div
      className={`${classNames} m-1 flex cursor-pointer items-center gap-2 rounded-xl px-[13px] py-2 hover:bg-day-base-02 hover:text-red-500 dark:hover:bg-night-base-05`}
    >
      {icon && <Icon width={24} height={24} type={icon} />}
      {label}
    </div>
  )
}

export default SettingsMenuItem
