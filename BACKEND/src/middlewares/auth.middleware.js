import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"


export const verifyJWT = asyncHandler(async(req,res,next)=>{
    try {
        const token =req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","")
        // const token = req.headers.authorization?.split(' ')[1];
    
        // console.log(token);
        if(!token){
            throw new ApiError(401,"unauthorized request")
        }
    
        const decodedToken =jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

    
        const user =await User.findById(decodedToken._id).select("-password -refreshToken")
        if(!user){
            throw new ApiError(401,"Invalid Access Token")
        }
        // console.log(user);
        req.user=user;
        // console.log(user._id);
        next();
    } catch (error) {
        throw new ApiError(401,error?.message || "invalid access token")
    }
})