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
  TypeName,
  typeNameEdgeToTypeName,
} from './Type';
import {
  DescriptionsEdge,
} from './Description';

// Stat in main search
// #region

export type StatSearchQuery = {
  [searchQueryName in EntitySearchQueryName]: StatSearchResult[]
}

export interface StatSearchResult extends AuxEntitySearchResult {
  id: string
  name: string
  formattedName: string
  description: string
}

export interface StatSearchVars extends EntitySearchVars {
  gen: GenerationNum
  limit: number
  startsWith: string
}

export const STAT_SEARCH_QUERY = gql`
  query StatSearchQuery($gen: Int! $limit: Int! $startsWith: String) {
    stats(
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

export class StatInSearch extends AuxEntityInSearch {
  constructor(gqlStat: StatSearchResult) {
    super(gqlStat);
  }
}

// #endregion

// Stat page
// #region

export type StatPageQuery = {
  [pageQueryName in EntityPageQueryName]?: StatPageResult[]
}

export type IntroductionQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    introduced: {
      edges: IntroductionEdge[]
    }
  }[]
}

export interface StatPageResult extends AuxEntityPageResult {
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

export interface StatPageQueryVars extends EntityPageVars {
  gen: GenerationNum
  name: string
}

export const STAT_PAGE_QUERY = gql`
  query StatPageQuery($gen: Int! $name: String!) {
    statByName(generation: $gen, name: $name) {
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

export class StatOnPage extends AuxEntityOnPage {
  public modifiedByAbilityCount: number
  public modifiedByFieldStateCount: number
  public modifiedByItemCount: number
  public modifiedByMoveCount: number

  constructor(gqlStat: StatPageResult) {
    super(gqlStat);

    // Counts for displaying accordions
    this.modifiedByAbilityCount = gqlStat.modifiedByAbility.count;
    this.modifiedByFieldStateCount = gqlStat.modifiedByFieldState.count;
    this.modifiedByItemCount = gqlStat.modifiedByItem.count;
    this.modifiedByMoveCount = gqlStat.modifiedByMove.count;
  }
}

// #endregion

// Stat connections
// #region

// StatAbility
// #region

export type StatAbilityQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    modifiedByAbility: {
      edges: StatAbilityEdge[]
    }
  }[]
}

export interface StatAbilityEdge extends AbilityIconEdge, AuxToMainConnectionEdge {
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

export interface StatAbilityQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const STAT_ABILITY_QUERY = gql`
  query StatAbilitiesQuery($gen: Int! $name: String!) {
    statByName(generation: $gen, name: $name) {
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

export class StatAbilityResult extends AuxToMainConnectionOnPage {
  public pokemonIconData: PokemonIconDatum[]
  public stage: number
  public multiplier: number
  public chance: number
  public recipient: string

  constructor(gqlStatAbility: StatAbilityEdge) {
    super(gqlStatAbility);

    const { stage, multiplier, chance, recipient } = gqlStatAbility;
    this.stage = stage;
    this.multiplier = multiplier;
    this.chance = chance;
    this.recipient = recipient;

    this.pokemonIconData = gqlStatAbility.node.pokemon.edges.map(pokemonIconEdgeToPokemonIconDatum);
  }
}

// #endregion

// StatFieldState
// #region

export type StatFieldStateQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    modifiedByFieldState: {
      edges: StatFieldStateEdge[]
    }
  }[]
}

export interface StatFieldStateEdge extends AuxToAuxConnectionEdge {
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

export interface StatFieldStateQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const STAT_FIELDSTATE_QUERY = gql`
  query StatFieldStatesQuery($gen: Int! $name: String!) {
    statByName(generation: $gen, name: $name) {
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

export class StatFieldStateResult extends AuxToAuxConnectionOnPage {
  public stage: number
  public multiplier: number
  public chance: number
  public recipient: string

  constructor(gqlStatFieldState: StatFieldStateEdge) {
    super(gqlStatFieldState);

    const { stage, multiplier, chance, recipient } = gqlStatFieldState;
    this.stage = stage;
    this.multiplier = multiplier;
    this.chance = chance;
    this.recipient = recipient;
  }
}

// #endregion

// StatItem
// #region

export type StatItemQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    modifiedByItem: {
      edges: StatItemEdge[]
    }
  }[]
}

export interface StatItemEdge extends AuxToMainConnectionEdge {
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

export interface StatItemQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const STAT_ITEM_QUERY = gql`
  query StatItemsQuery($gen: Int! $name: String!) {
    statByName(generation: $gen, name: $name) {
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

export class StatItemResult extends AuxToMainConnectionOnPage {
  public stage: number
  public multiplier: number
  public chance: number
  public recipient: string

  constructor(gqlStatItem: StatItemEdge) {
    super(gqlStatItem);

    const { stage, multiplier, chance, recipient } = gqlStatItem;
    this.stage = stage;
    this.multiplier = multiplier;
    this.chance = chance;
    this.recipient = recipient;
  }
}

// #endregion

// StatMove
// #region

export type StatMoveQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    modifiedByMove: {
      edges: StatMoveEdge[]
    }
  }[]
}

export interface StatMoveEdge extends MoveIconEdge, AuxToMainConnectionEdge {
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

export interface StatMoveQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const STAT_MOVE_QUERY = gql`
  query StatMovesQuery($gen: Int! $name: String!) {
    statByName(generation: $gen, name: $name) {
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

export class StatMoveResult extends AuxToMainConnectionOnPage {
  public stage: number
  public multiplier: number
  public chance: number
  public recipient: string

  public type: TypeName

  public pokemonIconData: PokemonIconDatum[]

  constructor(gqlStatMove: StatMoveEdge) {
    super(gqlStatMove);

    const { stage, multiplier, chance, recipient } = gqlStatMove;
    this.stage = stage;
    this.multiplier = multiplier;
    this.chance = chance;
    this.recipient = recipient;

    this.type = gqlStatMove.node.type.edges.map(typeNameEdgeToTypeName)[0];

    this.pokemonIconData = gqlStatMove.node.pokemon.edges.map(pokemonIconEdgeToPokemonIconDatum);
  }
}

// #endregion

// #endregion