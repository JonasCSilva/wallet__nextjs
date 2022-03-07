import { Flex, Heading, InputGroup, InputLeftAddon, useColorMode, HStack } from '@chakra-ui/react'

import { topBg } from '../theme'
import BalanceSlider from './BalanceSlider'
import ChangeThemeButton from './ChangeThemeButton'
import ContributionInput from './ContributionInput'
import MyAvatar from './MyAvatar'
import TotalText from './TotalText'

export default function MyHeader() {
  const { colorMode } = useColorMode()

  return (
    <Flex justify='space-around' align='center' borderRadius='6px' w='90%' mb={4} bg={topBg[colorMode]}>
      <MyAvatar />

      <ChangeThemeButton />

      <BalanceSlider />

      <Flex>
        <HStack justifyContent='center' alignItems='center'>
          <Flex justify='center' align='center' mr={3} fontSize={18} h='full'>
            Aporte:
          </Flex>
          <InputGroup h='100%'>
            <InputLeftAddon h='100%' fontSize={18}>
              R$
            </InputLeftAddon>

            <ContributionInput />
          </InputGroup>
        </HStack>
      </Flex>
      <HStack>
        <Heading size='lg' fontWeight='500' display='flex' alignItems='center' justifyContent='center'>
          Total:
        </Heading>
        <TotalText />
      </HStack>
    </Flex>
  )
}
