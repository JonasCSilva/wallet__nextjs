import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { Center, Heading, Spinner } from '@chakra-ui/react'

import MyDashboard from '../components/MyDashboard'
import SheetContextProvider from '../contexts/SheetDataContext'
import UserFullContextProvider from '../contexts/UserFullContext'
import useUserFullData from '../hooks/useUserFullData'

function Dashboard() {
  const { isError } = useUserFullData()

  if (isError) {
    return (
      <Center height='100vh'>
        <Heading>Unexpected Error</Heading>
      </Center>
    )
  }

  return (
    <UserFullContextProvider>
      <SheetContextProvider>
        <MyDashboard />
      </SheetContextProvider>
    </UserFullContextProvider>
  )
}

export default withPageAuthRequired(Dashboard, {
  onRedirecting: () => (
    <Center height='100vh'>
      <Spinner size='xl' />
    </Center>
  ),
  onError: (error: Error) => (
    <Center>
      <Heading height='100vh'>{error.message}</Heading>
    </Center>
  )
})
