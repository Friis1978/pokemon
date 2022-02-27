import { gql } from "@apollo/client";

export const AllPokemonsQuery = gql`
  query allPokemonsQuery($first: Int, $after: String) {
    pokemons(first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          imageUrl
          name
          height
          weight
          id
        }
      }
    }
  }
`;