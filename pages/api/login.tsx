import { NextApiHandler } from "next"

const ENDPOINT = "https://sso.cateiru.com/sso/login"

const login: NextApiHandler = async (req, res) => {
  const url = `${ENDPOINT}?scope=openid&response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&prompt=consent`

  res.redirect(url)
}

export default login
