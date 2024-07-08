import { Router } from "express";
import { addnewTodo } from "../controllers/todo.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/addtodo").post(verifyJWT,addnewTodo)

export default router