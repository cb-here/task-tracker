import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:5000/api/auth/"
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