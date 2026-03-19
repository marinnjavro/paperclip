import { createContext, ReactElement, useEffect, useState } from 'react'
import { useAuth } from 'lib/auth'

const UserContext = createContext({
  isStudent: false
})

interface UserProps {
  children?: JSX.Element | Array<JSX.Element>
}

export function UserContextProvider(props: UserProps): ReactElement {
  const { isSignedIn } = useAuth()
  const [isStudent, setIsStudent] = useState(false)

  // const { loading, error, data } = useQuery(GET_ME, {
  //   onCompleted: (value) => {
  //     setIsStudent(value?.me?.roles === 'student')
  //   },
  //   onError: (err) => console.warn(err.message),
  //   skip: !isSignedIn()
  // })

  return (
    <UserContext.Provider value={{ isStudent: isStudent }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext
