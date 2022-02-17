import { GetServerSideProps } from "next"
import { JWT } from "../utils/jwt";

interface User {
  userName: string,
  firstName: string,
  lastName: string,
  avatar: string,
  mail: string,
}

const LoggedIn = () => {
  return <></>
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

  const jwt = new JWT(code)

  await jwt.parse()

  return {
    props: {
      isError: false
    }
  }
}

export default LoggedIn
