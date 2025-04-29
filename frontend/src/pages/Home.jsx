import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
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
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formData.title.trim()) {
            toast.error("Project title cannot be empty")
            return
        }
        createMutation.mutate(formData)
        setFormData({
            title: ''
        })
    }

    if (isPending) {
        return (
            <div className="bg-gray-700 min-h-screen w-full flex justify-center items-center px-4">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <h1 className="text-2xl font-medium text-green-400">Loading your projects...</h1>
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="bg-gray-700 min-h-screen w-full flex justify-center items-center px-4">
                <div className="bg-gray-700/80 backdrop-blur-sm p-6 rounded-xl max-w-md w-full border border-gray-600 shadow-lg">
                    <h1 className="text-xl sm:text-2xl font-semibold text-red-300 text-center mb-3">{error.message}</h1>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gray-700 min-h-screen w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Your Projects</h1>
                <form onSubmit={handleSubmit} className="m-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter project title"
                            className="flex-grow border border-gray-400 text-white rounded-lg px-4 py-2 focus:ring-2 focus:outline-none focus:ring-green-400 focus:border-transparent"
                        />
                        <div>
                            <button
                                type="submit"
                                className="bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 flex-1 justify-center"
                                disabled={createMutation.isPending}
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            {projects.length === 0 ? (
                <div className="bg-gray-700 border border-gray-600 rounded-xl p-8 sm:p-12 text-center">
                    <h2 className="text-xl sm:text-2xl font-medium text-gray-300 mb-2">No Projects Found</h2>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {projects.map((project) => (
                        <div
                            key={project._id}
                            className="group bg-gray-700/50 hover:bg-gray-700/70 border border-gray-600 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:border-green-400 hover:translate-y-[-4px]"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <NavLink
                                    to={`${project._id}`}
                                    className="text-lg sm:text-xl font-semibold text-white group-hover:text-green-300 transition-colors duration-200 line-clamp-1"
                                >
                                    {project?.title}
                                </NavLink>
                                <span className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded-full">
                                    {project.tasks?.length || 0} tasks
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-xs sm:text-sm">
                                <span className="text-gray-400">
                                    Created: {new Date(project.createdAt).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </span>
                                <NavLink
                                    to={`${project._id}`}
                                    className="text-blue-400 hover:underline flex items-center gap-1"
                                >
                                    View Project
                                </NavLink>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Home