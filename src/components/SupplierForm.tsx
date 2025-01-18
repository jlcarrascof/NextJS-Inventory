'use client';
import { useState, useEffect } from 'react';
import { FaDatabase, FaTimes, FaFileAlt, FaSearch } from 'react-icons/fa'
import { Combobox } from '@headlessui/react'

interface Supplier {
    id: number
    name: string
    contact: string
    address: string
    phone: string
    country: string
}

export default function SupplierForm() {
    const [supplier, setSupplier] = useState<Supplier>({
        id: 0,
        name: '',
        contact: '',
        address: '',
        phone: '',
        country: '',
      }) // Form
    const [suppliers, setSuppliers] = useState<Supplier[]>([]) // Suppliers List
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [query, setQuery] = useState('')
    const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)
    const [isSearchActive, setIsSearchActive] = useState(false)
    const [name, setName] = useState('')

    useEffect(() => {
      fetchSuppliers(query)
    }, [query])

    const fetchSuppliers = async (search: string) => {
      try {
        const url = search ? `/api/suppliers?search=${search}` : '/api/suppliers'
        const response = await fetch(url)
        if (response.ok) {
          const data = await response.json()
          setSuppliers(data.suppliers) // Update data...
        } else {
          console.error('Failed to fetch suppliers')
        }
      } catch (error) {
        console.error('Error fetching suppliers:', error)
      }
    }

    const refreshSuppliers = async () => {
      try {
        const response = await fetch('/api/suppliers')
        if (response.ok) {
          const data = await response.json()
          setSuppliers(data.suppliers)
        } else {
          console.error('Failed to refresh suppliers')
        }
      } catch (error) {
        console.error('Error refreshing suppliers:', error)
      }
    }

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)
      setMessage('')

      try {

        const url = '/api/suppliers'
        const method = selectedSupplier ? 'PATCH' : 'POST'

        const body = selectedSupplier
          ? {
              id: selectedSupplier.id,
              name: supplier.name,
              contact: supplier.contact,
              address: supplier.address,
              phone: supplier.phone,
              country: supplier.country,
            }
          : {
              name: supplier.name,
              contact: supplier.contact,
              address: supplier.address,
              phone: supplier.phone,
              country: supplier.country,
            }

        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })

        if (response.ok) {
          setMessage(
            selectedSupplier
              ? 'Supplier updated successfully!'
              : 'Supplier created successfully!'
          )
          setSelectedSupplier(null)
          setSupplier({
            id: 0,
            name: '',
            contact: '',
            address: '',
            phone: '',
            country: '',
          })
          await refreshSuppliers()
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
      setSupplier({
        id: 0,
        name: '',
        contact: '',
        address: '',
        phone: '',
        country: '',
      })
      setSelectedSupplier(null)
    }

    const toggleSearch = () => {
      setIsSearchActive(!isSearchActive)
      setSelectedSupplier(null)
      setQuery('')
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow w-full max-w-2xl">
            <h2 className="text-2xl font-bold text-center bg-green-100 text-green-800 px-4 py-2 rounded-md shadow-sm">
              Manage Suppliers
            </h2>
            {/* Combobox for search */}
            {isSearchActive && (
              <div>
                <label htmlFor="search" className="block font-medium text-red-600">
                  Search Supplier:
                </label>
                <Combobox
                  value={selectedSupplier}
                  onChange={(supplier) => {
                    setSelectedSupplier(supplier);
                    setSupplier({
                      id: supplier?.id || 0,
                      name: supplier?.name || '',
                      contact: supplier?.contact || '',
                      address: supplier?.address || '',
                      phone: supplier?.phone || '',
                      country: supplier?.country || '',
                    }) // update form with the appropiate data
                  }}
                >
                <div className="relative">
                  <Combobox.Input
                    className="w-full p-2 border rounded"
                    onChange={(e) => setQuery(e.target.value)}
                    displayValue={(supplier: Supplier) => supplier?.name || ''}
                    placeholder="Type to search..."
                  />
                  <Combobox.Options className="absolute z-10 mt-1 max-h-60  w-full overflow-auto bg-white border rounded shadow-lg">
                    {suppliers.length === 0 ? (
                      <div className="p-2 text-gray-700">No results found</div>
                    ) : (
                      suppliers.map((supplier: Supplier) => (
                        <Combobox.Option
                          key={supplier.id}
                          value={supplier}
                          className="cursor-pointer select-none p-2 hover:bg-gray-200"
                        >
                          {supplier.name}
                        </Combobox.Option>
                      ))
                      )}
                    </Combobox.Options>
                  </div>
                </Combobox>
              </div>
            )}

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
                className={`flex items-center ${
                selectedSupplier
                ? 'bg-yellow-500 hover:bg-yellow-600'
                : 'bg-green-600 hover:bg-green-700'
                } text-white px-4 py-2 rounded`}
                disabled={loading}
              >
                  <FaDatabase className="mr-2" />
                  <span>
                    {loading
                      ? selectedSupplier
                      ? 'Updating ...'
                      : 'Creating ...'
                      : selectedSupplier
                      ? 'Update'
                      : 'Create'}
                  </span>
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
              type="button"
              onClick={toggleSearch}
              className="flex items-center bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                <FaSearch className="mr-2" />
                <span>{isSearchActive ? 'Close Search' : 'Find'}</span>
              </button>
              <button
                onClick={() => window.location.href = '/dashboard/suppliers/list'}
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
