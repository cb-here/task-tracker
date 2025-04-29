import React from 'react'
import {useQuery} from '@tanstack/react-query'
import { userProfile } from '../services/auth'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const {data:user, isPending, isError, error} = useQuery({
        queryKey: ['profile'],
        queryFn: userProfile
    })
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/signin")
    }

    if (isPending) {
        return (
            <div className="bg-gray-700 h-screen w-full px-10 flex justify-center items-center">
                <h1 className="text-center text-2xl text-green-300">Loading...</h1>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="bg-gray-700 h-screen w-full px-10 flex justify-center items-center">
                <h1 className="text-center text-2xl text-red-300">{error.message}</h1>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center h-screen w-full bg-gray-700">
            <div className="w-full border border-gray-400 p-6 max-w-2xl">
                <h1 className="text-3xl text-gray-400">Hello, {user.username}</h1>
                <p className="opacity-60 italic mt-2 text-white">How are you doing today? </p>
                <div className="flex flex-col gap-2 text-gray-300">
                    <div className="flex items-center gap-3">
                        <p className="font-semibold">Email: </p>
                        <p className="font-mono">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <p className="font-semibold">Country: </p>
                        <p className="font-mono text-green-100">{user.country}</p>
                    </div>
                </div>
                <button onClick={handleLogout} className="bg-red-400 rounded-2xl text-white p-2">Logout</button>
            </div>
        </div>
    )
}

export default Profile