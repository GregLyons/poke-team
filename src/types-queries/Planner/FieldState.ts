import {
  gql,
} from '@apollo/client';

import {
  AbilityIconEdge,
  DescriptionEdge,
  GenerationNum,
  IntroductionEdge,
  ItemIconDatum,
  ItemRequiresPokemonEdge,
  itemIconEdgeToItemIconDatum,
  MoveIconEdge,
  PokemonIconDatum,
  PokemonIconEdge,
  pokemonIconEdgeToPokemonIconDatum,
  TypeIconEdge,
  TypeName, 
  TypeNameEdge,
  typeNameEdgeToTypeName,
  TypeIconDatum,
  typeIconEdgeToTypeIconDatum,
} from '../helpers';
import {
  EntitySearchQueryName,
  EntitySearchVars,
  
  EntityPageQueryName,
  EntityPageVars,
  CountField,
  
  EntityConnectionVars,

  AuxToMainConnectionEdge,
  AuxToMainConnectionOnPage,
  VersionDependentDescriptionEdge,
  AuxToAuxConnectionEdge,
  AuxToAuxConnectionOnPage,
  AuxEntityInSearch,
  AuxEntitySearchResult,
  AuxEntityPageResult,
  AuxEntityOnPage,
  AuxToItemConnectionOnPage,
  AuxToItemConnectionEdge,
  RemovedFromGameQueryVars,
} from './helpers';

// FieldState in main search
// #region

export type FieldStateSearchQuery = {
  [searchQueryName in EntitySearchQueryName]: FieldStateSearchResult[]
}

export interface FieldStateSearchResult extends AuxEntitySearchResult {
  id: string
  name: string
  formattedName: string
  description: string

  class: string
  damagePercent: number
  grounded: boolean
  maxLayers: number
  target: string
}

export interface FieldStateSearchVars extends EntitySearchVars {
  gen: GenerationNum
  limit: number
  startsWith: string
}

export const FIELDSTATE_SEARCH_QUERY = gql`
  query FieldStateSearchQuery($gen: Int! $limit: Int! $startsWith: String) {
    fieldStates(
      generation: $gen
      filter: { startsWith: $startsWith }
      pagination: { limit: $limit }
    ) {
      id
      name
      formattedName

      description

      class
      damagePercent
      grounded
      maxLayers
      target
    }
  }
`;

export class FieldStateInSearch extends AuxEntityInSearch {
  public damagePercent: number
  public fieldStateClass: string
  public grounded: boolean
  public maxLayers: number
  public target: string

  constructor(gqlFieldState: FieldStateSearchResult) {
    super(gqlFieldState);

    const { damagePercent, class: fieldStateClass, grounded, maxLayers, target, } = gqlFieldState;
    this.damagePercent = damagePercent;
    this.fieldStateClass = fieldStateClass;
    this.grounded = grounded;
    this.maxLayers = maxLayers;
    this.target = target;
  }
}

// #endregion

// FieldState page
// #region

export type FieldStatePageQuery = {
  [pageQueryName in EntityPageQueryName]?: FieldStatePageResult[]
}

export type IntroductionQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    introduced: {
      edges: IntroductionEdge[]
    }
  }[]
}

export interface FieldStatePageResult extends AuxEntityPageResult {
  id: string
  name: string
  formattedName: string
  description: string

  introduced: {
    edges: IntroductionEdge[]
  }

  activatesAbility: CountField
  activatesItem: CountField
  boostsType: CountField
  causesStatus: CountField
  createdByAbility: CountField
  createdByMove: CountField
  effects: CountField
  enhancesMove: CountField
  extendedByItem: CountField
  hindersMove: CountField
  ignoredByAbility: CountField
  ignoredByItem: CountField
  ignoredByType: CountField
  modifiesStat: CountField
  preventedByAbility: CountField
  removedByAbility: CountField
  removedByMove: CountField
  removedByType: CountField
  resistedByItem: CountField
  resistedByType: CountField
  resistsStatus: CountField
  weakensType: CountField
  suppressedByAbility: CountField
  weatherBall: CountField
}

export interface FieldStatePageQueryVars extends EntityPageVars, RemovedFromGameQueryVars {
  gen: GenerationNum
  name: string
  removedFromSwSh: false | null
  removedFromBDSP: false | null
}

export const FIELDSTATE_PAGE_QUERY = gql`
  query FieldStatePageQuery($gen: Int! $name: String! $removedFromSwSh: Boolean $removedFromBDSP: Boolean) {
    fieldStateByName(generation: $gen, name: $name) {
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
      
      activatesAbility {
        count
      }
      activatesItem {
        count
      }
      boostsType {
        count
      }
      causesStatus {
        count
      }
      createdByAbility {
        count
      }
      createdByMove(filter: {removedFromSwSh: $removedFromSwSh, removedFromBDSP: $removedFromBDSP}) {
        count
      }
      effects {
        count
      }
      enhancesMove(filter: {removedFromSwSh: $removedFromSwSh, removedFromBDSP: $removedFromBDSP}) {
        count
      }
      extendedByItem {
        count
      }
      hindersMove(filter: {removedFromSwSh: $removedFromSwSh, removedFromBDSP: $removedFromBDSP}) {
        count
      }
      ignoredByAbility {
        count
      }
      ignoredByItem {
        count
      }
      ignoredByType {
        count
      }
      modifiesStat {
        count
      }
      preventedByAbility {
        count
      }
      removedByAbility {
        count
      }
      removedByMove(filter: {removedFromSwSh: $removedFromSwSh, removedFromBDSP: $removedFromBDSP}) {
        count
      }
      removedByType {
        count
      }
      resistedByItem {
        count
      }
      resistedByType {
        count
      }
      resistsStatus {
        count
      }
      weakensType {
        count
      }
      suppressedByAbility {
        count
      }
      weatherBall {
        count
      }
    }
  }
`;

export class FieldStateOnPage extends AuxEntityOnPage {
  public activatesAbilityCount: number
  public activatesItemCount: number
  public boostsTypeCount: number
  public causesStatusCount: number
  public createdByAbilityCount: number
  public createdByMoveCount: number
  public effectCount: number
  public enhancesMoveCount: number
  public extendedByItemCount: number
  public hindersMoveCount: number
  public ignoredByAbilityCount: number
  public ignoredByItemCount: number
  public ignoredByTypeCount: number
  public modifiesStatCount: number
  public preventedByAbilityCount: number
  public removedByAbilityCount: number
  public removedByMoveCount: number
  public removedByTypeCount: number
  public resistedByItemCount: number
  public resistedByTypeCount: number
  public resistsStatusCount: number
  public weakensTypeCount: number
  public suppressedByAbilityCount: number
  public weatherBallCount: number

  public abilityCount: number
  public itemCount: number
  public moveCount: number
  public statusCount: number
  public typeCount: number

  constructor(gqlFieldState: FieldStatePageResult) {
    super(gqlFieldState);

    // Counts for displaying accordions
    this.activatesAbilityCount = gqlFieldState.activatesAbility.count;
    this.activatesItemCount = gqlFieldState.activatesItem.count;
    this.boostsTypeCount = gqlFieldState.boostsType.count;
    this.causesStatusCount = gqlFieldState.causesStatus.count;
    this.createdByAbilityCount = gqlFieldState.createdByAbility.count;
    this.createdByMoveCount = gqlFieldState.createdByMove.count;
    this.effectCount = gqlFieldState.effects.count;
    this.enhancesMoveCount = gqlFieldState.enhancesMove.count;
    this.extendedByItemCount = gqlFieldState.extendedByItem.count;
    this.hindersMoveCount = gqlFieldState.hindersMove.count;
    this.ignoredByAbilityCount = gqlFieldState.ignoredByAbility.count;
    this.ignoredByItemCount = gqlFieldState.ignoredByItem.count;
    this.ignoredByTypeCount = gqlFieldState.ignoredByType.count;
    this.modifiesStatCount = gqlFieldState.modifiesStat.count;
    this.preventedByAbilityCount = gqlFieldState.preventedByAbility.count;
    this.removedByAbilityCount = gqlFieldState.removedByAbility.count;
    this.removedByMoveCount = gqlFieldState.removedByMove.count;
    this.removedByTypeCount = gqlFieldState.removedByType.count;
    this.resistedByItemCount = gqlFieldState.resistedByItem.count;
    this.resistedByTypeCount = gqlFieldState.resistedByType.count;
    this.resistsStatusCount = gqlFieldState.resistsStatus.count;
    this.weakensTypeCount = gqlFieldState.weakensType.count;
    this.suppressedByAbilityCount = gqlFieldState.suppressedByAbility.count;
    this.weatherBallCount = gqlFieldState.weatherBall.count;

    this.abilityCount = this.activatesAbilityCount + this.createdByAbilityCount + this.ignoredByAbilityCount + this.preventedByAbilityCount + this.removedByAbilityCount + this.suppressedByAbilityCount;

    this.itemCount = this.activatesItemCount + this.extendedByItemCount + this.ignoredByItemCount + this.resistedByItemCount;

    this.moveCount = this.createdByMoveCount + this.enhancesMoveCount + this.hindersMoveCount + this.removedByMoveCount;

    this.statusCount = this.causesStatusCount + this.resistsStatusCount;

    this.typeCount = this.boostsTypeCount + this.ignoredByTypeCount + this.removedByTypeCount + this.removedByTypeCount + this.resistedByTypeCount + this.weakensTypeCount + this.weatherBallCount;
  }
}

// #endregion

// FieldState connections
// #region

// FieldStateAbility
// #region

export type FieldStateAbilityQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    name: string
    formattedName: string
    
    activatesAbility: {
      edges: FieldStateAbilityEdge[]
    }
    createdByAbility: {
      edges: FieldStateAbilityEdge[]
    }
    ignoredByAbility: {
      edges: FieldStateAbilityEdge[]
    }
    preventedByAbility: {
      edges: FieldStateAbilityEdge[]
    }
    removedByAbility: {
      edges: FieldStateAbilityEdge[]
    }
    suppressedByAbility: {
      edges: FieldStateAbilityEdge[]
    }
  }[]
}

export interface FieldStateAbilityEdge extends AbilityIconEdge, AuxToMainConnectionEdge {
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
  turns?: number
}

export interface FieldStateAbilityQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const FIELDSTATE_ABILITY_QUERY = gql`
  query FieldStateAbilitiesQuery($gen: Int! $name: String! $removedFromSwSh: Boolean $removedFromBDSP: Boolean) {
    fieldStateByName(generation: $gen, name: $name) {
      id
      name
      formattedName
       
      activatesAbility {
        edges {
          node {
            id
            name
            formattedName

            descriptions {
              edges (pagination: {limit: 1}) {
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
                  name
                  formattedName
                  pokemonShowdownID
                }
              }
            }
          }
        }
      }
      createdByAbility {
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
                  name
                  formattedName
                  pokemonShowdownID
                }
              }
            }
          }
          turns
        }
      }
      ignoredByAbility {
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
                  name
                  formattedName
                  pokemonShowdownID
                }
              }
            }
          }
        }
      }
      preventedByAbility {
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
                  name
                  formattedName
                  pokemonShowdownID
                }
              }
            }
          }
        }
      }
      removedByAbility {
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
                  name
                  formattedName
                  pokemonShowdownID
                }
              }
            }
          }
        }
      }
      suppressedByAbility {
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
                  name
                  formattedName
                  pokemonShowdownID
                }
              }
            }
          }
        }
      }
    }
  }
`;

export class FieldStateAbilityResult extends AuxToMainConnectionOnPage {
  public pokemonIconData: PokemonIconDatum[]
  public turns?: number

  constructor(gqlFieldStateAbility: FieldStateAbilityEdge) {
    super(gqlFieldStateAbility);

    this.pokemonIconData = gqlFieldStateAbility.node.pokemon.edges.map(pokemonIconEdgeToPokemonIconDatum);
    if (gqlFieldStateAbility.turns) this.turns = gqlFieldStateAbility.turns;
  }
}

// #endregion

// FieldStateEffect
// #region

export type FieldStateEffectQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    name: string
    formattedName: string
    
    effects: {
      edges: FieldStateEffectEdge[]
    }
  }[]
}

export interface FieldStateEffectEdge extends AuxToAuxConnectionEdge {
  node: {
    id: string
    name: string
    formattedName: string

    description: string
  }
}

export interface FieldStateEffectQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const FIELDSTATE_EFFECT_QUERY = gql`
  query FieldStateEffectQuery($gen: Int! $name: String!) {
    fieldStateByName(generation: $gen, name: $name) {
      id
      name
      formattedName
      
      effects {
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

export class FieldStateEffectResult extends AuxToAuxConnectionOnPage {
  constructor(gqlFieldStateEffect: FieldStateEffectEdge) {
    super(gqlFieldStateEffect)
  }
}

// #endregion

// FieldStateItem
// #region

export type FieldStateItemQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    name: string
    formattedName: string
    
    activatesItem: {
      edges: FieldStateItemEdge[]
    }
    extendedByItem: {
      edges: FieldStateItemEdge[]
    }
    ignoredByItem: {
      edges: FieldStateItemEdge[]
    }
    resistedByItem: {
      edges: FieldStateItemEdge[]
    }
  }[]
}

export interface FieldStateItemEdge extends AuxToItemConnectionEdge {
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
  turns?: number
}

export interface FieldStateItemQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const FIELDSTATE_ITEM_QUERY = gql`
  query FieldStateItemsQuery($gen: Int! $name: String! $removedFromSwSh: Boolean $removedFromBDSP: Boolean) {
    fieldStateByName(generation: $gen, name: $name) {
      id
      name
      formattedName
       
      activatesItem {
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
                  name
                  formattedName
                  pokemonShowdownID
                }
              }
            }
          }
        }
      }
      extendedByItem {
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
                  name
                  formattedName
                  pokemonShowdownID
                }
              }
            }
          }
          turns
        }
      }
      ignoredByItem {
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
                  name
                  formattedName
                  pokemonShowdownID
                }
              }
            }
          }
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

            requiresPokemon(filter: {removedFromSwSh: $removedFromSwSh, removedFromBDSP: $removedFromBDSP}) {
              edges {
                node {
                  id
                  name
                  formattedName
                  pokemonShowdownID
                }
              }
            }
          }
        }
      }
    }
  }
`;

export class FieldStateItemResult extends AuxToItemConnectionOnPage {
  public itemIconData: ItemIconDatum
  public turns?: number

  constructor(gqlFieldStateItem: FieldStateItemEdge) {
    super(gqlFieldStateItem);

    this.itemIconData = itemIconEdgeToItemIconDatum(gqlFieldStateItem);
    if (gqlFieldStateItem.turns) this.turns = gqlFieldStateItem.turns;
  }
}

// #endregion

// FieldStateMove
// #region

export type FieldStateMoveQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    name: string
    formattedName: string
    
    createdByMove: {
      edges: FieldStateMoveEdge[]
    }
    enhancesMove: {
      edges: FieldStateMoveEdge[]
    }
    hindersMove: {
      edges: FieldStateMoveEdge[]
    }
    removedByMove: {
      edges: FieldStateMoveEdge[]
    }
  }[]
}

export interface FieldStateMoveEdge extends MoveIconEdge, AuxToMainConnectionEdge {
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
  turns?: number
}

export interface FieldStateMoveQueryVars extends EntityConnectionVars, RemovedFromGameQueryVars {
  gen: GenerationNum
  name: string
  removedFromSwSh: false | null
  removedFromBDSP: false | null
}

export const FIELDSTATE_MOVE_QUERY = gql`
  query FieldStateMovesQuery($gen: Int! $name: String! $removedFromSwSh: Boolean $removedFromBDSP: Boolean) {
    fieldStateByName(generation: $gen, name: $name) {
      id
      name
      formattedName
       
      createdByMove(filter: {removedFromSwSh: $removedFromSwSh, removedFromBDSP: $removedFromBDSP}) {
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

            pokemon(filter: {
              formClass: [ALOLA, BASE, GALAR, GMAX, HISUI, MEGA, OTHER],
              removedFromSwSh: $removedFromSwSh,
              removedFromBDSP: $removedFromBDSP
            }) {
              edges {
                node {
                  id
                  name
                  formattedName
                  pokemonShowdownID
                }
              }
            }
          }
          turns
        }
      }
      enhancesMove(filter: {removedFromSwSh: $removedFromSwSh, removedFromBDSP: $removedFromBDSP}) {
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

            pokemon(filter: {
              formClass: [ALOLA, BASE, GALAR, GMAX, HISUI, MEGA, OTHER],
              removedFromSwSh: $removedFromSwSh,
              removedFromBDSP: $removedFromBDSP
            }) {
              edges {
                node {
                  id
                  name
                  formattedName
                  pokemonShowdownID
                }
              }
            }
          }
        }
      }
      hindersMove(filter: {removedFromSwSh: $removedFromSwSh, removedFromBDSP: $removedFromBDSP}) {
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

            pokemon(filter: {
              formClass: [ALOLA, BASE, GALAR, GMAX, HISUI, MEGA, OTHER],
              removedFromSwSh: $removedFromSwSh,
              removedFromBDSP: $removedFromBDSP
            }) {
              edges {
                node {
                  id
                  name
                  formattedName
                  pokemonShowdownID
                }
              }
            }
          }
        }
      }
      removedByMove(filter: {removedFromSwSh: $removedFromSwSh, removedFromBDSP: $removedFromBDSP}) {
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

            pokemon(filter: {
              formClass: [ALOLA, BASE, GALAR, GMAX, HISUI, MEGA, OTHER],
              removedFromSwSh: $removedFromSwSh,
              removedFromBDSP: $removedFromBDSP
            }) {
              edges {
                node {
                  id
                  name
                  formattedName
                  pokemonShowdownID
                }
              }
            }
          }
        }
      }
    }
  }
`;

export class FieldStateMoveResult extends AuxToMainConnectionOnPage {
  public turns?: number

  public pokemonIconData: PokemonIconDatum[]
  public typeIconDatum: TypeIconDatum

  constructor(gqlFieldStateMove: FieldStateMoveEdge) {
    super(gqlFieldStateMove);

    if (gqlFieldStateMove.turns) this.turns = gqlFieldStateMove.turns;

    this.pokemonIconData = gqlFieldStateMove.node.pokemon.edges.map(pokemonIconEdgeToPokemonIconDatum);
    this.typeIconDatum = typeIconEdgeToTypeIconDatum(gqlFieldStateMove.node.type.edges[0]);
  }
}

// #endregion

// FieldStateStat
// #region

export type FieldStateStatQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    name: string
    formattedName: string
    
    modifiesStat: {
      edges: FieldStateStatEdge[]
    }
  }[]
}

export interface FieldStateStatEdge extends AuxToAuxConnectionEdge {
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

export interface FieldStateStatQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const FIELDSTATE_STAT_QUERY = gql`
  query FieldStateStatQuery($gen: Int! $name: String!) {
    fieldStateByName(generation: $gen, name: $name) {
      id
      name
      formattedName
      
      modifiesStat {
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

export class FieldStateStatResult extends AuxToAuxConnectionOnPage {
  public stage: number
  public multiplier: number
  public chance: number
  public recipient: string

  constructor(gqlFieldStateStat: FieldStateStatEdge) {
    super(gqlFieldStateStat);

    const { stage, multiplier, chance, recipient } = gqlFieldStateStat;
    this.stage = stage;
    this.multiplier = multiplier;
    this.chance = chance;
    this.recipient = recipient;
  }
}

// #endregion

// FieldStateStatus
// #region

export type FieldStateStatusQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    name: string
    formattedName: string
    
    causesStatus: {
      edges: FieldStateStatusEdge[]
    }
    resistsStatus: {
      edges: FieldStateStatusEdge[]
    }
  }[]
}

export interface FieldStateStatusEdge extends AuxToAuxConnectionEdge {
  node: {
    id: string
    name: string
    formattedName: string

    description: string
  }
  chance?: number
}

export interface FieldStateStatusQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const FIELDSTATE_STATUS_QUERY = gql`
  query FieldStateStatusQuery($gen: Int! $name: String!) {
    fieldStateByName(generation: $gen, name: $name) {
      id
      name
      formattedName
      
      causesStatus {
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
      resistsStatus {
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

export class FieldStateStatusResult extends AuxToAuxConnectionOnPage {
  public chance?: number

  constructor(gqlFieldStateStatus: FieldStateStatusEdge) {
    super(gqlFieldStateStatus);

    if (gqlFieldStateStatus.chance) this.chance = gqlFieldStateStatus.chance;
  }
}

// #endregion
 
// FieldStateType
// #region

export type FieldStateTypeQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    name: string
    formattedName: string
    
    boostsType: {
      edges: FieldStateTypeEdge[]
    }
    ignoredByType: {
      edges: FieldStateTypeEdge[]
    }
    removedByType: {
      edges: FieldStateTypeEdge[]
    }
    resistedByType: {
      edges: FieldStateTypeEdge[]
    }
    weakensType: {
      edges: FieldStateTypeEdge[]
    }
    weatherBall: {
      edges: FieldStateTypeEdge[]
    }
  }[]
}

export interface FieldStateTypeEdge extends AuxToAuxConnectionEdge, TypeIconEdge {
  node: {
    id: string
    name: TypeName
    formattedName: string

    introduced: {
      edges: IntroductionEdge[]
    }

    pokemon?: {
      edges: PokemonIconEdge[]
    }
  }
  multiplier?: number
}

export interface FieldStateTypeQueryVars extends EntityConnectionVars, RemovedFromGameQueryVars {
  gen: GenerationNum
  name: string
  removedFromSwSh: false | null
  removedFromBDSP: false | null
}

export const FIELDSTATE_TYPE_QUERY = gql`
  query FieldStateStatQuery($gen: Int! $name: String! $removedFromSwSh: Boolean $removedFromBDSP: Boolean) {
    fieldStateByName(generation: $gen, name: $name) {
      id
      name
      formattedName
      
      boostsType {
        edges {
          node {
            id
            name
            formattedName
          }
          multiplier
        }
      }
      ignoredByType {
        edges {
          node {
            id
            name
            formattedName

            pokemon(filter: {
              formClass: [ALOLA, BASE, GALAR, GMAX, HISUI, MEGA, OTHER],
              removedFromSwSh: $removedFromSwSh,
              removedFromBDSP: $removedFromBDSP
            }) {
              edges {
                node {
                  id
                  name
                  formattedName
                  pokemonShowdownID
                }
              }
            }
          }
        }
      }
      removedByType {
        edges {
          node {
            id
            name
            formattedName

            pokemon(filter: {
              formClass: [ALOLA, BASE, GALAR, GMAX, HISUI, MEGA, OTHER],
              removedFromSwSh: $removedFromSwSh,
              removedFromBDSP: $removedFromBDSP
            }) {
              edges {
                node {
                  id
                  name
                  formattedName
                  pokemonShowdownID
                }
              }
            }
          }
        }
      }
      resistedByType {
        edges {
          node {
            id
            name
            formattedName

            pokemon(filter: {
              formClass: [ALOLA, BASE, GALAR, GMAX, HISUI, MEGA, OTHER],
              removedFromSwSh: $removedFromSwSh,
              removedFromBDSP: $removedFromBDSP
            }) {
              edges {
                node {
                  id
                  name
                  formattedName
                  pokemonShowdownID
                }
              }
            }
          }
          multiplier
        }
      }
      weakensType {
        edges {
          node {
            id
            name
            formattedName
          }
          multiplier
        }
      }
      weatherBall {
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

export class FieldStateTypeResult extends AuxToAuxConnectionOnPage {
  public multiplier?: number
  public power?: number

  public pokemonIconData?: PokemonIconDatum[]
  public typeIconDatum: TypeIconDatum

  constructor(gqlFieldStateType: FieldStateTypeEdge) {
    super(gqlFieldStateType);

    const { multiplier, } = gqlFieldStateType;
    this.multiplier = multiplier;

    this.pokemonIconData = gqlFieldStateType.node.pokemon?.edges.map(pokemonIconEdgeToPokemonIconDatum);
    this.typeIconDatum = typeIconEdgeToTypeIconDatum(gqlFieldStateType);
  }
}

// #endregion


// #endregion