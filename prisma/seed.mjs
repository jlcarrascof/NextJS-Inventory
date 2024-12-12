import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

    await prisma.$executeRaw`DELETE FROM Supplier;`
    await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name = 'Supplier';`
    await prisma.$executeRaw`DELETE FROM Product;`
    await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name = 'Product';`
    await prisma.$executeRaw`DELETE FROM Department;`
    await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name = 'Department';`

    await prisma.department.deleteMany()
    await prisma.department.createMany({
        data: [
            { name: 'Herramientas' },
            { name: 'Pinturas' },
            { name: 'Electricidad' },
        ],
    })
    console.log('Departaments created')

    await prisma.product.deleteMany()
    await prisma.product.createMany({
        data: [
            { name: 'Martillo', quantity: 15, price: 12.99, departmentId: 1 },
            { name: 'Pintura Blanca', quantity: 25, price: 19.99, departmentId: 2 },
            { name: 'Cable Eléctrico', quantity: 50, price: 4.99, departmentId: 3 },
        ],
    })
    console.log('Products created')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect();
    })
