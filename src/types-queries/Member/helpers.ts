import { GenNum, StatTable } from "../entities";
import { IntroductionEdge, introductionEdgeToGen, TypeName } from "../helpers";

// Enum types
// #region

export type AbilitySlot = 'ONE' | 'TWO' | 'HIDDEN';

export type GenderName = 'M' | 'F' | 'N';

// Natures
// #region

export type NatureName = 'adamant' | 'bashful' | 'bold' | 'brave' | 'calm' | 'careful' | 'docile' | 'gentle' | 'hardy' | 'hasty' | 'impish' | 'jolly' | 'lax' | 'lonely' | 'mild' | 'modest' | 'naive' | 'naughty' | 'quiet' | 'quirky' | 'rash' | 'relaxed' | 'sassy' | 'serious' | 'timid';

export type FormattedNatureName = 'Adamant' | 'Bashful' | 'Bold' | 'Brave' | 'Calm' |
'Careful' | 'Docile' | 'Gentle' | 'Hardy' | 'Hasty' |
'Impish' | 'Jolly' | 'Lax' | 'Lonely' | 'Mild' |
'Modest' | 'Naive' | 'Naughty' | 'Quiet' | 'Quirky' |
'Rash' | 'Relaxed' | 'Sassy' | 'Serious' | 'Timid';

export const natureNameToFormattedNatureName = (natureName: NatureName) => {
  return ((natureName.charAt(0).toUpperCase() + natureName.slice(1)) as FormattedNatureName);
}

export const formattedNatureNameToNatureName = (formattedNatureName: FormattedNatureName) => {
  return (formattedNatureName.toLowerCase() as NatureName);
}

// #endregion

// #endregion

// Interfaces
// #region

export interface MemberResult {
  formattedName: string
  psID: string

  introduced: {
    edges: IntroductionEdge[]
  }
}

export interface MemberEntityVars {
  gen: GenNum
  
  contains: string
  startsWith: string
}

export interface MemberSpecificEntityVars extends MemberEntityVars {
  psID: string
}

// #endregion

// Classes
// #region

export abstract class MemberEntity {
  public formattedName: string
  public psID: string

  public gen: GenNum
  public introduced: GenNum

  constructor(memberSpecificResult: MemberResult, gen: GenNum) {
    const { formattedName, psID, introduced} = memberSpecificResult;

    this.formattedName = formattedName;
    this.psID = psID;

    this.gen = gen;
    this.introduced = introductionEdgeToGen(introduced.edges[0]);
  }
}

// #endregion

// Constants
// #region

export const DEFAULT_EV_SPREAD: StatTable = {
  hp: 0,
  attack: 0,
  defense: 0,
  specialAttack: 0,
  specialDefense: 0,
  speed: 0,
}

export const DEFAULT_EV_SPREAD_GENS12: StatTable = {
  hp: 252,
  attack: 252,
  defense: 252,
  specialAttack: 252,
  specialDefense: 252,
  speed: 252,
}

export const DEFAULT_IV_SPREAD: StatTable = {
  hp: 31,
  attack: 31,
  defense: 31,
  specialAttack: 31,
  specialDefense: 31,
  speed: 31,
}

export const DEFAULT_DV_SPREAD: StatTable = {
  hp: 15,
  attack: 15,
  defense: 15,
  specialAttack: 15,
  specialDefense: 15,
  speed: 15,
}

// Constants for computing hidden power; the entries of each array are the hidden power types for which the corresponding stat must be 30
const THIRTY_HP: TypeName[] = ['dragon', 'grass', 'psychic'];
const THIRTY_ATTACK: TypeName[] = ['fire', 'ghost'];
const THIRTY_DEFENSE: TypeName[] = ['fighting', 'poison', 'rock'];
const THIRTY_SPECIALATTACK: TypeName[] = ['electric', 'fire', 'flying', 'flying'];
const THIRTY_SPECIALDEFENSE: TypeName[] = ['bug', 'fighting', 'flying', 'ghost', 'ground',  'poison', 'rock', 'steel']; 
const THIRTY_SPEED: TypeName[] = ['bug', 'fighting', 'fire', 'flying', 'ice', 'psychic', 'rock', 'steel'];

// #endregion

// Functions
// #region

export const hiddenPowerToMaxIVs: (hpType: TypeName) => StatTable = hpType => {
  let ivs = { ...DEFAULT_IV_SPREAD, };

  // Assign HP
  if (THIRTY_HP.includes(hpType)) ivs.hp = 30;
  if (THIRTY_ATTACK.includes(hpType)) ivs.attack = 30;
  if (THIRTY_DEFENSE.includes(hpType)) ivs.defense = 30;
  if (THIRTY_SPECIALATTACK.includes(hpType)) ivs.specialAttack = 30;
  if (THIRTY_SPECIALDEFENSE.includes(hpType)) ivs.specialDefense = 30;
  if (THIRTY_SPEED.includes(hpType)) ivs.speed = 30;

  return ivs;
}

// #endregion