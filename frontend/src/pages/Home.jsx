import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getProjects } from '../services/project'
import { NavLink } from 'react-router-dom'

const Home = () => {
    const { data: projects, isPending, isError, error } = useQuery({
        queryKey: ['projects'],
        queryFn: getProjects
    })

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
        <div className="bg-gray-700 h-screen w-full px-30 py-20">
            <div>
                {
                    projects.length === 0 ? (
                        <div className="text-center">
                            <p class="text-xl text-gray-400">You have not created any project yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {
                                projects?.map((project) => (
                                    <div className="border border-green-200 rounded-lg p-6 hover:ring-2 hover:ring-green-300 transition duration-500">
                                        <NavLink to={`${project._id}`}>{project?.title}</NavLink>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Home