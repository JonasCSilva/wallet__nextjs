import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { Center, Heading, Spinner } from '@chakra-ui/react'
import MyDashboard from '../components/MyDashboard'

function Dashboard() {
  const { user, error, isLoading } = useUser()

  if (isLoading)
    return (
      <Center height='100vh'>
        <Spinner size='xl' />
      </Center>
    )
  if (error)
    return (
      <Center>
        <Heading height='100vh'>{error.message}</Heading>
      </Center>
    )

  if (user) {
    return <MyDashboard user={user} />
  }

  return (
    <Center>
      <Heading height='100vh'>Unexpected Error</Heading>
    </Center>
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
