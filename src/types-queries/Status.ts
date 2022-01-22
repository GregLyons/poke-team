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
import { DescriptionsEdge } from './Description';

// Status in main search
// #region

export type StatusSearchQuery = {
  [searchQueryName in EntitySearchQueryName]: StatusSearchResult[]
}

export interface StatusSearchResult extends AuxEntitySearchResult {
  id: string
  name: string
  formattedName: string
  description: string
  volatile: boolean
}

export interface StatusSearchVars extends EntitySearchVars {
  gen: GenerationNum
  limit: number
  startsWith: string
}

export const STATUS_SEARCH_QUERY = gql`
  query StatusSearchQuery($gen: Int! $limit: Int! $startsWith: String) {
    statuses(
      generation: $gen
      filter: { startsWith: $startsWith }
      pagination: { limit: $limit }
    ) {
      id
      name
      formattedName

      description
      volatile
    }
  }
`;

export class StatusInSearch extends AuxEntityInSearch {
  public volatile: boolean;

  constructor(gqlStatus: StatusSearchResult) {
    super(gqlStatus);

    this.volatile = gqlStatus.volatile;
  }
}

// #endregion

// Status page
// #region

export type StatusPageQuery = {
  [pageQueryName in EntityPageQueryName]?: StatusPageResult[]
}

export type IntroductionQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    introduced: {
      edges: IntroductionEdge[]
    }
  }[]
}

export interface StatusPageResult extends AuxEntityPageResult {
  id: string
  name: string
  formattedName: string

  description: string

  introduced: {
    edges: IntroductionEdge[]
  }

  volatile: boolean

  causedByAbility: CountField
  causedByFieldState: CountField
  causedByItem: CountField
  causedByMove: CountField
  resistedByAbility: CountField
  resistedByFieldState: CountField
  resistedByItem: CountField
  resistedByMove: CountField
}

export interface StatusPageQueryVars extends EntityPageVars {
  gen: GenerationNum
  name: string
}

export const STATUS_PAGE_QUERY = gql`
  query StatusPageQuery($gen: Int! $name: String!) {
    statusByName(generation: $gen, name: $name) {
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
      
      causedByAbility {
        count
      }
      causedByFieldState {
        count
      }
      causedByItem {
        count
      }
      causedByMove {
        count
      }
      resistedByAbility {
        count
      }
      resistedByFieldState {
        count
      }
      resistedByItem {
        count
      }
      resistedByMove {
        count
      }
    }
  }
`;

export class StatusOnPage extends AuxEntityOnPage {
  public causedByAbilityCount: number
  public causedByFieldStateCount: number
  public causedByItemCount: number
  public causedByMoveCount: number
  public resistedByAbilityCount: number
  public resistedByFieldStateCount: number
  public resistedByItemCount: number
  public resistedByMoveCount: number

  public abilityCount: number
  public fieldStateCount: number
  public itemCount: number
  public moveCount: number

  constructor(gqlStatus: StatusPageResult) {
    super(gqlStatus);

    // Counts for displaying accordions
    this.causedByAbilityCount = gqlStatus.causedByAbility.count;
    this.causedByFieldStateCount = gqlStatus.causedByFieldState.count;
    this.causedByItemCount = gqlStatus.causedByItem.count;
    this.causedByMoveCount = gqlStatus.causedByMove.count;
    this.resistedByAbilityCount = gqlStatus.resistedByAbility.count;
    this.resistedByFieldStateCount = gqlStatus.resistedByFieldState.count;
    this.resistedByItemCount = gqlStatus.resistedByItem.count;
    this.resistedByMoveCount = gqlStatus.resistedByMove.count;

    this.abilityCount = this.causedByAbilityCount + this.resistedByAbilityCount;
    this.fieldStateCount = this.causedByFieldStateCount + this.resistedByFieldStateCount;
    this.itemCount = this.causedByItemCount + this.resistedByItemCount;
    this.moveCount = this.causedByMoveCount + this.resistedByMoveCount;
  }
}

// #endregion

// Status connections
// #region

// StatusAbility
// #region

export type StatusAbilityQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    name: string
    formattedName: string
    
    causedByAbility: {
      edges: StatusAbilityEdge[]
    }
    resistedByAbility: {
      edges: StatusAbilityEdge[]
    }
  }[]
}

export interface StatusAbilityEdge extends AbilityIconEdge, AuxToMainConnectionEdge {
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
  chance?: number
}

export interface StatusAbilityQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const STATUS_ABILITY_QUERY = gql`
  query StatusAbilitiesQuery($gen: Int! $name: String!) {
    statusByName(generation: $gen, name: $name) {
      id
      name
      formattedName
       
      causedByAbility {
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

            pokemon(filter: {formClass: [ALOLA, BASE, COSMETIC, GALAR, GMAX, HISUI, MEGA, OTHER]}) {
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
          chance
        }
      }
      resistedByAbility {
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

            pokemon(filter: {formClass: [ALOLA, BASE, COSMETIC, GALAR, GMAX, HISUI, MEGA, OTHER]}) {
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

export class StatusAbilityResult extends AuxToMainConnectionOnPage {
  public pokemonIconData: PokemonIconDatum[]
  public chance?: number

  constructor(gqlStatusAbility: StatusAbilityEdge) {
    super(gqlStatusAbility);

    if (gqlStatusAbility.chance) this.chance = gqlStatusAbility.chance;

    this.pokemonIconData = gqlStatusAbility.node.pokemon.edges.map(pokemonIconEdgeToPokemonIconDatum);
  }
}

// #endregion

// StatusFieldState
// #region

export type StatusFieldStateQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    name: string
    formattedName: string
    
    causedByFieldState: {
      edges: StatusFieldStateEdge[]
    }
    resistedByFieldState: {
      edges: StatusFieldStateEdge[]
    }
  }[]
}

export interface StatusFieldStateEdge extends AuxToAuxConnectionEdge {
  node: {
    id: string
    name: string
    formattedName: string
    description: string
  }
  chance?: number
}

export interface StatusFieldStateQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const STATUS_FIELDSTATE_QUERY = gql`
  query StatusFieldStatesQuery($gen: Int! $name: String!) {
    statusByName(generation: $gen, name: $name) {
      id
      name
      formattedName
       
      causedByFieldState {
        edges {
          node {
            id
            name
            formattedName

            description
          }
          chance
        }
      }
      resistedByFieldState {
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

export class StatusFieldStateResult extends AuxToAuxConnectionOnPage {
  public chance?: number

  constructor(gqlStatusFieldState: StatusFieldStateEdge) {
    super(gqlStatusFieldState);

    if (gqlStatusFieldState.chance) this.chance = gqlStatusFieldState.chance;
  }
}

// #endregion

// StatusItem
// #region

export type StatusItemQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    name: string
    formattedName: string
    
    causedByItem: {
      edges: StatusItemEdge[]
    }
    resistedByItem: {
      edges: StatusItemEdge[]
    }
  }[]
}

export interface StatusItemEdge extends AuxToMainConnectionEdge {
  node: {
    id: string
    name: string
    formattedName: string

    descriptions: { 
      edges: VersionDependentDescriptionEdge[]
    }
  }
  chance?: number
}

export interface StatusItemQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const STATUS_ITEM_QUERY = gql`
  query StatusItemsQuery($gen: Int! $name: String!) {
    statusByName(generation: $gen, name: $name) {
      id
      name
      formattedName
       
      causedByItem {
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
          chance
        }
      }
      resistedByItem {
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

export class StatusItemResult extends AuxToMainConnectionOnPage {
  public chance?: number

  constructor(gqlStatusItem: StatusItemEdge) {
    super(gqlStatusItem);

    if (gqlStatusItem.chance) this.chance = gqlStatusItem.chance;
  }
}

// #endregion

// StatusMove Cause
// #region

export type StatusMoveQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    name: string
    formattedName: string
    
    causedByMove: {
      edges: StatusMoveEdge[]
    }
    resistedByMove: {
      edges: StatusMoveEdge[]
    }
  }[]
}

export interface StatusMoveEdge extends MoveIconEdge, AuxToMainConnectionEdge {
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
  chance?: number
}

export interface StatusMoveQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const STATUS_MOVE_QUERY = gql`
  query StatusMovesQuery($gen: Int! $name: String!) {
    statusByName(generation: $gen, name: $name) {
      id
      name
      formattedName
       
      causedByMove {
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
            
            type {
              edges {
                node {
                  id
                  name
                  formattedName
                }
              }
            }

            pokemon(filter: {formClass: [ALOLA, BASE, COSMETIC, GALAR, GMAX, HISUI, MEGA, OTHER]}) {
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
          chance
        }
      }
      resistedByMove {
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
            
            type {
              edges {
                node {
                  id
                  name
                  formattedName
                }
              }
            }

            pokemon(filter: {formClass: [ALOLA, BASE, COSMETIC, GALAR, GMAX, HISUI, MEGA, OTHER]}) {
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

export class StatusMoveResult extends AuxToMainConnectionOnPage {
  public pokemonIconData: PokemonIconDatum[]
  public type: TypeName
  public chance?: number

  constructor(gqlStatusMove: StatusMoveEdge) {
    super(gqlStatusMove);

    if (gqlStatusMove.chance) this.chance = gqlStatusMove.chance;

    this.type = gqlStatusMove.node.type.edges.map(typeNameEdgeToTypeName)[0];

    this.pokemonIconData = gqlStatusMove.node.pokemon.edges.map(pokemonIconEdgeToPokemonIconDatum);
  }
}

// #endregion

// #endregion
