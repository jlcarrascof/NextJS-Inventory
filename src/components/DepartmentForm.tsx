'use client'

import { useState, useEffect } from 'react'
import { FaDatabase, FaTimes, FaFileAlt, FaSearch } from 'react-icons/fa'
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
      const fetchDepartments = async () => {
        try {
          const response = await fetch('/api/departments')
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

      fetchDepartments()
    }, [])

    const filteredDepartments =
        query === ''
          ? departments
          : departments.filter((department) =>
          department.name.toLowerCase().includes(query.toLowerCase())
    )

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
            setSelectedDepartment(null)
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

        {/* Button to toggle search */}
        <div className="flex space-x-4">
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

        {/* Combobox for search */}
        {isSearchActive && (
          <div>
            <label htmlFor="search" className="block font-medium">
              Search Department:
            </label>
            <Combobox value={selectedDepartment} onChange={setSelectedDepartment}>
              <div className="relative">
                <Combobox.Input
                  className="w-full p-2 border rounded"
                  onChange={(e) => setQuery(e.target.value)}
                  displayValue={(department: Department) => department?.name || ''}
                  placeholder="Type to search..."
                />
                <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white border rounded shadow-lg">
                  {filteredDepartments.length === 0 ? (
                    <div className="p-2 text-gray-700">No results found</div>
                  ) : (
                    filteredDepartments.map((department) => (
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
            value={selectedDepartment ? selectedDepartment.name : name}
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
            className="flex items-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            disabled={loading}
          >
            <FaDatabase className="mr-2" />
            <span>{loading ? 'Creating ...' : 'Create'}</span>
          </button>
          <button
            onClick={handleCancel}
            className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            <FaTimes className="mr-2" />
            <span>Cancel</span>
          </button>
        </div>

        {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
      </form>
    )
}
