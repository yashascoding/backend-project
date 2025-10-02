import {ApiResponse} from "../utils/apiresponse.js"

const healthCheck=(req,res)=>{
    try{
        res.status(200)
        .json(new ApiResponse (200,{message:"Server is runnning"}));

    }
    catch(error)
    {
        next(err)
    }
}
export{healthCheck}