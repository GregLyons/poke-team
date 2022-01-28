import { GenerationNum, ItemIconDatum, PokemonIconDatum } from "../types-queries/helpers";
import { Pokemon } from "../types-queries/Planner/Pokemon";
import { EntityClass } from "../utils/constants";
import { DoublesTier, DOUBLES_TIERS, SinglesTier, SINGLES_TIERS, TierFilter } from "../utils/smogonLogic";

// Gen
// #region

export type GenFilter = {
  gen: GenerationNum
  includeRemovedFromSwSh: boolean
  includeRemovedFromBDSP: boolean
}

export const DEFAULT_GEN_FILTER: GenFilter = {
  gen: 8,
  includeRemovedFromSwSh: false,
  includeRemovedFromBDSP: true,
}

export function removedFromSwSh(genFilter: GenFilter): false | null {
  if (genFilter.gen !== 8 || genFilter.includeRemovedFromSwSh) return null;
  return false;
}

export function removedFromBDSP(genFilter: GenFilter): false | null {
  if (genFilter.gen !== 8 || genFilter.includeRemovedFromBDSP) return null;
  return false;
}

export type GenFilterAction =
| {
    type: 'set_gen',
    payload: {
      gen: GenerationNum,
    },
  }
| {
    type: 'toggle_swsh',
  }
| {
    type: 'toggle_bdsp',
  };

export function genReducer(state: GenFilter, action: GenFilterAction) {
  switch(action.type) {
    case 'set_gen':
      return {
        ...state,
        gen: action.payload.gen,
      };
    case 'toggle_swsh':
      return {
        ...state,
        includeRemovedFromSwSh: !state.includeRemovedFromSwSh,
      };
    case 'toggle_bdsp':
      return {
        ...state,
        includeRemovedFromBDSP: !state.includeRemovedFromBDSP,
      };
    default:
      throw new Error();
  }
}

// #endregion

// Tiers
// #region

export const DEFAULT_SINGLES_TIER_FILTER: TierFilter = {
  format: 'singles',
  selectionMode: 'exact',
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
    DNFE: false,
    DLC: false,
  },
};

export const DEFAULT_DOUBLES_TIER_FILTER: TierFilter = {
  format: 'doubles',
  selectionMode: 'exact',
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
    DNFE: true,
    DLC: true,
  },
}

export type TierFilterAction =
| {
    type: 'toggle_tier',
    payload: SinglesTier | DoublesTier
  }
| {
    type: 'select_range_singles',
    payload: {
      edge1: SinglesTier,
      edge2: SinglesTier,
    }
  }
| {
    type: 'select_range_doubles',
    payload: {
      edge1: DoublesTier,
      edge2: DoublesTier,
    }
  }
| {
    type: 'set_selection_mode',
    payload: 'exact' | 'range',
  }
| {
    type: 'set_format',
    payload: 'singles' | 'doubles',
  };

export function tierReducer(state: TierFilter, action: TierFilterAction): TierFilter {
  let idx1: number,
      idx2: number,
      start: number,
      end: number,
      newTierSelection: { [tier in SinglesTier | DoublesTier]: boolean };

  switch(action.type) {
    case 'toggle_tier':
      return {
        ...state,
        tiers: {
          ...state.tiers,
          [action.payload]: !state.tiers[action.payload]
        }
      }
      
    case 'set_format':
      return {
        ...state,
        format: action.payload,
      }

    case 'set_selection_mode':
      return {
        ...state,
        selectionMode: action.payload,
      }

    case 'select_range_singles': 
      idx1 = SINGLES_TIERS.indexOf(action.payload.edge1);
      idx2 = SINGLES_TIERS.indexOf(action.payload.edge2);
      start = Math.min(idx1, idx2);
      end = Math.max(idx1, idx2);

      newTierSelection = DEFAULT_SINGLES_TIER_FILTER.tiers;
      SINGLES_TIERS.map((tier, idx) => {
        if (idx < start || idx > end) newTierSelection[tier] = false;
        else newTierSelection[tier] = true;
        return;
      })
      
      return {
        ...state,
        tiers: {
          ...state.tiers,
          ...newTierSelection,
        }
      }

    case 'select_range_doubles': 
      idx1 = DOUBLES_TIERS.indexOf(action.payload.edge1);
      idx2 = DOUBLES_TIERS.indexOf(action.payload.edge2);
      start = Math.min(idx1, idx2);
      end = Math.max(idx1, idx2);

      newTierSelection = DEFAULT_DOUBLES_TIER_FILTER.tiers;
      DOUBLES_TIERS.map((tier, idx) => {
        if (idx < start || idx > end) newTierSelection[tier] = false;
        else newTierSelection[tier] = true;
        return;
      })
      
      return {
        ...state,
        tiers: {
          ...state.tiers,
          ...newTierSelection,
        }
      }
    default:
      throw new Error();
  }
}


// #endregion

// Cart
// #region

export type Cart = {
  [gen in GenerationNum]: {
    pokemon: {
      [parentEntityClass in EntityClass]?: {
        [targetEntityClass in EntityClass | 'Has']?: {
          // Key: Describes relationship between parent and target entity.
          // Value: Pokemon from selection.
          [note: string]: PokemonIconDatum[]
        }
      } 
    }
    items: {
      [parentEntityClass in EntityClass]?: {
        [targetEntityClass in EntityClass | 'From search']?: {
          // Key: Describes relationship between parent and target entity.
          // Value: Pokemon required for item, or [].
          [note: string]: PokemonIconDatum[]
        }
      } 
    }
  }
};

export const DEFAULT_CART: Cart = {
  1: {
    pokemon: {},
    items: {},
  },
  2: {
    pokemon: {},
    items: {},
  },
  3: {
    pokemon: {},
    items: {},
  },
  4: {
    pokemon: {},
    items: {},
  },
  5: {
    pokemon: {},
    items: {},
  },
  6: {
    pokemon: {},
    items: {},
  },
  7: {
    pokemon: {},
    items: {},
  },
  8: {
    pokemon: {},
    items: {},
  },
}

export type CartAction =
| { 
    type: 'add_pokemon',
    payload: {
      gen: GenerationNum
      pokemon: PokemonIconDatum[],
      parentEntityClass: EntityClass,
      targetEntityClass: EntityClass | 'Has',
      note: string,
    },
  }
| {
    type: 'add_item'
    payload: {
      gen: GenerationNum
      item: ItemIconDatum,
      requiredPokemon: PokemonIconDatum[],
      parentEntityClass: EntityClass,
      targetEntityClass: EntityClass | 'From search'
      note: string
    }
  }
| { type: 'remove', };

export function cartReducer(state: Cart, action: CartAction) {
  switch(action.type) {
    case 'add_pokemon':
      return {
        ...state,
        // Overwriting gen
        [action.payload.gen]: {
          ...state[action.payload.gen],
          // Overwriting Pokemon
          pokemon: {
            // Overwriting parentEntityClass
            ...state[action.payload.gen].pokemon,
            [action.payload.parentEntityClass]: {
              // Overwriting targetEntityClass within parentEntityClass
              ...state[action.payload.gen].pokemon?.[action.payload.parentEntityClass],
              [action.payload.targetEntityClass]: {
                // Overwriting note within targetEntityClass
                ...state[action.payload.gen].pokemon?.[action.payload.parentEntityClass]?.[action.payload.targetEntityClass],
                [action.payload.note]: action.payload.pokemon,
              }
            }
        }
        }
      }
    case 'add_item':
      return {
        ...state,
        // Overwriting gen
        [action.payload.gen]: {
          // Overwriting items
          items: {
            // Overwriting parentEntityClass
            ...state[action.payload.gen].items,
            [action.payload.parentEntityClass]: {
              // Overwriting targetEntityClass within parentEntityClass
              ...state[action.payload.gen].items?.[action.payload.parentEntityClass],
              [action.payload.targetEntityClass]: {
                // Overwriting note within targetEntityClass
                ...state[action.payload.gen].items?.[action.payload.parentEntityClass]?.[action.payload.targetEntityClass],
                [action.payload.note]: action.payload.requiredPokemon,
              }
            }
          }
        }
      }
    case 'remove':
      return state;
    default:
      throw new Error();
  }
}

// #endregion

// Team
// #region


export type Team = Pokemon[];
export type TeamAction = 
| { type: 'add', payload: Pokemon, }
| { type: 'remove', payload: number, }

export function teamReducer(state: Team, action: TeamAction) {
  switch(action.type) {
    case 'add':
      return [
        ...state,
        action.payload,
      ];
    case 'remove':
      return state.filter((d, i) => i !== action.payload);
    default:
      throw new Error();
  }
}


// #endregion