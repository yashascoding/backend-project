import {User} from "../models/user.model.js";
import { ApiResponse } from "../utils/apiresponse.js";
import {ApiError} from "../utils/api-error.js";
import {asyncHandler} from "../utils/async-handler.js";
import { emailVerificationMailgenContent, SendMail } from "../utils/mail.js";

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

const Registeruser=asyncHandler(async(req,res)=>{
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
            mailgenContent:emailVerificationMailgenContent(
                user.username,
                `${req.protocol}://${req.get("host")}/api/v1/user/verify-email/${UnhashedToken}`,
            ),
        }
    );

await User.findById(user._id).select("-password-refresh-emailVerificationToken-emailVerificationExpiry",)

if(!createdUser)
{
    throw  new ApiError(500,"Something went wrong while registering the user ")
}
        return res.status(201),json(
            new ApiResponse(200,{user:createdUser} ,
            "User registered succesfully and verification ")
        )
})

export {Registeruser};