import { Router } from "express";
import { addnewTodo, deleteTodo, getallTodo, updateTodo } from "../controllers/todo.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/addtodo").post(verifyJWT,addnewTodo)
router.route("/updatetodo/:id").put(verifyJWT,updateTodo)
router.route("/deletetodo/:id").delete(verifyJWT,deleteTodo)
router.route("/getalltodo").get(verifyJWT,getallTodo)

export default router