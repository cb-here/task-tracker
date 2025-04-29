import Project from '../models/project.model.js'


export const createProject = async (req, res) => {
    const userId = req.user.id
    const {title} = req.body
    try {
        const projects = await Project.find({userId})
        if (projects.length >= 4) {
            return res.status(400).json({message: "You have already created 4 projects."})
        }
        if (!title || !userId) {
            return res.status(400).json({message: "Missing required fields."})
        }
        const newProject = new Project({
            title,
            userId, 
        })
        await newProject.save()
        res.status(201).json(newProject)
    } catch(error) {
        console.log("Error: " + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const getProjects = async (req, res) => {
    const userId = req.user.id
    try {
        const projects = await Project.find({userId})
        res.status(200).json(projects)
    } catch(error) {
        console.log("Error: " + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const getProjectById = async (req, res) => {
    const userId = req.user.id
    const projectId = req.params.id
    try {
        const project = await Project.findOne({_id: projectId, userId}).populate("userId", "username")
        if (!project) {
            return res.status(404).json({message: "Project not found!"})
        }
        res.status(200).json(project)
    } catch(error) {
        console.log("Error: " + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const addTask = async (req, res) => {
    const userId = req.user.id
    const projectId = req.params.id
    const {title, description, status} = req.body
    try {
        if (!title || !userId || !description) {
            return res.status(400).json({message: "Missing required fields."})
        }
        const project = await Project.findOne({_id: projectId, userId})
        if (!project) {
            return res.status(404).json({message: "Project not found!"})
        }
        const newTask = {
            title,
            description,
            status
        }
        project.tasks.push(newTask)
        await project.save()
        res.status(201).json({message: "Task added successfully", project})
    } catch(error) {
        console.log("Error: " + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const updateTask = async (req, res) => {
    const {projectId, taskId} = req.params
    const {title, description, status} = req.body
    try {
        const project = await Project.findById(projectId)
        if (!project) return res.status(404).json({message: "Project not found"})
        
        const task = project.tasks.id(taskId)
        if (!task) return res.status(404).json({message: "Task not found"})
        
        if (title !== undefined) task.title = title
        if (description !== undefined) task.description = description
        if (status !== undefined) task.status = status
        if (status == 'completed'){
            task.completedAt = new Date()
        } else {
            task.completedAt = null
        }
        await project.save()
        res.status(200).json({message: 'Task Updated Successfully', task})
    } catch(error) {
        console.log("Error: " + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const deleteTask = async (req, res) => {
    const {projectId, taskId} = req.params
    try {
        const project = await Project.findById(projectId)
        if (!project) return res.status(404).json({message: "Project not found"})
        
        const task = project.tasks.id(taskId)
        if (!task) return res.status(404).json({message: "Task not found"})

        task.deleteOne()
        await project.save()
        res.status(200).json({message: "Task deleted successfully!"})
    } catch(error) {
        console.log("Error: " + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}