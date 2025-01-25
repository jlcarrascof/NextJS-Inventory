import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {

    } catch (error) {
        return new Response('Failed to create a Product', { status: 500 })
    }
}
