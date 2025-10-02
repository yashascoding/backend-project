import dotenv from "dotenv";
import app from "./app.js";
import ConnnectDB from "./db/index.js";

dotenv.config({
    path:"./.env",
});


const port = process.env.PORT||3000;


ConnnectDB()
.then(()=>{
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
})
.catch((err)=>{
  console.log("MongoDB connection error ");

})


