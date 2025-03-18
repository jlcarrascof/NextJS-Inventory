'use client'

import { useState, useEffect } from 'react'
import { FaArrowLeft, FaArrowRight, FaSearch, FaArrowUp, FaArrowDown } from 'react-icons/fa'

interface Product {
    id: number
    name: string
    quantity: number
    price: number
}

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [search, setSearch] = useState('')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
    const limit = 10

    useEffect(() => {
        fetchProducts();
    }, [page, search, sortOrder])

    const fetchProducts = async () => {
        setLoading(true)
        try {
            const response = await fetch(`/api/products?page=${page}&limit=${limit}&search=${search}&orderBy=price&orderDirection=${sortOrder}`)
            if (response.ok) {
                const data = await response.json()
                setProducts(data.products);
                setTotalPages(Math.ceil(data.total / limit))
            } else {
                console.error('Failed to fetch products')
            }
        } catch (error) {
            console.error('Error fetching products:', error)
        } finally {
            setLoading(false)
        }
    };

    const handleNext = () => {
        if (page < totalPages) setPage(page + 1)
    }

    const handlePrevious = () => {
        if (page > 1) setPage(page - 1)
    }

    const toggleSort = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        setProducts([...products].sort((a, b) => sortOrder === 'asc' ? b.price - a.price : a.price - b.price))
    }

    return (
        <div className="p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Products List</h2>

            {/* Search Bar */}
            <div className="mb-4 flex items-center">
                <input
                    type="text"
                    placeholder="Search product..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-2 rounded w-full"
                />
                <FaSearch className="ml-2 text-gray-600" />
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : products.length === 0 ? (
                <p>No products found!</p>
            ) : (
                <>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-2 border">Name</th>
                                <th className="p-2 border">Quantity</th>
                                <th className="p-2 border">
                                    Price
                                    <button onClick={toggleSort} className="ml-2">
                                        {sortOrder === 'asc' ? <FaArrowUp /> : <FaArrowDown />}
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="border-t">
                                    <td className="p-2 border">{product.name}</td>
                                    <td className="p-2 border">{product.quantity}</td>
                                    <td className="p-2 border">${product.price.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex justify-between mt-4">
                        <button onClick={handlePrevious} disabled={page === 1} className="flex items-center bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50">
                            <FaArrowLeft className="mr-2"/> Previous
                        </button>
                        <span className="text-gray-700">Page {page} of {totalPages}</span>
                        <button onClick={handleNext} disabled={page === totalPages} className="flex items-center bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50">
                            Next <FaArrowRight className="ml-2"/>
                        </button>
                    </div>
                </>
            )}

            <button
                onClick={() => window.location.href = '/dashboard/products/'}
                className="mt-4 flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                <FaArrowLeft className="mr-2" /> <span>Back to Form</span>
            </button>
        </div>
    )
}
