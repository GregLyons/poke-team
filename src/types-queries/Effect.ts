import {
  gql,
} from '@apollo/client';
import {
  EntitySearchQueryName,
  EntitySearchResult,
  EntitySearchVars,
  EntityInSearch,
  
  EntityPageQueryName,
  EntityOnPage,
  EntityPageResult,
  EntityPageVars,
  CountField,
  
  EntityConnectionQuery,
  EntityConnectionEdge,
  EntityConnectionVars,
  EntityConnectionOnPage,
} from './helpers';
import {
  GenerationNum,
  IntroductionEdge,
} from './Generation.js';
import {
  TypeName,
  TypeNameEdge,
  typeNameEdgeToTypeName,
} from './Type';
import {
  PokemonIconDatum,
  PokemonIconEdge,
  pokemonIconEdgeToPokemonIconDatum,
} from './Pokemon';

// Effect in main search
// #region

export type EffectSearchQuery = {
  [searchQueryName in EntitySearchQueryName]: EffectSearchResult[]
}

export interface EffectSearchResult extends EntitySearchResult {
  id: string
  name: string
  formattedName: string

  moves: {
    edges: {
      node: {
        id: string
        name: string
        formattedName: string
      }
    }
  }
}

export interface EffectSearchVars extends EntitySearchVars {
  gen: GenerationNum
  limit: number
  startsWith: string
}

export const EFFECT_SEARCH_QUERY = gql`
  query EffectSearchQuery($gen: Int! $limit: Int! $startsWith: String) {
    effects(
      generation: $gen
      filter: { startsWith: $startsWith }
      pagination: { limit: $limit }
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

export class EffectInSearch extends EntityInSearch {
  constructor(gqlEffect: EffectSearchResult) {
    super(gqlEffect);
  }
}

// #endregion

// Effect page
// #region

export type EffectPageQuery = {
  [pageQueryName in EntityPageQueryName]?: EffectPageResult[]
}

export interface EffectPageResult extends EntityPageResult {
  id: string
  name: string
  formattedName: string

  introduced: {
    edges: IntroductionEdge[]
  }

  abilities: CountField
  fieldStates: CountField
  items: CountField
  moves: CountField
}

export interface EffectPageQueryVars extends EntityPageVars {
  gen: GenerationNum
  name: string
}

export const EFFECT_PAGE_QUERY = gql`
  query EffectPageQuery($gen: Int! $name: String!) {
    effectByName(generation: $gen, name: $name) {
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
      
      abilities {
        count
      }

      fieldStates {
        count
      }

      items {
        count
      }

      moves {
        count
      }

    }
  }
`;

export class EffectOnPage extends EntityOnPage {
  public abilityCount: number
  public fieldStateCount: number
  public itemCount: number
  public moveCount: number

  constructor(gqlEffect: EffectPageResult) {
    super(gqlEffect);

    this.abilityCount = gqlEffect.abilities.count
    this.fieldStateCount = gqlEffect.items.count
    this.itemCount = gqlEffect.moves.count
    this.moveCount = gqlEffect.fieldStates.count
  }
}

// #endregion

// Effect connections
// #region

export type EffectMoveQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    moves: {
      edges: EffectMoveEdge[]
    }
  }[]
}

export interface EffectMoveEdge extends EntityConnectionEdge {
  node: {
    id: string
    name: string
    formattedName: string

    type: {
      edges: TypeNameEdge[]
    }

    pokemon: {
      edges: PokemonIconEdge[]
    }
  }
}

export interface EffectMoveQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
  startsWith: string
}

export const EFFECT_MOVE_QUERY = gql`
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
      moves(filter: { startsWith: $startsWith }) {
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

export class EffectMoveResult extends EntityConnectionOnPage {
  public type: TypeName

  public pokemonIconData: PokemonIconDatum[]

  constructor(gqlEffectMove: EffectMoveEdge) {
    super(gqlEffectMove);

    this.type = gqlEffectMove.node.type.edges.map(typeNameEdgeToTypeName)[0]

    this.pokemonIconData = gqlEffectMove.node.pokemon.edges.map(pokemonIconEdgeToPokemonIconDatum);
  }
}

// #endregion