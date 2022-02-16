import {
  Generations,
} from "@pkmn/data";
import {
  Dex,
} from "@pkmn/dex";
import { TierFilter } from "../hooks/App/TierFilter";
import {
  GenerationNum
} from "../types-queries/helpers";

// Tier filtering
// #region

export type SinglesTier = 'AG' | 'Uber' | 'OU' | 'UUBL' | 'UU' | 'RUBL' | 'RU' | 'NUBL' | 'NU' | 'PUBL' | 'PU' | 'NFE' | 'LC' | 'None';

export const SINGLES_TIERS: SinglesTier[] = ['AG', 'Uber', 'OU', 'UUBL', 'UU', 'RUBL', 'RU', 'NUBL', 'NU', 'PUBL', 'PU', 'NFE', 'LC', 'None'];

export type DoublesTier = 'DUber' | 'DOU' | 'DBL' | 'DUU' | 'DNFE' | 'DLC' | 'DNone';

export const DOUBLES_TIERS: DoublesTier[] = ['DUber', 'DOU', 'DBL', 'DUU', 'DNFE', 'DLC', 'DNone'];

export function isSinglesTier(tier: SinglesTier | DoublesTier): tier is SinglesTier {
  return ['AG', 'Uber', 'OU', 'UUBL', 'UU', 'RUBL', 'RU', 'NUBL', 'NU', 'PUBL', 'PU', 'NFE', 'LC', 'None'].includes(tier);
}

export const TIER_ORDERING: (SinglesTier | DoublesTier)[] = ['AG', 'Uber', 'OU', 'UUBL', 'UU', 'RUBL', 'RU', 'NUBL', 'NU', 'PUBL', 'PU', 'NFE', 'LC', 'None', 'DUber', 'DOU', 'DBL', 'DUU', 'DNFE', 'DLC', 'DNone'];

export const compareTiers: (tier1: SinglesTier | DoublesTier, tier2: SinglesTier | DoublesTier) => number = (tier1, tier2) => { 
  const [idx1, idx2] = [TIER_ORDERING.indexOf(tier1), TIER_ORDERING.indexOf(tier2)];
  if (idx1 > idx2) return 1;
  else if (idx1 === idx2) return 0;
  return -1;
}

// #endregion

const gens = new Generations(Dex);

export const psIDToSinglesTier = (gen: GenerationNum, psID: string) => {
  return (gens.get(gen).species.get(psID)?.tier.replace('(', '').replace(')', '') as SinglesTier) || 'None';
}

export const psIDToDoublesTier = (gen: GenerationNum, psID: string) => {
  return (gens.get(gen).species.get(psID)?.doublesTier.replace('(', '').replace(')', '').replace('DNFE', 'NFE').replace('DLC', 'LC') as DoublesTier) || 'DNone';
}

export const getTier = (gen: GenerationNum, format: 'singles' | 'doubles', psID: string) => {
  return format === 'singles'
    ? psIDToSinglesTier(gen, psID)
    : (psIDToDoublesTier(gen, psID)?.replace('LC', 'DLC').replace('NFE', 'DNFE') as DoublesTier);
}