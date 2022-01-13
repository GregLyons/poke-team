import {
  EntityInSearch,

  EntityConnectionEdge,
  EntityConnectionVars,
  EntityConnectionOnPage,
  
  EntityOnPage,
  EntityPageResult,
  EntityPageVars,

  EntitySearchResult,
  EntitySearchVars,
  CountField,
  EntityConnectionQuery,
} from './helpers';
import {
  gql,
} from '@apollo/client';
import {
  GenerationNum,
  IntroductionEdge,
} from './Generation.js';
import { TypeName, TypeNameEdge, typeNameEdgeToTypeName } from './Type';
import { PokemonIconDatum, PokemonIconEdge, pokemonIconEdgeToPokemonIconDatum } from './Pokemon';

// Effect in main search
// #region

export interface EffectSearchQuery {
  effects: EffectSearchResult
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

export class Effect implements EntityInSearch {
  public id: string
  public name: string
  public formattedName: string

  constructor(
    gqlEffect: EffectSearchResult
  ) {
    this.id = gqlEffect.id;
    this.name = gqlEffect.name;
    this.formattedName = gqlEffect.formattedName;
  }
}

// #endregion

// Effect page
// #region

export interface EffectPageQuery {
  effects: EffectPageResult[]
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

export class EffectOnPage implements EntityOnPage {
  public id: string
  public name: string
  public formattedName: string

  public abilityCount: number
  public fieldStateCount: number
  public itemCount: number
  public moveCount: number

  constructor(gqlEffect: EffectPageResult) {
    const { id, name, formattedName } = gqlEffect;

    this.id = id;
    this.name = name;
    this.formattedName = formattedName;

    this.abilityCount = gqlEffect.abilities.count
    this.fieldStateCount = gqlEffect.items.count
    this.itemCount = gqlEffect.moves.count
    this.moveCount = gqlEffect.fieldStates.count
  }
}

// #endregion

// Effect connections
// #region

export interface EffectMoveQueryResult extends EntityConnectionQuery {
  id: string
  moves: {
    edges: EffectMoveEdge[]
  }
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

export class EffectMoveResult implements EntityConnectionOnPage {
  public id: string
  public name: string
  public formattedName: string

  public type: TypeName

  public pokemonIconData: PokemonIconDatum[]

  constructor(gqlEffectMove: EffectMoveEdge) {
    const { id, name, formattedName, } = gqlEffectMove.node;

    this.id = id;
    this.name = name;
    this.formattedName = formattedName;

    this.type = gqlEffectMove.node.type.edges.map(typeNameEdgeToTypeName)[0]

    this.pokemonIconData = gqlEffectMove.node.pokemon.edges.map(pokemonIconEdgeToPokemonIconDatum);
  }
}

// #endregion