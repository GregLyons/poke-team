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
  AuxToItemConnectionEdge,
  AuxToItemConnectionOnPage,
  RemovedFromGameQueryVars,
} from './helpers';

// UsageMethod in main search
// #region

export type UsageMethodSearchQuery = {
  [searchQueryName in EntitySearchQueryName]?: {
    id: string
    
    edges: UsageMethodSearchResult[]
  }
}

export interface UsageMethodSearchResult extends AuxEntitySearchResult {
  node: {
    id: string
    name: string
    formattedName: string
    description: string
  }
}

export interface UsageMethodMatchupEdge {
  node: {
    id: string
    name: string
    formattedName: string
    description: string
  }
}

export interface UsageMethodSearchVars extends EntitySearchVars {
  gen: GenerationNum
  limit: number
  contains: string
  startsWith: string
}

export const USAGEMETHOD_SEARCH_QUERY = gql`
  query UsageMethodSearchQuery($gen: Int! $limit: Int! $contains: String $startsWith: String) {
    usageMethods(
      generation: $gen
      filter: { contains: $contains, startsWith: $startsWith }
      pagination: { limit: $limit }
    ) {
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
`;

export class UsageMethodInSearch extends AuxEntityInSearchWithIcon {
  constructor(gqlUsageMethod: UsageMethodSearchResult) {
    super(gqlUsageMethod);
  }
}

// #endregion

// UsageMethod page
// #region

export type UsageMethodPageQuery = {
  [pageQueryName in EntityPageQueryName]?: UsageMethodPageResult[]
}

export type IntroductionQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    introduced: {
      edges: IntroductionEdge[]
    }
  }[]
}

export interface UsageMethodPageResult extends AuxEntityPageResult {
  id: string
  name: string
  formattedName: string
  description: string

  introduced: {
    edges: IntroductionEdge[]
  }

  activatesAbility: CountField
  activatesItem: CountField
  boostedByAbility: CountField
  boostedByItem: CountField
  preventedByAbility: CountField
  moves: CountField
  preventedByMove: CountField
  resistedByAbility: CountField
  resistedByItem: CountField
}

export interface UsageMethodPageQueryVars extends EntityPageVars, RemovedFromGameQueryVars {
  gen: GenerationNum
  name: string
  removedFromSwSh: false | null
  removedFromBDSP: false | null
}

export const USAGEMETHOD_PAGE_QUERY = gql`
  query UsageMethodPageQuery($gen: Int! $name: String! $removedFromSwSh: Boolean $removedFromBDSP: Boolean) {
    usageMethodByName(generation: $gen, name: $name) {
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

      activatesAbility {
        count
      }
      activatesItem {
        count
      }
      boostedByAbility {
        count
      }
      boostedByItem {
        count
      }
      preventedByAbility {
        count
      }
      preventedByMove(filter: {
        removedFromSwSh: $removedFromSwSh,
        removedFromBDSP: $removedFromBDSP
      }) {
        count
      }
      resistedByAbility {
        count
      }
      resistedByItem {
        count
      }
      moves(filter: {
        removedFromSwSh: $removedFromSwSh,
        removedFromBDSP: $removedFromBDSP
      }) {
        count
      }
    }
  }
`;

export class UsageMethodOnPage extends AuxEntityOnPage {
  public activatesAbilityCount: number
  public activatesItemCount: number
  public boostedByAbilityCount: number
  public boostedByItemCount: number
  public hadByMoveCount: number
  public preventedByAbilityCount: number
  public preventedByMoveCount: number
  public resistedByAbilityCount: number
  public resistedByItemCount: number

  public abilityCount: number
  public itemCount: number
  public moveCount: number

  constructor(gqlUsageMethod: UsageMethodPageResult) {
    super(gqlUsageMethod);

    // Counts for displaying accordions
    this.activatesAbilityCount = gqlUsageMethod.activatesAbility.count;
    this.activatesItemCount = gqlUsageMethod.activatesItem.count;
    this.boostedByAbilityCount = gqlUsageMethod.boostedByAbility.count;
    this.boostedByItemCount = gqlUsageMethod.boostedByItem.count;
    this.hadByMoveCount = gqlUsageMethod.moves.count;
    this.preventedByAbilityCount = gqlUsageMethod.preventedByAbility.count;
    this.preventedByMoveCount = gqlUsageMethod.preventedByMove.count;
    this.resistedByAbilityCount = gqlUsageMethod.resistedByAbility.count;
    this.resistedByItemCount = gqlUsageMethod.resistedByItem.count;

    this.abilityCount = this.activatesAbilityCount + this.boostedByAbilityCount + this.preventedByAbilityCount + this.resistedByAbilityCount;
    this.itemCount = this.activatesItemCount + this.boostedByItemCount + this.resistedByItemCount;
    this.moveCount = this.hadByMoveCount + this.preventedByMoveCount;
  }
}

// #endregion

// UsageMethod connections
// #region

// UsageMethodAbility
// #region

export type UsageMethodAbilityQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    name: string
    formattedName: string
    
    activatesAbility: {
      edges: UsageMethodAbilityEdge[]
    }
    boostedByAbility: {
      edges: UsageMethodAbilityEdge[]
    }
    preventedByAbility: {
      edges: UsageMethodAbilityEdge[]
    }
    resistedByAbility: {
      edges: UsageMethodAbilityEdge[]
    }
  }[]
}

export interface UsageMethodAbilityEdge extends AbilityIconEdge, AuxToMainConnectionEdge {
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
  multiplier?: number
}

export interface UsageMethodAbilityQueryVars extends EntityConnectionVars, RemovedFromGameQueryVars {
  gen: GenerationNum
  name: string
  removedFromSwSh: false | null
  removedFromBDSP: false | null
}

export const USAGEMETHOD_ABILITY_QUERY = gql`
  query UsageMethodAbilitiesQuery($gen: Int! $name: String! $removedFromSwSh: Boolean $removedFromBDSP: Boolean) {
    usageMethodByName(generation: $gen, name: $name) {
      id
      name
      formattedName
       
      activatesAbility {
        edges {
          node {
            id
            name
            formattedName

            descriptions(pagination: {limit: 1})  {
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
        }
      }
      boostedByAbility {
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
          multiplier
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
        }
      }
      resistedByAbility {
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
          multiplier
        }
      }
    }
  }
`;

export class UsageMethodAbilityResult extends AuxToMainConnectionOnPage {
  public pokemonIconData: PokemonIconDatum[]
  public multiplier?: number

  constructor(gqlUsageMethodAbility: UsageMethodAbilityEdge) {
    super(gqlUsageMethodAbility);

    const { multiplier, } = gqlUsageMethodAbility;
    this.multiplier = multiplier;

    this.pokemonIconData = gqlUsageMethodAbility.node.pokemon.edges.map(pokemonIconEdgeToPokemonIconDatum);
  }
}

// #endregion

// UsageMethodItem
// #region

export type UsageMethodItemQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    name: string
    formattedName: string

    activatesItem: {
      edges: UsageMethodItemEdge[]
    }
    boostedByItem: {
      edges: UsageMethodItemEdge[]
    }
    resistedByItem: {
      edges: UsageMethodItemEdge[]
    }
  }[]
}

export interface UsageMethodItemEdge extends AuxToItemConnectionEdge {
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
  multiplier?: number
}

export interface UsageMethodItemQueryVars extends EntityConnectionVars, RemovedFromGameQueryVars {
  gen: GenerationNum
  name: string
  removedFromSwSh: false | null
  removedFromBDSP: false | null
}

export const USAGEMETHOD_ITEM_QUERY = gql`
  query UsageMethodItemsQuery($gen: Int! $name: String! $removedFromSwSh: Boolean $removedFromBDSP: Boolean) {
    usageMethodByName(generation: $gen, name: $name) {
      id
      name
      formattedName
       
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
        }
      }
      boostedByItem {
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
          multiplier
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
          multiplier
        }
      }
    }
  }
`;

export class UsageMethodItemResult extends AuxToItemConnectionOnPage {
  public multiplier?: number

  constructor(gqlUsageMethodItem: UsageMethodItemEdge) {
    super(gqlUsageMethodItem);

    const { multiplier, } = gqlUsageMethodItem;
    this.multiplier = multiplier;
  }
}

// #endregion

// UsageMethodMove
// #region

export type UsageMethodMoveQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    name: string
    formattedName: string
    
    moves: {
      edges: UsageMethodMoveEdge[]
    }
    preventedByMove: {
      edges: UsageMethodMoveEdge[]
    }
  }[]
}

export interface UsageMethodMoveEdge extends MoveIconEdge, AuxToMainConnectionEdge {
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
}

export interface UsageMethodMoveQueryVars extends EntityConnectionVars, RemovedFromGameQueryVars {
  gen: GenerationNum
  name: string
  removedFromSwSh: false | null
  removedFromBDSP: false | null
}

export const USAGEMETHOD_MOVE_QUERY = gql`
  query UsageMethodMovesQuery($gen: Int! $name: String! $removedFromSwSh: Boolean $removedFromBDSP: Boolean) {
    usageMethodByName(generation: $gen, name: $name) {
      id
      name
      formattedName
       
      moves(filter: {
        removedFromSwSh: $removedFromSwSh,
        removedFromBDSP: $removedFromBDSP
      }) {
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
        }
      }
      preventedByMove(filter: {
        removedFromSwSh: $removedFromSwSh,
        removedFromBDSP: $removedFromBDSP
      }) {
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
        }
      }
    }
  }
`;

export class UsageMethodMoveResult extends AuxToMainConnectionOnPage { 
  public pokemonIconData: PokemonIconDatum[]
  public typeIconDatum: TypeIconDatum

  constructor(gqlUsageMethodMove: UsageMethodMoveEdge) {
    super(gqlUsageMethodMove);

    this.pokemonIconData = gqlUsageMethodMove.node.pokemon.edges.map(pokemonIconEdgeToPokemonIconDatum);
    this.typeIconDatum = typeIconEdgeToTypeIconDatum(gqlUsageMethodMove.node.type.edges[0]);
  }
}

// #endregion

// #endregion