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
  
  EntityConnectionQuery,
  EntityConnectionEdge,
  EntityConnectionVars,
  EntityConnectionOnPage,
} from './helpers';
import {
  PokemonIconDatum,
  PokemonIconEdge,
  pokemonIconEdgeToPokemonIconDatum,
} from './Pokemon';
import {
  GenerationNum,
  IntroductionEdge,
} from './Generation';
import {
  DescriptionEdge,
} from './Description';

// Ability in main search
// #region

export type AbilitySearchQuery = {
  [searchQueryName in EntitySearchQueryName]?: AbilitySearchResult[]
}


export interface AbilitySearchResult extends EntitySearchResult {
  id: string
  name: string
  formattedName: string

  pokemon: {
    edges: PokemonIconEdge[]
  }
}

export interface AbilitySearchVars extends EntitySearchVars {
  gen: GenerationNum
  limit: number
  startsWith: string
}

export const ABILITY_SEARCH_QUERY = gql`
  query AbilitySearchQuery($gen: Int! $limit: Int! $startsWith: String) {
    abilities(
      generation: $gen 
      filter: { startsWith: $startsWith } 
      pagination: { limit: $limit }
    ) {
      id
      name
      formattedName

      pokemon {
        edges {
          node {
            id
            name
            formattedName
            speciesName
            introduced {
              edges {
                node {
                  id
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

export class AbilityInSearch extends EntityInSearch {
  public pokemonIconData: PokemonIconDatum[]

  constructor(gqlAbility: AbilitySearchResult) {
    super(gqlAbility);

    this.pokemonIconData = gqlAbility.pokemon.edges.map(pokemonIconEdgeToPokemonIconDatum);
  }
}

// #endregion

// Ability page
// #region

export type AbilityPageQuery = {
  [pageQueryName in EntityPageQueryName]?: AbilityPageResult[]
}


export interface AbilityPageResult extends EntityPageResult {
  id: string
  name: string
  formattedName: string

  introduced: {
    edges: IntroductionEdge[]
  }

  descriptions: {
    edges: DescriptionEdge[]
  }

  activatedByFieldStateCount: CountField
  boostsTypeCount: CountField
  boostsUsageMethodCount: CountField
  causesStatusCount: CountField
  createsFieldStateCount: CountField
  effectsCount: CountField
  ignoresFieldStateCount: CountField
  modifiesStatCount: CountField
  pokemonCount: CountField
  preventsFieldStateCount: CountField
  removesFieldStateCount: CountField
  resistsStatusCount: CountField
  resistsTypeCount: CountField
  resistsUsageMethodCount: CountField
  suppressesFieldStateCount: CountField
}

export interface AbilityPageQueryVars extends EntityPageVars {
  gen: GenerationNum
  name: string
}

export const ABILITY_PAGE_QUERY = gql`
  query AbilityPageQuery(
    $gen: Int!
    $name: String!
  ) {
    abilityByName(
      generation: $gen,
      name: $name
    ) {
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

      descriptions {
        edges {
          node {
            text
          }
          versionGroupCode
        }
      }

      activatedByFieldState {
        count
      }
      boostsType {
        count
      }
      boostsUsageMethod {
        count
      }
      causesStatus {
        count
      }
      createsFieldState {
        count
      }
      ignoresFieldState {
        count
      }
      modifiesStat {
        count
      }
      pokemon {
        count
      }
      preventsFieldState {
        count
      }
      removesFieldState {
        count
      }
      resistsStatus {
        count
      }
      resistsType {
        count
      }
      resistsUsageMethod {
        count
      }
      suppressesFieldState {
        count
      }
    }
  }
`;

export class AbilityOnPage extends EntityOnPage {

  public activatedByFieldStateCount: number
  public boostsTypeCount: number
  public boostsUsageMethodCount: number
  public causesStatusCount: number
  public createsFieldStateCount: number
  public effectsCount: number
  public ignoresFieldStateCount: number
  public modifiesStatCount: number
  public pokemonCount: number
  public preventsFieldStateCount: number
  public removesFieldStateCount: number
  public resistsStatusCount: number
  public resistsTypeCount: number
  public resistsUsageMethodCount: number
  public suppressesFieldStateCount: number

  constructor(gqlAbility: AbilityPageResult) {
    // Data for AbilityPage
    super(gqlAbility);

    // Counts for displaying accordions
    this.activatedByFieldStateCount = gqlAbility.activatedByFieldStateCount.count
    this.boostsTypeCount = gqlAbility.boostsTypeCount.count
    this.boostsUsageMethodCount = gqlAbility.boostsUsageMethodCount.count
    this.causesStatusCount = gqlAbility.causesStatusCount.count
    this.createsFieldStateCount = gqlAbility.createsFieldStateCount.count
    this.effectsCount = gqlAbility.effectsCount.count
    this.ignoresFieldStateCount = gqlAbility.ignoresFieldStateCount.count
    this.modifiesStatCount = gqlAbility.modifiesStatCount.count
    this.pokemonCount = gqlAbility.pokemonCount.count
    this.preventsFieldStateCount = gqlAbility.preventsFieldStateCount.count
    this.removesFieldStateCount = gqlAbility.removesFieldStateCount.count
    this.resistsStatusCount = gqlAbility.resistsStatusCount.count
    this.resistsTypeCount = gqlAbility.resistsTypeCount.count
    this.resistsUsageMethodCount = gqlAbility.resistsUsageMethodCount.count
    this.suppressesFieldStateCount = gqlAbility.suppressesFieldStateCount.count
  }
}

// #endregion

// Ability connections 
// #region

export type AbilityEffectQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    effects: {
      edges: AbilityEffectEdge[]
    }
  }[]
}

export interface AbilityEffectEdge extends EntityConnectionEdge {
  node: {
    id: string
    name: string
    formattedName: string
  }
}

export interface AbilityEffectQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const ABILITY_EFFECT_QUERY = gql`
  query AbilityEffectQuery($gen: Int! $name: String! $startsWith: String) {
    abilityByName(generation: $gen, name: $name) {
      id
      effects(filter: { startsWith: $startsWith }) {
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

export class AbilityEffectResult extends EntityConnectionOnPage {
  constructor(gqlAbilityEffect: AbilityEffectEdge) {
    super(gqlAbilityEffect)
  }
}

// #endregion