import { UserProvider } from '@auth0/nextjs-auth0'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'

import theme from '../theme'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ChakraProvider resetCSS theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Head>
            <title>Wallet</title>
          </Head>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ChakraProvider>
    </UserProvider>
  )
}

export default MyApp
