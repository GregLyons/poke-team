import { equateTwoPokemonIconData, GenerationNum, ItemIconDatum, PokemonIconDatum, sortPokemonIconData, } from "../../types-queries/helpers";
import { EntityClass } from "../../utils/constants";
import { binaryIncludes, compareStrings, removeDuplicatesFromSortedArray } from "../../utils/helpers";


export type Box = {
  note: string
  pokemon: PokemonIconDatum[]
}

export type TargetEntityInCart = {
  [note: string]: PokemonIconDatum[]
}

export type ParentEntityInCart = {
  [targetEntityClass in EntityClass | 'Has' | 'From search']?: TargetEntityInCart
}

export type CartInGen = {
  pokemon: {
    [parentEntityClass in EntityClass]?: ParentEntityInCart
  }
  items: {
    [parentEntityClass in EntityClass]?: ParentEntityInCart
  }
  customBoxes: {
    [note: string]: PokemonIconDatum[]
  }
  combination: {
    note: string
    pokemon: PokemonIconDatum[]
  } | null
}

export type Cart = {
  [gen in GenerationNum]: CartInGen
};

const EMPTY_CART_IN_GEN = {
  pokemon: {},
  items: {},
  customBoxes: {},
  combination: null,
}

export const DEFAULT_CART: Cart = {
  1: EMPTY_CART_IN_GEN,
  2: EMPTY_CART_IN_GEN,
  3: EMPTY_CART_IN_GEN,
  4: EMPTY_CART_IN_GEN,
  5: EMPTY_CART_IN_GEN,
  6: EMPTY_CART_IN_GEN,
  7: EMPTY_CART_IN_GEN,
  8: EMPTY_CART_IN_GEN,
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
    type: 'add_item',
    payload: {
      gen: GenerationNum,
      item: ItemIconDatum,
      requiredPokemon: PokemonIconDatum[],
      parentEntityClass: EntityClass,
      targetEntityClass: EntityClass | 'From search',
      note: string,
    }
  }
| {
    type: 'start_combo',
    payload: {
        gen: GenerationNum
        box: Box,
      }
    }
| {
    type: 'intersect',
    payload: {
      gen: GenerationNum,
      box1: Box,
      box2: Box,
    },
  }
| {
    type: 'unite',
    payload: {
      gen: GenerationNum,
      box1: Box,
      box2: Box,
    },
  }
| {
    type: 'delete', 
    payload: {
      gen: GenerationNum,
      parentEntityClass: EntityClass,
      targetEntityClass: EntityClass,
      note: string,
    }
  }
| {
    type: 'combination_to_box',
    payload: {
      gen: GenerationNum,
    }
  };

const intersectPokemonIconData = (pokemonIconData1: PokemonIconDatum[], pokemonIconData2: PokemonIconDatum[]): PokemonIconDatum[]  => {
  const psIDs2 = pokemonIconData2.map(d => d.psID).sort();

  return pokemonIconData1.filter(d => binaryIncludes(psIDs2, d.psID, compareStrings));
};

const unitePokemonIconData = (pokemonIconData1: PokemonIconDatum[], pokemonIconData2: PokemonIconDatum[]): PokemonIconDatum[]  => {
  return removeDuplicatesFromSortedArray(sortPokemonIconData(pokemonIconData1.concat(pokemonIconData2)), equateTwoPokemonIconData);
}

export function cartReducer(state: Cart, action: CartAction): Cart {
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

    case 'delete':
      return state;

    case 'start_combo':
      if (state[action.payload.gen].combination?.note === action.payload.box.note) return {
        ...state,
        [action.payload.gen]: {
          ...state[action.payload.gen],
          combination: null,
        }
      };

      return {
        ...state,
        [action.payload.gen]: {
          ...state[action.payload.gen],
          combination: action.payload.box,
        }
      };

    case 'intersect':
      const intersection = intersectPokemonIconData(action.payload.box1.pokemon, action.payload.box2.pokemon);

      return {
        ...state,
        [action.payload.gen]: {
          ...state[action.payload.gen],
          combination: {
            note: '(' + action.payload.box1.note 
                  + ') AND (' 
                  + action.payload.box2.note + ')',
            pokemon: intersection,
          }
        }
      }

    case 'unite':
      const union = unitePokemonIconData(action.payload.box1.pokemon, action.payload.box2.pokemon);
      return {
        ...state,
        [action.payload.gen]: {
          ...state[action.payload.gen],
          combination: {
            note: '(' + action.payload.box1.note 
                  + ') OR (' 
                  + action.payload.box2.note + ')',
            pokemon: union,
          }
        }
      }

    case 'combination_to_box':
      if (state[action.payload.gen].combination === null) return state;
      return {
        ...state,
        [action.payload.gen]: {
          ...state[action.payload.gen],
          combination: null,
          customBoxes: {
            ...state[action.payload.gen].customBoxes,
            [state[action.payload.gen].combination?.note || '']: state[action.payload.gen].combination?.pokemon || [],
          },
        }
      }

    default:
      throw new Error();
  }
}
