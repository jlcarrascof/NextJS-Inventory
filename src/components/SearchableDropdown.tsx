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

    const filteredData = query === ""
      ? data
      : data.filter(item => item.name.toLowerCase().includes(query.toLowerCase()))

    return (
      <div className="relative">
        <label className="block font-medium">{label}</label>
        <Combobox value={selected} onChange={setSelected}>
          <div className="relative">
            <Combobox.Input
              className="w-full p-2 border rounded"
              placeholder={`Select ${label.toLowerCase()}`}
              onChange={(e) => setQuery(e.target.value)}
              displayValue={(item: T) => item?.name || ""}
            />
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full bg-white border rounded shadow-lg">
              {filteredData.length === 0 ? (
                <div className="cursor-default select-none p-2 text-gray-500">No results found</div>
              ) : (
                filteredData.map((item) => (
                  <Combobox.Option key={item.id} value={item} className="cursor-pointer select-none p-2">
                    {item.name}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </div>
        </Combobox>
      </div>
    )
}
