import {User} from "../models/user.model.js";
import {Apiresponse} from "../utils/apiresponse.js";
import {ApiError} from "../utils/api-error.js";
import {asyncHandler} from "../utils/async-handler.js";
import {emailVerificationMailgenContent, SendMail} from "../utils/mail.js"

const generateAccessAndRefreshTokens=async(userId)=>{
    try{
        const user=await User.findById(userId)
        const accessToken=user.generateAccessToken();
        const refreshToken=user.generateRefreshToken();
        user.refreshToken=refreshToken
        await user.save({validateBeforeSave:false
        })
        return {accessToken,refreshToken}
    }
    catch(error){
        throw new ApiError(500,"Something went wrong while generating access token")

    }
}

const registerUser=asyncHandler(async(req,res)=>{
    const{email,username,password,role}=req.body;

   const existedUser =User.findOne({
        $or:[{Username},{email}]
    })

    if(existedUser)
    {
        throw new ApiError(409,"User already exists",[])
    }
    const user=await User.create({
        email,
        password,
        username,
        isEmailVerified:false
    })

    const {UnhashedToken,hashedToken,tokenExpiry}=
    user.generateTemporaryToken();

    user.emailVerificationToken=hashedToken
    user.emailVerificationExpiry=tokenExpiry

    await user.save({validateBeforeSave:false });

    await SendMail(
        {
            email:user?.email,
            subject:"please verify your email",
            mailgenContent:emailVerificationMailgenContent
        }
    );



})
