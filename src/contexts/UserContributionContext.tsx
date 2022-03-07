import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useMemo, useState } from 'react'

import useUserFullData from '../hooks/useUserFullData'

type UserContributionContextData = [number, Dispatch<SetStateAction<number>>]

export const UserContributionContext = createContext({} as UserContributionContextData)

export default function UserContributionContextProvider({ children }: { children: ReactNode }) {
  const { userFullData } = useUserFullData()

  const [userContribution, setUserContribution] = useState<number>(100)

  useEffect(() => {
    if (userFullData) {
      setUserContribution(userFullData.user_metadata.contribution)
    }
  }, [userFullData])

  const userContributionValue = useMemo(
    () => [userContribution, setUserContribution],
    [userContribution]
  ) as UserContributionContextData

  return <UserContributionContext.Provider value={userContributionValue}>{children}</UserContributionContext.Provider>
}
