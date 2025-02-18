import { useState, useEffect } from "react"

export function useFetchData<T>(url: string) {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);



    return { data, loading };
}
