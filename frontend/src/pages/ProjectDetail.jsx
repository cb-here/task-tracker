import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getProjectById } from '../services/project'

const ProjectDetail = () => {
    const { id } = useParams()
    const { data: project, isPending, isError, error } = useQuery({
        queryKey: ['project', id],
        queryFn: () => getProjectById(id)
    })
    console.log(project)
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
        <div className="bg-gray-700 h-screen w-full flex items-center justify-center text-white">
            <div className="w-full md:max-w-3xl max-w-md border border-gray-400 shadow-2xl p-8 rounded-lg">
                <h1 className="text-3xl text-center font-semibold text-gray-900">{project.title}</h1>
                <div className="flex items-center justify-between">
                    <p className="italic">Created On: {project.createdAt}</p>
                    <p className="italic">By {project.userId?.username}</p>
                </div>
                <div className="px-5">
                    <h1 className="text-center text-xl border-b pb-2 border-gray-300">Tasks</h1>

                </div>
            </div>
        </div>
    )
}

export default ProjectDetail