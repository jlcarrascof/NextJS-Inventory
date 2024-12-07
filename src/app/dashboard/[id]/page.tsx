interface ProductPageProps {
    params: {
      id: string
    }
}

  export default async function ProductPage({ params }: ProductPageProps) {
    const resolvedParams = await params

    if (!resolvedParams || !resolvedParams.id) {
      return <h1>Error: ID not found</h1>
    }

    return <h1>Product ID: {resolvedParams.id}</h1>
  }
