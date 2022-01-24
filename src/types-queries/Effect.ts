import {
  gql,
} from '@apollo/client';
import {
  EntitySearchQueryName,
  EntitySearchVars,
  
  EntityPageQueryName,
  EntityPageVars,
  CountField,
  
  EntityConnectionVars,

  TypeNameEdge,
  AbilityIconEdge,
  MoveIconEdge,

  PokemonIconEdge,
  PokemonIconDatum,
  pokemonIconEdgeToPokemonIconDatum,
  VersionDependentDescriptionEdge,
  AuxToMainConnectionEdge,
  AuxEntityInSearch,
  AuxEntitySearchResult,
  AuxEntityPageResult,
  AuxEntityOnPage,
  AuxToMainConnectionOnPage,
  AuxToAuxConnectionEdge,
  AuxToAuxConnectionOnPage,
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

export interface EffectSearchResult extends AuxEntitySearchResult {
  id: string
  name: string
  formattedName: string
  description: string

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

      description

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

export class EffectInSearch extends AuxEntityInSearch {
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

export interface EffectPageResult extends AuxEntityPageResult {
  id: string
  name: string
  formattedName: string

  description: string

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
      
      name
      formattedName

      description

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

export class EffectOnPage extends AuxEntityOnPage {
  public abilityCount: number
  public fieldStateCount: number
  public itemCount: number
  public moveCount: number

  constructor(gqlEffect: EffectPageResult) {
    super(gqlEffect);

    // Counts for displaying accordions
    this.abilityCount = gqlEffect.abilities.count;
    this.fieldStateCount = gqlEffect.fieldStates.count;
    this.itemCount = gqlEffect.items.count;
    this.moveCount = gqlEffect.moves.count;
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
    name: string
    formattedName: string
    
    abilities: {
      edges: EffectAbilityEdge[]
    }
  }[]
}

export interface EffectAbilityEdge extends AbilityIconEdge, AuxToMainConnectionEdge {
  node: {
    id: string
    name: string
    formattedName: string

    descriptions: { 
      edges: VersionDependentDescriptionEdge[]
    }

    pokemon: {
      edges: PokemonIconEdge[]
    }
  }
}

export interface EffectAbilityQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const EFFECT_ABILITY_QUERY = gql`
  query EffectAbilitiesQuery($gen: Int! $name: String!) {
    effectByName(generation: $gen, name: $name) {
      id
      name
      formattedName
       
      abilities {
        edges {
          node {
            id
            name
            formattedName

            descriptions {
              edges(pagination: {limit: 1}) {
                node {
                  text
                }
              }
            }

            pokemon(filter: {formClass: [ALOLA, BASE, GALAR, GMAX, HISUI, MEGA, OTHER]}) {
              edges {
                node {
                  id
                  name
                  formattedName
                  pokemonShowdownID

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

export class EffectAbilityResult extends AuxToMainConnectionOnPage {
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
    name: string
    formattedName: string
    
    fieldStates: {
      edges: EffectFieldStateEdge[]
    }
  }[]
}

export interface EffectFieldStateEdge extends AuxToAuxConnectionEdge {
  node: {
    id: string
    name: string
    formattedName: string

    description: string
  }
}

export interface EffectFieldStateQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const EFFECT_FIELDSTATE_QUERY = gql`
  query EffectFieldStatesQuery($gen: Int! $name: String!) {
    effectByName(generation: $gen, name: $name) {
      id
      name
      formattedName
       
      fieldStates {
        edges {
          node {
            id
            name
            formattedName
            description
          }
        }
      }
    }
  }
`;

export class EffectFieldStateResult extends AuxToAuxConnectionOnPage {
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
    name: string
    formattedName: string
    
    items: {
      edges: EffectItemEdge[]
    }
  }[]
}

export interface EffectItemEdge extends AuxToMainConnectionEdge {
  node: {
    id: string
    name: string
    formattedName: string

    descriptions: {
      edges: VersionDependentDescriptionEdge[]
    }
  }
}

export interface EffectItemQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const EFFECT_ITEM_QUERY = gql`
  query EffectItemsQuery($gen: Int! $name: String!) {
    effectByName(generation: $gen, name: $name) {
      id
      name
      formattedName
       
      items {
        edges {
          node {
            id
            name
            formattedName

            descriptions {
              edges(pagination: {limit: 1}) {
                node {
                  text
                }
              }
            }
          }
        }
      }
    }
  }
`;

export class EffectItemResult extends AuxToMainConnectionOnPage {
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
    name: string
    formattedName: string
    
    moves: {
      edges: EffectMoveEdge[]
    }
  }[]
}

export interface EffectMoveEdge extends MoveIconEdge, AuxToMainConnectionEdge {
  node: {
    id: string
    name: string
    formattedName: string

    descriptions: {
      edges: VersionDependentDescriptionEdge[]
    }

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
}

export const EFFECT_MOVE_QUERY = gql`
  query EffectMovesQuery($gen: Int! $name: String!) {
    effectByName(generation: $gen, name: $name) {
      id
      name
      formattedName
       
      moves {
        edges {
          node {
            id
            name
            formattedName

            descriptions {
              edges {
                node {
                  text
                }
              }
            }
            
            type {
              edges {
                node {
                  id
                  name
                  formattedName
                }
              }
            }

            pokemon(filter: {formClass: [ALOLA, BASE, GALAR, GMAX, HISUI, MEGA, OTHER]}) {
              edges {
                node {
                  id
                  name
                  formattedName
                  pokemonShowdownID

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

export class EffectMoveResult extends AuxToMainConnectionOnPage {
  public type: TypeName

  public pokemonIconData: PokemonIconDatum[]

  constructor(gqlEffectMove: EffectMoveEdge) {
    super(gqlEffectMove);

    this.type = gqlEffectMove.node.type.edges.map(typeNameEdgeToTypeName)[0];

    this.pokemonIconData = gqlEffectMove.node.pokemon.edges.map(pokemonIconEdgeToPokemonIconDatum);
  }
}

// #endregion

// #endregion