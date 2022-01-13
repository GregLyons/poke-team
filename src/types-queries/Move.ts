import {
  EntityInSearch,

  EntityConnectionEdge,
  EntityConnectionVars,
  EntityConnectionOnPage,
  
  EntityOnPage,
  EntityPageResult,
  CountField,
  EntityPageVars,

  EntitySearchResult,
  EntitySearchVars,
  EntityConnectionQuery,
} from './helpers';
import {
  TypeName,
  TypeNameEdge,
  typeNameEdgeToTypeName,
} from './Type';
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
  gql,
} from '@apollo/client';
import {
  DescriptionEdge,
} from './Description';

// Move in main search
// #region

export interface MoveSearchQuery {
  moves: MoveSearchResult[]
}

export interface MoveSearchResult extends EntitySearchResult {
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

export class MoveInSearch implements EntityInSearch {
  public id: string
  public name: string
  public formattedName: string

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

    const { id, name, formattedName, accuracy, category, contact, power, pp, priority, target, } = gqlMove;

    this.id = id;
    this.name = name;
    this.formattedName = formattedName;

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

export interface MovePageQuery {
  moves: MovePageResult[]
}

export interface MovePageResult extends EntityPageResult {
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
    edges: DescriptionEdge[]
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
      requiresType {
        count
      }
      usageMethod {
        count
      }
    }
  }
`;

export class MoveOnPage implements EntityOnPage {
  public id: string
  public name: string
  public formattedName: string

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
  public effectsCount: number
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
  public usageMethodCount: number

  constructor(gqlMove: MovePageResult) {
    // Data for MovePage
    const { id, name, formattedName, accuracy, category, contact, power, pp, priority, target } = gqlMove;

    this.id = id;
    this.name = name;
    this.formattedName = formattedName;

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
    this.effectsCount = gqlMove.effects.count
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
    this.usageMethodCount = gqlMove.usageMethod.count
  }
}

// #endregion

// Move connections 
// #region

export interface MoveEffectQuery extends EntityConnectionQuery {
  id: string
  effects: {
    edges: MoveEffectEdge[]
  }
}

export interface MoveEffectEdge extends EntityConnectionEdge {
  node: {
    id: string
    name: string
    formattedName: string
  }
}

export interface MoveEffectQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const MOVE_EFFECT_QUERY = gql`
  query MoveEffectQuery($gen: Int! $name: String! $startsWith: string) {
    moveByName(generation: $gen, name: $name) {
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

export class MoveEffectResult implements EntityConnectionOnPage {
  public id: string
  public name: string
  public formattedName: string

  constructor(gqlMoveEffect: MoveEffectEdge) {
    this.id = gqlMoveEffect.node.id;
    this.name = gqlMoveEffect.node.name;
    this.formattedName = gqlMoveEffect.node.formattedName;
  }
}

// #endregion