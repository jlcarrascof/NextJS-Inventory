'use client'

import { useState, useEffect } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

interface Department {
    id: number
    name: string
}

export default function DepartmentList() {

    const [departments, setDepartments] = useState<Department[]>([]);    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const limit = 10

    useEffect(() => {
        const fetchDepartments = async () => {
          setLoading(true)
          try {
            const response = await fetch(`/api/departments?page=${page}&limit=${limit}`)
            if (response.ok) {
              const data = await response.json()
              setDepartments(data.departments)
              setTotalPages(Math.ceil(data.total / limit))
            } else {
              console.error('Failed to fetch departments')
            }
          } catch (error) {
            console.error('Error fetching departments:', error)
          } finally {
            setLoading(false)
          }
        }

        fetchDepartments()
    }, [page])

    if (loading) {
        return <p>Loading...</p>
    }

    if (departments.length === 0) {
        return <p>No departments found.</p>
    }

    const handleNext = () => {
      if (page < totalPages) setPage(page + 1)
    }

    const handlePrevious = () => {
      if (page > 1) setPage(page - 1)
    }

    return (
        <div>
          <h2 className="text-2xl font-bold mb-4">Departments List</h2>
          <ul className="space-y-2">
            {departments.map((department) => (
              <li key={department.id} className="p-2 border rounded bg-gray-100">
                {department.name}
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevious}
              disabled={page === 1}
              className="flex items-center bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              <FaArrowLeft className="mr-2" /> Previous
            </button>
            <span className="text-gray-700">
              Page {page} of {totalPages}
            </span>
          </div>
          <button
            onClick={() => window.location.href = '/dashboard/departments'}
            className="mt-4 flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <FaArrowLeft className="mr-2" /> <span>Back to Form</span>
          </button>
        </div>
    )

}
