import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
import useUserData from '../hooks/useUserData'
import { CurrentData, UserFull } from '../types/data'

type UserMetadataContextData = {
  userMetadata: UserFull['user_metadata']
  setUserMetadata: Dispatch<SetStateAction<UserFull['user_metadata']>>
}

const UserMetadataContext = createContext({} as UserMetadataContextData)

export default UserMetadataContext

export function UserMetadataContextProvider({ children }: { children: ReactNode }) {
  const { userFull } = useUserData()

  const [userMetadata, setUserMetadata] = useState<UserFull['user_metadata']>({
    contribution: 100,
    currents: [] as CurrentData[],
    balance: 50
  })

  useEffect(() => {
    if (userFull) {
      setUserMetadata(userFull.user_metadata)
    }
  }, [userFull])

  return (
    <UserMetadataContext.Provider value={{ userMetadata, setUserMetadata }}>{children}</UserMetadataContext.Provider>
  )
}
