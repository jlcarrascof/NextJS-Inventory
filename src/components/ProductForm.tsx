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

    useEffect(() => {
        fetch('/api/departments')
          .then((res) => res.json())
          .then((data) => setDepartments(data.departments))

        fetch('/api/suppliers')
          .then((res) => res.json())
          .then((data) => setSuppliers(data.suppliers))
    }, [])

    const onSubmit = async (data: ProductFormInputs) => {
        try {
          const response = await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          })

          if (response.ok) {
            setMessage('Product created successfully!')
          } else {
            setMessage('Error creating product.')
          }
        } catch (error) {
          console.error(error);
          setMessage('Something went wrong.')
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-lg shadow-md">

            <h2 className="text-2xl font-bold text-center">Create Product</h2>

            {/* Name */}
            <div>
                <label>Product Name</label>
                <input
                    {...register('name', { required: 'Name is required' })}
                    className="w-full p-2 border rounded"
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            {/* Quantity */}
            <div>
                <label>Quantity</label>
                <input
                type="number"
                {...register('quantity', { required: 'Quantity is required', min: 1 })}
                className="w-full p-2 border rounded"
                />
                {errors.quantity && <p className="text-red-500">{errors.quantity.message}</p>}
            </div>

            {/* Price */}
            <div>
                <label>Price</label>
                <input
                type="number"
                step="0.01"
                {...register('price', { required: 'Price is required', min: 0 })}
                className="w-full p-2 border rounded"
                />
                {errors.price && <p className="text-red-500">{errors.price.message}</p>}
            </div>

            {/* Cost */}
            <div>
                <label>Cost</label>
                <input
                type="number"
                step="0.01"
                {...register('cost', { required: 'Cost is required', min: 0 })}
                className="w-full p-2 border rounded"
                />
                {errors.cost && <p className="text-red-500">{errors.cost.message}</p>}
            </div>

            {/* Department */}
            <div>
                <label>Department</label>
                <Combobox
                onChange={(value: Department) => setValue('departmentId', value.id)}
                >
                <Combobox.Input placeholder="Select department" />
                <Combobox.Options>
                    {departments.map((department) => (
                    <Combobox.Option key={department.id} value={department}>
                        {department.name}
                    </Combobox.Option>
                    ))}
                </Combobox.Options>
                </Combobox>
                <input type="hidden" {...register('departmentId', { required: 'Department is required' })} />
            </div>

            {/* Supplier */}
            <div>
                <label>Supplier</label>
                <Combobox
                onChange={(value: Supplier) => setValue('supplierId', value.id)}
                >
                <Combobox.Input placeholder="Select supplier" />
                <Combobox.Options>
                    {suppliers.map((supplier) => (
                    <Combobox.Option key={supplier.id} value={supplier}>
                        {supplier.name}
                    </Combobox.Option>
                    ))}
                </Combobox.Options>
                </Combobox>
                <input type="hidden" {...register('supplierId')} />
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                Save Product
            </button>

            {/* Message */}
            {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}

        </form>
    )

}
