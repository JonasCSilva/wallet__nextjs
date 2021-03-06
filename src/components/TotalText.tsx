import { Skeleton, Heading } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { useTableData } from '../contexts/TableDataContext'
import { TickerData } from '../types/data'

export default function TotalText() {
  const [totalCurrent, setTotalCurrent] = useState(0)
  const [tableDataState] = useTableData()

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (tableDataState[0][0].name !== 'DUMMY' && isLoading) {
      setIsLoading(false)
    }
  }, [tableDataState])

  useEffect(() => {
    const newTotal = Number(total(tableDataState).toFixed(2))
    setTotalCurrent(newTotal)
  }, [tableDataState])

  function total(tickers: TickerData[][]) {
    let sum = 0
    tickers[0].forEach(t => (sum += t.current * t.price))
    tickers[1].forEach(t => (sum += t.current * t.price))
    return sum
  }

  return (
    <Skeleton isLoaded={!isLoading}>
      <Heading size='lg' w={40} fontWeight='500'>
        R$ {totalCurrent}
      </Heading>
    </Skeleton>
  )
}
