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
            return new Response('Quantity must be greater than zero', { status: 400 })
        }

        if (price <= 0 || cost <= 0) {
            return new Response('Price and cost must be greater than zero', { status: 400 })
        }

        if (price < cost) {
            return new Response('Price cannot be lower than cost', { status: 400 })
        }

        // Verify if the department exists ...
        const departmentExists = await prisma.department.findUnique({
            where: { id: departmentId },
        })
        if (!departmentExists) {
            return new Response('Invalid department ID', { status: 400 });
        }

        // Verify if the supplier exists (if supplierId is provided)
        if (supplierId) {
            const supplierExists = await prisma.supplier.findUnique({
                where: { id: supplierId },
            })
        if (!supplierExists) {
            return new Response('Invalid supplier ID', { status: 400 });
            }
        }

        // Create the product ...
        const product = await prisma.product.create({
            data: { name, quantity, price, cost, departmentId, supplierId },
        })
        return Response.json(product, { status: 201 })
    } catch (error) {
        return new Response('Failed to create a Product', { status: 500 })
    }
}

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const page = parseInt(url.searchParams.get('page') || '1', 10);
        const limit = parseInt(url.searchParams.get('limit') || '10', 10);
        const search = url.searchParams.get('search') || '';
        const orderBy = url.searchParams.get('orderBy') || 'name';
        const orderDirection = url.searchParams.get('orderDirection') === 'desc' ? 'desc' : 'asc';

        const products = search
            ? await prisma.product.findMany({
                where: {
                    name: {
                        contains: search,
                    },
                },
                orderBy: { [orderBy]: orderDirection }
            })
            : await prisma.product.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { [orderBy]: orderDirection }
            });

        const total = await prisma.product.count();

        return Response.json({ products, total, page, limit }, { status: 200 });
    } catch (error) {
        return new Response('Failed to fetch products', { status: 500 });
    }
}
