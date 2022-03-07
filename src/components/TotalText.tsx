import { Skeleton, Heading } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import useSheetDataContext from '../hooks/useSheetDataContext'
import { TickerData } from '../types/data'

export default function TotalText() {
  const [totalCurrent, setTotalCurrent] = useState(0)
  const [sheetDataState] = useSheetDataContext()

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (sheetDataState[0][0].name !== 'DUMMY' && isLoading) {
      setIsLoading(false)
    }
  }, [sheetDataState])

  useEffect(() => {
    const newTotal = Number(total(sheetDataState).toFixed(2))
    setTotalCurrent(newTotal)
  }, [sheetDataState])

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
