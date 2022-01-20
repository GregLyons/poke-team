export const NUMBER_OF_GENS = 8;

export type SinglesTier = 'AG' | 'Uber' | 'OU' | 'UUBL' | 'UU' | 'RUBL' | 'RU' | 'NUBL' | 'NU' | 'PUBL' | 'PU' | 'NFE' | 'LC'

export const SINGLES_TIERS: SinglesTier[] = ['AG', 'Uber', 'OU', 'UUBL', 'UU', 'RUBL', 'RU', 'NUBL', 'NU', 'PUBL', 'PU', 'NFE', 'LC'];

export type TierFilter = {
  [tierName in SinglesTier]: boolean
}

export const DEFAULT_TIER_FILTER: TierFilter = {
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
}