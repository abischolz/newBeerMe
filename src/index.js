const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const allBeers = await prisma.beer.findMany();
  console.log(allBeers);

  const newBrewery = await prisma.brewery.create({
    data: {
      name: 'Brewtown',
      address: 'USA',
    },
  });

  const allBreweries = await prisma.brewery.findMany();
  console.log(allBreweries);
}

main()
  .catch((error) => {
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
