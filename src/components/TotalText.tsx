import { Skeleton, Text } from '@chakra-ui/react'

import useUserFullData from '../hooks/useUserFullData'

export default function TotalText() {
  const { isLoading } = useUserFullData()

  function total() {
    const sum = 0
    /* tickers.tickersD.forEach(t => (sum += t.current * t.price))
    tickers.tickersF.forEach(t => (sum += t.current * t.price)) */
    return sum
  }

  return (
    <Skeleton isLoaded={!isLoading}>
      <Text w={28}>{Number(total().toFixed(2))}</Text>
    </Skeleton>
  )
}
