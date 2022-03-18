import axios from 'axios'
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'

import useUserFullData from '../hooks/useUserFullData'
import { CurrentData, UserFull } from '../types/data'

type UserFullContextData = {
  userFull: UserFull['user_metadata']
  updateUserBalance: (balance: number) => void
  updateUserContribution: (contribution: number) => void
  updateUserCurrents: (currents: CurrentData[]) => void
}

const UserFullContext = createContext({} as UserFullContextData)

export const useUserFull = () => useContext(UserFullContext)

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

  const updateUserBalance = (balance: number) => {
    axios.patch(`api/user`, { data: { balance } })
    setUserFull(prevState => ({ ...prevState, balance }))
  }

  const updateUserContribution = (contribution: number) => {
    axios.patch(`api/user`, { data: { contribution } })
    setUserFull(prevState => ({ ...prevState, contribution }))
  }

  const updateUserCurrents = (currents: CurrentData[]) => {
    axios.patch(`api/user`, { data: { currents } })
    setUserFull(prevState => ({ ...prevState, currents }))
  }

  const userFullValue = useMemo(() => {
    return {
      userFull,
      updateUserBalance,
      updateUserContribution,
      updateUserCurrents
    }
  }, [userFull]) as UserFullContextData

  return <UserFullContext.Provider value={userFullValue}>{children}</UserFullContext.Provider>
}
