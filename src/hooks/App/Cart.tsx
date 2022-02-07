import { equateTwoPokemonIconData, GenerationNum, ItemIconDatum, PokemonIconDatum, sortPokemonIconData, } from "../../types-queries/helpers";
import { EntityClass } from "../../utils/constants";
import { binaryIncludes, compareStrings, removeDuplicatesFromSortedArray } from "../../utils/helpers";


export type Box = {
  note: string
  pokemon: PokemonIconDatum[]
}

export type CartInGen = {
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
  customBoxes: {
    [note: string]: PokemonIconDatum[]
  }
}

export type Cart = {
  [gen in GenerationNum]: CartInGen
};

const EMPTY_CART_IN_GEN = {
  pokemon: {},
  items: {},
  customBoxes: {},
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
| { type: 'remove', };

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

    case 'remove':
      return state;

    case 'intersect':
      const intersection = intersectPokemonIconData(action.payload.box1.pokemon, action.payload.box2.pokemon);

      return {
        ...state,
        [action.payload.gen]: {
          ...state[action.payload.gen],
          customBoxes: {
            ...state[action.payload.gen].customBoxes,
            [
              '(' + action.payload.box1.note 
              + ') AND (' 
              + action.payload.box2.note + ')'
            ]: intersection,
          }
        }
      }

    case 'unite':
      const union = unitePokemonIconData(action.payload.box1.pokemon, action.payload.box2.pokemon);
      return {
        ...state,
        [action.payload.gen]: {
          ...state[action.payload.gen],
          customBoxes: {
            ...state[action.payload.gen].customBoxes,
            [
              '(' + action.payload.box1.note 
              + ') OR (' 
              + action.payload.box2.note + ')'
            ]: union,
          }
        }
      }

    default:
      throw new Error();
  }
}
