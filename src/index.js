const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {}

main()
  .catch((error) => {
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
