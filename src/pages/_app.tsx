import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'
import { UserProvider } from '@auth0/nextjs-auth0'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ChakraProvider resetCSS theme={theme}>
        <Head>
          <title>Wallet</title>
        </Head>
        <Component {...pageProps} />
      </ChakraProvider>
    </UserProvider>
  )
}

export default MyApp
