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
}
