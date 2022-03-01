import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { Center, Heading, Spinner } from '@chakra-ui/react'
import MyDashboard from '../components/MyDashboard'
import useUserFullData from '../hooks/useUserFullData'
import UserContributionContextProvider from '../contexts/UserContributionContext'
import UserBalanceContextProvider from '../contexts/UserBalanceContext'
import UserCurrentsContextProvider from '../contexts/UserCurrentsContext'
import SheetContextProvider from '../contexts/SheetDataContext'

function Dashboard() {
  const { isError } = useUserFullData()

  if (isError) {
    return (
      <Center>
        <Heading height='100vh'>Unexpected Error</Heading>
      </Center>
    )
  }

  return (
    <UserContributionContextProvider>
      <UserBalanceContextProvider>
        <UserCurrentsContextProvider>
          <SheetContextProvider>
            <MyDashboard />
          </SheetContextProvider>
        </UserCurrentsContextProvider>
      </UserBalanceContextProvider>
    </UserContributionContextProvider>
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
