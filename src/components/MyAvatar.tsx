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
        {({ isOpen }) => (
          <>
            <PopoverTrigger>
              <Skeleton isLoaded={!isLoading}>
                {/* <Avatar size='md'>*/}
                <Button borderRadius='50%'>
                  <Tooltip isDisabled={isOpen} label='Configurar perfil' hasArrow openDelay={200}>
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
                </Button>
                {/* </Avatar> */}
              </Skeleton>
            </PopoverTrigger>
            <PopoverContent w={36}>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody
                display='flex'
                justifyContent='center'
                alignItems='center'
                flexDirection='column'
                mt={4}
                mb={2}
              >
                <NextLink href='/' passHref>
                  <Button colorScheme='green' mb={4} size='sm'>
                    Início
                  </Button>
                </NextLink>
                <Link href='/api/auth/logout'>
                  <Button colorScheme='red' size='sm'>
                    Logout
                  </Button>
                </Link>
              </PopoverBody>
            </PopoverContent>
          </>
        )}
      </Popover>
    </Flex>
  )
}
