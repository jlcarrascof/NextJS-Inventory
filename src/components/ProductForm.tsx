'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Combobox } from '@headlessui/react';

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
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProductFormInputs>();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [message, setMessage] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [departmentQuery, setDepartmentQuery] = useState('');

  useEffect(() => {
    fetch('/api/departments')
      .then((res) => res.json())
      .then((data) => setDepartments(data.departments));

    fetch('/api/suppliers')
      .then((res) => res.json())
      .then((data) => setSuppliers(data.suppliers));
  }, []);

  const filteredDepartments = departmentQuery === ''
    ? departments
    : departments.filter((dept) =>
        dept.name.toLowerCase().includes(departmentQuery.toLowerCase())
      );

  const onSubmit = async (data: ProductFormInputs) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessage('Product created successfully!');
      } else {
        setMessage('Error creating product.');
      }
    } catch (error) {
      console.error(error);
      setMessage('Something went wrong.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-lg shadow w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center bg-green-100 text-green-800 px-4 py-2 rounded-md shadow-sm">
          Create Product
        </h2>

        {/* Name */}
        <div>
          <label className="block font-medium">Product Name</label>
          <input
            {...register('name', { required: 'Name is required' })}
            className="w-full p-2 border rounded focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        {/* Quantity */}
        <div>
          <label className="block font-medium">Quantity</label>
          <input
            type="number"
            {...register('quantity', { required: 'Quantity is required', min: 1 })}
            className="w-full p-2 border rounded focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.quantity && <p className="text-red-500">{errors.quantity.message}</p>}
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium">Price</label>
          <input
            type="number"
            step="0.01"
            {...register('price', { required: 'Price is required', min: 0 })}
            className="w-full p-2 border rounded focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.price && <p className="text-red-500">{errors.price.message}</p>}
        </div>

        {/* Cost */}
        <div>
          <label className="block font-medium">Cost</label>
          <input
            type="number"
            step="0.01"
            {...register('cost', { required: 'Cost is required', min: 0 })}
            className="w-full p-2 border rounded focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.cost && <p className="text-red-500">{errors.cost.message}</p>}
        </div>

        {/* Department */}
        <div className="relative">
          <label className="block font-medium">Department</label>
          <Combobox
            value={selectedDepartment}
            onChange={(value: Department | null) => {
              setSelectedDepartment(value);
              setValue('departmentId', value?.id || 0); // Manejar valor `null`
            }}
          >
            <div className="relative">
              <Combobox.Input
                className="w-full p-2 border rounded focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Select department"
                onChange={(e) => setDepartmentQuery(e.target.value)}
                displayValue={(dept: Department) => dept?.name || ''}
              />
              <Combobox.Options
                className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white border rounded shadow-lg"
              >
                {filteredDepartments.map((department) => (
                  <Combobox.Option
                    key={department.id}
                    value={department}
                    className={({ active }) =>
                      `cursor-pointer select-none p-2 ${active ? 'bg-indigo-600 text-white' : 'text-gray-900'}`
                    }
                  >
                    {department.name}
                  </Combobox.Option>
                ))}
                {filteredDepartments.length === 0 && (
                  <div className="cursor-default select-none p-2 text-gray-500">No results found</div>
                )}
              </Combobox.Options>
            </div>
          </Combobox>
          <input type="hidden" {...register('departmentId', { required: 'Department is required' })} />
          {errors.departmentId && <p className="text-red-500">{errors.departmentId.message}</p>}
        </div>

        {/* Supplier */}
        <div>
          <label className="block font-medium">Supplier</label>
          <Combobox
            onChange={(value: Supplier | null) => {
              setValue('supplierId', value?.id);
            }}
          >
            <Combobox.Input
              placeholder="Select supplier"
              className="w-full p-2 border rounded focus:ring-indigo-500 focus:border-indigo-500"
            />
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white border rounded shadow-lg">
              {suppliers.map((supplier) => (
                <Combobox.Option
                  key={supplier.id}
                  value={supplier}
                  className="cursor-pointer select-none p-2 hover:bg-gray-200"
                >
                  {supplier.name}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Combobox>
          <input type="hidden" {...register('supplierId')} />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Product
        </button>

        {/* Message */}
        {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
      </form>
    </div>
  );
}
