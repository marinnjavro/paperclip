import Icon from '@/components/shared/Icon'

const PageHeading = ({
  icon,
  label,
  handleOnClick
}: {
  icon?: string
  label: string
  handleOnClick?: () => void
}) => (
  <div className="mb-8">
    <button
      className="flex items-center"
      {...(!!handleOnClick && { onClick: handleOnClick })}
    >
      {!!icon && <Icon width={12} height={24} type={icon} />}
      <div className="flex items-center">
        <h2 className="ml-2 pr-3 text-2xl font-semibold text-day-text-label-primary dark:text-white">
          {label}
        </h2>
      </div>
    </button>
  </div>
)

export default PageHeading
