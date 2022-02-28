import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

export const bgColor = { light: 'gray.200', dark: 'gray.800' }
// export const color = 'green.500'
export const topBg = { light: 'gray.400', dark: 'gray.600' }
export const bg3 = '#67bb46'
export const switchBg = 'gray.900'
export const hoverGray = { light: 'rgba(54, 54, 54, 0.11)', dark: 'rgba(154, 230, 180, 0.12)' }
export const buttonHoverColor = '#73D14F'

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
