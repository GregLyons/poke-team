import {
  gql,
} from '@apollo/client';

import {
  AbilityIconEdge,
  GenerationNum,
  IntroductionEdge,
  MoveIconEdge,
  PokemonIconDatum,
  PokemonIconEdge,
  pokemonIconEdgeToPokemonIconDatum,
  TypeIconDatum,
  TypeIconEdge,
  typeIconEdgeToTypeIconDatum,
} from '../helpers';
import {
  EntitySearchQueryName,
  EntitySearchVars,
  
  EntityPageQueryName,
  EntityPageVars,
  CountField,

  EntityConnectionVars,

  VersionDependentDescriptionEdge,
  AuxToMainConnectionEdge,
  AuxEntityInSearchWithIcon,
  AuxEntitySearchResult,
  AuxEntityPageResult,
  AuxEntityOnPage,
  AuxToMainConnectionOnPage,
  AuxToAuxConnectionEdge,
  AuxToAuxConnectionOnPage,
  AuxToItemConnectionOnPage,
  RemovedFromGameQueryVars,
  AuxToIconConnectionEdge,
  AuxToIconConnectionOnPage,
} from './helpers';

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
  contains: string
  startsWith: string
}

export const STAT_SEARCH_QUERY = gql`
  query StatSearchQuery($gen: Int! $limit: Int! $contains: String $startsWith: String) {
    stats(
      generation: $gen
      filter: { contains: $contains, startsWith: $startsWith }
      pagination: { limit: $limit }
    ) {
      id
      name
      formattedName

      description
    }
  }
`;

export class StatInSearch extends AuxEntityInSearchWithIcon {
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

export interface StatPageQueryVars extends EntityPageVars, RemovedFromGameQueryVars {
  gen: GenerationNum
  name: string
  removedFromSwSh: false | null
  removedFromBDSP: false | null
}

export const STAT_PAGE_QUERY = gql`
  query StatPageQuery($gen: Int! $name: String! $removedFromSwSh: Boolean $removedFromBDSP: Boolean) {
    statByName(generation: $gen, name: $name) {
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
      
      modifiedByAbility {
        count
      }

      modifiedByFieldState {
        count
      }

      modifiedByItem {
        count
      }

      modifiedByMove(filter: {removedFromSwSh: $removedFromSwSh, removedFromBDSP: $removedFromBDSP}) {
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
    name: string
    formattedName: string
    
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

export interface StatAbilityQueryVars extends EntityConnectionVars, RemovedFromGameQueryVars {
  gen: GenerationNum
  name: string
  removedFromSwSh: false | null
  removedFromBDSP: false | null
}

export const STAT_ABILITY_QUERY = gql`
  query StatAbilitiesQuery($gen: Int! $name: String! $removedFromSwSh: Boolean $removedFromBDSP: Boolean) {
    statByName(generation: $gen, name: $name) {
      id
      name
      formattedName
       
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

            pokemon(filter: {
              formClass: [ALOLA, BASE, GALAR, GMAX, HISUI, MEGA, OTHER],
              removedFromSwSh: $removedFromSwSh,
              removedFromBDSP: $removedFromBDSP
            }) {
              edges {
                node {
                  id
                  formattedName
                  psID

                  removedFromSwSh
                  removedFromBDSP

                  typeNames 

                  baseStats {
                    hp
                    attack
                    defense
                    specialAttack
                    specialDefense
                    speed
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
    name: string
    formattedName: string
    
    modifiedByFieldState: {
      edges: StatFieldStateEdge[]
    }
  }[]
}

export interface StatFieldStateEdge extends AuxToIconConnectionEdge, AuxToAuxConnectionEdge {
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
      name
      formattedName
       
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

export class StatFieldStateResult extends AuxToIconConnectionOnPage {
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
    name: string
    formattedName: string
    
    modifiedByItem: {
      edges: StatItemEdge[]
    }
  }[]
}

export interface StatItemEdge extends AuxToItemConnectionOnPage {
  node: {
    id: string
    name: string
    formattedName: string

    descriptions: {
      edges: VersionDependentDescriptionEdge[]
    }

    requiresPokemon: {
      edges: PokemonIconEdge[]
    }
  }
  stage: number
  multiplier: number
  chance: number
  recipient: string
}

export interface StatItemQueryVars extends EntityConnectionVars, RemovedFromGameQueryVars {
  gen: GenerationNum
  name: string
  removedFromSwSh: false | null
  removedFromBDSP: false | null
}

export const STAT_ITEM_QUERY = gql`
  query StatItemsQuery($gen: Int! $name: String! $removedFromSwSh: Boolean $removedFromBDSP: Boolean) {
    statByName(generation: $gen, name: $name) {
      id
      name
      formattedName
       
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

            requiresPokemon(filter: {removedFromSwSh: $removedFromSwSh, removedFromBDSP: $removedFromBDSP}) {
              edges {
                node {
                  id
                  formattedName
                  psID

                  removedFromSwSh
                  removedFromBDSP

                  typeNames 

                  baseStats {
                    hp
                    attack
                    defense
                    specialAttack
                    specialDefense
                    speed
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

export class StatItemResult extends AuxToItemConnectionOnPage {
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
    name: string
    formattedName: string
    
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
      edges: TypeIconEdge[]
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

export interface StatMoveQueryVars extends EntityConnectionVars, RemovedFromGameQueryVars {
  gen: GenerationNum
  name: string
  removedFromSwSh: false | null
  removedFromBDSP: false | null
}

export const STAT_MOVE_QUERY = gql`
  query StatMovesQuery($gen: Int! $name: String! $removedFromSwSh: Boolean $removedFromBDSP: Boolean) {
    statByName(generation: $gen, name: $name) {
      id
      name
      formattedName
       
      modifiedByMove(filter: {removedFromSwSh: $removedFromSwSh, removedFromBDSP: $removedFromBDSP}) {
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

            pokemon(filter: {
              formClass: [ALOLA, BASE, GALAR, GMAX, HISUI, MEGA, OTHER],
              removedFromSwSh: $removedFromSwSh,
              removedFromBDSP: $removedFromBDSP
            }) {
              edges {
                node {
                  id
                  formattedName
                  psID

                  removedFromSwSh
                  removedFromBDSP

                  typeNames 

                  baseStats {
                    hp
                    attack
                    defense
                    specialAttack
                    specialDefense
                    speed
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

  public pokemonIconData: PokemonIconDatum[]
  public typeIconDatum: TypeIconDatum

  constructor(gqlStatMove: StatMoveEdge) {
    super(gqlStatMove);

    const { stage, multiplier, chance, recipient } = gqlStatMove;
    this.stage = stage;
    this.multiplier = multiplier;
    this.chance = chance;
    this.recipient = recipient;

    this.pokemonIconData = gqlStatMove.node.pokemon.edges.map(pokemonIconEdgeToPokemonIconDatum);
    this.typeIconDatum = typeIconEdgeToTypeIconDatum(gqlStatMove.node.type.edges[0]);
  }
}

// #endregion

// #endregion