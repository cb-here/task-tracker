import express from 'express'
import cors from 'cors'
import authRoutes from './routers/user.router.js'
import projectRoutes from './routers/project.router.js'
import { connectDB } from './config/db.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/auth", authRoutes)
app.use('/api/project', projectRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    connectDB()
    console.log("Server is running the the port: " + PORT)
})