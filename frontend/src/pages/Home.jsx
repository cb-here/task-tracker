import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createProject, getProjects } from '../services/project'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'

const Home = () => {
    const { data: projects, isPending, isError, error } = useQuery({
        queryKey: ['projects'],
        queryFn: getProjects
    })

    const [formData, setFormData] = useState({
        title: ''
    })
    const queryClient = useQueryClient()
    const createMutation = useMutation({
        mutationFn: createProject,
        onSuccess: () => {
            toast.success("Project created successfully")
            queryClient.invalidateQueries(['projects'])
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createMutation.mutate(formData)
        setFormData({
            title: ''
        })
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
        <div className="bg-gray-700 h-screen w-full px-30 py-20 text-gray-400">
            <div className="w-full">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 flex flex-col items-start gap-4">
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter the project title"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-300 focus:ring-2 focus:outline-none focus:ring-green-200 focus:border-transparent"
                        />
                        <button type="submit" className="bg-green-400 p-2 rounded-2xl text-white">Create</button>
                    </div>
                </form>
            </div>
            <div>
                {
                    projects.length === 0 ? (
                        <div className="text-center">
                            <p className="text-xl text-gray-400">You have not created any project yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {
                                projects?.map((project) => (
                                    <div key={project._id} className="border border-green-200 rounded-lg p-8 hover:ring-2 hover:ring-green-300 transition duration-500">
                                        <div className="flex items-center justify-between mb-6">
                                            <NavLink to={`${project._id}`} className="text-xl font-semibold text-white">{project?.title}</NavLink>
                                            <span className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded-full">
                                                {project.tasks?.length || 0} tasks
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span>Created: {new Date(project.createdAt).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric'
                                            })}</span>
                                            <NavLink to={`${project._id}`} className="text-blue-400 hover:underline">View Project</NavLink>
                                        </div>
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