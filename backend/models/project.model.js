import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', , 'in progress', 'completed'],
        default: 'pending'
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
    completedAt: {
        type: Date
    }
})

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tasks: [taskSchema],
}, {timestamps: true})

export default mongoose.model("Project", projectSchema)