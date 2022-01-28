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

export type SinglesTier = 'AG' | 'Uber' | 'OU' | 'UUBL' | 'UU' | 'RUBL' | 'RU' | 'NUBL' | 'NU' | 'PUBL' | 'PU' | 'NFE' | 'LC';

export const SINGLES_TIERS: SinglesTier[] = ['AG', 'Uber', 'OU', 'UUBL', 'UU', 'RUBL', 'RU', 'NUBL', 'NU', 'PUBL', 'PU', 'NFE', 'LC'];

export type DoublesTier = 'DUber' | 'DOU' | 'DBL' | 'DUU' | 'DNFE' | 'DLC';

export const DOUBLES_TIERS: DoublesTier[] = ['DUber', 'DOU', 'DBL', 'DUU', 'DNFE', 'DLC'];

export type TierFilter = {
  format: 'singles' | 'doubles'
  selectionMode: 'exact' | 'range'
  tiers: {
    [tierName in SinglesTier | DoublesTier]: boolean
  }
}

// #endregion

const gens = new Generations(Dex);

export const psIDToSinglesTier = (gen: GenerationNum, psID: string) => {
  return (gens.get(gen).species.get(psID)?.tier.replace('(', '').replace(')', '') as SinglesTier);
}

export const psIDToDoublesTier = (gen: GenerationNum, psID: string) => {
  return (gens.get(gen).species.get(psID)?.doublesTier.replace('(', '').replace(')', '').replace('DNFE', 'NFE').replace('DLC', 'LC') as DoublesTier);
}