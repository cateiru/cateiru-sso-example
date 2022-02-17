import type { NextPage } from 'next'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <>
      <Link href="/api/login" passHref>
        <Button>ログイン</Button>
      </Link>
    </>
  )
}

export default Home
