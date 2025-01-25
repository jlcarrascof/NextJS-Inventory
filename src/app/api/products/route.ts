import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
        const { name, quantity, price, cost, departmentId, supplierId } = await req.json()

        // Basic validations ...
        if (!name || !quantity || !price || !cost || !departmentId) {
            return new Response('Missing required fields', { status: 400})
        }

        // Advanced validations ...
        if (quantity <= 0) {
            return new Response('Quantity must be greater than zero', { status: 400 });
        }

        const product = await prisma.product.create({
            data: { name, quantity, price, cost, departmentId, supplierId },
        })

        return Response.json(product, { status: 201 })
    } catch (error) {
        return new Response('Failed to create a Product', { status: 500 })
    }
}
