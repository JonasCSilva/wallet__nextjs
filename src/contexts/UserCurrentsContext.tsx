import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useMemo, useState } from 'react'

import useUserFullData from '../hooks/useUserFullData'
import { CurrentData } from '../types/data'

type UserCurrentsContextData = [CurrentData[], Dispatch<SetStateAction<CurrentData[]>>]

export const UserCurrentsContext = createContext({} as UserCurrentsContextData)

export default function UserCurrentsContextProvider({ children }: { children: ReactNode }) {
  const { userFullData } = useUserFullData()

  const [userCurrents, setUserCurrents] = useState<CurrentData[]>([] as CurrentData[])

  useEffect(() => {
    if (userFullData) {
      setUserCurrents(userFullData.user_metadata.currents)
    }
  }, [userFullData])

  const userCurrentsValue = useMemo(() => [userCurrents, setUserCurrents], [userCurrents]) as UserCurrentsContextData

  return <UserCurrentsContext.Provider value={userCurrentsValue}>{children}</UserCurrentsContext.Provider>
}
