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

  AbilityIconEdge,
  TypeNameEdge,

  ItemIconEdge,
  ItemIconDatum,
  itemIconEdgeToItemIconDatum,

  PokemonIconEdge,
  PokemonIconDatum,
  pokemonIconEdgeToPokemonIconDatum,
  MoveIconEdge,
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

export interface FieldStateSearchResult extends EntitySearchResult {
  id: string
  name: string
  formattedName: string

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

export class FieldStateInSearch extends EntityInSearch {
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

export interface FieldStatePageResult extends EntityPageResult {
  id: string
  name: string
  formattedName: string

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

export class FieldStateOnPage extends EntityOnPage {
  public activatesAbility: number
  public activatesItem: number
  public boostsType: number
  public causesStatus: number
  public createdByAbility: number
  public createdByMove: number
  public effects: number
  public enhancesMove: number
  public extendedByItem: number
  public hindersMove: number
  public ignoredByAbility: number
  public ignoredByItem: number
  public modifiesStat: number
  public preventedByAbility: number
  public removedByAbility: number
  public removedByMove: number
  public resistedByItem: number
  public resistsStatus: number
  public suppressedByAbility: number
  public weatherBall: number

  constructor(gqlFieldState: FieldStatePageResult) {
    super(gqlFieldState);

    this.activatesAbility = gqlFieldState.activatesAbility.count
    this.activatesItem = gqlFieldState.activatesItem.count
    this.boostsType = gqlFieldState.boostsType.count
    this.causesStatus = gqlFieldState.causesStatus.count
    this.createdByAbility = gqlFieldState.createdByAbility.count
    this.createdByMove = gqlFieldState.createdByMove.count
    this.effects = gqlFieldState.effects.count
    this.enhancesMove = gqlFieldState.enhancesMove.count
    this.extendedByItem = gqlFieldState.extendedByItem.count
    this.hindersMove = gqlFieldState.hindersMove.count
    this.ignoredByAbility = gqlFieldState.ignoredByAbility.count
    this.ignoredByItem = gqlFieldState.ignoredByItem.count
    this.modifiesStat = gqlFieldState.modifiesStat.count
    this.preventedByAbility = gqlFieldState.preventedByAbility.count
    this.removedByAbility = gqlFieldState.removedByAbility.count
    this.removedByMove = gqlFieldState.removedByMove.count
    this.resistedByItem = gqlFieldState.resistedByItem.count
    this.resistsStatus = gqlFieldState.resistsStatus.count
    this.suppressedByAbility = gqlFieldState.suppressedByAbility.count
    this.weatherBall = gqlFieldState.weatherBall.count
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

export interface FieldStateAbilityEdge extends AbilityIconEdge {
  node: {
    id: string
    name: string
    formattedName: string

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

export class FieldStateAbilityResult extends EntityConnectionOnPage {
  public pokemonIconData: PokemonIconDatum[]
  public turns?: number

  constructor(gqlFieldStateAbility: FieldStateAbilityEdge) {
    super(gqlFieldStateAbility);

    this.pokemonIconData = gqlFieldStateAbility.node.pokemon.edges.map(pokemonIconEdgeToPokemonIconDatum);
    if (gqlFieldStateAbility.turns) this.turns = gqlFieldStateAbility.turns;
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

export interface FieldStateItemEdge extends ItemIconEdge {
  node: {
    id: string
    name: string
    formattedName: string

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

export class FieldStateItemResult extends EntityConnectionOnPage {
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

export interface FieldStateMoveEdge extends MoveIconEdge {
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

export class FieldStateMoveResult extends EntityConnectionOnPage {
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