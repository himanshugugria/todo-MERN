import express from "express";
const app = express();
import cors from 'cors'
import cookieParser from 'cookie-parser'

const corsOptions = {
    origin: 'http://localhost:5173', // Ensure there is no trailing slash
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Authorization, X-Requested-With, Content-Type, Accept'
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true,limit:"16kb"}))



import userRouter from './routes/user.route.js'
import todoRouter from './routes/todo.route.js'

app.use("/api/v1/users",userRouter)

app.use("/api/v1/todos",todoRouter)


export default app;