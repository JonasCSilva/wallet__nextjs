import { UserProvider } from '@auth0/nextjs-auth0'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import theme from '../theme'

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
