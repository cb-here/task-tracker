import express from 'express'
import { loginUser, registerUser, userProfile } from '../controllers/user.controller.js'
import {authMiddleware} from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/profile", authMiddleware, userProfile)
export default router