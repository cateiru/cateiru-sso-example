import jwt, {VerifyOptions } from 'jsonwebtoken'
import request from 'then-request'

const PUBLIC_KEY_ENDPOINT = "https://api.sso.cateiru.com/oauth/jwt/key"
const TOKEN_ENDPOINT = "https://api.sso.cateiru.com/oauth/token"

export class JWT {
  private code: string
  private option: VerifyOptions

  constructor(code: string) {
    this.code = code

    this.option = {
      algorithms: ["RS256"]
    };
  }

  public async parse() {
    const token = await this.getJWT()

    const key = await this.getPublicKey();
    let decoded: string | jwt.Jwt | jwt.JwtPayload | undefined;

    jwt.verify(token, key, this.option, (err, decoded) => {
      if (err) {
        console.log(err.message)
      }else {
        decoded = decoded;
        console.log(decoded)
      }

    })

    console.log(decoded)
  }

  private async getJWT(): Promise<string> {
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

  private async getPublicKey(): Promise<string> {
    const res = await request("GET", PUBLIC_KEY_ENDPOINT)

    if(res.statusCode !== 200) {
      throw new Error("failed connected")
    }

    const key = JSON.parse(res.getBody("utf-8"))

    return key["pkcs8"] || ""
  }
}
