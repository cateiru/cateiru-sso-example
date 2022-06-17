import jwt, {VerifyOptions } from 'jsonwebtoken'
import request from 'then-request'
import { OAuth } from './oauth'

const PUBLIC_KEY_ENDPOINT = "https://api.sso.cateiru.com/v1/oauth/jwt/key"

export class JWT {
  private oauth: OAuth
  private option: VerifyOptions

  constructor(oauth: OAuth) {
    this.oauth = oauth;

    this.option = {
      algorithms: ["RS256"]
    };
  }

  public async parse(): Promise<jwt.JwtPayload> {
    const token = await this.oauth.getJWT()

    const key = await this.getPublicKey();
    let j: jwt.JwtPayload = {};

    jwt.verify(token, key, this.option, (err, decoded) => {
      if (err) {
        throw new Error(err.message)
      }else {
        j = decoded as jwt.JwtPayload;
      }

    })

    return j;
  }

  // JWTの検証に使うpublic keyを取得する
  // 注意: public keyはCateiruSSOのデプロイごとに変わるので長い間キャッシュ無いほうが良い
  private async getPublicKey(): Promise<string> {
    const res = await request("GET", PUBLIC_KEY_ENDPOINT)

    if(res.statusCode !== 200) {
      throw new Error("failed connected")
    }

    const key = JSON.parse(res.getBody("utf-8"))

    return key["pkcs8"] || ""
  }
}
