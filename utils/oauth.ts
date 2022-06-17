import jwt, {VerifyOptions } from 'jsonwebtoken'
import request from 'then-request'

const TOKEN_ENDPOINT = "https://api.sso.cateiru.com/v1/oauth/token"

export class OAuth {
  private code: string

  constructor(code: string) {
    this.code = code;
  }

  // Token endpointを使用して帰ってきたcodeからID Tokenを取得する
  async getJWT(): Promise<string> {
    const res = await request("GET", `${TOKEN_ENDPOINT}?grant_type=authorization_code&code=${this.code}&redirect_uri=${process.env.REDIRECT_URI}`, {
      headers: {
        authorization: `Basic ${process.env.TOKEN_SECRET}`
      }
    })

    if(res.statusCode !== 200) {
      throw new Error("failed connected")
    }

    const key = JSON.parse(res.getBody("utf-8"))

    return key["id_token"] || ""
  }
}
