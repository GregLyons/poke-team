import { GenerationNum, ItemIconDatum, PokemonIconDatum } from "../types-queries/helpers";
import { Pokemon } from "../types-queries/Planner/Pokemon";
import { EntityClass } from "../utils/constants";

// Cart
// #region

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