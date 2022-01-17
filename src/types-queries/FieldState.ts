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
  
  EntityConnectionVars,

  AbilityIconEdge,
  TypeNameEdge,

  ItemIconEdge,
  ItemIconDatum,
  itemIconEdgeToItemIconDatum,

  PokemonIconEdge,
  PokemonIconDatum,
  pokemonIconEdgeToPokemonIconDatum,
  MoveIconEdge,
  AuxToMainConnectionEdge,
  AuxToMainConnectionOnPage,
  VersionDependentDescriptionEdge,
  AuxToAuxConnectionEdge,
  AuxToAuxConnectionOnPage,
  AuxEntityInSearch,
  AuxEntitySearchResult,
  AuxEntityPageResult,
  AuxEntityOnPage,
} from './helpers';
import {
  GenerationNum,
  IntroductionEdge,
} from './Generation.js';

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

  fieldStateClass: string
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

    const { damagePercent, fieldStateClass, grounded, maxLayers, target, } = gqlFieldState;
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
  modifiesStat: CountField
  preventedByAbility: CountField
  removedByAbility: CountField
  removedByMove: CountField
  resistedByItem: CountField
  resistsStatus: CountField
  suppressedByAbility: CountField
  weatherBall: CountField
}

export interface FieldStatePageQueryVars extends EntityPageVars {
  gen: GenerationNum
  name: string
}

export const FIELDSTATE_PAGE_QUERY = gql`
  query FieldStatePageQuery($gen: Int! $name: String!) {
    fieldStateByName(generation: $gen, name: $name) {
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
      createdByMove {
        count
      }
      effects {
        count
      }
      enhancesMove {
        count
      }
      extendedByItem {
        count
      }
      hindersMove {
        count
      }
      ignoredByAbility {
        count
      }
      ignoredByItem {
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
      removedByMove {
        count
      }
      resistedByItem {
        count
      }
      resistsStatus {
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
  public modifiesStatCount: number
  public preventedByAbilityCount: number
  public removedByAbilityCount: number
  public removedByMoveCount: number
  public resistedByItemCount: number
  public resistsStatusCount: number
  public suppressedByAbilityCount: number
  public weatherBallCount: number

  public abilityCount: number
  public itemCount: number
  public moveCount: number

  constructor(gqlFieldState: FieldStatePageResult) {
    super(gqlFieldState);

    // Counts for displaying accordions
    this.activatesAbilityCount = gqlFieldState.activatesAbility.count
    this.activatesItemCount = gqlFieldState.activatesItem.count
    this.boostsTypeCount = gqlFieldState.boostsType.count
    this.causesStatusCount = gqlFieldState.causesStatus.count
    this.createdByAbilityCount = gqlFieldState.createdByAbility.count
    this.createdByMoveCount = gqlFieldState.createdByMove.count
    this.effectCount = gqlFieldState.effects.count
    this.enhancesMoveCount = gqlFieldState.enhancesMove.count
    this.extendedByItemCount = gqlFieldState.extendedByItem.count
    this.hindersMoveCount = gqlFieldState.hindersMove.count
    this.ignoredByAbilityCount = gqlFieldState.ignoredByAbility.count
    this.ignoredByItemCount = gqlFieldState.ignoredByItem.count
    this.modifiesStatCount = gqlFieldState.modifiesStat.count
    this.preventedByAbilityCount = gqlFieldState.preventedByAbility.count
    this.removedByAbilityCount = gqlFieldState.removedByAbility.count
    this.removedByMoveCount = gqlFieldState.removedByMove.count
    this.resistedByItemCount = gqlFieldState.resistedByItem.count
    this.resistsStatusCount = gqlFieldState.resistsStatus.count
    this.suppressedByAbilityCount = gqlFieldState.suppressedByAbility.count
    this.weatherBallCount = gqlFieldState.weatherBall.count

    this.abilityCount = this.activatesAbilityCount + this.createdByAbilityCount + this.ignoredByAbilityCount + this.preventedByAbilityCount + this.removedByAbilityCount + this.suppressedByAbilityCount;

    this.itemCount = this.activatesItemCount + this.extendedByItemCount + this.ignoredByItemCount + this.resistedByItemCount;

    this.moveCount = this.createdByMoveCount + this.enhancesMoveCount + this.hindersMoveCount + this.removedByMoveCount;
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
    activatesAbility: {
      edges: AbilityIconEdge[]
    }
    createdByAbility: {
      edges: AbilityIconEdge[]
    }
    ignoredByAbility: {
      edges: AbilityIconEdge[]
    }
    preventedByAbility: {
      edges: AbilityIconEdge[]
    }
    removedByAbility: {
      edges: AbilityIconEdge[]
    }
    suppressedByAbility: {
      edges: AbilityIconEdge[]
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
  query FieldStateAbilitiesQuery($gen: Int!$name: String!) {
    fieldStateByName(generation: $gen, name: $name) {
      id 
      activatesAbility {
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
      createdByAbility {
        edges {
          node {
            id
            name
            formattedName

            descriptions(pagination: {limit: 1}) {
              edges {
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
          turns
        }
      }
      ignoredByAbility {
        edges {
          node {
            id
            name
            formattedName

            descriptions(pagination: {limit: 1}) {
              edges {
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
      preventedByAbility {
        edges {
          node {
            id
            name
            formattedName

            descriptions(pagination: {limit: 1}) {
              edges {
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
      removedByAbility {
        edges {
          node {
            id
            name
            formattedName

            descriptions(pagination: {limit: 1}) {
              edges {
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
      suppressedByAbility {
        edges {
          node {
            id
            name
            formattedName

            descriptions(pagination: {limit: 1}) {
              edges {
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
  query FieldStateEffectQuery($gen: Int! $name: String! $startsWith: String) {
    fieldStateByName(generation: $gen, name: $name) {
      id
      effects(filter: { startsWith: $startsWith }) {
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
    activatesItem: {
      edges: ItemIconEdge[]
    }
    extendedByItem: {
      edges: ItemIconEdge[]
    }
    ignoredByItem: {
      edges: ItemIconEdge[]
    }
    resistedByItem: {
      edges: ItemIconEdge[]
    }
  }[]
}

export interface FieldStateItemEdge extends ItemIconEdge, AuxToMainConnectionEdge {
  node: {
    id: string
    name: string
    formattedName: string

    descriptions: {
      edges: VersionDependentDescriptionEdge[]
    }

    introduced: {
      edges: IntroductionEdge[]
    }
  }
  turns?: number
}

export interface FieldStateItemQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const FIELDSTATE_ITEM_QUERY = gql`
  query FieldStateAbilitiesQuery($gen: Int! $name: String!) {
    fieldStateByName(generation: $gen, name: $name) {
      id 
      activatesItem {
        edges {
          node {
            id
            name
            formattedName
            descriptions(pagination: {limit: 1}) {
              edges {
                node {
                  text
                }
              }
            }

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
      extendedByItem {
        edges {
          node {
            id
            name
            formattedName
            descriptions(pagination: {limit: 1}) {
              edges {
                node {
                  text
                }
              }
            }

            introduced {
              edges {
                node {
                  number
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
            descriptions(pagination: {limit: 1}) {
              edges {
                node {
                  text
                }
              }
            }

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
      resistedByItem {
        edges {
          node {
            id
            name
            formattedName
            descriptions(pagination: {limit: 1}) {
              edges {
                node {
                  text
                }
              }
            }

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
`;

export class FieldStateItemResult extends AuxToMainConnectionOnPage {
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
    createdByMove: {
      edges: MoveIconEdge[]
    }
    enhancesMove: {
      edges: MoveIconEdge[]
    }
    hindersMove: {
      edges: MoveIconEdge[]
    }
    removedByMove: {
      edges: MoveIconEdge[]
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

export interface FieldStateMoveQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const FIELDSTATE_MOVE_QUERY = gql`
  query FieldStateAbilitiesQuery($gen: Int! $name: String!) {
    fieldStateByName(generation: $gen, name: $name) {
      id 
      createdByMove {
        edges {
          node {
            id
            name
            formattedName
            descriptions(pagination: {limit: 1}) {
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
          turns
        }
      }
      enhancesMove {
        edges {
          node {
            id
            name
            formattedName
            descriptions(pagination: {limit: 1}) {
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
      hindersMove {
        edges {
          node {
            id
            name
            formattedName
            descriptions(pagination: {limit: 1}) {
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
      removedByMove {
        edges {
          node {
            id
            name
            formattedName
            descriptions(pagination: {limit: 1}) {
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

export class FieldStateMoveResult extends AuxToMainConnectionOnPage {
  public pokemonIconData: PokemonIconDatum[]
  public turns?: number

  constructor(gqlFieldStateMove: FieldStateMoveEdge) {
    super(gqlFieldStateMove);

    this.pokemonIconData = gqlFieldStateMove.node.pokemon.edges.map(pokemonIconEdgeToPokemonIconDatum);
    if (gqlFieldStateMove.turns) this.turns = gqlFieldStateMove.turns;
  }
}

// #endregion

// #endregion