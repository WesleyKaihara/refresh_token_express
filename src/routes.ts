import { Router } from 'express';
import { EnsureAuthenticated } from './middlewares/ensureAuthenticated';
import { AuthenticateUserController } from './useCases/authenticateUser/AuthenticateUserController';
import { CreateUserController } from './useCases/createUser/CreateUserController';
import { RefreshTokenUserController } from './useCases/RefreshTokenUser/RefreshTokenUserController';

const router = Router();

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()
const refreshTokenUserController = new RefreshTokenUserController()

router.post("/user",createUserController.handle)

router.post("/login",authenticateUserController.handle)

router.post("/refresh-token",refreshTokenUserController.handle)

router.get("/courses",EnsureAuthenticated, (request,response) => {
  return response.json([
    {id:1,name:"ReactJS"},
    {id:2,name:"NodeJS"},
    {id:3,name:"React Native"},
    {id:4,name:"Python"},
    {id:5,name:"SpringBoot"},
  ])
})


export { router }