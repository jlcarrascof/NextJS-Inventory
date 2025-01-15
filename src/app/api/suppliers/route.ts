import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {

        const { name, contact, address, phone, country } = await req.json();

        if (!name || !contact) {
            return new Response('Name and contact are required', { status: 400 });
        }

        const supplier = await prisma.supplier.create({
            data: { name, contact, address, phone, country },
        });

        return Response.json(supplier, { status: 201 });

    } catch (error) {
        console.error(error);
        return new Response('Failed to create supplier', { status: 500 });
    }
}

export async function GET(req: Request) {
    try {

        const url = new URL(req.url)
        const page = parseInt(url.searchParams.get('page') || '1', 10)
        const limit = parseInt(url.searchParams.get('limit') || '10', 10)
        const search = url.searchParams.get('search') || ''

        const departments = search
            ? await prisma.department.findMany({
                where: {
                name: {
                    contains: search,
                },
            },
            })

            : await prisma.department.findMany({
                skip: (page - 1) * limit,
                take: limit,
            })

        const total = await prisma.department.count()

        return Response.json({ departments, total, page, limit }, { status: 200})
    } catch(error) {
        return new Response('Failed to fetch departments', { status: 500 })
    }
}
