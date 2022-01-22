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
  TypeNameEdge,
} from './helpers';
import {
  GenerationNum,
  IntroductionEdge,
} from './Generation.js';
import {
  DescriptionsEdge,
} from './Description';
import { TypeName, typeNameEdgeToTypeName } from './Type';

// UsageMethod in main search
// #region

export type UsageMethodSearchQuery = {
  [searchQueryName in EntitySearchQueryName]: UsageMethodSearchResult[]
}

export interface UsageMethodSearchResult extends AuxEntitySearchResult {
  id: string
  name: string
  formattedName: string
  description: string
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
  startsWith: string
}

export const USAGEMETHOD_SEARCH_QUERY = gql`
  query UsageMethodSearchQuery($gen: Int! $limit: Int! $startsWith: String) {
    usageMethods(
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

export class UsageMethodInSearch extends AuxEntityInSearch {
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

export interface UsageMethodPageQueryVars extends EntityPageVars {
  gen: GenerationNum
  name: string
}

export const USAGEMETHOD_PAGE_QUERY = gql`
  query UsageMethodPageQuery($gen: Int! $name: String!) {
    usageMethodByName(generation: $gen, name: $name) {
      id
      name
      formattedName
      
      name
      formattedName

      introduced {
        edges {
          node {
            number
          }
        }
      }

      activatedByAbility {
        count
      }
      activatedByItem {
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
      preventedByMove {
        count
      }
      resistedByAbility {
        count
      }
      resistedByItem {
        count
      }
      moves {
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

export interface UsageMethodAbilityQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const USAGEMETHOD_ABILITY_QUERY = gql`
  query UsageMethodAbilitiesQuery($gen: Int! $name: String!) {
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

            descriptions {
              edges (pagination: {limit: 1}) {
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
      boostedByAbility {
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
          multiplier
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

export interface UsageMethodItemEdge extends AuxToMainConnectionEdge {
  node: {
    id: string
    name: string
    formattedName: string

    descriptions: { 
      edges: VersionDependentDescriptionEdge[]
    }
  }
  multiplier?: number
}

export interface UsageMethodItemQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const USAGEMETHOD_ITEM_QUERY = gql`
  query UsageMethodItemsQuery($gen: Int! $name: String!) {
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
            descriptions {
              edges(pagination: {limit: 1}) {
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
      boostedByItem {
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
          multiplier
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
          multiplier
        }
      }
    }
  }
`;

export class UsageMethodItemResult extends AuxToMainConnectionOnPage {
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
      edges: TypeNameEdge[]
    }

    pokemon: {
      edges: PokemonIconEdge[]
    }
  }
}

export interface UsageMethodMoveQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const USAGEMETHOD_MOVE_QUERY = gql`
  query UsageMethodMovesQuery($gen: Int! $name: String!) {
    usageMethodByName(generation: $gen, name: $name) {
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
      preventedByMove {
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

export class UsageMethodMoveResult extends AuxToMainConnectionOnPage {
  public type: TypeName
  public pokemonIconData: PokemonIconDatum[]

  constructor(gqlUsageMethodMove: UsageMethodMoveEdge) {
    super(gqlUsageMethodMove);

    this.type = gqlUsageMethodMove.node.type.edges.map(typeNameEdgeToTypeName)[0];

    this.pokemonIconData = gqlUsageMethodMove.node.pokemon.edges.map(pokemonIconEdgeToPokemonIconDatum);
  }
}

// #endregion

// #endregion