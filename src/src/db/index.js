import mongoose from "mongoose";

const ConnnectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo DB connected");
    }
    catch(error){
        console.error("Mongo DB not connected ",error)
        process.exit(1);

    }
}

export default ConnnectDB;