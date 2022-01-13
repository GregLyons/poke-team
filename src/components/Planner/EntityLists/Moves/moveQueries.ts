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

// MovePage fragments
// #region

// TODO: More status-cause data
export const MOVE_PAGE_CAUSES_STATUS = gql`
fragment CausesStatus on Move {
  causesStatus {
    edges {
      node {
        id
        name
        formattedName
      }
      chance
    }
  }
}
`;

export const MOVE_PAGE_CREATES_FIELD_STATE = gql`
fragment CreatesFieldState on Move {
  createsFieldState {
    edges {
      node {
        id
        name
        formattedName
      }
      turns
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
  name: string
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
      formattedName
    }
  }
`;

// MoveEffect

export type MovePageEffectResult = {
  edges: {
    node: {
      id: string
      name: string
      formattedName: string
    }[]
  }
};

export interface MovePageEffectQuery {
  effects: MovePageEffectResult[]
}

export interface MovePageEffectQueryVars {
  gen: GenerationNum
  limit: number
  name: string
}

export const MOVE_PAGE_EFFECTS_FRAGMENT = gql`
fragment Effects on Move {
  effects {
    edges {
      node {
        id
        name
        formattedName
      }
    }
  }
}
`;

export const MOVE_PAGE_EFFECTS_QUERY = gql`
  ${MOVE_PAGE_EFFECTS_FRAGMENT}
  query MovePageEffects($gen: Int! $name: String!) {
    moveByName(generation: $gen, name: $name) {
      id
      ...Effects
    }
  }
`;


// #endregion

