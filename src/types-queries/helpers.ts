import {
  NUMBER_OF_GENS,
} from '../utils/constants';
import { compareStrings, sortArray } from '../utils/helpers';

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

export type BaseStatName = 'hp' | 'attack' | 'defense' | 'specialAttack' | 'specialDefense' | 'speed';

export type FormattedBaseStatName = 'HP' | 'Attack' | 'Defense' | 'Special Attack' | 'Special Defense' | 'Speed';

export type AbbreviatedBaseStatName = 'HP' | 'Atk' | 'Def' | 'SpA' | 'SpD' | 'Spe';

export const toBaseStatName: (baseStatName: FormattedBaseStatName | AbbreviatedBaseStatName) => BaseStatName = baseStateName => {
  switch(baseStateName) {
    case 'HP':
    case 'HP':
      return 'hp';
    case 'Attack':
    case 'Atk':
      return 'attack';
    case 'Defense':
    case 'Def':
      return 'defense';
    case 'Special Attack':
    case 'SpA':
      return 'specialAttack';
    case 'Special Defense':
    case 'SpD':
      return 'specialDefense';
    case 'Speed':
    case 'Spe':
      return 'speed';
    default:
      throw Error();
  }
};

export const toFormattedBaseStatName: (baseStatName: BaseStatName | AbbreviatedBaseStatName) => FormattedBaseStatName = baseStateName => {
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
    case 'SpA':
      return 'Special Attack';
    case 'specialDefense':
    case 'SpD':
      return 'Special Defense';
    case 'speed':
    case 'Spe':
      return 'Speed';
    default:
      throw Error();
  }
}

export const toAbbreviatedBaseStatName: (baseStatName: BaseStatName | FormattedBaseStatName) => AbbreviatedBaseStatName = baseStatName => {
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
      return 'SpA';
    case 'specialDefense':
    case 'Special Defense':
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

export type psID = string;

export type PokemonIconDatum = {
  formattedName: string
  name: string
  speciesName: string
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
  name: '',
  speciesName: '',
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
    psID: node.pokemonShowdownID,
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
// pokemonShowdownID for using @pkmn/img
export interface PokemonIconNode {
  id: string
  name: string
  formattedName: string
  speciesName: string
  pokemonShowdownID: string

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