import type { NextPage } from 'next'
import { Button, Center, Box, Heading } from '@chakra-ui/react'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <Center height="100vh">
      <Box>
        <Heading>CateiruSSOログインえぐざんぷる</Heading>
        <Center mt="1rem">
          <Link href="/api/login" passHref>
            <Button>ログイン</Button>
          </Link>
        </Center>
      </Box>
    </Center>
  )
}

export default Home
