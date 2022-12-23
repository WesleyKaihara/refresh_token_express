import { client } from '../../prisma/client'
import { GenerateTokenProvider } from '../../provider/GenerateTokenProvider';
import dayjs from 'dayjs';

class RefreshTokenUserUseCase {
  async execute (refreshtoken : string){
    const refreshToken = await client.refreshToken.findFirst({
      where: {
        id: refreshtoken
      }
    })

    if(!refreshToken){
      throw new Error("Refresh Token invalid");
    }

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn));

    const generateTokenProvider =  new GenerateTokenProvider()
    const token = await generateTokenProvider.execute(refreshToken.userId)

    if(refreshToken){
      await client.refreshToken.deleteMany({
        where: {
          userId: refreshToken.userId
        }
      })
      const genereteRefreshTokenProvider = new GenerateTokenProvider()
      const newRefreshToken = await genereteRefreshTokenProvider.execute(refreshToken.userId)
      
      return { token, refreshToken: newRefreshToken}
    }

    return { token }
  } 
} 


export { RefreshTokenUserUseCase }