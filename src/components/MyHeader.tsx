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
import { MyHeaderProps } from '../types/components'
import { topBg } from '../theme'
import axios from 'axios'

export default function MyHeader({ isLoadingSk, userData, setUserData, myId, tickers, userName }: MyHeaderProps) {
  const { colorMode } = useColorMode()

  function total() {
    let sum = 0
    tickers.tickersD.forEach(t => (sum += t.current * t.price))
    tickers.tickersF.forEach(t => (sum += t.current * t.price))
    return sum
  }

  return (
    <Flex justify='space-around' align='center' borderRadius={'6px'} w='90%' mt={4} bg={topBg[colorMode]}>
      <MyAvatar userName={userName} />

      <ChangeThemeButton />

      <BalanceSlider setUserData={setUserData} userData={userData} id={myId} isLoadingSk={isLoadingSk} />

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
            <Skeleton isLoaded={!isLoadingSk}>
              <Input
                borderLeftRadius={0}
                h='full'
                p={2}
                w={32}
                fontSize={14}
                maxLength={9}
                placeholder='Aporte'
                type='number'
                defaultValue={userData.contribution === 0 ? '' : userData.contribution}
                onBlur={e => {
                  const contribution = Number(e.target.value)
                  axios.patch(`api/userdata/${myId}`, { data: { contribution } }).then(res => res.data)
                  setUserData(prevState => ({
                    ...prevState,
                    contribution
                  }))
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
        <Skeleton isLoaded={!isLoadingSk}>
          <Text w={28}>{Number(total().toFixed(2))}</Text>
        </Skeleton>
      </Heading>
    </Flex>
  )
}
