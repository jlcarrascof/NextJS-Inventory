'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Combobox } from '@headlessui/react'

interface ProductFormInputs {
  name: string;
  quantity: number;
  price: number;
  cost: number;
  departmentId: number;
  supplierId?: number;
}

interface Department {
  id: number;
  name: string;
}

interface Supplier {
  id: number;
  name: string;
}

export default function ProductForm() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProductFormInputs>()
    const [departments, setDepartments] = useState<Department[]>([])
    const [suppliers, setSuppliers] = useState<Supplier[]>([])
    const [message, setMessage] = useState('')



}
