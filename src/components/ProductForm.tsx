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
