import { gql } from "@apollo/client";

export const GET_TAGS = gql`
  query {
    getTags {
      id
      name
      color
    }
  }
`;

export const GET_ITEMS = gql`
  query {
    getItems {
      id
      value
      tag {
        color
        name
      }
    }
  }
`
