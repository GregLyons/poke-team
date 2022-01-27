import {
  gql,
} from '@apollo/client';
import { Generation } from '@pkmn/data';

import {
  DescriptionEdge,
  DescriptionsEdge,
  GenerationNum,
  IntroductionEdge,
  PokemonIconDatum,
  PokemonIconEdge,
  pokemonIconEdgeToPokemonIconDatum,
  TypeIconDatum,
  TypeIconEdge,
  typeIconEdgeToTypeIconDatum,
  TypeName,
} from '../helpers';
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
  RemovedFromGameQueryVars,
} from './helpers';

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

export interface AbilitySearchVars extends EntitySearchVars, RemovedFromGameQueryVars {
  gen: GenerationNum
  limit: number
  startsWith: string
  removedFromSwSh: boolean
  removedFromBDSP: boolean
}

export const ABILITY_SEARCH_QUERY = gql`
  query AbilitySearchQuery($gen: Int! $limit: Int! $startsWith: String $removedFromBDSP: Boolean $removedFromSwSh: Boolean) {
    abilities(
      generation: $gen 
      filter: { startsWith: $startsWith } 
      pagination: { limit: $limit }
    ) {
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
  activatedByUsageMethod: CountField
  boostsType: CountField
  boostsUsageMethod: CountField
  causesStatus: CountField
  createsFieldState: CountField
  effects: CountField
  ignoresFieldState: CountField
  modifiesStat: CountField
  pokemon: CountField
  preventsFieldState: CountField
  preventsUsageMethod: CountField
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
      activatedByUsageMethod {
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
      preventsUsageMethod {
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
  public activatedByUsageMethodCount: number
  public boostsTypeCount: number
  public boostsUsageMethodCount: number
  public causesStatusCount: number
  public createsFieldStateCount: number
  public effectCount: number
  public ignoresFieldStateCount: number
  public modifiesStatCount: number
  public pokemonCount: number
  public preventsFieldStateCount: number
  public preventsUsageMethodCount: number
  public removesFieldStateCount: number
  public resistsStatusCount: number
  public resistsTypeCount: number
  public resistsUsageMethodCount: number
  public suppressesFieldStateCount: number

  public fieldStateCount: number
  public statusCount: number
  public typeCount: number
  public usageMethodCount: number

  constructor(gqlAbility: AbilityPageResult) {
    // Data for AbilityPage
    super(gqlAbility);

    // Counts for displaying accordions
    this.activatedByFieldStateCount = gqlAbility.activatedByFieldState.count
    this.activatedByUsageMethodCount = gqlAbility.activatedByUsageMethod.count
    this.boostsTypeCount = gqlAbility.boostsType.count
    this.boostsUsageMethodCount = gqlAbility.boostsUsageMethod.count
    this.causesStatusCount = gqlAbility.causesStatus.count
    this.createsFieldStateCount = gqlAbility.createsFieldState.count
    this.effectCount = gqlAbility.effects.count
    this.ignoresFieldStateCount = gqlAbility.ignoresFieldState.count
    this.modifiesStatCount = gqlAbility.modifiesStat.count
    this.pokemonCount = gqlAbility.pokemon.count
    this.preventsFieldStateCount = gqlAbility.preventsFieldState.count
    this.preventsUsageMethodCount = gqlAbility.preventsUsageMethod.count
    this.removesFieldStateCount = gqlAbility.removesFieldState.count
    this.resistsStatusCount = gqlAbility.resistsStatus.count
    this.resistsTypeCount = gqlAbility.resistsType.count
    this.resistsUsageMethodCount = gqlAbility.resistsUsageMethod.count
    this.suppressesFieldStateCount = gqlAbility.suppressesFieldState.count

    this.fieldStateCount = this.activatedByFieldStateCount + this.createsFieldStateCount + this.ignoresFieldStateCount + this.preventsFieldStateCount + this.removesFieldStateCount + this.suppressesFieldStateCount;
    
    this.statusCount = this.causesStatusCount + this.resistsStatusCount;

    this.typeCount = this.boostsTypeCount + this.resistsTypeCount;

    this.usageMethodCount = this.activatedByUsageMethodCount + this.boostsUsageMethodCount + this.preventsUsageMethodCount + this.resistsUsageMethodCount;
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
    name: string
    formattedName: string
    
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
  query AbilityEffectQuery($gen: Int! $name: String!) {
    abilityByName(generation: $gen, name: $name) {
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
    name: string
    formattedName: string
    
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
      name
      formattedName
      
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

// AbilityStat
// #region

export type AbilityStatQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    name: string
    formattedName: string
    
    modifiesStat: {
      edges: AbilityStatEdge[]
    }
  }[]
}

export interface AbilityStatEdge extends MainToAuxConnectionEdge, DescriptionEdge {
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

export interface AbilityStatQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const ABILITY_STAT_QUERY = gql`
  query AbilityStatQuery($gen: Int! $name: String!) {
    abilityByName(generation: $gen, name: $name) {
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

export class AbilityStatResult extends MainToAuxConnectionOnPage {
  public stage: number
  public multiplier: number
  public chance: number
  public recipient: string

  constructor(gqlAbilityStat: AbilityStatEdge) {
    super(gqlAbilityStat);

    const { stage, multiplier, chance, recipient } = gqlAbilityStat;
    this.stage = stage;
    this.multiplier = multiplier;
    this.chance = chance;
    this.recipient = recipient;
  }
}

// #endregion

// AbilityStatus
// #region

export type AbilityStatusQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    name: string
    formattedName: string
    
    causesStatus: {
      edges: AbilityStatusEdge[]
    }
    resistsStatus: {
      edges: AbilityStatusEdge[]
    }
  }[]
}

export interface AbilityStatusEdge extends MainToAuxConnectionEdge, DescriptionEdge {
  node: {
    id: string
    name: string
    formattedName: string

    description: string
  }
  chance?: number
}

export interface AbilityStatusQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const ABILITY_STATUS_QUERY = gql`
  query AbilityStatusQuery($gen: Int! $name: String!) {
    abilityByName(generation: $gen, name: $name) {
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

export class AbilityStatusResult extends MainToAuxConnectionOnPage {
  public chance?: number

  constructor(gqlAbilityStatus: AbilityStatusEdge) {
    super(gqlAbilityStatus);

    if (gqlAbilityStatus.chance) this.chance = gqlAbilityStatus.chance;
  }
}

// #endregion

// AbilityType
// #region

export type AbilityTypeQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    name: string
    formattedName: string
    
    boostsType: {
      edges: AbilityTypeEdge[]
    }
    resistsType: {
      edges: AbilityTypeEdge[]
    }
  }[]
}

export interface AbilityTypeEdge extends MainToAuxConnectionEdge, TypeIconEdge {
  node: {
    id: string
    name: TypeName
    formattedName: string

    // Currently no Pokemon edges necessary 
    pokemon?: {
      edges: PokemonIconEdge[]
    }
  }
  multiplier: number
}

export interface AbilityTypeQueryVars extends EntityConnectionVars, RemovedFromGameQueryVars {
  gen: GenerationNum
  name: string
}

export const ABILITY_TYPE_QUERY = gql`
  query AbilityTypeQuery($gen: Int! $name: String!) {
    abilityByName(generation: $gen, name: $name) {
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
      resistsType {
        edges {
          node {
            id
            name
            formattedName
          }
          multiplier
        }
      }
    }
  }
`;

export class AbilityTypeResult extends MainToAuxConnectionOnPage {
  public multiplier?: number
  
  public pokemonIconData?: PokemonIconDatum[]
  public typeIconDatum: TypeIconDatum

  constructor(gqlAbilityType: AbilityTypeEdge) {
    super(gqlAbilityType);

    const { multiplier, } = gqlAbilityType;
    this.multiplier = multiplier;

    this.pokemonIconData = gqlAbilityType.node.pokemon?.edges.map(pokemonIconEdgeToPokemonIconDatum);
    this.typeIconDatum = typeIconEdgeToTypeIconDatum(gqlAbilityType);
  }
}

// #endregion

// AbilityUsageMethod
// #region

export type AbilityUsageMethodQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    name: string
    formattedName: string
    
    activatedByUsageMethod: {
      edges: AbilityUsageMethodEdge[]
    }
    boostsUsageMethod: {
      edges: AbilityUsageMethodEdge[]
    }
    preventsUsageMethod: {
      edges: AbilityUsageMethodEdge[]
    }
    resistsUsageMethod: {
      edges: AbilityUsageMethodEdge[]
    }
  }[]
}

export interface AbilityUsageMethodEdge extends MainToAuxConnectionEdge {
  node: {
    id: string
    name: string
    formattedName: string
    description: string
  }
  multiplier?: number
}

export interface AbilityUsageMethodQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const ABILITY_USAGEMETHOD_QUERY = gql`
  query AbilityUsageMethodQuery($gen: Int! $name: String!) {
    abilityByName(generation: $gen, name: $name) {
      id
      name
      formattedName
      
      activatedByUsageMethod {
        edges {
          node {
            id
            name
            formattedName
            description
          }
        }
      }
      boostsUsageMethod {
        edges {
          node {
            id
            name
            formattedName
            description
          }
          multiplier
        }
      }
      preventsUsageMethod {
        edges {
          node {
            id
            name
            formattedName
            description
          }
        }
      }
      resistsUsageMethod {
        edges {
          node {
            id
            name
            formattedName
            description
          }
          multiplier
        }
      }
    }
  }
`;

export class AbilityUsageMethodResult extends MainToAuxConnectionOnPage {
  public multiplier?: number

  constructor(gqlAbilityUsageMethod: AbilityUsageMethodEdge) {
    super(gqlAbilityUsageMethod);

    const { multiplier, } = gqlAbilityUsageMethod;
    this.multiplier = multiplier;
  }
}

// #endregion

// #endregion