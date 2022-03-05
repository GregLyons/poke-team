import { StatsTable } from '@pkmn/data';
import {
  NUMBER_OF_GENS,
} from '../utils/constants';
import { compareStrings, sortArray } from '../utils/helpers';
import { BaseStatName, EffectClass, FieldStateClass, FieldStateTargetClass, GenNum, GQLBaseStatName, StatModificationRecipientEnum, StatTable } from './entities';

// Pagination
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

// Move pagination
// #region

export type MoveColumnName = 'psID' | 'type' | 'power' | 'accuracy' | 'pp' | 'category';

export interface MovePaginationInput extends PaginationInput {
  orderBy: MoveColumnName
  sortBy: SortByEnum
}

// #endregion

// #endregion

// Edges
// #region

export interface EdgeWithData {
  node: {
    name: string
  }
  chance?: number
  stage?: number
  multiplier?: number
}

export interface EffectClassEdge {
  node: {
    name: string
    class: EffectClass
  }
}

export interface ModifiesBaseStatEdge extends EdgeWithData {
  node: {
    name: GQLBaseStatName
  }
  stage: number
  multiplier: number
}

export interface CausesStatusEdge extends EdgeWithData {
  chance: number
}

export interface ResistsStatusEdge extends EdgeWithData {
}

export interface ModifiesStatEdge extends EdgeWithData {
  node: {
    name: GQLBaseStatName
  }
  multiplier: number
  stage: number
  chance: number
  recipient: StatModificationRecipientEnum
}

export interface ControlFieldStateEdge {
  node: {
    name: string
    class: FieldStateClass
  }
}

export interface StatusControlFieldStateEdge {
  node: {
    name: string
    class: FieldStateClass
    target: FieldStateTargetClass

    causesStatus: {
      edges: CausesStatusEdge[]
    }
    resistsStatus: {
      edges: ResistsStatusEdge[]
    }
  }
}

// #endregion

// Icons
// #region

// Pokemon icons
// #region

export type psID = string;

export interface PokemonIconDatum {
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

export const itemIconEdgeToItemIconDatum: (edge: ItemIconEdge) => IconDatum = (edge) => {
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

export const TYPENAMES: [TypeName, GenNum][] = [
  ['normal', 1],
  ['fighting', 1],
  ['flying', 1],
  ['poison', 1],
  ['ground', 1],
  ['rock', 1],
  ['bug', 1],
  ['ghost', 1],
  ['steel', 2],
  ['fire', 1],
  ['water', 1],
  ['grass', 1],
  ['electric', 1],
  ['psychic', 1],
  ['ice', 1],
  ['dragon', 1],
  ['dark', 2],
  ['fairy', 6],
];

// TypeName in capital letters
export type CapsTypeName = 'NORMAL' | 'FIGHTING' | 'FLYING' | 'POISON' | 'GROUND' | 'ROCK' | 'BUG' | 'GHOST' | 'STEEL' | 'FIRE' | 'WATER' | 'GRASS' | 'ELECTRIC' | 'PSYCHIC' | 'ICE' | 'DRAGON' | 'DARK' | 'FAIRY';

export type FormattedTypeName = 'Normal' | 'Fighting' | 'Flying' | 'Poison' | 'Ground' | 'Rock' | 'Bug' | 'Ghost' | 'Steel' | 'Fire' | 'Water' | 'Grass' | 'Electric' | 'Psychic' | 'Ice' | 'Dragon' | 'Dark' | 'Fairy';

export const typeNameEdgeToTypeName: (edge: TypeNameEdge) => TypeName = edge => edge.node.name;

export const toCapsTypeName: (typeName: TypeName | FormattedTypeName) => CapsTypeName = (typeName) => {
  return (typeName.toUpperCase() as CapsTypeName);
}

export const toFormattedTypeName: (typeName: TypeName | CapsTypeName) => FormattedTypeName = (typeName) => {
  return (typeName.charAt(0).toUpperCase() + typeName.slice(1).toLowerCase() as FormattedTypeName);
}

export const toTypeName: (enumTypeName: CapsTypeName | FormattedTypeName) => TypeName = (enumTypeName) => {
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
    name: string
    formattedName: string
  }
}

// Ensures name received is a valid type name
export interface TypeNameEdge extends NameEdge {
  node: {
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
    number: GenNum
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
    name: string
    formattedName: string
  }
}

// Item edges which contain data for rendering icons for Pokemon which the item requires
export interface ItemRequiresPokemonEdge extends NameEdge {
  node: {
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

// Pokemon edges which contain data for rendering Pokemon icons
// psID for using @pkmn/img
export interface PokemonIconNode {
  formattedName: string
  speciesName: string
  psID: string

  removedFromSwSh: boolean
  removedFromBDSP: boolean

  typeNames: CapsTypeName[]
  baseStats: StatTable
}

export interface PokemonIconEdge {
  node: PokemonIconNode
}

// Type edges which contain data for rendering both Type icons and Pokemon icons
// TypeName instead of string
export interface TypeIconEdge extends NameEdge {
  node: {
    name: TypeName
    formattedName: string

    pokemon?: {
      edges: PokemonIconEdge[]
    }
  }
}

export interface IconEdge extends NameEdge {
  node: {
    name: string
    formattedName: string
  }
};

// #endregion

// #endregion