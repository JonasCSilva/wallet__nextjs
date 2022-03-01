import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useMemo, useState } from 'react'
import useUserFullData from '../hooks/useUserFullData'
import { CurrentData, UserFull } from '../types/data'

type UserMetadataContextData = [UserFull['user_metadata'], Dispatch<SetStateAction<UserFull['user_metadata']>>]

export const UserMetadataContext = createContext({} as UserMetadataContextData)

export default function UserMetadataContextProvider({ children }: { children: ReactNode }) {
  const { userFullData } = useUserFullData()

  const [userMetadata, setUserMetadata] = useState<UserFull['user_metadata']>({
    contribution: 100,
    currents: [] as CurrentData[],
    balance: 50
  })

  useEffect(() => {
    if (userFullData) {
      setUserMetadata(userFullData.user_metadata)
    }
  }, [userFullData])

  const userMetadataValue = useMemo(() => [userMetadata, setUserMetadata], [userMetadata]) as [
    UserFull['user_metadata'],
    Dispatch<SetStateAction<UserFull['user_metadata']>>
  ]

  return <UserMetadataContext.Provider value={userMetadataValue}>{children}</UserMetadataContext.Provider>
}
