import { Router } from 'express'
import { userRegister } from '../controllers/user.controller.js';

const router= Router();

router.route("/register").post(userRegister)
router.route("/login")
router.route("/logout")

export default router