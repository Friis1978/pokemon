import pokemons from "../data/pokemons";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Add test pokemons from the data file
  await prisma.pokemon.createMany({
    data: pokemons,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
