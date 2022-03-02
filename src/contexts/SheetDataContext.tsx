import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useMemo, useState } from 'react'
import { TickerData } from '../types/data'
import useSWRImmutable from 'swr'
import axios from 'axios'
import dummyData from '../lib/dummyData'
import { UpdateData } from '../dashboardFunctions'
import useUserBalanceContext from '../hooks/useUserBalanceContext'
import useUserContributionContext from '../hooks/useUserContributionContext'
import useUserCurrentsContext from '../hooks/useUserCurrentsContext'

type SheetContextData = [TickerData[][], Dispatch<SetStateAction<TickerData[][]>>]

const fetcher = (url: string) => axios.get(url).then((res: { data: TickerData[][] }) => res.data)

export const SheetDataContext = createContext({} as SheetContextData)

export default function SheetContextProvider({ children }: { children: ReactNode }) {
  const { data: sheetData, error } = useSWRImmutable(() => `/api/sheet`, fetcher)

  const [userBalance] = useUserBalanceContext()
  const [userContribution] = useUserContributionContext()
  const [userCurrents] = useUserCurrentsContext()

  if (error) {
    throw new Error(error)
  }

  const [sheetDataState, setSheetDataState] = useState<TickerData[][]>([dummyData, dummyData])

  useEffect(() => {
    if (sheetData) {
      const newData = UpdateData(sheetData, userBalance, userContribution, userCurrents)
      setSheetDataState(newData)
    }
  }, [sheetData, userBalance, userContribution, userCurrents])

  const userBalanceValue = useMemo(() => [sheetDataState, setSheetDataState], [sheetDataState]) as SheetContextData

  return <SheetDataContext.Provider value={userBalanceValue}>{children}</SheetDataContext.Provider>
}
