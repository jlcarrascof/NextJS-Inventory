'use client';

import { Combobox } from "@headlessui/react";

interface SearchableDropdownProps<T> {
  label: string
  selected: T | null
  setSelected: (value: T | null) => void
  query: string
  setQuery: (value: string) => void
  data: T[]
}

export function SearchableDropdown<T extends { id: number; name: string }>({
    label,
    selected,
    setSelected,
    query,
    setQuery,
    data,
  }: SearchableDropdownProps<T>) {
    return (

    )
}
