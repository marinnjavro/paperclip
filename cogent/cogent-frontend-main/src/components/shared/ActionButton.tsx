import Icon from '@/components/shared/Icon'

const ActionButton = ({
  icon,
  alignContent = 'horizontal',
  label,
  borderRadius = '4xl',
  handleOnClick
}: {
  icon: string
  alignContent?: 'vertical' | 'horizontal'
  label: string
  borderRadius?: string
  handleOnClick: (e: React.MouseEvent) => void
}) => (
  <div
    className=" h-full w-full cursor-pointer"
    onClick={(e) => handleOnClick(e)}
  >
    <div
      className={`flex  h-full items-center justify-center rounded-${borderRadius} border border-solid border-solid  border-support-gray-001 border-opacity-40 p-10 text-day-base-06 transition-all duration-200 hover:bg-day-base-04 hover:text-day-text-label-primary dark:border-[#42445d] dark:border-opacity-100 dark:text-night-base-06 hover:dark:hover:bg-night-base-02 hover:dark:text-white`}
    >
      <div
        className={`flex ${
          alignContent === 'horizontal' ? 'flex-row' : 'flex-col'
        } items-center justify-center gap-4`}
      >
        <div className="rounded-3xl border border-solid border-support-gray-001 border-opacity-40 p-7 text-day-text-label-primary dark:border-white dark:border-opacity-10 dark:text-white">
          <Icon
            width={27}
            height={27}
            type={icon}
            className="opacity-50 dark:opacity-100"
          />
        </div>
        <span className="text-center text-xs font-bold text-day-text-label-primary dark:text-white sm:text-base">
          {label}
        </span>
      </div>
    </div>
  </div>
)

export default ActionButton
