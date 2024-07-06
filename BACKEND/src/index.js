import  connectDB  from "./db/index.js";
import dotenv from "dotenv"              // as ye documentation me abhi tak mention nhi hui hai to we can run this using experimental feature in package.json
import app from "./app.js";
dotenv.config({path:'./env'})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 ,()=>{
        console.log(`app is running on PORT ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MongoDB connection failed",err)
})