// in this i will write features for user register login and logout

import { User } from '../models/user.model.js'
import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import { stringify } from 'flatted';  // Import flatted


const generateAccessandRefreshtoken = async(userId)=>{
    const user =await User.findById(userId)

    const accessToken = user.createAccessToken()
    const refreshToken = user.createRefreshToken()
    user.refreshToken = refreshToken

    await user.save({validateBeforeSave: false})

    return {accessToken,refreshToken}
}

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
    const {accessToken,refreshToken}=await generateAccessandRefreshtoken(user._id);

    if(!createdUser){
        throw new ApiError(500,"user not created!!")
    }

    const safeUser = JSON.parse(stringify(createdUser))

    return res.status(200).json(
         new ApiResponse(200,{user:safeUser,accessToken},"user created successfully")
    )
})


const userlogin = asyncHandler(async(req,res)=>{
    const {username,email,password} = req.body

    const user =await User.findOne({
        $or:[{username},{email}]
    })
    if(!user){
        throw new ApiError(400,"user not exist")
    }
    // checking if password is correct
    const validPassword = await user.isPasswordCorrect(password);
    console.log(validPassword);
    if(!validPassword){
        throw new ApiError(401,"password is incorrect!!");
    }
    // access and refresh token
    const {accessToken,refreshToken}=await generateAccessandRefreshtoken(user._id);

    const loggedInUser = User.findById(user._id).select("-password -refreshToken")

    const safeUser = JSON.parse(stringify(loggedInUser));     // circular reference remove karne k liye


    const options={
        httpOnly: true,     // that means only server can modify it and frontend can't
        secure: true,
    }
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
         new ApiResponse(
            200,
            {
                user:safeUser,accessToken,refreshToken
            },
            "user logged-in successfully"
        )
    )
})

const userlogout =asyncHandler(async(req,res)=>{
    User.findByIdAndUpdate(
        req.body._id,
        {
            $set:{
                refreshToken: undefined
            }
        },
    )
    const options={
        httpOnly: true,
        secure: true,
    }

    return res.
    status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(
        new ApiResponse(200,{},"logged out successfully")
    )
})

export {userRegister,userlogin,userlogout}