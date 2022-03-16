import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useMemo, useState } from 'react'

import useUserFullData from '../hooks/useUserFullData'
import { CurrentData, UserFull } from '../types/data'

type UserFullContextData = [UserFull['user_metadata'], Dispatch<SetStateAction<UserFull['user_metadata']>>]

export const UserFullContext = createContext({} as UserFullContextData)

export default function UserFullContextProvider({ children }: { children: ReactNode }) {
  const { userFullData } = useUserFullData()

  const [userFull, setUserFull] = useState<UserFull['user_metadata']>({
    balance: 50,
    contribution: 1000,
    currents: [] as CurrentData[]
  })

  useEffect(() => {
    if (userFullData) {
      setUserFull(userFullData.user_metadata)
    }
  }, [userFullData])

  const userFullValue = useMemo(() => [userFull, setUserFull], [userFull]) as UserFullContextData

  return <UserFullContext.Provider value={userFullValue}>{children}</UserFullContext.Provider>
}
