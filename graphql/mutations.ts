import { gql } from "@apollo/client";

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

export const DeletePokemonMutation = gql`
  mutation (
    $id: String!
    $user: String!
  ) {
    deletePokemon(
      id: $id
      user: $user
    ) {
      id
      user
    }
  }
`;