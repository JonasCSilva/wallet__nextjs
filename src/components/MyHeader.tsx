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
import { updateContribution } from '../serverFunctions'
import BalanceSlider from './BalanceSlider'
import ChangeThemeButton from './ChangeThemeButton'
import MyAvatar from './MyAvatar'
import { MyHeaderProps } from '../types/components'
import { topBg } from '../theme'

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
                  updateContribution(Number(e.target.value), myId)
                  setUserData(prevState => ({
                    ...prevState,
                    contribution: Number(e.target.value)
                  }))
                  if (Number(e.target.value) == 0) {
                    e.target.value = ''
                  } else {
                    e.target.value = String(Number(e.target.value))
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
