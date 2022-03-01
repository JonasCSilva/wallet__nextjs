import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useMemo, useState } from 'react'
import useUserFullData from '../hooks/useUserFullData'

type UserBalanceContextData = [number, Dispatch<SetStateAction<number>>]

export const UserBalanceContext = createContext({} as UserBalanceContextData)

export default function UserBalanceContextProvider({ children }: { children: ReactNode }) {
  const { userFullData } = useUserFullData()

  const [userBalance, setUserBalance] = useState<number>(50)

  useEffect(() => {
    if (userFullData) {
      setUserBalance(userFullData.user_metadata.balance)
    }
  }, [userFullData])

  const userBalanceValue = useMemo(() => [userBalance, setUserBalance], [userBalance]) as UserBalanceContextData

  return <UserBalanceContext.Provider value={userBalanceValue}>{children}</UserBalanceContext.Provider>
}
