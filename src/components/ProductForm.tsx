'use client';

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useFetchData } from "@/hooks/useFetchData"
import { InputField } from "@/components/InputField"
import { SearchableDropdown } from "@/components/SearchableDropdown"
import { FaDatabase, FaTimes } from "react-icons/fa"

interface ProductFormInputs {
  name: string
  quantity: number
  price: number
  cost: number
  departmentId: number
  supplierId?: number
}

export default function ProductForm() {
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<ProductFormInputs>()
  const { data: departments } = useFetchData("/api/departments")
  const { data: suppliers } = useFetchData("/api/suppliers")

  const [selectedDepartment, setSelectedDepartment] = useState(null)
  const [departmentQuery, setDepartmentQuery] = useState("")

  const [selectedSupplier, setSelectedSupplier] = useState(null)
  const [supplierQuery, setSupplierQuery] = useState("")

  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: ProductFormInputs) => {
    setLoading(true)
    try {
      const payload = { ...data, quantity: Number(data.quantity), price: Number(data.price), cost: Number(data.cost) }

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


}
