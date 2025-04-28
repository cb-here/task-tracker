import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/task-tracker-db")
        console.log("Connection established")
    } catch(error){
        console.log("Connection Error: " + error.message)
    }
}