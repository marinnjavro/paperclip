import Icon from '@/components/shared/Icon'

const ActionButtonMobile = ({
  icon,
  textStyle = 'text-base font-bold',
  label,
  handleOnClick
}: {
  icon: string
  label: string
  textStyle?: string
  handleOnClick: () => void
}) => {
  return (
    <div
      onClick={() => handleOnClick()}
      className="group w-full cursor-pointer rounded-3xl border border-solid border-solid border-support-gray-001 border-opacity-40 py-7 px-2 text-day-base-06 transition-all duration-200 hover:bg-day-base-04 hover:text-day-text-label-primary dark:border-[#42445d] dark:border-opacity-100 dark:text-night-base-06 hover:dark:hover:bg-night-base-02 hover:dark:text-white"
    >
      <div className="flex items-center justify-center gap-4">
        <Icon type={icon} width={32} height={32} />
        <span
          className={`${textStyle} text-day-text-label-primary dark:text-white`}
        >
          {label}
        </span>
      </div>
    </div>
  )
}

export default ActionButtonMobile
