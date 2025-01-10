'use client';
import { useState } from 'react';
import { FaDatabase, FaTimes } from 'react-icons/fa'

interface Supplier {
    name: string
    contact: string
    address: string
    phone: string
    country: string
}

export default function SupplierForm() {
    const [supplier, setSupplier] = useState<Supplier>({
        name: '',
        contact: '',
        address: '',
        phone: '',
        country: '',
      })
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')

        try {
          const response = await fetch('/api/suppliers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(supplier),
          })

          if (response.ok) {
            setMessage('Supplier created successfully!')
            setSupplier({
              name: '',
              contact: '',
              address: '',
              phone: '',
              country: '',
            })
          } else {
            setMessage('Error creating supplier.')
          }
        } catch (error) {
          setMessage('Something went wrong.')
        } finally {
          setLoading(false)
        }
    }
}
