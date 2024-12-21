'use client'

import { useState, useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa'

interface Department {
    id: number
    name: string
}

export default function DepartmentList() {

    const [departments, setDepartments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDepartments = async () => {
          try {
            const response = await fetch('/api/departments')
            if (response.ok) {
              const data = await response.json()
              setDepartments(data)
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
    }, [])

    if (loading) {
        return <p>Loading...</p>
    }

    if (departments.length === 0) {
        return <p>No departments found.</p>
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
          <button
            onClick={() => window.location.href = '/dashboard/departments'}
            className="mt-4 flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <FaArrowLeft className="mr-2" /> <span>Back to Form</span>
          </button>
        </div>
    )

}
