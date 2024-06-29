import dotenv from "dotenv"
import connectDB from "./db/index.js";
import express from "express"
const app = express()

dotenv.config({
  path : './env'
})

connectDB()
.then(()=>{
  app.listen(process.env.PORT || 8000,()=>{
    console.log("Server listening on port " + process.env.PORT)
  })
})
.catch((error) =>{
  console.log("MongoDB Connection Failed : " ,error)
})










/* Another Approch
import express from "express";
const app = express();
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on('error', (error) =>{
      console.log("ERR : ",error)
    })
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`)
    })
  } catch (error) {
    console.error("ERROR : ", error);
    throw err
  }
})()
*/