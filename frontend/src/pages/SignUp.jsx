import React, { useState } from 'react'
import {useMutation} from '@tanstack/react-query'
import {toast} from 'react-toastify'
import { NavLink, useNavigate } from 'react-router-dom'
import { registerUser } from '../services/auth'

const SignUp = () => {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        country: ''
    })

    const mutation = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            toast.success("SignUp successfully")
            navigate("/signin")
        },
        onError: (error) => {
            setError(error.message)
            toast.error("SignUp failed!")
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        mutation.mutate(formData)
        setFormData({
            username: '',
            password: '',
            email: '',
            country: ''
        })
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }
    return (
        <div className="bg-gray-700 flex items-center justify-center h-screen">
            <div className="w-full border p-5 max-w-md rounded-lg shadow-xl border-gray-500">
                <h1 className="text-2xl text-center font-semibold text-gray-900">Sign Up</h1>
                <p className="text-center mt-2 text-red-400 text-sm italic">{error}</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block">Username </label>
                        <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        value={formData.username} 
                        onChange={handleChange} 
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-300 focus:ring-2 focus:outline-none focus:ring-green-200 focus:border-transparent"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block">Email </label>
                        <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-300 focus:ring-2 focus:outline-none focus:ring-green-200 focus:border-transparent"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="country" className="block">Country </label>
                        <input 
                        type="text" 
                        id="country" 
                        name="country"
                        value={formData.country} 
                        onChange={handleChange} 
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-300 focus:ring-2 focus:outline-none focus:ring-green-200 focus:border-transparent"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="username" className="block">Password: </label>
                        <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-300 focus:ring-2 focus:outline-none focus:ring-green-200 focus:border-transparent"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="reset" className="bg-red-400 p-2 rounded-lg">Reset</button>
                        <button type="submit" className="bg-green-400 p-2 rounded-lg">Sign Up</button>
                    </div>
                    <div className="text-white flex gap-3">
                        <p>I have an account.</p>
                        <NavLink to="/signin" className="text-blue-500 hover:underline">Sign In</NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp