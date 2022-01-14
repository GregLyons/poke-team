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
  DescriptionEdge,
} from './Description';

// Item in main search
// #region

export type ItemSearchQuery = {
  [searchQueryName in EntitySearchQueryName]?: ItemSearchResult[]
}

export interface ItemSearchResult extends EntitySearchResult {
  id: string
  name: string
  formattedName: string
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
    }
  }
`;

export class ItemInSearch extends EntityInSearch {
  constructor(gqlItem: ItemSearchResult) {
    super(gqlItem);
  }
}

// #endregion

// Item page
// #region

export type ItemPageQuery = {
  [pageQueryName in EntityPageQueryName]?: ItemPageResult[]
}

// TODO: confusesNature, naturalGift
export interface ItemPageResult extends EntityPageResult {
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
  effectsCount: CountField
  enablesMoveCount: CountField
  enablesPokemonCount: CountField
  extendsFieldStateCount: CountField
  modifiesStatCount: CountField
  requiresPokemonCount: CountField
  resistsFieldStateCount: CountField
  resistsStatusCount: CountField
  resistsTypeCount: CountField
  resistsUsageMethodCount: CountField
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

export class ItemOnPage extends EntityOnPage {
  public activatedByFieldStateCount: number
  public boostsTypeCount: number
  public boostsUsageMethodCount: number
  public causesStatusCount: number
  public effectsCount: number
  public enablesMoveCount: number
  public enablesPokemonCount: number
  public extendsFieldStateCount: number
  public modifiesStatCount: number
  public requiresPokemonCount: number
  public resistsFieldStateCount: number
  public resistsStatusCount: number
  public resistsTypeCount: number
  public resistsUsageMethodCount: number

  constructor(gqlItem: ItemPageResult) {
    // Data for ItemPage
    super(gqlItem);
    
    this.activatedByFieldStateCount = gqlItem.activatedByFieldStateCount.count
    this.boostsTypeCount = gqlItem.boostsTypeCount.count
    this.boostsUsageMethodCount = gqlItem.boostsUsageMethodCount.count
    this.causesStatusCount = gqlItem.causesStatusCount.count
    this.effectsCount = gqlItem.effectsCount.count
    this.enablesMoveCount = gqlItem.enablesMoveCount.count
    this.enablesPokemonCount = gqlItem.enablesPokemonCount.count
    this.extendsFieldStateCount = gqlItem.extendsFieldStateCount.count
    this.modifiesStatCount = gqlItem.modifiesStatCount.count
    this.requiresPokemonCount = gqlItem.requiresPokemonCount.count
    this.resistsFieldStateCount = gqlItem.resistsFieldStateCount.count
    this.resistsStatusCount = gqlItem.resistsStatusCount.count
    this.resistsTypeCount = gqlItem.resistsTypeCount.count
    this.resistsUsageMethodCount = gqlItem.resistsUsageMethodCount.count
  }
}

// #endregion

// Item connections 
// #region

export type ItemEffectQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    effects: {
      edges: ItemEffectEdge[]
    }
  }[]
}

export interface ItemEffectEdge extends EntityConnectionEdge {
  node: {
    id: string
    name: string
    formattedName: string
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
          }
        }
      }
    }
  }
`;

export class ItemEffectResult extends EntityConnectionOnPage {
  constructor(gqlItemEffect: ItemEffectEdge) {
    super(gqlItemEffect)
  }
}

// #endregion