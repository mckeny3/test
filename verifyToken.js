import { createError } from "./error.js";
import jwt from 'jsonwebtoken'




export const verifyToken = (req,res,next)=>{

const token = req.cookies.ACCESS_TOKEN

if(!token)
{
    return next(createError(401,"not authenticate"));
}

jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{

    if(err) return next(createError(403,"token not valid"));


    req.user=user;
    next();
})

}