import {
  Flex,
  Input,
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
import axios from 'axios'
import { useUser } from '@auth0/nextjs-auth0'
import { TickerData } from '../types/data'
import useUserData from '../hooks/useUserData'
import TickersContext from '../contexts/UserMetadataContext'
import { useContext } from 'react'

type MyHeaderProps = {
  tickers: {
    tickersD: TickerData[]
    tickersF: TickerData[]
  }
}

export default function MyHeader({ tickers }: MyHeaderProps) {
  const { userMetadata, setUserMetadata } = useContext(TickersContext)
  const { user } = useUser()
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
              <Input
                borderLeftRadius={0}
                h='full'
                p={2}
                w={32}
                fontSize={14}
                maxLength={9}
                placeholder='Aporte'
                type='number'
                value={userMetadata.contribution === 0 ? '' : userMetadata.contribution}
                onChange={e =>
                  setUserMetadata(prevState => ({
                    ...prevState,
                    contribution: Number(e.target.value)
                  }))
                }
                onBlur={e => {
                  const contribution = Number(e.target.value)
                  axios.patch(`api/user/${user?.sub}`, { data: { contribution } }).then(res => res.data)
                  if (contribution == 0) {
                    e.target.value = ''
                  } else {
                    e.target.value = String(contribution)
                  }
                }}
              />
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
