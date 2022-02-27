import pokemons from "../data/pokemons";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      email: "friis1978@gmail.com",
      role: "ADMIN",
    },
  });

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
