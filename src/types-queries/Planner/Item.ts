import {
  gql
} from '@apollo/client';
import { GenNum, ItemClass } from '../entities';
import {
  DescriptionEdge,
  DescriptionsEdge,
  IconDatum,
  IntroductionEdge,
  itemIconEdgeToItemIconDatum,
  itemRequiresPokemonEdgeToRequiredPokemonIconData,
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
  MainToIconConnectionOnPage, RemovedFromGameQueryVars, VersionDependentDescriptionEdge
} from './helpers';


// Item in main search
// #region

export type ItemSearchQuery = {
  items: {
    count: number
    edges: ItemSearchResult[]
  }
}

export interface ItemSearchResult extends MainEntitySearchResult {
  node: {
    name: string
    formattedName: string
    psID: string
    class: ItemClass
  
    descriptions: {
      edges: VersionDependentDescriptionEdge[]
    }
  
    requiresPokemon: {
      edges: PokemonIconEdge[]
    }
  }
}

export interface ItemSearchVars extends EntitySearchVars, RemovedFromGameQueryVars {
  offset: number
  itemClass: ItemClass[]
}

export const ITEM_SEARCH_QUERY = gql`
  query ItemSearchQuery(
    $gen: Int!
    $limit: Int! $offset: Int!
    $contains: String $startsWith: String
    $removedFromBDSP: Boolean $removedFromSwSh: Boolean
    $itemClass: [ItemClass!]
  ) {
    items(
      generation: $gen 
      filter: { contains: $contains, startsWith: $startsWith, class: $itemClass } 
      pagination: { limit: $limit, offset: $offset }
    ) {
      id
      count
      edges {
        node {
          id
          name
          formattedName
          class

          descriptions(pagination: {limit: 1}) {
            id
            edges {
              node {
                text
              }
            }
          }
          
          requiresPokemon(filter: {
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

export class ItemInSearch extends MainEntityInSearch {
  public itemClass: string
  public itemIconDatum: IconDatum
  public requiredPokemonIconData: PokemonIconDatum[]

  constructor(gqlItem: ItemSearchResult) {
    super(gqlItem);

    this.itemClass = gqlItem.node.class;
    
    this.itemIconDatum = itemIconEdgeToItemIconDatum({node: gqlItem.node});
    this.requiredPokemonIconData = itemRequiresPokemonEdgeToRequiredPokemonIconData({node: gqlItem.node});
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
  gen: GenNum
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
      effects {
        id
        count
      }
      enablesMove(filter: {removedFromSwSh: $removedFromSwSh, removedFromBDSP: $removedFromBDSP}) {
        id
        count
      }
      enablesPokemon(filter: {removedFromSwSh: $removedFromSwSh, removedFromBDSP: $removedFromBDSP}) {
        id
        count
      }
      extendsFieldState {
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
      naturalGift {
        id
        count
      }
      requiresPokemon(filter: {removedFromSwSh: $removedFromSwSh, removedFromBDSP: $removedFromBDSP}) {
        id
        count
      }
      resistsFieldState {
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
  gen: GenNum
  name: string
}

export const ITEM_EFFECT_QUERY = gql`
  query ItemEffectQuery($gen: Int! $name: String!) {
    itemByName(generation: $gen, name: $name) {
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

export class ItemEffectResult extends MainToAuxConnectionOnPage {
  // constructor(gqlItemEffect: ItemEffectEdge) {
  //   super(gqlItemEffect);
  // }
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

export interface ItemFieldStateEdge extends MainToIconConnectionEdge, MainToAuxConnectionEdge, DescriptionEdge {
  node: {
    id: string
    name: string
    formattedName: string

    description: string
  }
  turns?: number
}

export interface ItemFieldStateQueryVars extends EntityConnectionVars {
  gen: GenNum
  name: string
}

export const ITEM_FIELDSTATE_QUERY = gql`
  query ItemEffectQuery($gen: Int! $name: String!) {
    itemByName(generation: $gen, name: $name) {
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
      extendsFieldState {
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
      resistsFieldState {
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

export class ItemFieldStateResult extends MainToIconConnectionOnPage {
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

export interface ItemStatEdge extends MainToIconConnectionEdge, MainToAuxConnectionEdge, DescriptionEdge {
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
  gen: GenNum
  name: string
}

export const ITEM_STAT_QUERY = gql`
  query ItemStatQuery($gen: Int! $name: String!) {
    itemByName(generation: $gen, name: $name) {
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

export class ItemStatResult extends MainToIconConnectionOnPage {
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

export interface ItemStatusEdge extends MainToIconConnectionEdge, MainToAuxConnectionEdge, DescriptionEdge {
  node: {
    id: string
    name: string
    formattedName: string

    description: string
  }
  chance?: number
}

export interface ItemStatusQueryVars extends EntityConnectionVars {
  gen: GenNum
  name: string
}

export const ITEM_STATUS_QUERY = gql`
  query ItemEffectQuery($gen: Int! $name: String!) {
    itemByName(generation: $gen, name: $name) {
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

export class ItemStatusResult extends MainToIconConnectionOnPage {
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
  gen: GenNum
  name: string
}

export const ITEM_TYPE_QUERY = gql`
  query ItemEffectQuery($gen: Int! $name: String!) {
    itemByName(generation: $gen, name: $name) {
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
      naturalGift {
        id
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
        id
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

export interface ItemUsageMethodEdge extends MainToIconConnectionEdge, MainToAuxConnectionEdge {
  node: {
    id: string
    name: string
    formattedName: string
    description: string
  }
  multiplier?: number
}

export interface ItemUsageMethodQueryVars extends EntityConnectionVars {
  gen: GenNum
  name: string
}

export const ITEM_USAGEMETHOD_QUERY = gql`
  query ItemUsageMethodQuery($gen: Int! $name: String!) {
    itemByName(generation: $gen, name: $name) {
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

export class ItemUsageMethodResult extends MainToIconConnectionOnPage {
  public multiplier?: number

  constructor(gqlItemUsageMethod: ItemUsageMethodEdge) {
    super(gqlItemUsageMethod);

    const { multiplier, } = gqlItemUsageMethod;
    this.multiplier = multiplier;
  }
}

// #endregion

// #endregion