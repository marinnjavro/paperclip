import { createContext } from 'react'
import { User } from 'src/__generated__/graphql'
import { UserData } from '../ProfileSettings'

interface UserContextInterface {
  user: User
  updateUser: (userData: UserData) => void
  updateUserPhoto: (files: FileList) => void
  deleteUserPhoto: () => void
}

export const UserContext = createContext<UserContextInterface>({
  user: {} as User,
  updateUser: () => {},
  updateUserPhoto: () => {},
  deleteUserPhoto: () => {}
})
