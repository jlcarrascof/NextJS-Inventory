import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
        const { name, quantity, price, cost, departmentId, supplierId } = await req.json()

        if (!name || !quantity || !price || !cost || !departmentId) {
            return new Response('Missing required fields', { status: 400})
        }
    } catch (error) {
        return new Response('Failed to create a Product', { status: 500 })
    }
}
