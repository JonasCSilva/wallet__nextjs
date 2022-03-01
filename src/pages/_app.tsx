import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'
import { UserProvider } from '@auth0/nextjs-auth0'
import Head from 'next/head'
import UserMetadataContextProvider from '../contexts/UserMetadataContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ChakraProvider resetCSS theme={theme}>
        <UserMetadataContextProvider>
          <Head>
            <title>Wallet</title>
          </Head>
          <Component {...pageProps} />
        </UserMetadataContextProvider>
      </ChakraProvider>
    </UserProvider>
  )
}

export default MyApp
