import express from 'express'
import { addTask, createProject, deleteTask, getProjectById, getProjects, updateTask } from '../controllers/project.controller.js'
import {authMiddleware} from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/', authMiddleware, createProject)
router.get("/", authMiddleware, getProjects)
router.get("/:id", authMiddleware, getProjectById)
router.post("/:id/add", authMiddleware, addTask)
router.put("/:projectId/tasks/:taskId", authMiddleware, updateTask)
router.delete("/:projectId/tasks/:taskId", authMiddleware, deleteTask)

export default router