import { useContext } from 'react'
import { UserContext } from '@/components/profile/store/UserContext'

import OrganizationCard from '@/components/profile/OrganizationCard'

const UniversitySettings: React.FC = () => {
  const { user } = useContext(UserContext)

  return (
    <div className=" ml-0 grow ">
      <div className="rounded-4xl bg-day-base-02 p-6 dark:bg-night-base-02">
        <div className="relative">
          <h2 className="text-xl font-bold text-day-text-label-primary dark:text-white">
            My schools
          </h2>
          {/* <div className="absolute top-2 right-2 flex">
            <span className="mr-1 text-sm text-night-text-label-secondary dark:text-white dark:opacity-60">
              Add school
            </span>
            <Icon
              classNames="mt-0.5 text-night-text-label-secondary"
              type="addCircle"
              width={16}
              height={16}
              onClick={() => toggleModal()}
            />
          </div> */}
        </div>
        <div className="mt-5 flex flex-wrap gap-5">
          {!!user?.organization ? (
            <OrganizationCard organization={user.organization} />
          ) : (
            '-'
          )}
        </div>
      </div>
    </div>
  )
}

export default UniversitySettings
