import { Side } from "@smogon/calc";
import { Terrain, Weather } from "@smogon/calc/dist/data/interface";
import { GenNum } from "../../../types-queries/entities";

export const TERRAINS_GENS: [Terrain, GenNum][] = [
  ['Electric', 6],
  ['Grassy', 6],
  ['Psychic', 6],
  ['Misty', 6],
];

export const WEATHERS_GENS: [Weather, GenNum][] = [
  ['Sand', 2],
  ['Sun', 2],
  ['Rain', 2],
  ['Hail', 3],
  ['Harsh Sunshine', 6],
  ['Heavy Rain', 6],
  ['Strong Winds', 6],
];

export const SIDES_GENS: [keyof Side, GenNum][] = [
  ['isSwitching', 1],
  ['isReflect', 1],
  ['isLightScreen', 1],
  ['isAuroraVeil', 7],
  ['isSeeded', 1],
  ['isProtected', 2],
  ['isForesight', 2],
  ['spikes', 2],
  ['isSR', 4],
  ['isTailwind', 4],
  ['isHelpingHand', 3],
  ['isFriendGuard', 5],
  ['isBattery', 7],
  ['steelsurge', 8],
  ['vinelash', 8],
  ['wildfire', 8],
  ['cannonade', 8],
  ['volcalith', 8],
]

export const SIDE_TEXT_MAP = new Map<keyof Side, string>([
  ['spikes', 'Spikes'],
  ['steelsurge', 'Steelsurge'],
  ['vinelash', 'Vine Lash'],
  ['wildfire', 'Wildfire'],
  ['cannonade', 'Cannonade'],
  ['volcalith', 'Volcalith'],
  ['isSR', 'Stealth Rock'],
  ['isReflect', 'Reflect'],
  ['isLightScreen', 'Light Screen'],
  ['isProtected', 'Protected'],
  ['isSeeded', 'Seeded'],
  ['isForesight', 'Foresight'],
  ['isTailwind', 'Tailwind'],
  ['isHelpingHand', 'Helping Hand'],
  ['isFriendGuard', 'Friend Guard'],
  ['isAuroraVeil', 'Aurora Veil'],
  ['isBattery', 'Battery'],
  ['isSwitching', 'Switching'],
]);

export type BooleanKeysOfSide = 
| 'steelsurge'
| 'vinelash'
| 'wildfire'
| 'cannonade'
| 'volcalith'
| 'isSR'
| 'isReflect'
| 'isLightScreen'
| 'isProtected'
| 'isSeeded'
| 'isForesight'
| 'isTailwind'
| 'isHelpingHand'
| 'isFriendGuard'
| 'isAuroraVeil'
| 'isBattery';