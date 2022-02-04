import { BaseStatName, BaseStats, PokemonIconDatum, TypeName } from "../../types-queries/helpers";
import { DoublesTier, isSinglesTier, psIDToDoublesTier, psIDToSinglesTier } from "../../utils/smogonLogic";
import { GenFilter } from "./GenFilter";
import { TierFilter } from "./TierFilter";


export const BASE_STAT_NAMES: BaseStatName[] = [
  'hp',
  'attack',
  'defense',
  'specialAttack',
  'specialDefense',
  'speed',
]

export const TYPE_NAMES: TypeName[] = [
  'normal',
  'fighting',
  'flying',
  'poison',
  'ground',
  'rock',
  'bug',
  'ghost',
  'steel',
  'fire',
  'water',
  'grass',
  'electric',
  'psychic',
  'ice',
  'dragon',
  'dark',
  'fairy',
];

export type PokemonFilter = {
  types: {
    [typeName in TypeName]: boolean
  }
  minBaseStats: BaseStats
  maxBaseStats: BaseStats
}

export const DEFAULT_POKEMON_FILTER: PokemonFilter = {
  types: {
    normal: true,
    fighting: true,
    flying: true,
    poison: true,
    ground: true,
    rock: true,
    bug: true,
    ghost: true,
    steel: true,
    fire: true,
    water: true,
    grass: true,
    electric: true,
    psychic: true,
    ice: true,
    dragon: true,
    dark: true,
    fairy: true,
  },
  minBaseStats: {
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
  },
  maxBaseStats: {
    hp: 255,
    attack: 255,
    defense: 255,
    specialAttack: 255,
    specialDefense: 255,
    speed: 255,
  },
}

export type PokemonFilterAction =
| {
    type: 'toggle_type',
    payload: TypeName,
  }
| {
    type: 'select_all_types',
  }
| {
    type: 'deselect_all_types',
  }
| {
    type: 'set_min_stat',
    payload: {
      statName: 'hp' | 'attack' | 'defense' | 'specialAttack' | 'specialDefense' | 'speed',
      value: number
    },
  }
| {
    type: 'set_max_stat',
    payload: {
      statName: 'hp' | 'attack' | 'defense' | 'specialAttack' | 'specialDefense' | 'speed',
      value: number
    },
  };

export function pokemonReducer(state: PokemonFilter, action: PokemonFilterAction) {
  switch(action.type) {
    case 'toggle_type': 
      return {
        ...state,
        types: {
          ...state.types,
          [action.payload]: !state.types[action.payload],
        }
      };

    case 'select_all_types':
      return {
        ...state,
        types: {
          ...DEFAULT_POKEMON_FILTER.types,
        }
      };

    case 'deselect_all_types':
      return {
        ...state,
        types: {
          normal: false,
          fighting: false,
          flying: false,
          poison: false,
          ground: false,
          rock: false,
          bug: false,
          ghost: false,
          steel: false,
          fire: false,
          water: false,
          grass: false,
          electric: false,
          psychic: false,
          ice: false,
          dragon: false,
          dark: false,
          fairy: false,
        }
      }

    case 'set_max_stat':
      // If max changes to be smaller than min, set min = max
      const oldMinValue = state.minBaseStats[action.payload.statName];
      const newMinValue = oldMinValue < action.payload.value 
        ? oldMinValue 
        : Math.max(action.payload.value, 0);

      return {
        ...state,
        maxBaseStats: {
          ...state.maxBaseStats,
          // Max is between 0 and 255
          [action.payload.statName]: Math.max(0, Math.min(action.payload.value, 255)),
        },
        minBaseStats: {
          ...state.minBaseStats,
          [action.payload.statName]: newMinValue,
        },
      };

    case 'set_min_stat':
      // If min changes to be smaller than max, set max = min
      const oldMaxValue = state.maxBaseStats[action.payload.statName];
      const newMaxValue = oldMaxValue > action.payload.value 
        ? oldMaxValue 
        : Math.min(action.payload.value, 255);

      return {
        ...state,
        minBaseStats: {
          ...state.minBaseStats,
          // Min is between 0 and 255
          [action.payload.statName]: Math.max(0, Math.min(action.payload.value, 255)),
        },
        maxBaseStats: {
          ...state.maxBaseStats,
          [action.payload.statName]: newMaxValue,
        },
      };

    default:
      throw new Error();
  }
}

// Validating Pokemon
// #region 

type validatePokemonProps = {
  pokemonIconDatum: PokemonIconDatum
  genFilter: GenFilter
  pokemonFilter: PokemonFilter
  tierFilter: TierFilter
}

export type ValidationFailureReason = 'tier' | 'type' | 'stat' | '' | null

export const displayReason = (reason: ValidationFailureReason) => {
  switch(reason) {
    case 'tier':
      return 'No Pokemon match the TIER criteria.';
    case 'type':
      return 'No Pokemon match the TYPE criteria.';
    case 'stat':
      return 'No Pokemon match the STAT criteria.';
    case '':
      return 'No Pokemon to show.';
    default:
      return '';
  }
}

export const validatePokemon = ({
  pokemonIconDatum,
  genFilter,
  pokemonFilter,
  tierFilter,
}: validatePokemonProps): { validated: boolean, reason: ValidationFailureReason} => {
  // Tier check
  // #region 

  let tierCheck = true;

  // Compute tier based on format and gen
  const tier = tierFilter.format === 'singles'
    ? psIDToSinglesTier(genFilter.gen, pokemonIconDatum.psID)
    : (psIDToDoublesTier(genFilter.gen, pokemonIconDatum.psID)?.replace('LC', 'DLC').replace('NFE', 'DNFE') as DoublesTier);

  // If condition is true, tier check fails
  if (
    // Untiered Pokemon are always excluded
    tier !== undefined && (
      // Singles mode
      (
        isSinglesTier(tier)
        && tierFilter.format === 'singles'
        && !tierFilter.singlesTiers[tier]
      )
      // Doubles mode
      || (
        !isSinglesTier(tier)
        && tierFilter.format === 'doubles'
        && !tierFilter.doublesTiers[tier]
      )
    )
  ) return { validated: false, reason: 'tier', }

  // #endregion

  // Typing check
  // #region 

  let typingCheck = true;
  pokemonIconDatum.typing.map(typeName => {
    // Type filter fails to include one of the types
    if (!pokemonFilter.types[typeName]) typingCheck = false;
  });
  if (!typingCheck) return { validated: false, reason: 'type', };

  // #endregion 

  // Base stat check
  // #region 

  let baseStatCheck = true;
  BASE_STAT_NAMES.map(baseStatName => {
    // Previous baseStatCheck failed, or baseStat less than min
    if (baseStatCheck && pokemonIconDatum.baseStats[baseStatName] < pokemonFilter.minBaseStats[baseStatName]) baseStatCheck = false;
    // Previous baseStatCheck failed, or baseStat greater than max
    if (baseStatCheck && pokemonIconDatum.baseStats[baseStatName] > pokemonFilter.maxBaseStats[baseStatName]) baseStatCheck = false;
  })
  return { validated: baseStatCheck, reason: baseStatCheck ? null : 'stat', }; 

  // #endregion
}

// #endregion