import { useState, useEffect } from "react"

export function useFetchData<T extends { id: number; name: string }>(url: string) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data.departments || data.suppliers || []))
      .catch((error) => console.error(`Error fetching ${url}:`, error))
      .finally(() => setLoading(false));
  }, [url])

  return { data, loading }
}
