import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.department.createMany({
        data: [
            { name: 'Herramientas' },
            { name: 'Pinturas' },
            { name: 'Electricidad' },
        ],
    });
    console.log('Departaments created')
}
