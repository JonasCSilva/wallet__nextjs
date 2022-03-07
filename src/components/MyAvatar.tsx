import {
  Flex,
  Popover,
  Tooltip,
  Avatar,
  PopoverCloseButton,
  PopoverArrow,
  Button,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useColorMode,
  Link,
  Skeleton
} from '@chakra-ui/react'
import NextLink from 'next/link'

import useUserFullData from '../hooks/useUserFullData'
import { bg3, bgColor, buttonHoverColor } from '../theme'

export default function MyAvatar() {
  const { userFullData, isLoading } = useUserFullData()
  const { colorMode } = useColorMode()

  return (
    <Flex justify='center' align='center' my={3}>
      <Popover>
        <PopoverTrigger>
          <Skeleton isLoaded={!isLoading}>
            <Avatar size='md'>
              <Tooltip label='Configurar perfil' hasArrow openDelay={200}>
                <Avatar
                  name={userFullData?.name}
                  bg={bg3}
                  color={bgColor[colorMode]}
                  _hover={{ bg: buttonHoverColor }}
                  position='absolute'
                  cursor='pointer'
                  size='md'
                />
              </Tooltip>
            </Avatar>
          </Skeleton>
        </PopoverTrigger>
        <PopoverContent w={32}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
            {/* <Button
              my={4}
              size='sm'
              bg={bg3}
              color={bgColor[colorMode]}
              _hover={{ bg: buttonHoverColor }}
            >
              Perfil
            </Button> */}
            <NextLink href='/' passHref>
              <Button colorScheme='green' mb={4} size='sm'>
                Início
              </Button>
            </NextLink>
            <Link href='/api/auth/logout'>
              <Button colorScheme='red' mb={2} size='sm'>
                Logout
              </Button>
            </Link>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  )
}
