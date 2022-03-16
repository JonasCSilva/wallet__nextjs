import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import { Flex, Switch, useColorMode } from '@chakra-ui/react'

import { switchBg } from '../theme'

export default function ChangeThemeButton() {
  const { toggleColorMode, colorMode } = useColorMode()

  return (
    <Flex align='center' justify='center' onClick={toggleColorMode} cursor='pointer' my={6}>
      <SunIcon w={6} h={6} />
      <Switch isChecked={colorMode !== 'light'} size='md' colorScheme={switchBg} mx={3} pointerEvents='none' />
      <MoonIcon w={6} h={6} />
    </Flex>
  )
}
