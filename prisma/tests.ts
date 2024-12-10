import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function runTests() {
    console.log('Executing tests with Prisma...');

    // Step 2: Basic Query
    const departments = await prisma.department.findMany({
        include: { products: true },
    });
    console.log('Departaments with products:', departments);

    // Step 3: Insert dynamic data
    const newDepartment = await prisma.department.create({
        data: {
            name: 'Herramientas Especializadas',
            products: {
                create: [
                    { name: 'Taladro', quantity: 5, price: 89.99 },
                    { name: 'Sierra Circular', quantity: 10, price: 149.99 },
                ],
            },
        },
    });
    console.log('New Departament created:', newDepartment);

    // Step 4: Advanced Filters
    const tools = await prisma.product.findMany({
        where: { department: { name: 'Herramientas' } },
    });
    console.log('Products in the Herramientas departments:', tools);
}


runTests()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
