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
        count
      }

      ## field states
      fieldStates {
        count
      }

      ## items
      items {
        count
      }

      ## moves
      moves {
        count
      }

    }
  }
`;

export const EFFECT_ABILITIES_QUERY = gql`
query EffectAbilitiesQuery(
  $gen: Int!
  $name: String!
) {
    effectByName(
      generation: $gen,
      name: $name
    ) {
      id 

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
    }
  }
`;

export const EFFECT_FIELDSTATES_QUERY = gql`
query EffectFieldStatesQuery(
  $gen: Int!
  $name: String!
) {
    effectByName(
      generation: $gen,
      name: $name
    ) {
      id 

      ## fieldStates
      fieldStates {
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

export const EFFECT_ITEMS_QUERY = gql`
query EffectItemsQuery(
  $gen: Int!
  $name: String!
) {
    effectByName(
      generation: $gen,
      name: $name
    ) {
      id 

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
    }
  }
`;

export const EFFECT_MOVES_QUERY = gql`
  query EffectMovesQuery(
    $gen: Int!
    $name: String!
    $startsWith: String!
  ) {
    effectByName(
      generation: $gen,
      name: $name
    ) {
      id 

      ## moves
      moves(
        filter: {
          startsWith: $startsWith
        }
      ) {
        edges {
          node {
            id
            name
            formattedName
            
            type {
              edges {
                node {
                  id
                  name
                  formattedName
                }
              }
            }

            pokemon {
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
      }
    }
  }
`;