'use client'

import { useState, useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa'

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

}
