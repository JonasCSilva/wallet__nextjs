import { VStack, Heading, Button } from '@chakra-ui/react'
import NextLink from 'next/link'

export default function PageNotFound() {
  return (
    <VStack justify='center' height='100vh' spacing={10}>
      <Heading size='4xl'>500 - Server-side error occurred</Heading>
      <NextLink href='/' passHref>
        <Button fontSize='2xl' size='lg'>
          Return to the Main Page
        </Button>
      </NextLink>
    </VStack>
  )
}
