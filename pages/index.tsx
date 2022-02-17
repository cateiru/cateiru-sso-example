import type { NextPage } from 'next'
import { Button, Center } from '@chakra-ui/react'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <Center>
      <Link href="/api/login" passHref>
        <Button>ログイン</Button>
      </Link>
    </Center>
  )
}

export default Home
