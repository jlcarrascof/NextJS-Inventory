interface ProductPageProps {
    params: {
      id: string
    }
}

export default function ProductPage({ params }: ProductPageProps) {
    return <h1>Product ID: {params.id}</h1>
}
