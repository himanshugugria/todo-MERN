import express from "express";
const app = express();
import cors from 'cors'
import cookieParser from 'cookie-parser'

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true,limit:"16kb"}))



import userRouter from './routes/user.route.js'

app.use("/api/v1/users",userRouter)


export default app;