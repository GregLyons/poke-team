import {
  NUMBER_OF_GENS,
} from '../utils/constants';
import { compareStrings, sortArray } from '../utils/helpers';

// Types for filtering
// #region

// Field States
// #region

export type FieldStateClass =
| 'ENTRY_HAZARD'
| 'OTHER'
| 'PLEDGE'
| 'ROOM'
| 'SCREEN'
| 'TERRAIN'
| 'WEATHER';

export const FIELDSTATE_CLASS_MAP = new Map<FieldStateClass, string>([
  ['ENTRY_HAZARD', 'Entry hazard'],
  ['OTHER', 'Other'],
  ['PLEDGE', 'Pledge'],
  ['ROOM', 'Room'],
  ['SCREEN', 'Screen'],
  ['TERRAIN', 'Terrain'],
  ['WEATHER', 'Weather'],
]);

export type FieldStateDamagePercent = 0 | 16.67 | 12.5 | 6.25;

export const FIELDSTATE_DAMAGEPERCENT_MAP = new Map<FieldStateDamagePercent, string>([
  [0, '0'],
  [16.67, '1/6'],
  [12.5, '1/8'],
  [6.25, '1/16'],
]);

export type FieldStateTargetClass =
| 'ALL'
| 'ALL_ALLIES'
| 'ALL_FOES';

export const FIELDSTATE_TARGETCLASS_MAP = new Map<FieldStateTargetClass, string>([
  ['ALL', 'All'],
  ['ALL_ALLIES', 'All allies'],
  ['ALL_FOES', 'All foes'],
]);


// #endregion

// Items
// #region

export type ItemClass = 
| 'BERRY'
| 'CHOICE'
| 'DRIVE'
| 'GEM'
| 'INCENSE'
| 'MEGA_STONE'
| 'MEMORY'
| 'OTHER'
| 'PLATE'
| 'POWER'
| 'STAT_ENHANCER'
| 'TYPE_ENHANCER'
| 'Z_CRYSTAL';

export const ITEM_CLASS_MAP = new Map<ItemClass, string>([
  ['BERRY', 'Berry'],
  ['CHOICE', 'Choice'],
  ['DRIVE', 'Drive'],
  ['GEM', 'Gem'],
  ['INCENSE', 'Incense'],
  ['MEGA_STONE', 'Mega stone'],
  ['MEMORY', 'Memory'],
  ['OTHER', 'Other'],
  ['PLATE', 'Plate'],
  ['POWER', 'Power'],
  ['STAT_ENHANCER', 'Stat enhancer'],
  ['TYPE_ENHANCER', 'Type enhancer'],
  ['Z_CRYSTAL', 'Z-crystal'],
]);

// #endregion

// Moves
// #region

export const MOVE_TYPE_MAP = new Map<EnumTypeName, FormattedTypeName>([
  ['NORMAL', 'Normal'],
  ['FIGHTING', 'Fighting'],
  ['FLYING', 'Flying'],
  ['POISON', 'Poison'],
  ['GROUND', 'Ground'],
  ['ROCK', 'Rock'],
  ['BUG', 'Bug'],
  ['GHOST', 'Ghost'],
  ['STEEL', 'Steel'],
  ['FIRE', 'Fire'],
  ['WATER', 'Water'],
  ['GRASS', 'Grass'],
  ['ELECTRIC', 'Electric'],
  ['PSYCHIC', 'Psychic'],
  ['ICE', 'Ice'],
  ['DRAGON', 'Dragon'],
  ['DARK', 'Dark'],
  ['FAIRY', 'Fairy'],
])

export type MoveCategory =
| 'PHYSICAL'
| 'SPECIAL'
| 'STATUS'
| 'VARIES';

export const MOVE_CATEGORY_MAP = new Map<MoveCategory, string>([
  ['PHYSICAL', 'Physical'],
  ['SPECIAL', 'Special'],
  ['STATUS', 'Status'],
  ['VARIES', 'Varies'],
]);

export type MoveTargetClass =
| 'ADJACENT_ALLY'
| 'ADJACENT_FOE'
| 'ALL'
| 'ALL_ADJACENT'
| 'ALL_ADJACENT_FOES'
| 'ALL_ALLIES'
| 'ALL_FOES'
| 'ANY'
| 'ANY_ADJACENT'
| 'USER'
| 'USER_AND_ALL_ALLIES'
| 'USER_OR_ADJACENT_ALLY';

export const MOVE_TARGETCLASS_MAP = new Map<MoveTargetClass, string>([
  ['ADJACENT_ALLY', 'Adjacent ally'],
  ['ADJACENT_FOE', 'Adjacent foe'],
  ['ALL', 'All'],
  ['ALL_ADJACENT', 'All adjacent'],
  ['ALL_ADJACENT_FOES', 'All adjacent foes'],
  ['ALL_ALLIES', 'All allies'],
  ['ALL_FOES', 'All foes'],
  ['ANY', 'Any'],
  ['ANY_ADJACENT', 'Any adjacent'],
  ['USER', 'User'],
  ['USER_AND_ALL_ALLIES', 'User and all allies'],
  ['USER_OR_ADJACENT_ALLY', 'User or adjacent ally'],
]);

// #endregion

// #endregion

// Types for paginating queries
// #region

export type SortByEnum = 'ASC' | 'DESC';

export interface PaginationInput {
  orderBy: string,
  sortBy: SortByEnum,
}

// Pokemon pagination
// #region

export type PokemonColumnName = 'psID' | 'hp' | 'attack' | 'defense' | 'specialAttack' | 'specialDefense' | 'speed' | 'baseStatTotal' | 'tier';

export interface PokemonPaginationInput extends PaginationInput {
  orderBy: PokemonColumnName
  sortBy: SortByEnum
}

// #endregion

// #endregion

export interface ModifiesBaseStatEdge {
  node: {
    id: string
    name: GQLBaseStatName
  }
  stage: number
  multiplier: number
}

// Generations
// #region

export type GenerationNum = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export const stringToGenNumber = (value: string | null): GenerationNum => {
  if (value === null) return NUMBER_OF_GENS;
  else if (['1', '2', '3', '4', '5', '6', '7', '8'].includes(value)) {
    return parseInt(value, 10) as GenerationNum;
  }
  else {
    return NUMBER_OF_GENS;
  }
}

// #endregion

// Icons
// #region

// Pokemon icons
// #region

export type GQLBaseStatName = 'hp' | 'attack' | 'defense' | 'special_attack' | 'special_defense' | 'speed';

export type BaseStatName = 'hp' | 'attack' | 'defense' | 'specialAttack' | 'specialDefense' | 'speed';

export type FormattedBaseStatName = 'HP' | 'Attack' | 'Defense' | 'Special Attack' | 'Special Defense' | 'Speed';

export type AbbreviatedBaseStatName = 'HP' | 'Atk' | 'Def' | 'SpA' | 'SpD' | 'Spe';

export const toBaseStatName: (baseStatName: FormattedBaseStatName | AbbreviatedBaseStatName | GQLBaseStatName ) => BaseStatName = baseStateName => {
  switch(baseStateName) {
    case 'HP':
    case 'hp':
      return 'hp';
    case 'Attack':
    case 'Atk':
    case 'attack':
      return 'attack';
    case 'Defense':
    case 'Def':
    case 'defense':
      return 'defense';
    case 'Special Attack':
    case 'SpA':
    case 'special_attack':
      return 'specialAttack';
    case 'Special Defense':
    case 'SpD':
    case 'special_defense':
      return 'specialDefense';
    case 'Speed':
    case 'Spe':
    case 'speed':
      return 'speed';
    default:
      throw Error();
  }
};

export const toFormattedBaseStatName: (baseStatName: BaseStatName | AbbreviatedBaseStatName | GQLBaseStatName) => FormattedBaseStatName = baseStateName => {
  switch(baseStateName) {
    case 'hp':
    case 'HP':
      return 'HP';
    case 'attack':
    case 'Atk':
      return 'Attack';
    case 'defense':
    case 'Def':
      return 'Defense';
    case 'specialAttack':
    case 'special_attack':
    case 'SpA':
      return 'Special Attack';
    case 'specialDefense':
    case 'special_defense':
    case 'SpD':
      return 'Special Defense';
    case 'speed':
    case 'Spe':
      return 'Speed';
    default:
      throw Error();
  }
}

export const toAbbreviatedBaseStatName: (baseStatName: BaseStatName | FormattedBaseStatName | GQLBaseStatName) => AbbreviatedBaseStatName = baseStatName => {
  switch(baseStatName) {
    case 'HP':
    case 'hp':
      return 'HP';
    case 'attack':
    case 'Attack':
      return 'Atk';
    case 'defense':
    case 'Defense':
      return 'Def';
    case 'specialAttack':
    case 'Special Attack':
    case 'special_attack':
      return 'SpA';
    case 'specialDefense':
    case 'Special Defense':
    case 'special_defense':
      return 'SpD';
    case 'speed':
    case 'Speed':
      return 'Spe';
    default:
      throw Error();
  }
}

export type StatTable = {
  [baseStatName in BaseStatName]: number
}

export type StatTableWithBST = {
  [baseStatName in BaseStatName | 'baseStatTotal']: number
}

export type psID = string;

export type PokemonIconDatum = {
  id: string
  formattedName: string
  psID: psID

  removedFromSwSh: boolean
  removedFromBDSP: boolean

  typing: TypeName[]
  baseStats: StatTable
}

export function equateTwoPokemonIconData (pid1: PokemonIconDatum, pid2: PokemonIconDatum): boolean {
  return pid1.psID === pid2.psID;
};

export function compareTwoPokemonIconData (pid1: PokemonIconDatum, pid2: PokemonIconDatum): number {
  return compareStrings(pid1.psID, pid2.psID);
}

export function sortPokemonIconData (pid: PokemonIconDatum[]): PokemonIconDatum[] {
  return sortArray(pid, compareTwoPokemonIconData);
}

export const DUMMY_POKEMON_ICON_DATUM: PokemonIconDatum = {
  id: '',
  formattedName: '',
  psID: '',
  removedFromSwSh: false,
  removedFromBDSP: false,
  typing: ['normal'],
  baseStats: {
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
  },
};

export const pokemonIconNodeToPokemonIconDatum: (node: PokemonIconNode) => PokemonIconDatum = (node) => {
  return {
    ...node,
    psID: node.psID,
    typing: node.typeNames.map(toTypeName),
  }
}

export const pokemonIconEdgeToPokemonIconDatum: (edge: PokemonIconEdge) => PokemonIconDatum = (edge) => {
  return pokemonIconNodeToPokemonIconDatum(edge.node);
}

// #endregion

// Item icons
// #region

export type ItemIconDatum = {
  name: string
  formattedName: string
}

export const itemIconEdgeToItemIconDatum: (edge: ItemIconEdge) => ItemIconDatum = (edge) => {
  return {
    name: edge.node.name,
    formattedName: edge.node.formattedName,
  };
}

export const itemRequiresPokemonEdgeToRequiredPokemonIconData: (itemEdge: ItemRequiresPokemonEdge) => PokemonIconDatum[] = (itemEdge) => {
  return itemEdge.node.requiresPokemon.edges.map(pokemonIconEdgeToPokemonIconDatum);
}

// #endregion

// Type icons
// #region 
 
export type TypeIconDatum = {
  name: TypeName
  formattedName: string
}

export const typeIconEdgeToTypeIconDatum: (edge: TypeIconEdge) => TypeIconDatum = (edge) => {
  return {
    name: edge.node.name,
    formattedName: edge.node.formattedName,
  };
}

// #endregion

// #endregion

// Other icons 
// #region

export type IconDatum = {
  name: string
  formattedName: string
};

export const iconEdgeToIconDatum: (edge: IconEdge) => IconDatum = (edge) => {
  return {
    name: edge.node.name,
    formattedName: edge.node.formattedName,
  };
}

// #endregion

// Elemental types
// #region

export type TypeName = 'normal' | 'fighting' | 'flying' | 'poison' | 'ground' | 'rock' | 'bug' | 'ghost' | 'steel' | 'fire' | 'water' | 'grass' | 'electric' | 'psychic' | 'ice' | 'dragon' | 'dark' | 'fairy';

export type EnumTypeName = 'NORMAL' | 'FIGHTING' | 'FLYING' | 'POISON' | 'GROUND' | 'ROCK' | 'BUG' | 'GHOST' | 'STEEL' | 'FIRE' | 'WATER' | 'GRASS' | 'ELECTRIC' | 'PSYCHIC' | 'ICE' | 'DRAGON' | 'DARK' | 'FAIRY';

export type FormattedTypeName = 'Normal' | 'Fighting' | 'Flying' | 'Poison' | 'Ground' | 'Rock' | 'Bug' | 'Ghost' | 'Steel' | 'Fire' | 'Water' | 'Grass' | 'Electric' | 'Psychic' | 'Ice' | 'Dragon' | 'Dark' | 'Fairy';

export const typeNameEdgeToTypeName: (edge: TypeNameEdge) => TypeName = edge => edge.node.name;

export const toEnumTypeName: (typeName: TypeName | FormattedTypeName) => EnumTypeName = (typeName) => {
  return (typeName.toUpperCase() as EnumTypeName);
}

export const toFormattedTypeName: (typeName: TypeName | EnumTypeName) => FormattedTypeName = (typeName) => {
  return (typeName.charAt(0).toUpperCase() + typeName.slice(1).toLowerCase() as FormattedTypeName);
}

export const toTypeName: (enumTypeName: EnumTypeName | FormattedTypeName) => TypeName = (enumTypeName) => {
  return (enumTypeName.toLowerCase() as TypeName);
}

// #endregion

// // Usage methods
// // #region

// export type UsageMethodName = 'ball' | 'dance' | 'bite' | 'explosive' | 'powder' | 'pulse' | 'punch' | 'sound';

// export type EnumUsageMethodName = 'BALL' | 'DANCE' | 'BITE' | 'EXPLOSIVE' | 'POWDER' | 'PULSE' | 'PUNCH' | 'SOUND';

// export type FormattedUsageMethodName = 'Ball' | 'Dance' | 'Bite' | 'Explosive' | 'Powder' | 'Pulse' | 'Punch' | 'Sound';

// // export const typeNameEdgeToUsageMethodName: (edge: UsageMethodNameEdge) => UsageMethodName = edge => edge.node.name;

// export const toEnumUsageMethodName: (usageMethodName: UsageMethodName | FormattedUsageMethodName) => EnumUsageMethodName = (usageMethodName) => {
//   return (usageMethodName.toUpperCase() as EnumUsageMethodName);
// }

// export const toFormattedUsageMethodName: (usageMethodName: UsageMethodName | EnumUsageMethodName) => FormattedUsageMethodName = (usageMethodName) => {
//   return (usageMethodName.charAt(0).toUpperCase() + usageMethodName.slice(1).toLowerCase() as FormattedUsageMethodName);
// }

// export const toUsageMethodName: (enumUsageMethodName: EnumUsageMethodName | FormattedUsageMethodName) => UsageMethodName = (usageMethodName) => {
//   return (usageMethodName.toLowerCase() as UsageMethodName);
// }

// // #endregion 

// Edges for queries
// #region

export type Edge = { node: any }

// Names
// #region

// Name data to be received from query
export interface NameEdge extends Edge {
  node: {
    id: string
    name: string
    formattedName: string
  }
}

// Ensures name received is a valid type name
export interface TypeNameEdge extends NameEdge {
  node: { 
    id: string
    name: TypeName
    formattedName: string
  }
};

// #endregion

// Descriptions
// #region

// For entities with non-version-group dependent descriptions
export interface DescriptionEdge extends Edge {
  node: {
    description: string
  }
}

// For entities with version-group dependent descriptions
export type DescriptionsEdge = {
  node: {
    text: string
  }
  versionGroupCode: string
};

// #endregion

// For determining when an entity was introduced
export interface IntroductionEdge extends Edge {
  node: {
    number: GenerationNum
  }
};

export const introductionEdgeToGen = (edge: IntroductionEdge) => {
  return edge.node.number;
}

// Icon edges
// #region

// Ability edges which contain data for rendering Pokemon icons
export interface AbilityIconEdge extends NameEdge {
  node: {
    id: string
    name: string
    formattedName: string

    pokemon: {
      edges: PokemonIconEdge[]
    }
  }
}

// Item edges which contain data for rendering item icons
export interface ItemIconEdge extends NameEdge {
  node: {
    id: string
    name: string
    formattedName: string
  }
}

// Item edges which contain data for rendering icons for Pokemon which the item requires
export interface ItemRequiresPokemonEdge extends NameEdge {
  node: {
    id: string
    name: string
    formattedName: string

    requiresPokemon: {
      edges: PokemonIconEdge[]
    }
  }
}

// Move edges which contain data for rendering Type icons and Pokemon icons
export interface MoveIconEdge extends NameEdge {
  node: {
    id: string
    name: string
    formattedName: string

    type: {
      edges: TypeIconEdge[]
    }

    pokemon: {
      edges: PokemonIconEdge[]
    }
  }
}

export interface PokemonTypeEdge {
}

// Pokemon edges which contain data for rendering Pokemon icons
// psID for using @pkmn/img
export interface PokemonIconNode {
  id: string
  name: string
  formattedName: string
  speciesName: string
  psID: string

  removedFromSwSh: boolean
  removedFromBDSP: boolean

  typeNames: EnumTypeName[]
  baseStats: StatTable
}

export interface PokemonIconEdge extends NameEdge {
  node: PokemonIconNode
}

// Type edges which contain data for rendering both Type icons and Pokemon icons
// TypeName instead of string
export interface TypeIconEdge extends NameEdge {
  node: {
    id: string
    name: TypeName
    formattedName: string

    pokemon?: {
      edges: PokemonIconEdge[]
    }
  }
}

export interface IconEdge extends NameEdge {
  node: {
    id: string
    name: string
    formattedName: string
  }
};

// #endregion

// #endregion