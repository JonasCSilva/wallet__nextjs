import axios from 'axios'
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'

import { UpdateData } from '../dashboardFunctions'
import dummyData from '../dummyData'
import { TickerData } from '../types/data'
import { UserFullContext } from './UserFullContext'

// type TableContextData = [TickerData[][], Dispatch<SetStateAction<TickerData[][]>>]
type TableContextData = [TickerData[][]]

const fetcher = () => axios.get('/api/sheet').then((res: { data: TickerData[][] }) => res.data)

export const TableDataContext = createContext({} as TableContextData)

export default function TableContextProvider({ children }: { children: ReactNode }) {
  const { isError, data: tableData } = useQuery('sheet', fetcher)

  const { userFull } = useContext(UserFullContext)

  const [tableDataState, setTableDataState] = useState<TickerData[][]>([dummyData, dummyData])

  if (isError) {
    throw new Error('Error in TableDataContext')
  }

  useEffect(() => {
    if (tableData) {
      const newData = UpdateData(tableData, userFull)
      setTableDataState(newData)
    }
  }, [tableData, userFull])

  const userBalanceValue = useMemo(() => [tableDataState], [tableDataState]) as TableContextData

  return <TableDataContext.Provider value={userBalanceValue}>{children}</TableDataContext.Provider>
}
