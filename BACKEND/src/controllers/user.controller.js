// in this i will write features for user register login and logout

import { User } from '../models/user.model.js'
import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import { stringify } from 'flatted';  // Import flatted


const userRegister = asyncHandler(async(req,res)=>{
    // res.status(200).json({
    //     message:"okk",
    // })

    // steps for user registration
    // take input from req.body (username , fullName, email , password)
    // check if user already exist
    // create user object and send the response

    const {fullName,username,email,password} = req.body

    console.log(fullName,username,email,password);

    const checkifuserexist =await User.findOne({
        $or:[{username},{email}]
    })
    if(checkifuserexist){
        throw new ApiError(400,"user already exist!")
    }

    const user =await User.create({
        username,
        fullName,
        email,
        password,
    })

    const createdUser = User.findById(user._id).select(
        "-password"
    )
    if(!createdUser){
        throw new ApiError(500,"user not created!!")
    }

    const safeUser = JSON.parse(stringify(createdUser))

    return res.status(200).json(
         new ApiResponse(200,safeUser,"user created successfully")
    )
})

export {userRegister}