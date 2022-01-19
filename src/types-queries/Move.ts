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

  TypeNameEdge,
  PokemonIconEdge,
  PokemonIconDatum,
  pokemonIconEdgeToPokemonIconDatum,
  VersionDependentDescription,
  DescriptionEdge,
} from './helpers';
import {
  TypeName,
  typeNameEdgeToTypeName,
} from './Type';
import {
  GenerationNum,
  IntroductionEdge,
} from './Generation';
import {
  DescriptionsEdge,
} from './Description';

// Move in main search
// #region

export type MoveSearchQuery = {
  [searchQueryName in EntitySearchQueryName]?: MoveSearchResult[]
}

export interface MoveSearchResult extends MainEntitySearchResult {
  id: string
  name: string
  formattedName: string

  accuracy: number
  category: string
  contact: boolean
  power: number
  pp: number
  priority: number
  target: string

  descriptions: {
    edges: DescriptionsEdge[]
  }

  type: {
    edges: TypeNameEdge[]
  }

  pokemon: {
    edges: PokemonIconEdge[]
  }
}

export interface MoveSearchVars extends EntitySearchVars {
  gen: GenerationNum
  limit: number
  startsWith: string
}

export const MOVE_SEARCH_QUERY = gql`
  query MoveSearchQuery($gen: Int! $limit: Int! $startsWith: String) {
    moves(
      generation: $gen 
      filter: { startsWith: $startsWith } 
      pagination: { limit: $limit }
    ) {
      id
      name
      formattedName

      accuracy
      category
      contact
      power
      pp
      priority
      target

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

export class MoveInSearch extends MainEntityInSearch {
  public description: string

  public accuracy: number
  public category: string
  public contact: boolean
  public power: number
  public pp: number
  public priority: number
  public target: string

  public type: TypeName

  public pokemonIconData: PokemonIconDatum[]

  constructor(gqlMove: MoveSearchResult) {
    super(gqlMove);

    this.description = gqlMove.descriptions.edges[0].node.text;

    const { accuracy, category, contact, power, pp, priority, target, } = gqlMove;

    this.accuracy = accuracy;
    this.category = category;
    this.contact = contact;
    this.power = power;
    this.pp = pp;
    this.priority = priority;
    this.target = target;

    this.type = gqlMove.type.edges.map(typeNameEdgeToTypeName)[0]

    this.pokemonIconData = gqlMove.pokemon.edges.map(pokemonIconEdgeToPokemonIconDatum);
  }
}

// #endregion

// Move page
// #region

export type MovePageQuery = {
  [pageQueryName in EntityPageQueryName]?: MovePageResult[]
}

export interface MovePageResult extends MainEntityPageResult {
  id: string
  name: string
  formattedName: string

  accuracy: number
  category: string
  contact: boolean
  power: number
  pp: number
  priority: number
  target: string

  introduced: {
    edges: IntroductionEdge[]
  }

  descriptions: {
    edges: DescriptionsEdge[]
  }

  type: {
    edges: TypeNameEdge[]
  }

  causesStatus: CountField
  createsFieldState: CountField
  effects: CountField
  enablesMove: CountField
  enhancedByFieldState: CountField
  hinderedByFieldState: CountField
  interactedWithByMove: CountField
  interactsWithMove: CountField
  modifiesStat: CountField
  pokemon: CountField
  removesFieldState: CountField
  requiresItem: CountField
  requiresMove: CountField
  requiresPokemon: CountField
  requiresType: CountField
  resistsStatus: CountField
  usageMethod: CountField
}

export interface MovePageQueryVars extends EntityPageVars {
  gen: GenerationNum
  name: string
}

export const MOVE_PAGE_QUERY = gql`
  query MovePageQuery(
    $gen: Int!
    $name: String!
  ) {
    moveByName(
      generation: $gen,
      name: $name
    ) {
      id

      name
      formattedName

      accuracy
      category
      contact
      power
      pp
      priority
      target

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

      type {
        edges {
          node {
            name
          }
        }
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
      enablesMove {
        count
      }
      enhancedByFieldState {
        count
      }
      hinderedByFieldState {
        count
      }
      interactedWithByMove {
        count
      }
      interactsWithMove {
        count
      }
      modifiesStat {
        count
      }
      pokemon {
        count
      }
      removesFieldState {
        count
      }
      requiresItem {
        count
      }
      requiresMove {
        count
      }
      requiresPokemon {
        count
      }
      resistsStatus {
        count
      }
      requiresType {
        count
      }
      usageMethod {
        count
      }
    }
  }
`;

export class MoveOnPage extends MainEntityOnPage {
  public accuracy: number
  public category: string
  public contact: boolean
  public power: number
  public pp: number
  public priority: number
  public target: string

  public type: TypeName

  public causesStatusCount: number
  public createsFieldStateCount: number
  public effectCount: number
  public enablesMoveCount: number
  public enhancedByFieldStateCount: number
  public hinderedByFieldStateCount: number
  public interactedWithByMoveCount: number
  public interactsWithMoveCount: number
  public modifiesStatCount: number
  public pokemonCount: number
  public removesFieldStateCount: number
  public requiresItemCount: number
  public requiresMoveCount: number
  public requiresPokemonCount: number
  public requiresTypeCount: number
  public resistsStatusCount: number
  public usageMethodCount: number

  public fieldStateCount: number
  public statusCount: number

  constructor(gqlMove: MovePageResult) {
    // Data for MovePage
    super(gqlMove);

    const { accuracy, category, contact, power, pp, priority, target } = gqlMove;

    this.accuracy = accuracy;
    this.category = category;
    this.contact = contact;
    this.power = power;
    this.pp = pp;
    this.priority = priority;
    this.target = target;

    this.type = gqlMove.type.edges.map(typeNameEdgeToTypeName)[0]

    // Counts for displaying accordions
    this.causesStatusCount = gqlMove.causesStatus.count
    this.createsFieldStateCount = gqlMove.createsFieldState.count
    this.effectCount = gqlMove.effects.count
    this.enablesMoveCount = gqlMove.enablesMove.count
    this.enhancedByFieldStateCount = gqlMove.enhancedByFieldState.count
    this.hinderedByFieldStateCount = gqlMove.hinderedByFieldState.count
    this.interactedWithByMoveCount = gqlMove.interactedWithByMove.count
    this.interactsWithMoveCount = gqlMove.interactsWithMove.count
    this.modifiesStatCount = gqlMove.modifiesStat.count
    this.pokemonCount = gqlMove.pokemon.count
    this.removesFieldStateCount = gqlMove.removesFieldState.count
    this.requiresItemCount = gqlMove.requiresItem.count
    this.requiresMoveCount = gqlMove.requiresMove.count
    this.requiresPokemonCount = gqlMove.requiresPokemon.count
    this.requiresTypeCount = gqlMove.requiresType.count
    this.resistsStatusCount = gqlMove.resistsStatus.count
    this.usageMethodCount = gqlMove.usageMethod.count

    this.fieldStateCount = this.createsFieldStateCount + this.enhancedByFieldStateCount + this.hinderedByFieldStateCount + this.removesFieldStateCount;

    this.statusCount = this.causesStatusCount + this.resistsStatusCount;
  }
}

// #endregion

// Move connections 
// #region

// MoveEffect
// #region

export type MoveEffectQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    effects: {
      edges: MoveEffectEdge[]
    }
  }[]
}

export interface MoveEffectEdge extends MainToAuxConnectionEdge, DescriptionEdge {
  node: {
    id: string
    name: string
    formattedName: string

    description: string
  }
}

export interface MoveEffectQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const MOVE_EFFECT_QUERY = gql`
  query MoveEffectQuery($gen: Int! $name: String!) {
    moveByName(generation: $gen, name: $name) {
      id
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

export class MoveEffectResult extends MainToAuxConnectionOnPage {
  constructor(gqlMoveEffect: MoveEffectEdge) {
    super(gqlMoveEffect);
  }
}

// #endregion

// MoveFieldState
// #region

export type MoveFieldStateQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    createsFieldState: {
      edges: MoveFieldStateEdge[]
    }
    enhancedByFieldState: {
      edges: MoveFieldStateEdge[]
    }
    hinderedByFieldState: {
      edges: MoveFieldStateEdge[]
    }
    removesFieldState: {
      edges: MoveFieldStateEdge[]
    }
  }[]
}

export interface MoveFieldStateEdge extends MainToAuxConnectionEdge, DescriptionEdge {
  node: {
    id: string
    name: string
    formattedName: string

    description: string
  }
  turns?: number
}

export interface MoveFieldStateQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const MOVE_FIELDSTATE_QUERY = gql`
  query MoveEffectQuery($gen: Int! $name: String!) {
    moveByName(generation: $gen, name: $name) {
      id
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
      enhancedByFieldState {
        edges {
          node {
            id
            name
            formattedName
            description
          }
        }
      }
      hinderedByFieldState {
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
    }
  }
`;

export class MoveFieldStateResult extends MainToAuxConnectionOnPage {
  public turns?: number

  constructor(gqlMoveFieldState: MoveFieldStateEdge) {
    super(gqlMoveFieldState);

    if (gqlMoveFieldState.turns) this.turns = gqlMoveFieldState.turns;
  }
}

// #endregion

// MoveStat
// #region

export type MoveStatQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    modifiesStat: {
      edges: MoveStatEdge[]
    }
  }[]
}

export interface MoveStatEdge extends MainToAuxConnectionEdge, DescriptionEdge {
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

export interface MoveStatQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const MOVE_STAT_QUERY = gql`
  query MoveStatQuery($gen: Int! $name: String!) {
    moveByName(generation: $gen, name: $name) {
      id
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

export class MoveStatResult extends MainToAuxConnectionOnPage {
  public stage: number
  public multiplier: number
  public chance: number
  public recipient: string

  constructor(gqlMoveStat: MoveStatEdge) {
    super(gqlMoveStat);

    const { stage, multiplier, chance, recipient } = gqlMoveStat;
    this.stage = stage;
    this.multiplier = multiplier;
    this.chance = chance;
    this.recipient = recipient;
  }
}

// #endregion

// MoveStatus
// #region

export type MoveStatusQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    causesStatus: {
      edges: MoveStatusEdge[]
    }
    resistsStatus: {
      edges: MoveStatusEdge[]
    }
  }[]
}

export interface MoveStatusEdge extends MainToAuxConnectionEdge, DescriptionEdge {
  node: {
    id: string
    name: string
    formattedName: string

    description: string
  }
  chance?: number
}

export interface MoveStatusQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const MOVE_STATUS_QUERY = gql`
  query MoveStatusQuery($gen: Int! $name: String!) {
    moveByName(generation: $gen, name: $name) {
      id
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

export class MoveStatusResult extends MainToAuxConnectionOnPage {
  public chance?: number

  constructor(gqlMoveStatus: MoveStatusEdge) {
    super(gqlMoveStatus);

    if (gqlMoveStatus.chance) this.chance = gqlMoveStatus.chance;
  }
}

// #endregion

// #endregion