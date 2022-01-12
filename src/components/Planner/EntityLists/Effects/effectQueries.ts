import {
  gql,
} from '@apollo/client';

export const EFFECT_SEARCH_QUERY = gql`
  query EffectSearchQuery(
    $gen: Int!
    $startsWith: String
  ) {
    effects(
      generation: $gen
      filter: {
        startsWith: $startsWith
      }
      pagination: {
        limit: 5
      }
    ) {
      id
      name
      formattedName

      introduced {
        edges {
          node {
            number
          }
        }
      }

      moves {
        edges {
          node {
            id
            name
            formattedName

            introduced {
              edges {
                node {
                  number
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const EFFECT_PAGE_QUERY = gql`
  query EffectPageQuery(
    $gen: Int!
    $name: String!
  ) {
    effectByName(
      generation: $gen,
      name: $name
    ) {
      id
      name
      formattedName
      moves {
        edges {
          node {
            id
            name
            formattedName
          }
        }
      }
    }
  }
`;