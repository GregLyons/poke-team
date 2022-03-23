import {
  gql
} from '@apollo/client';
import { GenNum } from '../entities';
import {
  DescriptionEdge,
  DescriptionsEdge,
  IntroductionEdge,
  PokemonIconDatum,
  PokemonIconEdge,
  pokemonIconEdgeToPokemonIconDatum,
  TypeIconDatum,
  TypeIconEdge,
  typeIconEdgeToTypeIconDatum,
  TypeName
} from '../helpers';
import {
  CountField, EntityConnectionVars, EntityPageQueryName, EntityPageVars, EntitySearchVars,
  MainEntityInSearch, MainEntityOnPage,
  MainEntityPageResult, MainEntitySearchResult, MainToAuxConnectionEdge, MainToAuxConnectionOnPage, MainToIconConnectionEdge,
  MainToIconConnectionOnPage, RemovedFromGameQueryVars
} from './helpers';


// Ability in main search
// #region

export type AbilitySearchQuery = {
  abilities: {
    count: number
    edges: AbilitySearchResult[]
  }
}


export interface AbilitySearchResult extends MainEntitySearchResult {
  node: {
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
}

export interface AbilitySearchVars extends EntitySearchVars, RemovedFromGameQueryVars {
  gen: GenNum

  limit: number
  offset: number
  contains: string
  startsWith: string

  removedFromSwSh: false | null
  removedFromBDSP: false | null
}

export const ABILITY_SEARCH_QUERY = gql`
  query AbilitySearchQuery(
    $gen: Int!
    $limit: Int! $offset: Int!
    $contains: String $startsWith: String
    $removedFromBDSP: Boolean $removedFromSwSh: Boolean
  ) {
    abilities(
      generation: $gen 
      filter: { contains: $contains, startsWith: $startsWith }
      pagination: { limit: $limit, offset: $offset }
    ) {
      id
      count
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
            removedFromBDSP: $removedFromBDSP,
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
`;

export class AbilityInSearch extends MainEntityInSearch {
  public pokemonIconData: PokemonIconDatum[]

  constructor(gqlAbility: AbilitySearchResult) {
    super(gqlAbility);

    this.pokemonIconData = gqlAbility.node.pokemon.edges.map(pokemonIconEdgeToPokemonIconDatum);
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
  gen: GenNum
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
        id
        edges {
          node {
            number
          }
        }
      }

      descriptions {
        id
        edges {
          node {
            text
          }
          versionGroupCode
        }
      }

      activatedByFieldState {
        id
        count
      }
      activatedByUsageMethod {
        id
        count
      }
      boostsType {
        id
        count
      }
      boostsUsageMethod {
        id
        count
      }
      causesStatus {
        id
        count
      }
      createsFieldState {
        id
        count
      }
      effects {
        id
        count
      }
      ignoresFieldState {
        id
        count
      }
      modifiesStat {
        id
        count
      }
      pokemon {
        id
        count
      }
      preventsFieldState {
        id
        count
      }
      preventsUsageMethod {
        id
        count
      }
      removesFieldState {
        id
        count
      }
      resistsStatus {
        id
        count
      }
      resistsType {
        id
        count
      }
      resistsUsageMethod {
        id
        count
      }
      suppressesFieldState {
        id
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
  gen: GenNum
  name: string
}

export const ABILITY_EFFECT_QUERY = gql`
  query AbilityEffectQuery($gen: Int! $name: String!) {
    abilityByName(generation: $gen, name: $name) {
      id
      name
      formattedName
      
      effects {
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

export class AbilityEffectResult extends MainToAuxConnectionOnPage {
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

export interface AbilityFieldStateEdge extends MainToIconConnectionEdge, MainToAuxConnectionEdge {
  node: {
    id: string
    name: string
    formattedName: string

    description: string
  }
  turns?: number
}

export interface AbilityFieldStateQueryVars extends EntityConnectionVars {
  gen: GenNum
  name: string
}

export const ABILITY_FIELDSTATE_QUERY = gql`
  query AbilityEffectQuery($gen: Int! $name: String!) {
    abilityByName(generation: $gen, name: $name) {
      id
      name
      formattedName
      
      activatedByFieldState {
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
      createsFieldState {
        id
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
      preventsFieldState {
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
      removesFieldState {
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
      suppressesFieldState {
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

export class AbilityFieldStateResult extends MainToIconConnectionOnPage {
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

export interface AbilityStatEdge extends MainToIconConnectionEdge, MainToAuxConnectionEdge, DescriptionEdge {
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
  gen: GenNum
  name: string
}

export const ABILITY_STAT_QUERY = gql`
  query AbilityStatQuery($gen: Int! $name: String!) {
    abilityByName(generation: $gen, name: $name) {
      id
      name
      formattedName
      
      modifiesStat {
        id
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

export class AbilityStatResult extends MainToIconConnectionOnPage {
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

export interface AbilityStatusEdge extends MainToIconConnectionEdge, MainToAuxConnectionEdge, DescriptionEdge {
  node: {
    id: string
    name: string
    formattedName: string

    description: string
  }
  chance?: number
}

export interface AbilityStatusQueryVars extends EntityConnectionVars {
  gen: GenNum
  name: string
}

export const ABILITY_STATUS_QUERY = gql`
  query AbilityStatusQuery($gen: Int! $name: String!) {
    abilityByName(generation: $gen, name: $name) {
      id
      name
      formattedName
      
      causesStatus {
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
      resistsStatus {
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

export class AbilityStatusResult extends MainToIconConnectionOnPage {
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
  gen: GenNum
  name: string
}

export const ABILITY_TYPE_QUERY = gql`
  query AbilityTypeQuery($gen: Int! $name: String!) {
    abilityByName(generation: $gen, name: $name) {
      id
      name
      formattedName
      
      boostsType {
        id
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
        id
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

export interface AbilityUsageMethodEdge extends MainToIconConnectionEdge, MainToAuxConnectionEdge {
  node: {
    id: string
    name: string
    formattedName: string
    description: string
  }
  multiplier?: number
}

export interface AbilityUsageMethodQueryVars extends EntityConnectionVars {
  gen: GenNum
  name: string
}

export const ABILITY_USAGEMETHOD_QUERY = gql`
  query AbilityUsageMethodQuery($gen: Int! $name: String!) {
    abilityByName(generation: $gen, name: $name) {
      id
      name
      formattedName
      
      activatedByUsageMethod {
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
      boostsUsageMethod {
        id
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
      resistsUsageMethod {
        id
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

export class AbilityUsageMethodResult extends MainToIconConnectionOnPage {
  public multiplier?: number

  constructor(gqlAbilityUsageMethod: AbilityUsageMethodEdge) {
    super(gqlAbilityUsageMethod);

    const { multiplier, } = gqlAbilityUsageMethod;
    this.multiplier = multiplier;
  }
}

// #endregion

// #endregion