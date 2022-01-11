import {
  gql,
} from '@apollo/client';

export const MOVE_SEARCH_QUERY = gql`
  query MoveSearchQuery(
    $gen: Int!
    $startsWith: String!
  ) {
    moves(
      generation: $gen
      filter: {startsWith: $startsWith}
    ) {
      id
      name
      formattedName
      accuracy
      category
      contact
      power
      pp
      priority
      target

      introduced {
        edges {
          node {
            number
          }
        }
      }

      type {
        edges {
          node {
            name
          }
        }
      }

      pokemon {
        edges {
          node {
            name
            formattedName
            speciesName
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

export const MOVE_PAGE_QUERY = gql`
  query MovePageQuery(
    $gen: Int!
    $name: String!
  ) {
    moveByName(
      generation: $gen,
      name: $name
    ) {
      id
      accuracy
      category
      causesStatus {
        count
        edges {
          node {
            name
          }
        }
      }
      contact
      createsFieldState {
        count
        edges {
          node {
            name
          }
          turns
        }
      }
      descriptions {
        count
        edges {
          node {
            text
          }
          versionGroupCode
        }
      }
      effects {
        count
        edges {
          node {
            name
          }
        }
      }
      enablesMove {
        count
        edges {
          node {
            name
          }
        }
      }
      enhancedByFieldState {
        count
        edges {
          node {
            name
          }
        }
      }
      formattedName
      generation {
        edges {
          node {
            number
          }
        }
      }
      hinderedByFieldState {
        count
        edges {
          node {
            name
          }
        }
      }
      interactedWithByMove {
        count
        edges {
          node {
            name
          }
        }
      }
      interactsWithMove {
        count
        edges {
          node {
            name
          }
        }
      }
      introduced {
        edges {
          node {
            number
          }
        }
      }
      modifiesStat {
        count
        edges {
          node {
            name
          }
        }
      }
      name
      pokemon {
        count
        edges {
          node {
            name
          }
        }
      }
      power
      pp
      priority
      removesFieldState {
        count
        edges {
          node {
            name
          }
        }
      }
      requiresItem {
        count
        edges {
          node {
            name
          }
        }
      }
      requiresMove {
        count
        edges {
          node {
            name
          }
        }
      }
      requiresPokemon {
        count
        edges {
          node {
            name
          }
        }
      }
      requiresType {
        count
        edges {
          node {
            name
          }
        }
      }
      resistsStatus {
        count
        edges {
          node {
            name
          }
        }
      }
      target
      type {
        count
        edges {
          node {
            name
          }
        }
      }
      usageMethod {
        count
        edges {
          node {
            name
          }
        }
      }
    }
  }
`;