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

// Item in main search
// #region

export type ItemSearchQuery = {
  [searchQueryName in EntitySearchQueryName]?: ItemSearchResult[]
}

export interface ItemSearchResult extends MainEntitySearchResult {
  id: string
  name: string
  formattedName: string

  descriptions: {
    edges: DescriptionsEdge[]
  }
}

export interface ItemSearchVars extends EntitySearchVars {
  gen: GenerationNum
  limit: number
  startsWith: string
}

export const ITEM_SEARCH_QUERY = gql`
  query ItemSearchQuery($gen: Int! $limit: Int! $startsWith: String) {
    items(
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
    }
  }
`;

export class ItemInSearch extends MainEntityInSearch {
  public description: string

  constructor(gqlItem: ItemSearchResult) {
    super(gqlItem);

    this.description = gqlItem.descriptions.edges[0].node.text;
  }
}

// #endregion

// Item page
// #region

export type ItemPageQuery = {
  [pageQueryName in EntityPageQueryName]?: ItemPageResult[]
}

// TODO: confusesNature, naturalGift
export interface ItemPageResult extends MainEntityPageResult {
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
  effects: CountField
  enablesMove: CountField
  enablesPokemon: CountField
  extendsFieldState: CountField
  ignoresFieldState: CountField
  modifiesStat: CountField
  requiresPokemon: CountField
  resistsFieldState: CountField
  resistsStatus: CountField
  resistsType: CountField
  resistsUsageMethod: CountField
}

export interface ItemPageQueryVars extends EntityPageVars {
  gen: GenerationNum
  name: string
}

export const ITEM_PAGE_QUERY = gql`
  query ItemPageQuery(
    $gen: Int!
    $name: String!
  ) {
    itemByName(
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
      effects {
        count
      }
      enablesMove {
        count
      }
      enablesPokemon {
        count
      }
      extendsFieldState {
        count
      }
      ignoresFieldState {
        count
      }
      modifiesStat {
        count
      }
      requiresPokemon {
        count
      }
      resistsFieldState {
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
    }
  }
`;

export class ItemOnPage extends MainEntityOnPage {
  public activatedByFieldStateCount: number
  public boostsTypeCount: number
  public boostsUsageMethodCount: number
  public causesStatusCount: number
  public effectCount: number
  public enablesMoveCount: number
  public enablesPokemonCount: number
  public extendsFieldStateCount: number
  public ignoresFieldStateCount: number
  public modifiesStatCount: number
  public requiresPokemonCount: number
  public resistsFieldStateCount: number
  public resistsStatusCount: number
  public resistsTypeCount: number
  public resistsUsageMethodCount: number

  public fieldStateCount: number

  constructor(gqlItem: ItemPageResult) {
    // Data for ItemPage
    super(gqlItem);

    // Counts for displaying accordions
    this.activatedByFieldStateCount = gqlItem.activatedByFieldState.count
    this.boostsTypeCount = gqlItem.boostsType.count
    this.boostsUsageMethodCount = gqlItem.boostsUsageMethod.count
    this.causesStatusCount = gqlItem.causesStatus.count
    this.effectCount = gqlItem.effects.count
    this.enablesMoveCount = gqlItem.enablesMove.count
    this.enablesPokemonCount = gqlItem.enablesPokemon.count
    this.extendsFieldStateCount = gqlItem.extendsFieldState.count
    this.ignoresFieldStateCount = gqlItem.ignoresFieldState.count
    this.modifiesStatCount = gqlItem.modifiesStat.count
    this.requiresPokemonCount = gqlItem.requiresPokemon.count
    this.resistsFieldStateCount = gqlItem.resistsFieldState.count
    this.resistsStatusCount = gqlItem.resistsStatus.count
    this.resistsTypeCount = gqlItem.resistsType.count
    this.resistsUsageMethodCount = gqlItem.resistsUsageMethod.count

    this.fieldStateCount = this.activatedByFieldStateCount + this.extendsFieldStateCount + this.ignoresFieldStateCount + this.resistsFieldStateCount;
  }
}

// #endregion

// Item connections 
// #region

// ItemEffect
// #region

export type ItemEffectQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    effects: {
      edges: ItemEffectEdge[]
    }
  }[]
}

export interface ItemEffectEdge extends MainToAuxConnectionEdge, DescriptionEdge {
  node: {
    id: string
    name: string
    formattedName: string

    description: string
  }
}

export interface ItemEffectQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
  startsWith: string
}

export const ITEM_EFFECT_QUERY = gql`
  query ItemEffectQuery($gen: Int! $name: String! $startsWith: String) {
    itemByName(generation: $gen, name: $name) {
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

export class ItemEffectResult extends MainToAuxConnectionOnPage {
  constructor(gqlItemEffect: ItemEffectEdge) {
    super(gqlItemEffect);
  }
}

// #endregion

// ItemFieldState
// #region

export type ItemFieldStateQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    activatedByFieldState: {
      edges: ItemFieldStateEdge[]
    }
    extendsFieldState: {
      edges: ItemFieldStateEdge[]
    }
    ignoresFieldState: {
      edges: ItemFieldStateEdge[]
    }
    resistsFieldState: {
      edges: ItemFieldStateEdge[]
    }
  }[]
}

export interface ItemFieldStateEdge extends MainToAuxConnectionEdge, DescriptionEdge {
  node: {
    id: string
    name: string
    formattedName: string

    description: string
  }
  turns?: number
}

export interface ItemFieldStateQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const ITEM_FIELDSTATE_QUERY = gql`
  query ItemEffectQuery($gen: Int! $name: String!) {
    itemByName(generation: $gen, name: $name) {
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
      extendsFieldState {
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
      resistsFieldState {
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

export class ItemFieldStateResult extends MainToAuxConnectionOnPage {
  public turns?: number

  constructor(gqlItemFieldState: ItemFieldStateEdge) {
    super(gqlItemFieldState);

    if (gqlItemFieldState.turns) this.turns = gqlItemFieldState.turns;
  }
}

// #endregion

// #endregion