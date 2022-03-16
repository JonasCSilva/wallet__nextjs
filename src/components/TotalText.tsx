import { Skeleton, Heading } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'

import { SheetDataContext } from '../contexts/SheetDataContext'
import { TickerData } from '../types/data'

export default function TotalText() {
  const [totalCurrent, setTotalCurrent] = useState(0)
  const [sheetDataState] = useContext(SheetDataContext)

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
