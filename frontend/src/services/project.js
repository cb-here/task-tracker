import axios from 'axios'

const backendURL = import.meta.env.VITE_API_BASE_URL

const api = axios.create({
    baseURL: `${backendURL}/api/project/`
})

export const createProject = async (projectData) => {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("Token not found")
    try {
        const response = await api.post("/", projectData, {
            headers: {Authorization: `Bearer ${token}`}
        })
        return response.data
    } catch(error) {
        throw new Error(error.response.data?.message || 'Failed to create project')
    }
}

export const getProjects = async () => {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("Token not found")
    try {
        const response = await api.get('/', {
            headers: {Authorization: `Bearer ${token}`}
        }) 
        return response.data
    } catch(error) {
        throw new Error(error.response.data?.message || 'Failed to get your projects')
    }
}

export const getProjectById = async (id) => {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("Token not found")
    try {
        const response = await api.get(`/${id}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        return response.data
    } catch(error) {
        throw new Error(error.response.data?.message || 'Failed to get your project')
    }
}

export const addTask = async (id, taskData) => {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("Token not found")
    try {
        const response = await api.post(`/${id}/add`, taskData, {
            headers: {Authorization: `Bearer ${token}`}
        })
        return response.data
    } catch(error) {
        throw new Error(error.response.data?.message || 'Failed to get add new task')
    }
}

export const updateTask = async (projectId, taskId, taskData) => {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("Token not found")
    try {
        const response = await api.put(`/${projectId}/tasks/${taskId}`, taskData, {
            headers: {Authorization: `Bearer ${token}`}
        })
        return response.data
    } catch(error) {
        throw new Error(error.response.data?.message || 'Failed to get update task')
    }
}

export const deleteTask = async (projectId, taskId) => {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("Token not found")
    try {
        const response = await api.delete(`/${projectId}/tasks/${taskId}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        return response.data
    } catch(error) {
        throw new Error(error.response.data?.message || 'Failed to get update task')
    }
}