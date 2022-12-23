import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export function EnsureAuthenticated(request:Request,response:Response,next:NextFunction){
    const authToken = request.headers.authorization;

    if(!authToken){
      return response.status(401).json({
        message: "Token is missing"
      })
    }

    const [,token] = authToken.split(" ")

   try {
    verify(token,"4c6f40da-a2ca-4333-8d53-e6a4042a5172")
    return next()
   } catch (error) {
      return response.status(401).json({
        message: "Token invalid"
      })
   }  

}