import express from 'express'
import cors from 'cors'
import authRoutes from './routers/user.router.js'
import { connectDB } from './config/db.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/auth", authRoutes)

const PORT = 5000

app.listen(PORT, () => {
    connectDB()
    console.log("Server is running the the port: " + PORT)
})