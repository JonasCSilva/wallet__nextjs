import { useUser } from '@auth0/nextjs-auth0'
import { Heading, useColorMode, Center, Flex, Button, Skeleton, Link } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Image from 'next/image'
import NextLink from 'next/link'

import WalletIcon from '../../public/wallet.svg'
import ChangeThemeButton from '../components/ChangeThemeButton'
import { bg3, bgColor, buttonHoverColor, hoverGray, topBg } from '../theme'

const Home: NextPage = () => {
  const { colorMode } = useColorMode()
  const { user, error, isLoading } = useUser()

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
        w='80%'
        justify='space-between'
        borderRadius='md'
        mt={10}
        py={4}
        px={32}
      >
        <Heading size='4xl'>Wallet</Heading>
        <ChangeThemeButton />
        <Skeleton isLoaded={!isLoading} w={60} display='flex' justifyContent='center'>
          <Flex justify='space-between'>
            {!isLoading && user ? (
              <NextLink href='/dashboard' passHref>
                <Button
                  colorScheme='green'
                  borderColor={colorMode === 'light' ? 'black' : 'white'}
                  color={colorMode === 'light' ? 'black' : 'white'}
                  _hover={{ bg: hoverGray[colorMode] }}
                  size='lg'
                  variant='outline'
                  border='2px'
                  fontSize={26}
                >
                  Acessar conta
                </Button>
              </NextLink>
            ) : (
              <Link href='/api/auth/login?returnTo=/dashboard'>
                <Button bg={bg3} color={bgColor[colorMode]} _hover={{ bg: buttonHoverColor }} size='lg' fontSize={26}>
                  Login
                </Button>
              </Link>
            )}
          </Flex>
        </Skeleton>
      </Flex>
      <Flex flex='1' align='center' justify='center' width='80%'>
        <Flex direction='column' align='center' justify='center' w='50%'>
          <Heading size='4xl' textAlign='center'>
            D?? adeus ??s planilhas de investimento
          </Heading>
        </Flex>
        <Flex align='center' justify='center' w='50%'>
          <Image priority src={WalletIcon} alt='Wallet Icon' width={350} height={350} />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Home
