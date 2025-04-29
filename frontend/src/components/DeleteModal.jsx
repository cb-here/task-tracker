import React from 'react'

const DeleteModal = ({isOpen, onClose, onDelete}) => {
    if (!isOpen) return null
    return (
        <div className="fixed inset-0 bg-black opacity-90 flex items-center justify-center z-50">
            <div className="w-full max-w-md md:max-w-4xl shadow-2x border border-gray-400 p-5 rounded-lg">
            <h1 className="text-2xl text-center font-semibold text-red-400">Are you really want to delete?</h1>
            <div className="flex items-center justify-between px-2 mt-6">
                <button className="bg-red-400 p-2 rounded-2xl" onClick={onClose}>Cancel</button>
                <button className="bg-cyan-700 p-2 rounded-2xl" onClick={() => onDelete(true)}>Delete</button>
            </div>
            </div>
        </div>
    )
}

export default DeleteModal