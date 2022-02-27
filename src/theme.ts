import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

export const bgColor = { light: 'gray.200', dark: 'gray.800' }
export const color = { light: 'green.500', dark: 'red.500' }
export const topBg = { light: 'gray.400', dark: 'gray.600' }
export const bg3 = { light: '#67bb46', dark: '#67bb46' }
export const switchBg = { light: 'gray.900', dark: 'gray.900' }
export const hoverGray = { light: 'rgba(54, 54, 54, 0.11)', dark: 'rgba(154, 230, 180, 0.12)' }
export const buttonHoverColor = { light: '#73D14F', dark: '#73D14F' }

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}

const customTheme = {
  styles: {
    global: (props: never) => ({
      'html, body': {
        bg: mode('gray.200', 'gray.800')(props),
        padding: 0,
        fontFamily: 'Inter'
      },
      '*': {
        boxSizing: 'border-box'
      }
    })
  },
  ...config
}

const theme = extendTheme(customTheme)

export default theme
