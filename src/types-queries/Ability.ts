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

  PokemonIconDatum,
  PokemonIconEdge,
  pokemonIconEdgeToPokemonIconDatum,
  DescriptionEdge,
  VersionDependentDescription,
} from './helpers';
import {
  GenerationNum,
  IntroductionEdge,
} from './Generation';
import {
  DescriptionsEdge,
} from './Description';

// Ability in main search
// #region

export type AbilitySearchQuery = {
  [searchQueryName in EntitySearchQueryName]?: AbilitySearchResult[]
}


export interface AbilitySearchResult extends MainEntitySearchResult {
  id: string
  name: string
  formattedName: string
  descriptions: {
    edges: DescriptionsEdge[]
  }

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

export class AbilityInSearch extends MainEntityInSearch {
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


export interface AbilityPageResult extends MainEntityPageResult {
  id: string
  name: string
  formattedName: string

  introduced: {
    edges: IntroductionEdge[]
  }

  descriptions: {
    edges: DescriptionsEdge[]
  }

  activatedByFieldState: CountField
  boostsType: CountField
  boostsUsageMethod: CountField
  causesStatus: CountField
  createsFieldState: CountField
  effects: CountField
  ignoresFieldState: CountField
  modifiesStat: CountField
  pokemon: CountField
  preventsFieldState: CountField
  removesFieldState: CountField
  resistsStatus: CountField
  resistsType: CountField
  resistsUsageMethod: CountField
  suppressesFieldState: CountField
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
      effects {
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

export class AbilityOnPage extends MainEntityOnPage {
  public activatedByFieldStateCount: number
  public boostsTypeCount: number
  public boostsUsageMethodCount: number
  public causesStatusCount: number
  public createsFieldStateCount: number
  public effectCount: number
  public ignoresFieldStateCount: number
  public modifiesStatCount: number
  public pokemonCount: number
  public preventsFieldStateCount: number
  public removesFieldStateCount: number
  public resistsStatusCount: number
  public resistsTypeCount: number
  public resistsUsageMethodCount: number
  public suppressesFieldStateCount: number

  public fieldStateCount: number

  constructor(gqlAbility: AbilityPageResult) {
    // Data for AbilityPage
    super(gqlAbility);

    // Counts for displaying accordions
    this.activatedByFieldStateCount = gqlAbility.activatedByFieldState.count
    this.boostsTypeCount = gqlAbility.boostsType.count
    this.boostsUsageMethodCount = gqlAbility.boostsUsageMethod.count
    this.causesStatusCount = gqlAbility.causesStatus.count
    this.createsFieldStateCount = gqlAbility.createsFieldState.count
    this.effectCount = gqlAbility.effects.count
    this.ignoresFieldStateCount = gqlAbility.ignoresFieldState.count
    this.modifiesStatCount = gqlAbility.modifiesStat.count
    this.pokemonCount = gqlAbility.pokemon.count
    this.preventsFieldStateCount = gqlAbility.preventsFieldState.count
    this.removesFieldStateCount = gqlAbility.removesFieldState.count
    this.resistsStatusCount = gqlAbility.resistsStatus.count
    this.resistsTypeCount = gqlAbility.resistsType.count
    this.resistsUsageMethodCount = gqlAbility.resistsUsageMethod.count
    this.suppressesFieldStateCount = gqlAbility.suppressesFieldState.count

    this.fieldStateCount = this.activatedByFieldStateCount + this.createsFieldStateCount + this.ignoresFieldStateCount + this.preventsFieldStateCount + this.removesFieldStateCount + this.suppressesFieldStateCount;
  }
}

// #endregion

// Ability connections 
// #region

// AbilityEffect
// #region

export type AbilityEffectQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    effects: {
      edges: AbilityEffectEdge[]
    }
  }[]
}

export interface AbilityEffectEdge extends MainToAuxConnectionEdge, DescriptionEdge {
  node: {
    id: string
    name: string
    formattedName: string
    
    description: string
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

            description
          }
        }
      }
    }
  }
`;

export class AbilityEffectResult extends MainToAuxConnectionOnPage {
  constructor(gqlAbilityEffect: AbilityEffectEdge) {
    super(gqlAbilityEffect);
  }
}

// #endregion

// AbilityFieldState
// #region

export type AbilityFieldStateQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    activatedByFieldState: {
      edges: AbilityFieldStateEdge[]
    }
    createsFieldState: {
      edges: AbilityFieldStateEdge[]
    }
    ignoresFieldState: {
      edges: AbilityFieldStateEdge[]
    }
    preventsFieldState: {
      edges: AbilityFieldStateEdge[]
    }
    removesFieldState: {
      edges: AbilityFieldStateEdge[]
    }
    suppressesFieldState: {
      edges: AbilityFieldStateEdge[]
    }
  }[]
}

export interface AbilityFieldStateEdge extends MainToAuxConnectionEdge {
  node: {
    id: string
    name: string
    formattedName: string

    description: string
  }
  turns?: number
}

export interface AbilityFieldStateQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const ABILITY_FIELDSTATE_QUERY = gql`
  query AbilityEffectQuery($gen: Int! $name: String!) {
    abilityByName(generation: $gen, name: $name) {
      id
      activatedByFieldState {
        edges {
          node {
            id
            name
            formattedName
            description
          }
        }
      }
      createsFieldState {
        edges {
          node {
            id
            name
            formattedName
            description
          }
          turns
        }
      }
      ignoresFieldState {
        edges {
          node {
            id
            name
            formattedName
            description
          }
        }
      }
      preventsFieldState {
        edges {
          node {
            id
            name
            formattedName
            description
          }
        }
      }
      removesFieldState {
        edges {
          node {
            id
            name
            formattedName
            description
          }
        }
      }
      suppressesFieldState {
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

export class AbilityFieldStateResult extends MainToAuxConnectionOnPage {
  public turns?: number

  constructor(gqlAbilityFieldState: AbilityFieldStateEdge) {
    super(gqlAbilityFieldState);

    if (gqlAbilityFieldState.turns) this.turns = gqlAbilityFieldState.turns;
  }
}

// #endregion


// #endregion