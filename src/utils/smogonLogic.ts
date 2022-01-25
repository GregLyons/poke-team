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

export type TierFilter = {
  mode: 'singles' | 'doubles'
  tiers: {
    [tierName in SinglesTier | DoublesTier]: boolean
  }
}

export type DoublesTier = 'DUber' | 'DOU' | 'DBL' | 'DUU' | 'NFE' | 'LC';

export const DOUBLES_TIERS: DoublesTier[] = ['DUber', 'DOU', 'DBL', 'DUU', 'NFE', 'LC'];

export type DoublesTierFilter = {
  [tierName in DoublesTier]: boolean
}

export const DEFAULT_SINGLES_TIER_FILTER: TierFilter = {
  mode: 'singles',
  tiers: {
    // Singles tiers
    AG: true,
    Uber: true,
    OU: true,
    UUBL: true,
    UU: true,
    RUBL: true,
    RU: true,
    NUBL: true,
    NU: true,
    PUBL: true,
    PU: true,
    NFE: true,
    LC: true,
    // Doubles tiers
    DUber: false,
    DOU: false,
    DBL: false,
    DUU: false,
  },
};

export const DEFAULT_DOUBLES_TIER_FILTER: TierFilter = {
  mode: 'doubles',
  tiers: {
    // Singles tiers
    AG: false,
    Uber: false,
    OU: false,
    UUBL: false,
    UU: false,
    RUBL: false,
    RU: false,
    NUBL: false,
    NU: false,
    PUBL: false,
    PU: false,
    NFE: false,
    LC: false,
    // Doubles tiers
    DUber: true,
    DOU: true,
    DBL: true,
    DUU: true,
  },
}

// #endregion

const gens = new Generations(Dex);

export const psIDToSinglesTier = (gen: GenerationNum, psID: string) => {
  return (gens.get(gen).species.get(psID)?.tier.replace('(', '').replace(')', '') as SinglesTier);
}

export const psIDToDoublesTier = (gen: GenerationNum, psID: string) => {
  return (gens.get(gen).species.get(psID)?.doublesTier.replace('(', '').replace(')', '') as DoublesTier);
}