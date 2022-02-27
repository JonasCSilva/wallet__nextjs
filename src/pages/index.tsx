import { Heading, useColorMode, Center, Spinner, Flex, HStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { topBg } from '../theme'
import { Link } from '@chakra-ui/react'
import { useUser } from '@auth0/nextjs-auth0'
import ChangeThemeButton from '../components/ChangeThemeButton'
import WalletIcon from '../../public/wallet-svgrepo-com.svg'
import Image from 'next/image'
import NextLink from 'next/link'

const Home: NextPage = () => {
  const { colorMode } = useColorMode()
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

  return (
    <Flex align='center' direction='column' height='100vh'>
      <Flex
        align='center'
        bg={topBg[colorMode]}
        w={'80%'}
        justify='space-between'
        borderRadius={'md'}
        mt={10}
        py={4}
        px={32}
      >
        <Heading size='4xl'>Wallet</Heading>
        <ChangeThemeButton />
        <HStack justify='space-between'>
          {user ? (
            <NextLink href='/dashboard'>Acessar Conta</NextLink>
          ) : (
            <Link href='/api/auth/login?returnTo=/dashboard'>Login</Link>
          )}
        </HStack>
      </Flex>
      <Flex flex='1' align='center' justify='center' width='80%'>
        <Flex direction='column' align='center' justify='center' w={'50%'}>
          <Heading size='4xl' textAlign='center'>
            Dê adeus às planilhas de investimento
          </Heading>
        </Flex>
        <Flex align='center' justify='center' w={'50%'}>
          <Image src={WalletIcon} alt='Wallet Icon' width={350} height={350} />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Home

/* <NextLink href={'/' + path} passHref>
  <Button
    colorScheme='green'
    borderColor={colorMode === 'light' ? 'black' : 'white'}
    color={colorMode === 'light' ? 'black' : 'white'}
    _hover={{ bg: hoverGray }}
    size='lg'
    variant='outline'
    border='2px'
    fontSize={26}
  >
    Acessar conta
  </Button>
</NextLink> */
