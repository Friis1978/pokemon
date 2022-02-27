export const resolvers = {
  Query: {
    pokemons: (_parent, _args, ctx) => {
      return ctx.prisma.pokemons.findMany();
    },
  },
};
