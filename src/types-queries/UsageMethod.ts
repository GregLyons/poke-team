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

  boostedByAbility: CountField
  boostedByItem: CountField
  resistedByAbility: CountField
  resistedByItem: CountField
  moves: CountField
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

      introduced {
        edges {
          node {
            number
          }
        }
      }

      boostedByAbility {
        count
      }
      boostedByItem {
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
  public boostedByAbilityCount: number
  public boostedByItemCount: number
  public resistedByAbilityCount: number
  public resistedByItemCount: number

  public abilityCount: number
  public itemCount: number
  public moveCount: number

  constructor(gqlUsageMethod: UsageMethodPageResult) {
    super(gqlUsageMethod);

    // Counts for displaying accordions
    this.boostedByAbilityCount = gqlUsageMethod.boostedByAbility.count;
    this.boostedByItemCount = gqlUsageMethod.boostedByItem.count;
    this.resistedByAbilityCount = gqlUsageMethod.resistedByAbility.count;
    this.resistedByItemCount = gqlUsageMethod.resistedByItem.count;
    this.moveCount = gqlUsageMethod.moves.count;

    this.abilityCount = this.boostedByAbilityCount + this.resistedByAbilityCount;
    this.itemCount = this.boostedByItemCount + this.resistedByItemCount;
    this.moveCount = this.moveCount;
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
    boostedByAbility: {
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
  multiplier: number
}

export interface UsageMethodAbilityQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const USAGEMETHOD_ABILITY_QUERY = gql`
  query UsageMethodAbilitiesQuery($gen: Int! $name: String!) {
    usageMethodByName(generation: $gen, name: $name) {
      id 
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
          multiplier
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
          multiplier
        }
      }
    }
  }
`;

export class UsageMethodAbilityResult extends AuxToMainConnectionOnPage {
  public pokemonIconData: PokemonIconDatum[]
  public multiplier: number

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
  multiplier: number
}

export interface UsageMethodItemQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const USAGEMETHOD_ITEM_QUERY = gql`
  query UsageMethodItemsQuery($gen: Int! $name: String!) {
    usageMethodByName(generation: $gen, name: $name) {
      id 
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
  public multiplier: number

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
    moves: {
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