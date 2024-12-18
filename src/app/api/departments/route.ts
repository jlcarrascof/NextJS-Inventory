import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
      const { name } = await req.json()

      if (!name) {
        return new Response('Name is required', { status: 400 })
      }

      const department = await prisma.department.create({
        data: { name },
      })

      return Response.json(department, { status: 201 })
    } catch (error) {
      return new Response('Failed to create department', { status: 500 })
    }
}
