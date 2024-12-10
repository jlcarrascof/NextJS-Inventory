import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.department.deleteMany()
    await prisma.department.createMany({
        data: [
            { name: 'Herramientas' },
            { name: 'Pinturas' },
            { name: 'Electricidad' },
        ],
    });
    console.log('Departaments created')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect();
    })
