import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { Center, Heading, Spinner } from '@chakra-ui/react'
import MyDashboard from '../components/MyDashboard'
import useUserData from '../hooks/useUserData'

function Dashboard() {
  const { isError } = useUserData()

  if (isError) {
    return (
      <Center>
        <Heading height='100vh'>Unexpected Error</Heading>
      </Center>
    )
  }

  return <MyDashboard />
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
