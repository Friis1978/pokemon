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

export const CreatePokemonMutation = gql`
  mutation (
    $name: String!
    $height: String!
    $weight: String!
    $imageUrl: String!
    $user: String!
  ) {
    createPokemon(
      name: $name
      height: $height
      weight: $weight
      imageUrl: $imageUrl
      user: $user
    ) {
      name
      height
      weight
      imageUrl
      user
    }
  }
`;