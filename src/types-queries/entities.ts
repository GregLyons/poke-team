// Effects
// #region

import { StatsTable } from "@pkmn/data";
import { NUMBER_OF_GENS } from "../utils/constants";
import { CapsTypeName, FormattedTypeName, TypeName } from "./helpers";

export type EffectClass =
| 'ABILITY'
| 'ACCURACY'
| 'CONTACT'
| 'COST'
| 'CRIT'
| 'GROUND'
| 'MISC'
| 'POWER'
| 'RESTORE'
| 'STAT'
| 'SWITCH'
| 'SIZE'
| 'SPEED'
| 'TYPE';

export const EFFECT_CLASS_MAP = new Map<EffectClass, string>([
  ['ABILITY', 'Ability'],
  ['ACCURACY', 'Accuracy'],
  ['CONTACT', 'Contact'],
  ['COST', 'Cost'],
  ['CRIT', 'Crit'],
  ['GROUND', 'Ground'],
  ['MISC', 'Misc'],
  ['POWER', 'Power'],
  ['RESTORE', 'Restore'],
  ['STAT', 'Stat'],
  ['SWITCH', 'Switch'],
  ['SIZE', 'Size'],
  ['SPEED', 'Speed'],
  ['TYPE', 'Type'],
]);

export const EFFECT_TITLE_MAP = new Map<EffectClass, string>([
  ['ABILITY', 'ability-related effects'],
  ['ACCURACY', 'effects which pertain to accuracy and evasion'],
  ['CONTACT', 'effects which pertain to contact-based moves'],
  ['COST', 'effects which cost HP'],
  ['CRIT', 'effects which maniuplate crit chance'],
  ['GROUND', 'effects which pertain to whether the target is grounded'],
  ['MISC', 'miscellaneous effects'],
  ['POWER', 'effects which pertain to the damage or power of the move'],
  ['RESTORE', 'restorative effects'],
  ['STAT', 'effects related to either battle stats or base stats'],
  ['SWITCH', 'effects related to switching Pokemon'],
  ['SIZE', 'effects related to a Pokemon\'s size'],
  ['SPEED', 'effects related to speed control or pri]ority'],
  ['TYPE', 'effects which manipulate or are otherwise related to type.'],
]);

// #endregion

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

// Generations
// #region

export type GenNum = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

// Parses a string to return a GenerationNum
export const toGenNum = (value: string | null): GenNum => {
  if (value === null) return NUMBER_OF_GENS;
  else if (['1', '2', '3', '4', '5', '6', '7', '8'].includes(value)) {
    return parseInt(value, 10) as GenNum;
  }
  else {
    return NUMBER_OF_GENS;
  }
}

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

export const MOVE_TYPE_MAP = new Map<CapsTypeName, FormattedTypeName>([
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

// Statuses
// We only keep track of certain statuses, as these constants are for the Analyzer
// #region

export type StatusName =
| 'burn'
| 'freeze'
| 'paralysis'
| 'poison'
| 'bad_poison'
| 'sleep'
| 'confusion'
| 'taunt'
| 'trapped'

export const STATUSES: [StatusName, GenNum][] = [
  ['burn', 1],
  ['freeze', 1],
  ['paralysis', 1],
  ['poison', 1],
  ['bad_poison', 1],
  ['sleep', 1],
  ['confusion', 1],
  ['taunt', 3],
  ['trapped', 2],
];

export const STATUS_MAP = new Map<StatusName, string>([
  ['burn', 'Burn'],
  ['freeze', 'Freeze'],
  ['paralysis', 'Paralysis'],
  ['poison', 'Poison'],
  ['bad_poison', 'Toxic'],
  ['sleep', 'Sleep'],
  ['confusion', 'Confusion'],
  ['taunt', 'Taunt'],
  ['trapped', 'Trapped'],
]);

// #endregion

// Stats
// #region

export type StatModificationRecipientEnum =
| 'ALL'
| 'ALL_ALLIES'
| 'ALL_FOES'
| 'TARGET'
| 'USER';


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

const mostSignificantBit = (value: number, threshold: number) => {
  return value < threshold ? 0 : 1;
}
const secondLeastSignificantBit = (value: number) => {
  return [2, 3].includes(value % 4) ? 1 : 0;
}

export const ivsToHiddenPower: (ivs: StatTable, gen: GenNum) => { type: TypeName, power: number, } = (ivs, gen) => {
  let type: TypeName;
  let typeValue: number;
  let power: number;
  if (gen === 2) {
    typeValue = 4 * (ivs.attack % 4) + 4 * (ivs.defense % 4)

    power = Math.floor(((5 * (
        1 * mostSignificantBit(ivs.specialAttack, 8)
      + 2 * mostSignificantBit(ivs.speed, 8)
      + 4 * mostSignificantBit(ivs.defense, 8)
      + 8 * mostSignificantBit(ivs.attack, 8)
    ) + ivs.specialAttack % 4) / 2 + 31));
  }
  else {
    typeValue = Math.floor(5 * (
        1 * (ivs.hp % 2)
      + 2 * (ivs.attack % 2)
      + 4 * (ivs.defense % 2)
      + 8 * (ivs.speed % 2)
      + 16 * (ivs.specialAttack % 2)
      + 32 * (ivs.specialDefense % 2)
    ) / 21);

    power = Math.floor(40 * (
        1 * secondLeastSignificantBit(ivs.hp)
      + 2 * secondLeastSignificantBit(ivs.attack) 
      + 4 * secondLeastSignificantBit(ivs.defense) 
      + 8 * secondLeastSignificantBit(ivs.speed) 
      + 16 * secondLeastSignificantBit(ivs.specialAttack) 
      + 32 * secondLeastSignificantBit(ivs.specialDefense) 
    ) / 63) + 30
  }

  switch (typeValue) {
    case 0:
      type = 'fighting';
      break;
    case 1:
      type = 'flying';
      break;
    case 2:
      type = 'poison';
      break;
    case 3:
      type = 'ground';
      break;
    case 4:
      type = 'rock';
      break;
    case 5:
      type = 'bug';
      break;
    case 6:
      type = 'ghost';
      break;
    case 7:
      type = 'steel';
      break;
    case 8:
      type = 'fire';
      break;
    case 9:
      type = 'water';
      break;
    case 10:
      type = 'grass';
      break;
    case 11:
      type = 'electric';
      break;
    case 12:
      type = 'psychic';
      break;
    case 13:
      type = 'ice';
      break;
    case 14:
      type = 'dragon';
      break;
    case 15:
      type = 'dark';
      break;
    default:
      type = 'dark';
  }

  return { type, power, };
}

export const statTableToPSStatsTable: (statTable: StatTable) => StatsTable<number> = statTable => {
  return {
    hp: statTable.hp,
    atk: statTable.attack,
    def: statTable.defense,
    spa: statTable.specialAttack,
    spd: statTable.specialDefense,
    spe: statTable.speed,
  };
}

// #endregion