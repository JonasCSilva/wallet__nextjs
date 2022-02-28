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
  Link
} from '@chakra-ui/react'
import { bg3, bgColor, buttonHoverColor } from '../theme'
import { MyAvatarProps } from '../types/components'

export default function MyAvatar({ userName }: MyAvatarProps) {
  const { colorMode } = useColorMode()

  return (
    <Flex justify='center' align='center' my={3}>
      <Popover>
        <PopoverTrigger>
          <Avatar size='md'>
            <Tooltip label='Configurar perfil' hasArrow openDelay={200}>
              <Avatar
                name={userName ? userName : undefined}
                bg={bg3}
                color={bgColor[colorMode]}
                _hover={{ bg: buttonHoverColor }}
                position='absolute'
                cursor='pointer'
                size='md'
              />
            </Tooltip>
          </Avatar>
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
              // onClick={() => {router.push('/profile')}}
            >
              Perfil
            </Button> */}
            <Link href='/'>
              <Button colorScheme='green' mb={4} size='sm'>
                Início
              </Button>
            </Link>
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
