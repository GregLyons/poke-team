import {
  Generations,
} from "@pkmn/data";
import {
  Dex,
} from "@pkmn/dex";
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

// #endregion

const gens = new Generations(Dex);

export const psIDToSinglesTier = (gen: GenerationNum, psID: string) => {
  return (gens.get(gen).species.get(psID)?.tier.replace('(', '').replace(')', '') as SinglesTier) || 'None';
}

export const psIDToDoublesTier = (gen: GenerationNum, psID: string) => {
  return (gens.get(gen).species.get(psID)?.doublesTier.replace('(', '').replace(')', '').replace('DNFE', 'NFE').replace('DLC', 'LC') as DoublesTier) || 'DNone';
}