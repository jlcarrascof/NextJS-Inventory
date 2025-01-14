'use client';
import { useState } from 'react';
import { FaDatabase, FaTimes, FaFileAlt } from 'react-icons/fa'

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

    const handleCancel = () => {
        setSupplier({
          name: '',
          contact: '',
          address: '',
          phone: '',
          country: '',
        })
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow w-full max-w-2xl">
            <h2 className="text-2xl font-bold text-center bg-green-100 text-green-800 px-4 py-2 rounded-md shadow-sm">
              Manage Suppliers
            </h2>

            {/* Supplier Name */}
            <div>
              <label htmlFor="name" className="block font-medium">
                Supplier Name:
              </label>
              <input
                type="text"
                id="name"
                value={supplier.name}
                onChange={(e) => setSupplier({ ...supplier, name: e.target.value })}
                className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter supplier name"
                required
              />
            </div>

            {/* Contact Email */}
            <div>
              <label htmlFor="contact" className="block font-medium">
                Contact Email:
              </label>
              <input
                type="email"
                id="contact"
                value={supplier.contact}
                onChange={(e) => setSupplier({ ...supplier, contact: e.target.value })}
                className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter contact email"
              />
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block font-medium">
                Address:
              </label>
              <input
                type="text"
                id="address"
                value={supplier.address}
                onChange={(e) => setSupplier({ ...supplier, address: e.target.value })}
                className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter address"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block font-medium">
                Phone:
              </label>
              <input
                type="tel"
                id="phone"
                value={supplier.phone}
                onChange={(e) => setSupplier({ ...supplier, phone: e.target.value })}
                className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter phone number"
              />
            </div>

            {/* Country */}
            <div>
              <label htmlFor="country" className="block font-medium">
                Country:
              </label>
              <input
                type="text"
                id="country"
                value={supplier.country}
                onChange={(e) => setSupplier({ ...supplier, country: e.target.value })}
                className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter country"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <button
                type="submit"
                className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                disabled={loading}
              >
                <FaDatabase className="mr-2" />
                <span>{loading ? 'Creating...' : 'Create'}</span>
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                <FaTimes className="mr-2" />
                <span>Cancel</span>
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
        </div>
      )
}
