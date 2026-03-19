import { useContext, useState } from 'react'

import { User } from 'src/__generated__/graphql'
import OrganizationCard from '@/components/profile/OrganizationCard'
import ButtonPrimary from '@/components/shared/ButtonPrimary'
import Icon from '../shared/Icon'
import { UserContext } from '@/components/profile/store/UserContext'

const UniversitySettingsMobile = () => {
  const { user } = useContext(UserContext) // const [focusedCog, setFocusedCog] = useState<Cog | undefined>(undefined)
  const [openModal, setOpenModal] = useState<boolean>(false)

  const toggleModal = () => {
    setOpenModal(!openModal)
    // setFocusedCog(undefined)
  }

  const addUniversity = () => {
    toggleModal()
  }

  // const openCogEditor = (cog: Cog) => {
  //   toggleModal()
  //   setFocusedCog(cog)
  // }

  return (
    <div className=" ml-0 grow ">
      <div className="">
        <div className="relative">
          <h2 className="text-left text-xl font-bold text-day-text-label-primary dark:text-white">
            My schools
          </h2>
        </div>
        <div className="mt-5 flex flex-wrap gap-5 overflow-x-auto">
          {/* {organizations.map((organization) => (
                    <OrganizationCard
                      key={organization.id}
                      organization={organization}
                    />
                  ))} */}
          {!!user?.organization ? (
            <OrganizationCard organization={user?.organization} />
          ) : (
            '-'
          )}
        </div>
      </div>
    </div>
  )
}

export default UniversitySettingsMobile
