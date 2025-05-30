import axios from 'axios'

const backendURL = import.meta.env.VITE_API_BASE_URL

const api = axios.create({
    baseURL: `${backendURL}/api/auth/`
})

export const registerUser = async (userData) => {
    try {
        const response = await api.post('/register', userData)
        return response.data
    } catch(error) {
        throw new Error(error.response.data?.message || 'Failed to sign up user!')
    }
}

export const loginUser = async (userData) => {
    try {
        const response = await api.post('/login', userData)
        const token = response.data.token
        localStorage.setItem("token", token)
        return response.data
    } catch(error) {
        throw new Error(error.response.data?.message || 'Failed to sign in user!')
    }
}

export const userProfile = async () => {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("Token not found")
    try {
        const response = await api.get("/profile", {
            headers : {Authorization: `Bearer ${token}`}
        })
        return response.data
    } catch(error) {
        throw new Error(error.response.data?.message || 'Failed to get your profile')
    }
}