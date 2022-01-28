import {
  gql,
} from '@apollo/client';

import {
  DescriptionEdge,
  DescriptionsEdge,
  EnumTypeName,
  GenerationNum,
  IntroductionEdge,
  ItemIconDatum,
  itemIconEdgeToItemIconDatum,
  itemRequiresPokemonEdgeToRequiredPokemonIconData,
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
  VersionDependentDescriptionEdge,
  RemovedFromGameQueryVars,
} from './helpers';

// Item in main search
// #region

export type ItemSearchQuery = {
  [searchQueryName in EntitySearchQueryName]?: ItemSearchResult[]
}

export interface ItemSearchResult extends MainEntitySearchResult {
  id: string
  name: string
  formattedName: string
  class: string

  descriptions: {
    edges: VersionDependentDescriptionEdge[]
  }

  introduced: {
    edges: IntroductionEdge[]
  }

  requiresPokemon: {
    edges: PokemonIconEdge[]
  }
}

export interface ItemSearchVars extends EntitySearchVars, RemovedFromGameQueryVars {
  gen: GenerationNum
  limit: number
  startsWith: string

  removedFromSwSh: false | null
  removedFromBDSP: false | null
}

export const ITEM_SEARCH_QUERY = gql`
  query ItemSearchQuery(
    $gen: Int! $limit: Int! $startsWith: String
    $removedFromBDSP: Boolean $removedFromSwSh: Boolean
  ) {
    items(
      generation: $gen 
      filter: { startsWith: $startsWith } 
      pagination: { limit: $limit }
    ) {
      id
      name
      formattedName
      class

      descriptions {
        edges(pagination: {limit: 1}) {
          node {
            text
          }
        }
      }
      
      requiresPokemon(filter: {
        removedFromSwSh: $removedFromSwSh,
        removedFromBDSP: $removedFromBDSP,
      }) {
        edges {
          node {
            id
            name
            formattedName
            pokemonShowdownID

            typeNames

            baseStats {
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
`;

export class ItemInSearch extends MainEntityInSearch {
  public itemClass: string
  public itemIconDatum: ItemIconDatum
  public requiredPokemonIconData: PokemonIconDatum[]

  constructor(gqlItem: ItemSearchResult) {
    super(gqlItem);

    this.itemClass = gqlItem.class;
    
    this.itemIconDatum = itemIconEdgeToItemIconDatum({node: gqlItem});
    this.requiredPokemonIconData = itemRequiresPokemonEdgeToRequiredPokemonIconData({node: gqlItem});
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
  activatedByUsageMethod: CountField
  boostsType: CountField
  boostsUsageMethod: CountField
  causesStatus: CountField
  effects: CountField
  enablesMove: CountField
  enablesPokemon: CountField
  extendsFieldState: CountField
  ignoresFieldState: CountField
  modifiesStat: CountField
  naturalGift: CountField
  requiresPokemon: CountField
  resistsFieldState: CountField
  resistsStatus: CountField
  resistsType: CountField
  resistsUsageMethod: CountField
}

export interface ItemPageQueryVars extends EntityPageVars, RemovedFromGameQueryVars {
  gen: GenerationNum
  name: string
  removedFromSwSh: false | null
  removedFromBDSP: false | null
}

export const ITEM_PAGE_QUERY = gql`
  query ItemPageQuery($gen: Int! $name: String! $removedFromSwSh: Boolean $removedFromBDSP: Boolean) {
    itemByName(generation: $gen, name: $name) {
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
      effects {
        count
      }
      enablesMove(filter: {removedFromSwSh: $removedFromSwSh, removedFromBDSP: $removedFromBDSP}) {
        count
      }
      enablesPokemon(filter: {removedFromSwSh: $removedFromSwSh, removedFromBDSP: $removedFromBDSP}) {
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
      naturalGift {
        count
      }
      requiresPokemon(filter: {removedFromSwSh: $removedFromSwSh, removedFromBDSP: $removedFromBDSP}) {
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
  public activatedByUsageMethodCount: number
  public boostsTypeCount: number
  public boostsUsageMethodCount: number
  public causesStatusCount: number
  public effectCount: number
  public enablesMoveCount: number
  public enablesPokemonCount: number
  public extendsFieldStateCount: number
  public ignoresFieldStateCount: number
  public modifiesStatCount: number
  public naturalGiftCount: number
  public requiresPokemonCount: number
  public resistsFieldStateCount: number
  public resistsStatusCount: number
  public resistsTypeCount: number
  public resistsUsageMethodCount: number

  public fieldStateCount: number
  public statusCount: number
  public typeCount: number
  public usageMethodCount: number

  constructor(gqlItem: ItemPageResult) {
    // Data for ItemPage
    super(gqlItem);

    // Counts for displaying accordions
    this.activatedByFieldStateCount = gqlItem.activatedByFieldState.count
    this.activatedByUsageMethodCount = gqlItem.activatedByUsageMethod.count
    this.boostsTypeCount = gqlItem.boostsType.count
    this.boostsUsageMethodCount = gqlItem.boostsUsageMethod.count
    this.causesStatusCount = gqlItem.causesStatus.count
    this.effectCount = gqlItem.effects.count
    this.enablesMoveCount = gqlItem.enablesMove.count
    this.enablesPokemonCount = gqlItem.enablesPokemon.count
    this.extendsFieldStateCount = gqlItem.extendsFieldState.count
    this.ignoresFieldStateCount = gqlItem.ignoresFieldState.count
    this.modifiesStatCount = gqlItem.modifiesStat.count
    this.naturalGiftCount = gqlItem.naturalGift.count
    this.requiresPokemonCount = gqlItem.requiresPokemon.count
    this.resistsFieldStateCount = gqlItem.resistsFieldState.count
    this.resistsStatusCount = gqlItem.resistsStatus.count
    this.resistsTypeCount = gqlItem.resistsType.count
    this.resistsUsageMethodCount = gqlItem.resistsUsageMethod.count

    this.fieldStateCount = this.activatedByFieldStateCount + this.extendsFieldStateCount + this.ignoresFieldStateCount + this.resistsFieldStateCount;

    this.statusCount = this.causesStatusCount + this.resistsStatusCount;

    this.typeCount = this.boostsTypeCount + this.naturalGiftCount + this.resistsTypeCount;

    this.usageMethodCount = this.activatedByUsageMethodCount + this.boostsUsageMethodCount + this.resistsUsageMethodCount;
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
    name: string
    formattedName: string
    
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
}

export const ITEM_EFFECT_QUERY = gql`
  query ItemEffectQuery($gen: Int! $name: String!) {
    itemByName(generation: $gen, name: $name) {
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
    name: string
    formattedName: string
    
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

// ItemStat
// #region

export type ItemStatQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    name: string
    formattedName: string
    
    modifiesStat: {
      edges: ItemStatEdge[]
    }
  }[]
}

export interface ItemStatEdge extends MainToAuxConnectionEdge, DescriptionEdge {
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

export interface ItemStatQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const ITEM_STAT_QUERY = gql`
  query ItemStatQuery($gen: Int! $name: String!) {
    itemByName(generation: $gen, name: $name) {
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

export class ItemStatResult extends MainToAuxConnectionOnPage {
  public stage: number
  public multiplier: number
  public chance: number
  public recipient: string

  constructor(gqlItemStat: ItemStatEdge) {
    super(gqlItemStat);

    const { stage, multiplier, chance, recipient } = gqlItemStat;
    this.stage = stage;
    this.multiplier = multiplier;
    this.chance = chance;
    this.recipient = recipient;
  }
}

// #endregion

// ItemStatus
// #region

export type ItemStatusQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    name: string
    formattedName: string
    
    causesStatus: {
      edges: ItemStatusEdge[]
    }
    resistsStatus: {
      edges: ItemStatusEdge[]
    }
  }[]
}

export interface ItemStatusEdge extends MainToAuxConnectionEdge, DescriptionEdge {
  node: {
    id: string
    name: string
    formattedName: string

    description: string
  }
  chance?: number
}

export interface ItemStatusQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const ITEM_STATUS_QUERY = gql`
  query ItemEffectQuery($gen: Int! $name: String!) {
    itemByName(generation: $gen, name: $name) {
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

export class ItemStatusResult extends MainToAuxConnectionOnPage {
  public chance?: number

  constructor(gqlItemStatus: ItemStatusEdge) {
    super(gqlItemStatus);

    if (gqlItemStatus.chance) this.chance = gqlItemStatus.chance;
  }
}

// #endregion

// ItemType
// #region

export type ItemTypeQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    name: string
    formattedName: string
    
    boostsType: {
      edges: ItemTypeEdge[]
    }
    naturalGift: {
      edges: ItemTypeEdge[]
    }
    resistsType: {
      edges: ItemTypeEdge[]
    }
  }[]
}

export interface ItemTypeEdge extends MainToAuxConnectionEdge, TypeIconEdge {
  node: {
    id: string
    name: TypeName
    formattedName: string

    introduced: {
      edges: IntroductionEdge[]
    }

    pokemon?: {
      edges: PokemonIconEdge[]
    }
  }
  multiplier?: number
  power?: number
}

export interface ItemTypeQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const ITEM_TYPE_QUERY = gql`
  query ItemEffectQuery($gen: Int! $name: String!) {
    itemByName(generation: $gen, name: $name) {
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
      naturalGift {
        edges {
          node {
            id
            name
            formattedName
          }
          power
        }
      }
      resistsType {
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

export class ItemTypeResult extends MainToAuxConnectionOnPage {
  public multiplier?: number
  public power?: number

  public pokemonIconData?: PokemonIconDatum[]
  public typeIconDatum: TypeIconDatum

  constructor(gqlItemType: ItemTypeEdge) {
    super(gqlItemType);

    const { multiplier, power } = gqlItemType;
    this.multiplier = multiplier;
    this.power = power;

    this.pokemonIconData = gqlItemType.node.pokemon?.edges.map(pokemonIconEdgeToPokemonIconDatum);
    this.typeIconDatum = typeIconEdgeToTypeIconDatum(gqlItemType);
  }
}

// #endregion

// ItemUsageMethod
// #region

export type ItemUsageMethodQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    id: string
    name: string
    formattedName: string
    
    activatedByUsageMethod: {
      edges: ItemUsageMethodEdge[]
    }
    boostsUsageMethod: {
      edges: ItemUsageMethodEdge[]
    }
    resistsUsageMethod: {
      edges: ItemUsageMethodEdge[]
    }
  }[]
}

export interface ItemUsageMethodEdge extends MainToAuxConnectionEdge {
  node: {
    id: string
    name: string
    formattedName: string
    description: string
  }
  multiplier?: number
}

export interface ItemUsageMethodQueryVars extends EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export const ITEM_USAGEMETHOD_QUERY = gql`
  query ItemUsageMethodQuery($gen: Int! $name: String!) {
    itemByName(generation: $gen, name: $name) {
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

export class ItemUsageMethodResult extends MainToAuxConnectionOnPage {
  public multiplier?: number

  constructor(gqlItemUsageMethod: ItemUsageMethodEdge) {
    super(gqlItemUsageMethod);

    const { multiplier, } = gqlItemUsageMethod;
    this.multiplier = multiplier;
  }
}

// #endregion

// #endregion