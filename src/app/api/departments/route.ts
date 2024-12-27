import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
        const { name } = await req.json()

        if (!name) {
            return new Response('Name is required', { status: 400})
        }

        const department = await prisma.department.create({
            data: { name },
        })

        return Response.json(department, { status: 201 })
    } catch (error) {
        return new Response('Failed to create department', { status: 500 })
    }
}

export async function GET(req: Request) {
    try {

        const url = new URL(req.url)
        const page = parseInt(url.searchParams.get('page') || '1', 10)
        const limit = parseInt(url.searchParams.get('limit') || '10', 10)
        const search = url.searchParams.get('search') || ''

        const departments = await prisma.department.findMany({
            skip: (page - 1) * limit,
            take: limit,
        })

        const total = await prisma.department.count()

        return Response.json({ departments, total, page, limit }, { status: 200})
    } catch(error) {
        return new Response('Failed to fetch departments', { status: 500 })
    }
}
