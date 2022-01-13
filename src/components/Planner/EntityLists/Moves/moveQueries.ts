import {
  gql,
} from '@apollo/client';
import { GenerationNum } from '../../../../typeDefs/Generation';
import { MovePageResult, MoveSearchQueryResult } from '../../../../typeDefs/Move';

// Main search query 
// #region

export interface MoveSearchQuery {
  moves: MoveSearchQueryResult[]
}

export interface MoveSearchQueryVars {
  gen: GenerationNum
  limit: number
  startsWith: string
}

export const MOVE_SEARCH_QUERY = gql`
  query MoveSearchQuery(
    $gen: Int!
    $limit: Int!
    $startsWith: String
  ) {
    moves(
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
            id
            id
            number
          }
        }
      }

      type {
        edges {
          node {
            id
            id
            name
          }
        }
      }

      pokemon {
        edges {
          node {
            id
            id
            name
            formattedName
            speciesName
            introduced {
              edges {
                node {
                  id
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

// #endregion

// MovePage query 
// #region

export interface MovePageQuery {
  moves: MovePageResult[]
}

export interface MovePageQueryVars {
  gen: GenerationNum
  limit: number
}

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
            id
            name
          }
        }
      }
      contact
      createsFieldState {
        count
        edges {
          node {
            id
            name
          }
          turns
        }
      }
      descriptions {
        count
        edges {
          node {
            id
            text
          }
          versionGroupCode
        }
      }
      effects {
        count
        edges {
          node {
            id
            name
          }
        }
      }
      enablesMove {
        count
        edges {
          node {
            id
            name
          }
        }
      }
      enhancedByFieldState {
        count
        edges {
          node {
            id
            name
          }
        }
      }
      formattedName
      generation {
        edges {
          node {
            id
            number
          }
        }
      }
      hinderedByFieldState {
        count
        edges {
          node {
            id
            name
          }
        }
      }
      interactedWithByMove {
        count
        edges {
          node {
            id
            name
          }
        }
      }
      interactsWithMove {
        count
        edges {
          node {
            id
            name
          }
        }
      }
      introduced {
        edges {
          node {
            id
            number
          }
        }
      }
      modifiesStat {
        count
        edges {
          node {
            id
            name
          }
        }
      }
      name
      pokemon {
        count
        edges {
          node {
            id
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
            id
            name
          }
        }
      }
      requiresItem {
        count
        edges {
          node {
            id
            name
          }
        }
      }
      requiresMove {
        count
        edges {
          node {
            id
            name
          }
        }
      }
      requiresPokemon {
        count
        edges {
          node {
            id
            name
          }
        }
      }
      requiresType {
        count
        edges {
          node {
            id
            name
          }
        }
      }
      resistsStatus {
        count
        edges {
          node {
            id
            name
          }
        }
      }
      target
      type {
        count
        edges {
          node {
            id
            name
          }
        }
      }
      usageMethod {
        count
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
`;

// #endregion

// Move connection queries

