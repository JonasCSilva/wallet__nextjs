import axios from 'axios'
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'

import { UpdateData } from '../dashboardFunctions'
import dummyData from '../dummyData'
import { TickerData } from '../types/data'
import { UserFullContext } from './UserFullContext'

type SheetContextData = [TickerData[][], Dispatch<SetStateAction<TickerData[][]>>]

const fetcher = () => axios.get('/api/sheet').then((res: { data: TickerData[][] }) => res.data)

export const SheetDataContext = createContext({} as SheetContextData)

export default function SheetContextProvider({ children }: { children: ReactNode }) {
  const { isError, data: sheetData } = useQuery('sheet', fetcher)

  const [userFullData] = useContext(UserFullContext)

  const [sheetDataState, setSheetDataState] = useState<TickerData[][]>([dummyData, dummyData])

  if (isError) {
    throw new Error('Error in SheetDataContext')
  }

  useEffect(() => {
    if (sheetData) {
      const newData = UpdateData(sheetData, userFullData)
      setSheetDataState(newData)
    }
  }, [sheetData, userFullData])

  const userBalanceValue = useMemo(() => [sheetDataState, setSheetDataState], [sheetDataState]) as SheetContextData

  return <SheetDataContext.Provider value={userBalanceValue}>{children}</SheetDataContext.Provider>
}
