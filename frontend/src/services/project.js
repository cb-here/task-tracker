import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api/project'
})

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