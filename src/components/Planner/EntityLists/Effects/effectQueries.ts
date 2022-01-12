import {
  gql,
} from '@apollo/client';

export const EFFECT_SEARCH_QUERY = gql`
  query EffectSearchQuery(
    $gen: Int!
    $startsWith: String
    $limit: Int = 100
  ) {
    effects(
      generation: $gen
      filter: {
        startsWith: $startsWith
      }
      pagination: {
        limit: $limit
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
      
      ## abilities
      abilities {
        edges {
          node {
            id
            name
            formattedName
          }
        }
      }

      ## field states
      fieldStates {
        edges {
          node {
            id
            name
            formattedName
          }
        }
      }

      ## items
      items {
        edges {
          node {
            id
            name
            formattedName
          }
        }
      }

      ## moves
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