import { Flex, Heading, Button } from '@chakra-ui/react'
import NextLink from 'next/link'

export default function PageNotFound() {
  return (
    <Flex justify='center' align='center' flex='1' direction='column'>
      <Heading size='4xl'>Página não encontrada!</Heading>
      <NextLink href={'/'}>
        <Button fontSize={26} my={10}>
          Voltar a página inicial
        </Button>
      </NextLink>
    </Flex>
  )
}
