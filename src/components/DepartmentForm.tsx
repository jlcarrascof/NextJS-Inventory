'use client'

import { useState, useEffect } from 'react'
import { FaDatabase, FaTimes, FaFileAlt, FaSearch, FaTrash } from 'react-icons/fa'
import { Combobox } from '@headlessui/react'

interface Department {
  id: number
  name: string
}

export default function DepartmentForm() {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [departments, setDepartments] = useState<Department[]>([])
    const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
    const [query, setQuery] = useState('')
    const [isSearchActive, setIsSearchActive] = useState(false)


    useEffect(() => {
      fetchDepartments(query)
    }, [query])


    const fetchDepartments = async (search: string) => {
      try {
        const url = search ? `/api/departments?search=${search}` : '/api/departments'
        const response = await fetch(url)
        if (response.ok) {
          const data = await response.json()
          setDepartments(data.departments)
        } else {
          console.error('Failed to fetch departments')
        }
      } catch (error) {
        console.error('Error fetching departments:', error)
      }
    }

    const refreshDepartments = async () => {
      try {
        const response = await fetch('/api/departments')
        if (response.ok) {
          const data = await response.json()
          setDepartments(data.departments)
        } else {
          console.error('Failed to refresh departments')
        }
      } catch (error) {
        console.error('Error refreshing departments:', error)
      }
    }

    const handleDelete = async () => {

      if (!selectedDepartment) return

      const confirmDelete = window.confirm(
          `Are you sure you want to delete the department: ${selectedDepartment.name}?`
      )

      if (!confirmDelete) return

      setLoading(true)
      setMessage('')

      try {

        const response = await fetch(`/api/departments/${selectedDepartment.id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        })

        if (response.ok) {
          setMessage('Department deleted successfully!')
          setSelectedDepartment(null)
          setName('')
          await refreshDepartments()
        } else {
          setMessage('Error deleting department.')
        }

      } catch (error) {
        setMessage('Something went wrong.')
      } finally {
        setLoading(false)
      }

    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')

        try {

          const url = '/api/departments'
          const method = selectedDepartment ? 'PATCH' : 'POST'

          const body = selectedDepartment
            ? { id: selectedDepartment.id, name }
            : { name }

          const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          })

          if (response.ok) {
            setMessage(
              selectedDepartment
                ? 'Department updated successfully!'
                : 'Department created successfully!'
            )
            setName('')
            setSelectedDepartment(null)
            await refreshDepartments()
          } else {
            setMessage('Error processing request.')
          }

        } catch (error) {
          setMessage('Something went wrong.')
        } finally {
          setLoading(false)
        }
    }

    const handleCancel = () => {
        setName('')
        setSelectedDepartment(null)
    }

    const toggleSearch = () => {
      setIsSearchActive(!isSearchActive)
      setSelectedDepartment(null)
      setQuery('')
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold">Manage Departments</h2>

        {/* Combobox for search */}
        {isSearchActive && (
          <div>
            <label htmlFor="search" className="block font-medium">
              Search Department:
            </label>
            <Combobox value={selectedDepartment} onChange={(department) => {
              setSelectedDepartment(department)
              setName(department?.name || '') // Pre-fill the name field
            }}>
              <div className="relative">
                <Combobox.Input
                  className="w-full p-2 border rounded"
                  onChange={(e) => setQuery(e.target.value)}
                  displayValue={(department: Department) => department?.name || ''}
                  placeholder="Type to search..."
                />
                <Combobox.Options className="absolute z-10 mt-1 max-h-60  w-full overflow-auto bg-white border rounded shadow-lg">
                  {departments.length === 0 ? (
                    <div className="p-2 text-gray-700">No results found</div>
                  ) : (
                    departments.map((department: Department) => (
                      <Combobox.Option
                        key={department.id}
                        value={department}
                        className="cursor-pointer select-none p-2 hover:bg-gray-200"
                      >
                        {department.name}
                      </Combobox.Option>
                    ))
                    )}
                  </Combobox.Options>
              </div>
            </Combobox>
          </div>
        )}

        {/* Department Name */}
        <div>
          <label htmlFor="name" className="block font-medium">
            Department Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter department name"
            required
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
        <button
          type="submit"
          className={`flex items-center ${
          selectedDepartment
          ? 'bg-yellow-500 hover:bg-yellow-600'
          : 'bg-green-600 hover:bg-green-700'
          } text-white px-4 py-2 rounded`}
          disabled={loading}
          >
            <FaDatabase className="mr-2" />
            <span>
              {loading
                ? selectedDepartment
                ? 'Updating ...'
                : 'Creating ...'
                : selectedDepartment
                ? 'Update'
                : 'Create'}
            </span>
          </button>
          <button
            onClick={handleCancel}
            className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            <FaTimes className="mr-2" />
            <span>Cancel</span>
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className={`flex items-center bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 ${
                !selectedDepartment ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={!selectedDepartment || loading}
          >
            <FaTrash className="mr-2" />
            <span>{loading ? 'Deleting...' : 'Delete'}</span>
          </button>
          <button
            type="button"
            onClick={toggleSearch}
            className="flex items-center bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            <FaSearch className="mr-2" />
            <span>{isSearchActive ? 'Close Search' : 'Find'}</span>
          </button>
          <button
            onClick={() => window.location.href = '/dashboard/departments/list'}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <FaFileAlt className="mr-2" />
            <span>View List</span>
          </button>
        </div>

        {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
      </form>
    )
}
