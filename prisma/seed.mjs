import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

    await prisma.$executeRaw`DELETE FROM Supplier;`
    await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name = 'Supplier';`
    await prisma.$executeRaw`DELETE FROM Product;`
    await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name = 'Product';`
    await prisma.$executeRaw`DELETE FROM Department;`
    await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name = 'Department';`

    // Create Departments
    await prisma.department.createMany({
        data: [
            { name: 'Tools' },
            { name: 'Paints' },
            { name: 'Electricity' },
        ],
    })
    console.log('Departaments created')

    // Create suppliers
    await prisma.supplier.createMany({
        data: [
            { name: 'Paints Supplier', contact: 'supplier-paints@gmail.com' },
            { name: 'Tools Supplier', contact: 'supplier-tools@gmail.com' },
        ],
    })

    // Create Products
    await prisma.product.createMany({
        data: [
            { name: 'Hammer', quantity: 15, price: 12.99, departmentId: 1 },
            { name: 'White Paint', quantity: 25, price: 19.99, departmentId: 2 },
            { name: 'Electric Cable', quantity: 50, price: 4.99, departmentId: 3 },
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
