import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { addTask, deleteTask, getProjectById, updateTask } from '../services/project'
import Modal from '../components/Modal'
import DeleteModal from '../components/DeleteModal'
import { toast } from 'react-toastify'

const ProjectDetail = () => {
    const { id } = useParams()
    const { data: project, isPending, isError, error } = useQuery({
        queryKey: ['project', id],
        queryFn: () => getProjectById(id)
    })
    const [isOpen, setIsOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [mode, setMode] = useState('add')
    const [selectedTask, setSelectedTask] = useState(null)

    const handleUpdate = (task) => {
        setSelectedTask(task)
        setMode('update')
        setIsOpen(true)
    }
    const handleAdd = () => {
        setSelectedTask(null)
        setMode('add')
        setIsOpen(true)
    }

    const handleDelete = (task) => {
        setSelectedTask(task)
        setIsDeleteModalOpen(true)
    }

    const queryClient = useQueryClient()
    const addMutation = useMutation({
        mutationFn: (data) => addTask(id, data),
        onSuccess: () => {
            toast.success("Task added successfully")
            queryClient.invalidateQueries(['project', id])
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const updateMutation = useMutation({
        mutationFn: (data) => updateTask(id, selectedTask._id, data),
        onSuccess: () => {
            toast.success("Task updated successfully")
            queryClient.invalidateQueries(['project', id])
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const deleteMutation = useMutation({
        mutationFn: () => deleteTask(id, selectedTask._id),
        onSuccess: () => {
            toast.success("Task deleted successfully")
            queryClient.invalidateQueries(['project', id])
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const completedTasks = project?.tasks.filter(t => t.status === 'completed').length
    const totalTasks = project?.tasks.length

    const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

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
        <div className="bg-gray-700 min-h-screen w-full flex items-center justify-center text-white">
            <div className="w-full md:max-w-5xl max-w-md border border-gray-400 shadow-2xl rounded-lg overflow-hidden">
                <div className="bg-gray-500 rounded-lg p-8 mb-4">
                    <h1 className="text-4xl text-center font-bold text-gray-300 mb-4 ">{project.title}</h1>
                    <div className="flex items-center justify-between flex-row-reverse">
                        <p className="italic">
                            Created On: {new Date(project.createdAt).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </p>
                        <p className="italic">Created By: {project.userId?.username}</p>
                    </div>
                    <p className="opacity-80 text-sm mb-4">Progress: {progress}%</p>
                </div>
                <div className="px-5">
                    <h1 className="text-center text-2xl border-b pb-2 text-gray-300 font-bold">Project Tasks</h1>
                    <div className="mt-5">
                        {
                            project?.tasks.length === 0 ? (
                                <div className="text-center">
                                    <p className="text-xl text-gray-400">You have not created any task yet.</p>
                                </div>
                            ) : (
                                <div className="space-y-4 flex flex-col gap-3">
                                    {
                                        project.tasks.map((task) => (
                                            <div key={task._id} className="relative bg-gray-600 p-4 border rounded-lg border-gray-300 m-2">
                                                <h1 className="font-semibold">{task.title}</h1>
                                                <p className="opacity-80 text-sm mb-4">{task.description}</p>
                                                <div>
                                                    {
                                                        task.status === 'pending' && (<p className="text-orange-400 ring inline px-1 py-0.5 rounded-2xl">Pending</p>)
                                                    }
                                                    {
                                                        task.status === 'in progress' && (<p className="text-purple-400 ring inline px-1 py-0.5 rounded-2xl">In Progress</p>)
                                                    }
                                                    {
                                                        task.status === 'completed' && (<p className="text-green-400 ring inline px-1 py-0.5 rounded-2xl">Completed</p>)
                                                    }
                                                    {task.completedAt && (
                                                        <span className="block text-xs mt-3">{new Date(task.completedAt).toLocaleDateString(
                                                            'en-GB', {
                                                            day: '2-digit',
                                                            month: 'long',
                                                            year: 'numeric'
                                                        }
                                                        )}</span>
                                                    )}
                                                </div>
                                                <div className="absolute top-2 right-2 inline-flex flex-col gap-6">
                                                    <button onClick={() => handleUpdate(task)} className="bg-blue-400 px-2 rounded-2xl py-1 cursor-pointer">Update</button>
                                                    <button onClick={() => handleDelete(task)} className="bg-red-400 px-2 rounded-2xl py-1 cursor-pointer">Delete</button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="flex items-center justify-between px-8 mt-5 mb-6">
                    <button onClick={handleAdd} className="bg-green-400 px-2 rounded-2xl py-1 cursor-pointer">Add Task</button>
                </div>
                <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    onSubmit={(formData) => {
                        mode === 'add' ? addMutation.mutate(formData) : updateMutation.mutate(formData)
                        setIsOpen(false)
                    }}
                    mode={mode}
                    initialData={selectedTask}
                />
                <DeleteModal 
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={(isAgree) => {
                    if (isAgree) {
                        deleteMutation.mutate()
                    }
                    setIsDeleteModalOpen(false)
                }}
                />
            </div>
        </div>
    )
}

export default ProjectDetail