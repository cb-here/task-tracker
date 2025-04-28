import express from 'express'
import { addTask, createProject, getProjectById, getProjects } from '../controllers/project.controller.js'
import {authMiddleware} from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/', authMiddleware, createProject)
router.get("/", authMiddleware, getProjects)
router.get("/:id", authMiddleware, getProjectById)
router.post("/:id/add", authMiddleware, addTask)

export default router