import { gql } from "@apollo/client";

export const AllLinksQuery = gql`
  query allLinksQuery($first: Int, $after: String) {
    links(first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          imageUrl
          url
          title
          category
          description
          id
        }
      }
    }
  }
`;

export const CreateLinkMutation = gql`
  mutation (
    $title: String!
    $url: String!
    $imageUrl: String!
    $category: String!
    $description: String!
    $user: String!
  ) {
    createLink(
      title: $title
      url: $url
      imageUrl: $imageUrl
      category: $category
      description: $description
      user: $user
    ) {
      title
      url
      imageUrl
      category
      description
      user
    }
  }
`;