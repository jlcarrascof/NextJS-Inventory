'use client'

import { useState, useEffect } from 'react'
import { FaDatabase, FaTimes, FaFileAlt, FaSearch } from 'react-icons/fa'
import { Combobox } from '@headlessui/react'


export default function DepartmentForm() {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [departments, setDepartments] = useState<Department[]>([])
    const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
    const [query, setQuery] = useState('')


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')

        try {
          const response = await fetch('/api/departments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name }),
          })

          if (response.ok) {
            setMessage('Department created successfully!')
            setName('')
          } else {
            setMessage('Error creating department.')
          }
        } catch (error) {
          setMessage('Something went wrong.')
        } finally {
          setLoading(false)
        }
    }

    const handleCancel = () => {
        setName('')
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold">Create Department</h2>
          <div>
            <label htmlFor='name' className='block font-medium'>
              Department Name:
            </label>
            <input
              type='text'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full p-2 border rounded'
              required
            />
          </div>
          <div className='flex space-x-4'>
            <button
              type='submit'
              className='flex items-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
              disabled={loading}
            >
              <FaDatabase className='mr-2' />
              <span>{loading ? 'Creating ...' : 'Create'}</span>
            </button>
            <button
              onClick={handleCancel}
              className='flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
            >
              <FaTimes className='mr-2' /><span>Cancel</span>
            </button>
            <button
              onClick={() => window.location.href = '/dashboard/departments/list'}
              className='flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
            >
              <FaFileAlt className='mr-2'/> <span>View List</span>
            </button>
          </div>
          {message && <p className='mt-4 text-sm text-gray-700'>{message}</p>}
        </form>
    )
}
