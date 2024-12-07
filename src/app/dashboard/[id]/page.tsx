interface ProductPageProps {
    params: {
      id: string
    }
}

export default async function ProductPage({ params }: ProductPageProps) {
    const productId = params.id
    return <h1>Product ID: {productId}</h1>
}
