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
  
  EntityConnectionEdge,
  EntityConnectionVars,
  EntityConnectionOnPage,

  TypeNameEdge,
  AbilityIconEdge,
  MoveIconEdge,

  PokemonIconEdge,
  PokemonIconDatum,
  pokemonIconEdgeToPokemonIconDatum,
  NameEdge,
} from './helpers';
import {
  GenerationNum,
  IntroductionEdge,
} from './Generation.js';
import {
  TypeName,
  typeNameEdgeToTypeName,
} from './Type';

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

export type IntroductionQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    introduced: {
      edges: IntroductionEdge[]
    }
  }[]
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

// EffectAbility
// #region

export type EffectAbilityQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    abilities: {
      edges: EffectAbilityEdge[]
    }
  }[]
}

export interface EffectAbilityEdge extends AbilityIconEdge {
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

export interface EffectAbilityQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
  startsWith: string
}

export const EFFECT_ABILITY_QUERY = gql`
  query EffectAbilitiesQuery(
    $gen: Int!
    $name: String!
    $startsWith: String!
  ) {
    effectByName(generation: $gen, name: $name) {
      id 
      abilities(filter: { startsWith: $startsWith }) {
        edges {
          node {
            id
            name
            formattedName

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

export class EffectAbilityResult extends EntityConnectionOnPage {
  public pokemonIconData: PokemonIconDatum[]

  constructor(gqlEffectAbility: EffectAbilityEdge) {
    super(gqlEffectAbility);

    this.pokemonIconData = gqlEffectAbility.node.pokemon.edges.map(pokemonIconEdgeToPokemonIconDatum);
  }
}

// #endregion

// EffectFieldState
// #region

export type EffectFieldStateQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    fieldStates: {
      edges: EffectFieldStateEdge[]
    }
  }[]
}

export interface EffectFieldStateEdge extends NameEdge {
  node: {
    id: string
    name: string
    formattedName: string
  }
}

export interface EffectFieldStateQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
  startsWith: string
}

export const EFFECT_FIELDSTATE_QUERY = gql`
  query EffectFieldStatesQuery(
    $gen: Int!
    $name: String!
    $startsWith: String!
  ) {
    effectByName(generation: $gen, name: $name) {
      id 
      fieldStates(filter: { startsWith: $startsWith }) {
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

export class EffectFieldStateResult extends EntityConnectionOnPage {
  constructor(gqlEffectFieldState: EffectFieldStateEdge) {
    super(gqlEffectFieldState);
  }
}

// #endregion

// EffectItem
// #region

export type EffectItemQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    items: {
      edges: EffectItemEdge[]
    }
  }[]
}

export interface EffectItemEdge extends EntityConnectionEdge {
  node: {
    id: string
    name: string
    formattedName: string
  }
}

export interface EffectItemQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
  startsWith: string
}

export const EFFECT_ITEM_QUERY = gql`
  query EffectItemsQuery(
    $gen: Int!
    $name: String!
    $startsWith: String!
  ) {
    effectByName(generation: $gen, name: $name) {
      id 
      items(filter: { startsWith: $startsWith }) {
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

export class EffectItemResult extends EntityConnectionOnPage {
  constructor(gqlEffectItem: EffectItemEdge) {
    super(gqlEffectItem);
  }
}

// #endregion

// EffectMove
// #region

export type EffectMoveQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    moves: {
      edges: EffectMoveEdge[]
    }
  }[]
}

export interface EffectMoveEdge extends MoveIconEdge {
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
    effectByName(generation: $gen, name: $name) {
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

// #endregion