import React, { useEffect, useState } from 'react'

const Modal = ({ isOpen, onClose, onSubmit, mode, initialData = {} }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'pending'
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({...formData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
        setFormData({
            title: '',
            description: '',
            status: 'pending'
        })
    }
    useEffect(() => {
        if (mode === 'update' && initialData) {
            setFormData({
                title: initialData.title,
                description: initialData.description,
                status: initialData.status
            })
        } else {
            setFormData({
                title: '',
                description: '',
                status: 'pending'
            })
        }
    }, [initialData, mode])

    if (!isOpen) return null
    return (
        <div className="fixed inset-0 bg-black opacity-90 flex items-center justify-center z-50">
            <div className="w-full md:max-w-4xl max-w-md shadow-2x border border-gray-400 p-5 rounded-lg">
                <h1 className="text-2xl text-center font-semibold text-gray-400">{mode === 'add' ? 'Add Task' : 'Update Task'}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-300 focus:ring-2 focus:outline-none focus:ring-green-200 focus:border-transparent"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block">Description</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-300 focus:ring-2 focus:outline-none focus:ring-green-200 focus:border-transparent"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="status" className="block">Status</label>
                        <select
                            id="status"
                            name="status"
                            className="bg-gray-500 rounded-2xl p-2"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="pending">Pending</option>
                            <option value="in progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between px-2">
                        <button className="bg-red-400 p-2 rounded-2xl" onClick={onClose}>Cancel</button>
                        <button className="bg-green-400 p-2 rounded-2xl">{mode === 'add' ? 'Add' : 'Update'}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Modal