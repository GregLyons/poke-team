import {
    gql
} from '@apollo/client';
import { GenNum } from '../entities';
import {
    AbilityIconEdge,
    IntroductionEdge,
    MoveIconEdge,
    PokemonIconDatum,
    PokemonIconEdge,
    pokemonIconEdgeToPokemonIconDatum,
    TypeIconDatum,
    TypeIconEdge,
    typeIconEdgeToTypeIconDatum,
    TypeName,
    typeNameEdgeToTypeName
} from '../helpers';
import {
    AuxEntityInSearchWithIcon, AuxEntityOnPage, AuxEntityPageResult, AuxEntitySearchResult, AuxToAuxConnectionEdge, AuxToIconConnectionEdge,
    AuxToIconConnectionOnPage, AuxToItemConnectionEdge,
    AuxToItemConnectionOnPage, AuxToMainConnectionEdge, AuxToMainConnectionOnPage, CountField,

    EntityConnectionVars, EntityPageQueryName,
    EntityPageVars, EntitySearchVars, RemovedFromGameQueryVars, VersionDependentDescriptionEdge
} from './helpers';


// Status in main search
// #region

export type StatusSearchQuery = {
  statuses: {
    edges: StatusSearchResult[]
  }
}

export interface StatusSearchResult extends AuxEntitySearchResult {
  node: {
    id: string
    name: string
    formattedName: string
    description: string
    volatile: boolean
  }
}

export interface StatusSearchVars extends EntitySearchVars {
  gen: GenNum
  limit: number
  contains: string
  startsWith: string

  volatile: boolean | null
}

export const STATUS_SEARCH_QUERY = gql`
  query StatusSearchQuery($gen: Int! $limit: Int! $contains: String $startsWith: String $volatile: Boolean) {
    statuses(
      generation: $gen
      filter: { contains: $contains, startsWith: $startsWith, volatile: $volatile }
      pagination: { limit: $limit }
    ) {
      id
      edges {
        node {
          id
          name
          formattedName

          description
          volatile
        }
      }
    }
  }
`;

export class StatusInSearch extends AuxEntityInSearchWithIcon {
  public volatile: boolean;

  constructor(gqlStatus: StatusSearchResult) {
    super(gqlStatus);

    this.volatile = gqlStatus.node.volatile;
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

export interface StatusPageQueryVars extends EntityPageVars, RemovedFromGameQueryVars {
  gen: GenNum
  name: string
  removedFromSwSh: false | null
  removedFromBDSP: false | null
}

export const STATUS_PAGE_QUERY = gql`
  query StatusPageQuery($gen: Int! $name: String! $removedFromSwSh: Boolean $removedFromBDSP: Boolean) {
    statusByName(generation: $gen, name: $name) {
      id
      name
      formattedName
      
      name
      formattedName

      description

      introduced {
        id
        edges {
          node {
            number
          }
        }
      }
      
      causedByAbility {
        id
        count
      }
      causedByFieldState {
        id
        count
      }
      causedByItem {
        id
        count
      }
      causedByMove(filter: {removedFromSwSh: $removedFromSwSh, removedFromBDSP: $removedFromBDSP}) {
        id
        count
      }
      resistedByAbility {
        id
        count
      }
      resistedByFieldState {
        id
        count
      }
      resistedByItem {
        id
        count
      }
      resistedByMove(filter: {removedFromSwSh: $removedFromSwSh, removedFromBDSP: $removedFromBDSP}) {
        id
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

export interface StatusAbilityQueryVars extends EntityConnectionVars, RemovedFromGameQueryVars {
  gen: GenNum
  name: string
  removedFromSwSh: false | null
  removedFromBDSP: false | null
}

export const STATUS_ABILITY_QUERY = gql`
  query StatusAbilitiesQuery($gen: Int! $name: String! $removedFromSwSh: Boolean $removedFromBDSP: Boolean) {
    statusByName(generation: $gen, name: $name) {
      id
      name
      formattedName
       
      causedByAbility {
        id
        edges {
          node {
            id
            name
            formattedName

            descriptions(pagination: {limit: 1}) {
              id
              edges {
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
              id
              edges {
                node {
                  id
                  formattedName
                  psID

                  removedFromSwSh
                  removedFromBDSP

                  typeNames 

                  baseStats {
                    id
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
          chance
        }
      }
      resistedByAbility {
        id
        edges {
          node {
            id
            name
            formattedName

            descriptions(pagination: {limit: 1}) {
              id
              edges {
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
              id
              edges {
                node {
                  id
                  formattedName
                  psID

                  removedFromSwSh
                  removedFromBDSP

                  typeNames 

                  baseStats {
                    id
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

export interface StatusFieldStateEdge extends AuxToIconConnectionEdge, AuxToAuxConnectionEdge {
  node: {
    id: string
    name: string
    formattedName: string
    description: string
  }
  chance?: number
}

export interface StatusFieldStateQueryVars extends EntityConnectionVars {
  gen: GenNum
  name: string
}

export const STATUS_FIELDSTATE_QUERY = gql`
  query StatusFieldStatesQuery($gen: Int! $name: String!) {
    statusByName(generation: $gen, name: $name) {
      id
      name
      formattedName
       
      causedByFieldState {
        id
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
        id
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

export class StatusFieldStateResult extends AuxToIconConnectionOnPage {
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

export interface StatusItemEdge extends AuxToItemConnectionEdge {
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
  chance?: number
}

export interface StatusItemQueryVars extends EntityConnectionVars, RemovedFromGameQueryVars {
  gen: GenNum
  name: string
  removedFromSwSh: false | null
  removedFromBDSP: false | null
}

export const STATUS_ITEM_QUERY = gql`
  query StatusItemsQuery($gen: Int! $name: String! $removedFromSwSh: Boolean $removedFromBDSP: Boolean) {
    statusByName(generation: $gen, name: $name) {
      id
      name
      formattedName
       
      causedByItem {
        id
        edges {
          node {
            id
            name
            formattedName

            descriptions(pagination: {limit: 1}) {
              id
              edges {
                node {
                  text
                }
              }
            }

            requiresPokemon(filter: {removedFromSwSh: $removedFromSwSh, removedFromBDSP: $removedFromBDSP}) {
              id
              edges {
                node {
                  id
                  formattedName
                  psID

                  removedFromSwSh
                  removedFromBDSP

                  typeNames 

                  baseStats {
                    id
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
          chance
        }
      }
      resistedByItem {
        id
        edges {
          node {
            id
            name
            formattedName

            descriptions(pagination: {limit: 1}) {
              id
              edges {
                node {
                  text
                }
              }
            }

            requiresPokemon(filter: {removedFromSwSh: $removedFromSwSh, removedFromBDSP: $removedFromBDSP}) {
              id
              edges {
                node {
                  id
                  formattedName
                  psID

                  removedFromSwSh
                  removedFromBDSP

                  typeNames 

                  baseStats {
                    id
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
        }
      }
    }
  }
`;

export class StatusItemResult extends AuxToItemConnectionOnPage {
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
      edges: TypeIconEdge[]
    }

    pokemon: {
      edges: PokemonIconEdge[]
    }
  }
  chance?: number
}

export interface StatusMoveQueryVars extends EntityConnectionVars, RemovedFromGameQueryVars {
  gen: GenNum
  name: string
  removedFromSwSh: false | null
  removedFromBDSP: false | null
}

export const STATUS_MOVE_QUERY = gql`
  query StatusMovesQuery($gen: Int! $name: String! $removedFromSwSh: Boolean $removedFromBDSP: Boolean) {
    statusByName(generation: $gen, name: $name) {
      id
      name
      formattedName
       
      causedByMove(filter: {removedFromSwSh: $removedFromSwSh, removedFromBDSP: $removedFromBDSP}) {
        id
        edges {
          node {
            id
            name
            formattedName

            descriptions(pagination: {limit: 1}) {
              id
              edges {
                node {
                  text
                }
              }
            }
            
            type {
              id
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
              id
              edges {
                node {
                  id
                  formattedName
                  psID

                  removedFromSwSh
                  removedFromBDSP

                  typeNames 

                  baseStats {
                    id
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
          chance
        }
      }
      resistedByMove(filter: {removedFromSwSh: $removedFromSwSh, removedFromBDSP: $removedFromBDSP}) {
        id
        edges {
          node {
            id
            name
            formattedName

            descriptions(pagination: {limit: 1}) {
              id
              edges {
                node {
                  text
                }
              }
            }
            
            type {
              id
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
              id
              edges {
                node {
                  id
                  formattedName
                  psID

                  removedFromSwSh
                  removedFromBDSP

                  typeNames 

                  baseStats {
                    id
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
        }
      }
    }
  }
`;

export class StatusMoveResult extends AuxToMainConnectionOnPage {
  public type: TypeName
  public chance?: number
  
  public pokemonIconData: PokemonIconDatum[]
  public typeIconDatum: TypeIconDatum

  constructor(gqlStatusMove: StatusMoveEdge) {
    super(gqlStatusMove);

    if (gqlStatusMove.chance) this.chance = gqlStatusMove.chance;

    this.type = gqlStatusMove.node.type.edges.map(typeNameEdgeToTypeName)[0];

    this.pokemonIconData = gqlStatusMove.node.pokemon.edges.map(pokemonIconEdgeToPokemonIconDatum);
    this.typeIconDatum = typeIconEdgeToTypeIconDatum(gqlStatusMove.node.type.edges[0]);
  }
}

// #endregion

// #endregion
