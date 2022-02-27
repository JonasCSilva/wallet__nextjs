import { useColorMode, Switch, SwitchProps } from '@chakra-ui/react'

export const DarkModeSwitch = (props: SwitchProps) => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Switch
      position='fixed'
      top='1rem'
      right='1rem'
      color='green'
      isChecked={colorMode === 'dark'}
      onChange={toggleColorMode}
      {...props}
    />
  )
}
