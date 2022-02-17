import { GetServerSideProps } from "next"
import { JWT } from "../utils/jwt";
import type { NextPage } from 'next'
import { OAuth } from "../utils/oauth";
import { Center, Avatar, Heading, Box } from '@chakra-ui/react'

interface User {
  userName: string,
  firstName: string,
  lastName: string,
  avatar: string,
  mail: string,
}

const LoggedIn: NextPage<{user?: User, isError: boolean}> = ({user, isError}) => {
  if(isError) {
    return (
      <Center>
        <Heading textAlign="center">エラーで取得できませんでした</Heading>
      </Center>
    );
  }

  return (
    <Center height="100vh">
      <Box>
        <Center mb="1rem">
          <Avatar src={user?.avatar} size="xl" />
        </Center>
        <Heading textAlign="center">{user?.lastName} {user?.firstName}</Heading>
        <Heading textAlign="center">{user?.userName}</Heading>
        <Heading textAlign="center" mt="1rem">{user?.mail}</Heading>
      </Box>
    </Center>
  );
}

export const getServerSideProps: GetServerSideProps<{user?: User, isError: boolean}> = async context => {
  const _code = context.query.code;
  let code: string;
  if (!_code) {
    return {
      props: {
        isError: true,
      }
    };
  }else if(typeof _code !== 'string') {
    code = _code.join("");
  }else {
    code = _code;
  }

  try {
    const oauth = new OAuth(code)

    const jwt = new JWT(oauth)

    const token = await jwt.parse()

    return {
      props: {
        isError: false,
        user: {
          userName: token["nick_name"],
          firstName: token["given_name"],
          lastName: token["family_name"],
          avatar: token["picture"],
          mail: token["email"],
        },
      }
    }
  }catch(error) {
    return {
      props: {
        isError: true,
      }
    }
  }
}

export default LoggedIn
