import Icon from '@/components/shared/Icon'

interface BottomButtonProps {
  label: string
  icon: string
  action: () => void
}

const BottomButton: React.FC<BottomButtonProps> = ({ label, icon, action }) => {
  return (
    <div
      className="flex cursor-pointer flex-col items-center hover:text-opacity-violet  dark:hover:text-night-base-secondary-hover"
      onClick={action}
    >
      <div className=" pb-1">
        <Icon
          type={icon}
          className="bottom-menu-svg-light dark:fill-night-base-01"
        />
      </div>
      <div className=" text-xs">{label}</div>
    </div>
  )
}

export default BottomButton
