import {
  gql,
} from '@apollo/client';
import {
  EntitySearchQueryName,
  MainEntitySearchResult,
  EntitySearchVars,
  MainEntityInSearch,
  
  EntityPageQueryName,
  MainEntityOnPage,
  MainEntityPageResult,
  EntityPageVars,
  CountField,
  
  MainToAuxConnectionEdge,
  EntityConnectionVars,
  MainToAuxConnectionOnPage,

  TypeNameEdge,
  AbilityIconEdge,
  MoveIconEdge,

  PokemonIconEdge,
  PokemonIconDatum,
  pokemonIconEdgeToPokemonIconDatum,
  NameEdge,
  VersionDependentDescription,
  DescriptionEdge,
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
  DescriptionsEdge,
} from './Description';

// Type names
// #region

export type TypeName = 'normal' | 'fighting' | 'flying' | 'poison' | 'ground' | 'rock' | 'bug' | 'ghost' | 'steel' | 'fire' | 'water' | 'grass' | 'electric' | 'psychic' | 'ice' | 'dragon' | 'dark' | 'fairy' | '???';

export const typeNameEdgeToTypeName: (edge: TypeNameEdge) => TypeName = edge => edge.node.name;

// #endregion

// Type in main search
// #region

export type TypeSearchQuery = {
  [searchQueryName in EntitySearchQueryName]: TypeSearchResult[]
}

export interface TypeSearchResult extends AuxEntitySearchResult {
  id: string
  name: string
  formattedName: string
  description: string
}

export interface TypeSearchVars extends EntitySearchVars {
  gen: GenerationNum
  limit: number
  startsWith: string
}

export const TYPE_SEARCH_QUERY = gql`
  query TypeSearchQuery($gen: Int! $limit: Int! $startsWith: String) {
    types(
      generation: $gen
      filter: { startsWith: $startsWith }
      pagination: { limit: $limit }
    ) {
      id
      name
      formattedName

      description
    }
  }
`;

export class TypeInSearch extends AuxEntityInSearch {
  constructor(gqlType: TypeSearchResult) {
    super(gqlType);
  }
}

// #endregion

// Type page
// #region

export type TypePageQuery = {
  [pageQueryName in EntityPageQueryName]?: TypePageResult[]
}

export type IntroductionQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    introduced: {
      edges: IntroductionEdge[]
    }
  }[]
}

export interface TypePageResult extends AuxEntityPageResult {
  id: string
  name: string
  formattedName: string

  description: string

  introduced: {
    edges: IntroductionEdge[]
  }

  modifiedByAbility: CountField
  modifiedByFieldState: CountField
  modifiedByItem: CountField
  modifiedByMove: CountField
}

export interface TypePageQueryVars extends EntityPageVars {
  gen: GenerationNum
  name: string
}

export const TYPE_PAGE_QUERY = gql`
  query TypePageQuery($gen: Int! $name: String!) {
    typeByName(generation: $gen, name: $name) {
      id
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
      
      modifiedByAbility {
        count
      }

      modifiedByFieldState {
        count
      }

      modifiedByItem {
        count
      }

      modifiedByMove {
        count
      }
    }
  }
`;

export class TypeOnPage extends AuxEntityOnPage {
  public modifiedByAbilityCount: number
  public modifiedByFieldStateCount: number
  public modifiedByItemCount: number
  public modifiedByMoveCount: number

  constructor(gqlType: TypePageResult) {
    super(gqlType);

    // Counts for displaying accordions
    this.modifiedByAbilityCount = gqlType.modifiedByAbility.count;
    this.modifiedByFieldStateCount = gqlType.modifiedByFieldState.count;
    this.modifiedByItemCount = gqlType.modifiedByItem.count;
    this.modifiedByMoveCount = gqlType.modifiedByMove.count;
  }
}

// #endregion

// Type connections
// #region

// TypeAbility
// #region

export type TypeAbilityQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    modifiedByAbility: {
      edges: TypeAbilityEdge[]
    }
  }[]
}

export interface TypeAbilityEdge extends AbilityIconEdge, AuxToMainConnectionEdge {
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
  stage: number
  multiplier: number
  chance: number
  recipient: string
}

export interface TypeAbilityQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const TYPE_ABILITY_QUERY = gql`
  query TypeAbilitiesQuery($gen: Int! $name: String!) {
    typeByName(generation: $gen, name: $name) {
      id 
      modifiedByAbility {
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

            pokemon {
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
          stage
          multiplier
          chance
          recipient
        }
      }
    }
  }
`;

export class TypeAbilityResult extends AuxToMainConnectionOnPage {
  public pokemonIconData: PokemonIconDatum[]
  public stage: number
  public multiplier: number
  public chance: number
  public recipient: string

  constructor(gqlTypeAbility: TypeAbilityEdge) {
    super(gqlTypeAbility);

    const { stage, multiplier, chance, recipient } = gqlTypeAbility;
    this.stage = stage;
    this.multiplier = multiplier;
    this.chance = chance;
    this.recipient = recipient;

    this.pokemonIconData = gqlTypeAbility.node.pokemon.edges.map(pokemonIconEdgeToPokemonIconDatum);
  }
}

// #endregion

// TypeFieldState
// #region

export type TypeFieldStateQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    modifiedByFieldState: {
      edges: TypeFieldStateEdge[]
    }
  }[]
}

export interface TypeFieldStateEdge extends AuxToAuxConnectionEdge {
  node: {
    id: string
    name: string
    formattedName: string

    description: string
  }
  stage: number
  multiplier: number
  chance: number
  recipient: string
}

export interface TypeFieldStateQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const TYPE_FIELDSTATE_QUERY = gql`
  query TypeFieldStatesQuery($gen: Int! $name: String!) {
    typeByName(generation: $gen, name: $name) {
      id 
      modifiedByFieldState {
        edges {
          node {
            id
            name
            formattedName
            description
          }
          stage
          multiplier
          chance
          recipient
        }
      }
    }
  }
`;

export class TypeFieldStateResult extends AuxToAuxConnectionOnPage {
  public stage: number
  public multiplier: number
  public chance: number
  public recipient: string

  constructor(gqlTypeFieldState: TypeFieldStateEdge) {
    super(gqlTypeFieldState);

    const { stage, multiplier, chance, recipient } = gqlTypeFieldState;
    this.stage = stage;
    this.multiplier = multiplier;
    this.chance = chance;
    this.recipient = recipient;
  }
}

// #endregion

// TypeItem
// #region

export type TypeItemQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    modifiedByItem: {
      edges: TypeItemEdge[]
    }
  }[]
}

export interface TypeItemEdge extends AuxToMainConnectionEdge {
  node: {
    id: string
    name: string
    formattedName: string

    descriptions: {
      edges: VersionDependentDescriptionEdge[]
    }
  }
  stage: number
  multiplier: number
  chance: number
  recipient: string
}

export interface TypeItemQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const TYPE_ITEM_QUERY = gql`
  query TypeItemsQuery($gen: Int! $name: String!) {
    typeByName(generation: $gen, name: $name) {
      id 
      modifiedByItem {
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
          stage
          multiplier
          chance
          recipient
        }
      }
    }
  }
`;

export class TypeItemResult extends AuxToMainConnectionOnPage {
  public stage: number
  public multiplier: number
  public chance: number
  public recipient: string

  constructor(gqlTypeItem: TypeItemEdge) {
    super(gqlTypeItem);

    const { stage, multiplier, chance, recipient } = gqlTypeItem;
    this.stage = stage;
    this.multiplier = multiplier;
    this.chance = chance;
    this.recipient = recipient;
  }
}

// #endregion

// TypeMove
// #region

export type TypeMoveQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    modifiedByMove: {
      edges: TypeMoveEdge[]
    }
  }[]
}

export interface TypeMoveEdge extends MoveIconEdge, AuxToMainConnectionEdge {
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
  stage: number
  multiplier: number
  chance: number
  recipient: string
}

export interface TypeMoveQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const TYPE_MOVE_QUERY = gql`
  query TypeMovesQuery($gen: Int! $name: String!) {
    typeByName(generation: $gen, name: $name) {
      id 
      modifiedByMove {
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

            pokemon {
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
          stage
          multiplier
          chance
          recipient
        }
      }
    }
  }
`;

export class TypeMoveResult extends AuxToMainConnectionOnPage {
  public stage: number
  public multiplier: number
  public chance: number
  public recipient: string

  public type: TypeName

  public pokemonIconData: PokemonIconDatum[]

  constructor(gqlTypeMove: TypeMoveEdge) {
    super(gqlTypeMove);

    const { stage, multiplier, chance, recipient } = gqlTypeMove;
    this.stage = stage;
    this.multiplier = multiplier;
    this.chance = chance;
    this.recipient = recipient;

    this.type = gqlTypeMove.node.type.edges.map(typeNameEdgeToTypeName)[0];

    this.pokemonIconData = gqlTypeMove.node.pokemon.edges.map(pokemonIconEdgeToPokemonIconDatum);
  }
}

// #endregion

// #endregion