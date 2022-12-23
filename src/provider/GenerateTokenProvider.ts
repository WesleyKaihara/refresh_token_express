import { sign } from 'jsonwebtoken'

class GenerateTokenProvider {
  async execute(userId: string){
    const token = sign({},"4c6f40da-a2ca-4333-8d53-e6a4042a5172",{
      subject: userId,
      expiresIn: "20s"
    })

    return token
  }
}


export { GenerateTokenProvider }