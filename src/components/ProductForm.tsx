'use client';

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useFetchData } from "@/hooks/useFetchData"
import { InputField } from "@/components/InputField"
import { SearchableDropdown } from "@/components/SearchableDropdown"
import { FaDatabase, FaTimes, FaFileAlt } from "react-icons/fa"

interface ProductFormInputs {
  name: string
  quantity: number
  price: number
  cost: number
  departmentId: number
  supplierId?: number
}

interface Department {
  id: number
  name: string
}

interface Supplier {
  id: number
  name: string
}

export default function ProductForm() {
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<ProductFormInputs>()
  const { data: departments } = useFetchData("/api/departments")
  const { data: suppliers } = useFetchData("/api/suppliers")

  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
  const [departmentQuery, setDepartmentQuery] = useState("")

  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)
  const [supplierQuery, setSupplierQuery] = useState("")

  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: ProductFormInputs) => {

    if (!selectedDepartment || !selectedDepartment.id) {
      setMessage("Please select a valid department.")
      return
    }
    if (!selectedSupplier || !selectedSupplier.id) {
      setMessage("Please select a valid supplier.")
      return
    }

    setLoading(true)
    try {
      const payload = {
        ...data,
        departmentId: selectedDepartment.id,
        supplierId: selectedSupplier?.id ?? null,
        quantity: Number(data.quantity),
        price: Number(data.price),
        cost: Number(data.cost),
      }

      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        setMessage("Product created successfully!")
        reset()
        setSelectedDepartment(null)
        setSelectedSupplier(null)
      } else {
        const error = await response.text()
        setMessage(`Error creating product: ${error}`)
      }
    } catch (error) {
      setMessage("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-lg shadow w-full max-w-2xl">
      <h2 className="text-2xl font-bold text-center bg-green-100 text-green-800 px-4 py-2 rounded-md shadow-sm">Create Product</h2>

      <InputField label="Product Name" name="name" register={register} errors={errors} validation={{ required: "Required" }} />
      <InputField label="Quantity" name="quantity" type="number" register={register} errors={errors} validation={{ required: "Required", min: 1 }} />
      <InputField label="Price" name="price" type="number" step="0.01" register={register} errors={errors} validation={{ required: "Required", min: 0 }} />
      <InputField label="Cost" name="cost" type="number" step="0.01" register={register} errors={errors} validation={{ required: "Required", min: 0 }} />

      <SearchableDropdown label="Department" selected={selectedDepartment} setSelected={setSelectedDepartment} query={departmentQuery} setQuery={setDepartmentQuery} data={departments} />
      <SearchableDropdown label="Supplier" selected={selectedSupplier} setSelected={setSelectedSupplier} query={supplierQuery} setQuery={setSupplierQuery} data={suppliers} />

      <div className="flex flex-wrap justify-center gap-4">
        <button type="submit" className="flex items-center bg-green-600 text-white px-4 py-2 rounded">
          <FaDatabase className="mr-2" />
          {loading ? "Creating..." : "Create"}
        </button>

        <button onClick={() => reset()} className="flex items-center bg-red-500 text-white px-4 py-2 rounded">
          <FaTimes className="mr-2" />
          Cancel
        </button>

        <button
          onClick={() => window.location.href = '/dashboard/products/list'}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <FaFileAlt className="mr-2" />
          <span>View List</span>
        </button>
      </div>

      {/* Show message */}
      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
    </form>
    </div>
  )

}
