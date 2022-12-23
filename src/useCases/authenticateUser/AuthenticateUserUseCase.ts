import { client } from '../../prisma/client';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { GenerateRefreshToken } from '../../provider/GenerateRefreshToken';
import { GenerateTokenProvider } from '../../provider/GenerateTokenProvider';

interface IRequest {
  username: string;
  password: string;
}

class AuthenticateUserUseCase {
  async execute({username,password}:IRequest){  
    const userAlreadyExists = await client.user.findFirst({
      where: {
        username
      }
    })

    if(!userAlreadyExists){
      throw new Error("User or passoword incorrect!");
    }
    
    const passwordMath = await compare(password,userAlreadyExists.password)

    if(!passwordMath){
      throw new Error("User or passoword incorrect!");
    }

    const generateTokenProvider = new GenerateTokenProvider()
    const token = await generateTokenProvider.execute(userAlreadyExists.id)

    await client.refreshToken.deleteMany({
      where: {
        userId: userAlreadyExists.id
      }
    })

    const generataRefreshToken = new GenerateRefreshToken()
    const refreshToken = await generataRefreshToken.execute(userAlreadyExists.id)
    

    return { token,refreshToken }
  }
}

export { AuthenticateUserUseCase }