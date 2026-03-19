import Icon from '@/components/shared/Icon'

interface OrganizationCardProps {
  organization: any
}

const OrganizationCard: React.FC<OrganizationCardProps> = ({
  organization
}) => {
  return (
    <div
      className={`${
        organization.primary
          ? 'user--organization-primary border border-solid border-white text-support-gray-006'
          : 'border border-solid border-opacity-silver border-opacity-20 bg-day-base-primary text-day-text-label-primary dark:border-white dark:border-opacity-10 dark:bg-day-base-primary dark:text-white'
      } group relative min-w-[327px] grow rounded-3xl px-4 py-5 sm:min-w-[350px] md:max-w-[48%]`}
    >
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border border-solid border-white border-opacity-10 bg-day-text-label-tertirary-inverse">
          {!!organization.photoUrl ? (
            <img
              className="h-full w-full object-center"
              src={organization.photoUrl}
              alt="Organization image"
            />
          ) : (
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border border-solid border-white border-opacity-10 bg-day-text-label-tertirary-inverse">
              <div className="flex h-full w-full items-center justify-center text-white">
                <Icon type="photo" width={40} height={40} />
              </div>
            </div>
          )}
        </div>
        <div>
          <div className="text-base font-bold">{organization.name}</div>
          <div
            className={`${
              organization.primary ? 'text-support-gray-006' : 'text-white'
            } mt-2 text-sm`}
          >
            -
          </div>
        </div>

        {/* <div className="absolute right-4 top-0 bottom-0 hidden h-full flex-col items-center justify-center text-night-text group-hover:flex">
          <div className="cursor-pointer border-b border-solid border-white border-opacity-10 px-1 pb-2.5 hover:text-white">
            <Icon type="edit" width={18} height={18} />
          </div>
          <div className="cursor-pointer px-1 pt-2.5 hover:text-white">
            <Icon type="delete" width={18} height={18} />
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default OrganizationCard
