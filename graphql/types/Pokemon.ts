import { objectType, extendType, intArg, stringArg, nonNull } from 'nexus'
import { User } from './User'

export const Pokemon = objectType({
  name: 'Pokemon',
  definition(t) {
    t.string('id')
    t.string('name')
    t.string('height')
    t.string('weight')
    t.string('imageUrl')
    t.string('user')
    t.list.field('users', {
      type: User,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.pokemon
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .users()
      },
    })
  },
})

export const Edge = objectType({
  name: 'Edge',
  definition(t) {
    t.string('cursor')
    t.field('node', {
      type: Pokemon,
    })
  },
})

export const PageInfo = objectType({
  name: 'PageInfo',
  definition(t) {
    t.string('endCursor')
    t.boolean('hasNextPage')
  },
})

export const Response = objectType({
  name: 'Response',
  definition(t) {
    t.field('pageInfo', { type: PageInfo })
    t.list.field('edges', {
      type: Edge,
    })
  },
})

export const PokemonsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('pokemons', {
      type: 'Response',
      args: {
        first: intArg(),
        after: stringArg(),
      },
      async resolve(_, args, ctx) {
        let queryResults = null

        if (args.after) {
          // check if there is a cursor as the argument
          queryResults = await ctx.prisma.pokemon.findMany({
            take: args.first, // the number of items to return from the database
            skip: 1, // skip the cursor
            cursor: {
              id: args.after, // the cursor
            },
          })
        } else {
          // if no cursor, this means that this is the first request
          //  and we will return the first items in the database
          queryResults = await ctx.prisma.pokemon.findMany({
            take: args.first,
          })
        }
        // if the initial request returns pokemons
        if (queryResults.length > 0) {
          // get last element in previous result set
          const lastPokemonInResults = queryResults[queryResults.length - 1]
          // cursor we'll return in subsequent requests
          const myCursor = lastPokemonInResults.id

          // query after the cursor to check if we have nextPage
          const secondQueryResults = await ctx.prisma.pokemon.findMany({
            take: args.first,
            cursor: {
              id: myCursor,
            },
          })
          // return response
          const result = {
            pageInfo: {
              endCursor: myCursor,
              hasNextPage: secondQueryResults.length >= args.first, //if the number of items requested is greater than the response of the second query, we have another page
            },
            edges: queryResults.map(pokemon => ({
              cursor: pokemon.id,
              node: pokemon,
            })),
          }

          return result
        }
        //
        return {
          pageInfo: {
            endCursor: null,
            hasNextPage: false,
          },
          edges: [],
        }
      },
    })
  },
})

export const CreatePokemonMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createPokemon', {
      type: Pokemon,
      args: {
        name: nonNull(stringArg()),
        height: nonNull(stringArg()),
        weight: nonNull(stringArg()),
        imageUrl: nonNull(stringArg()),
        user: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        if (!args.user) {
          throw new Error(`You need to be logged in to perform an action`)
        }

        const user = await ctx.prisma.user.findUnique({
          where: {
            email: args.user,
          },
        });

        if (args.user !== user.email) {
          throw new Error(`You are not a user yet`)
        }

        const newPokemon = {
          name: args.name,
          height: args.height,
          weight: args.weight,
          imageUrl: args.imageUrl,
        };

        return await ctx.prisma.pokemon.create({
          data: newPokemon,
        });
      },
    });
  },
});