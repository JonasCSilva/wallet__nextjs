import {
  Flex,
  Skeleton,
  Heading,
  Text,
  InputGroup,
  InputLeftAddon,
  FormLabel,
  FormControl,
  useColorMode
} from '@chakra-ui/react'
import BalanceSlider from './BalanceSlider'
import ChangeThemeButton from './ChangeThemeButton'
import MyAvatar from './MyAvatar'
import { topBg } from '../theme'
import { TickerData } from '../types/data'
import useUserData from '../hooks/useUserFullData'
import ContributionInput from './ContributionInput'

type MyHeaderProps = {
  tickers: {
    tickersD: TickerData[]
    tickersF: TickerData[]
  }
}

export default function MyHeader({ tickers }: MyHeaderProps) {
  const { isLoading } = useUserData()
  const { colorMode } = useColorMode()

  function total() {
    const sum = 0
    /* tickers.tickersD.forEach(t => (sum += t.current * t.price))
    tickers.tickersF.forEach(t => (sum += t.current * t.price)) */
    return sum
  }

  return (
    <Flex justify='space-around' align='center' borderRadius={'6px'} w='90%' mt={4} bg={topBg[colorMode]}>
      <MyAvatar />

      <ChangeThemeButton />

      <BalanceSlider />

      <Flex>
        <FormControl display='flex' justifyContent='center' alignItems='center' flexDirection='row'>
          <FormLabel margin='0'>
            <Flex justify='center' align='center' mr={3} fontSize={18} h='full'>
              Aporte:
            </Flex>
          </FormLabel>
          <InputGroup>
            <InputLeftAddon h='full' fontSize={18}>
              R$
            </InputLeftAddon>
            <Skeleton isLoaded={!isLoading}>
              <ContributionInput />
            </Skeleton>
          </InputGroup>
        </FormControl>
      </Flex>
      <Heading size='lg' fontWeight={'500'} display='flex' alignItems='center' justifyContent='center'>
        Total: R$&nbsp;
        <Skeleton isLoaded={!isLoading}>
          <Text w={28}>{Number(total().toFixed(2))}</Text>
        </Skeleton>
      </Heading>
    </Flex>
  )
}
