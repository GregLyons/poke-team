import {
  Generations
} from "@pkmn/data";
import {
  Dex
} from "@pkmn/dex";
import { GenNum } from "../types-queries/entities";
import { psIDToVGCClass, VGCClass } from "./vgcLogic";

// Tier filtering
// #region

export type SinglesTier = 'AG' | 'Uber' | 'OU' | 'UUBL' | 'UU' | 'RUBL' | 'RU' | 'NUBL' | 'NU' | 'PUBL' | 'PU' | 'NFE' | 'LC' | 'None';

export const SINGLES_TIERS: SinglesTier[] = ['AG', 'Uber', 'OU', 'UUBL', 'UU', 'RUBL', 'RU', 'NUBL', 'NU', 'PUBL', 'PU', 'NFE', 'LC', 'None'];

export type DoublesTier = 'DUber' | 'DOU' | 'DBL' | 'DUU' | 'DNFE' | 'DLC' | 'DNone';

export const DOUBLES_TIERS: DoublesTier[] = ['DUber', 'DOU', 'DBL', 'DUU', 'DNFE', 'DLC', 'DNone'];

export function isSinglesTier(tier: SinglesTier | DoublesTier | VGCClass): tier is SinglesTier {
  return ['AG', 'Uber', 'OU', 'UUBL', 'UU', 'RUBL', 'RU', 'NUBL', 'NU', 'PUBL', 'PU', 'NFE', 'LC', 'None'].includes(tier);
}

export function isDoublesTier(tier: SinglesTier | DoublesTier | VGCClass): tier is DoublesTier {
  return ['DUber', 'DOU', 'DBL', 'DUU', 'DNFE', 'DLC', 'DNone'].includes(tier);
}

export function isVGCClass(tier: SinglesTier | DoublesTier | VGCClass): tier is VGCClass {
  return ['Restricted', 'Mythical', 'Other'].includes(tier);
}

export const TIER_ORDERING: (SinglesTier | DoublesTier | VGCClass)[] = ['AG', 'Uber', 'OU', 'UUBL', 'UU', 'RUBL', 'RU', 'NUBL', 'NU', 'PUBL', 'PU', 'NFE', 'LC', 'None', 'DUber', 'DOU', 'DBL', 'DUU', 'DNFE', 'DLC', 'DNone', 'Mythical', 'Restricted', 'Other'];

export const compareTiers: (tier1: SinglesTier | DoublesTier | VGCClass, tier2: SinglesTier | DoublesTier) => number = (tier1, tier2) => { 
  const [idx1, idx2] = [TIER_ORDERING.indexOf(tier1), TIER_ORDERING.indexOf(tier2)];
  if (idx1 > idx2) return 1;
  else if (idx1 === idx2) return 0;
  return -1;
}

// #endregion

const gens = new Generations(Dex);

export const psIDToSinglesTier = (gen: GenNum, psID: string) => {
  return (gens.get(gen).species.get(psID)?.tier.replace('(', '').replace(')', '') as SinglesTier) || 'None';
}

export const psIDToDoublesTier = (gen: GenNum, psID: string) => {
  return (gens.get(gen).species.get(psID)?.doublesTier.replace('(', '').replace(')', '').replace('DNFE', 'NFE').replace('DLC', 'LC') as DoublesTier) || 'DNone';
}

export const getTier = (gen: GenNum, format: 'singles' | 'doubles' | 'vgc', psID: string) => {
  return format === 'singles'
    ? psIDToSinglesTier(gen, psID)
    : format === 'doubles'
      ? (psIDToDoublesTier(gen, psID)?.replace('LC', 'DLC').replace('NFE', 'DNFE') as DoublesTier)
      : psIDToVGCClass(psID);
}