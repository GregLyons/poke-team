import { equateTwoPokemonIconData, GenerationNum, ItemIconDatum, PokemonIconDatum, sortPokemonIconData, } from "../../types-queries/helpers";
import { EntityClass } from "../../utils/constants";
import { binaryIncludes, compareStrings, removeDuplicatesFromSortedArray } from "../../utils/helpers";

// Cart setup
// #region 

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
  combination: Combination
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

// #endregion

// Box combining
// #region

type CombinationOperation = 'AND' | 'OR';

export type BoxInCombination = {
  operation: CombinationOperation
  box: Box
}

export type Combination = [Box, BoxInCombination[]] | null;

// Combining operations
// #region

const intersectPokemonIconData = (pokemonIconData1: PokemonIconDatum[], pokemonIconData2: PokemonIconDatum[]): PokemonIconDatum[]  => {
  const psIDs2 = pokemonIconData2.map(d => d.psID).sort();

  return pokemonIconData1.filter(d => binaryIncludes(psIDs2, d.psID, compareStrings));
};

const intersectBoxes = (box1: Box, box2: Box): Box => {
  return {
    note: `${box1.note} AND ${box2.note}`,
    pokemon: intersectPokemonIconData(box1.pokemon, box2.pokemon),
  };
};

const unitePokemonIconData = (pokemonIconData1: PokemonIconDatum[], pokemonIconData2: PokemonIconDatum[]): PokemonIconDatum[]  => {
  return removeDuplicatesFromSortedArray(sortPokemonIconData(pokemonIconData1.concat(pokemonIconData2)), equateTwoPokemonIconData);
}

const uniteBoxes = (box1: Box, box2: Box): Box => {
  return {
    note: `${box1.note} OR ${box2.note}`,
    pokemon: unitePokemonIconData(box1.pokemon, box2.pokemon),
  };
};

const combineTwoBoxes = (box1: Box, box2: BoxInCombination) => {
  switch (box2.operation) {
    case 'AND':
      return intersectBoxes(box1, box2.box);
    case 'OR':
      return uniteBoxes(box1, box2.box);
    default:
      throw Error();
  }
}

const executeCombination: (combination: Combination) => Box | null = combination => {
  if (combination === null) return null;
  const [start, rest] = combination;

  const result = rest.reduce((acc: Box, curr: BoxInCombination) => {
    return combineTwoBoxes(acc, curr);
  }, {
    // Parentheses to group starting box
    note: '(' + start.note + ')',
    pokemon: start.pokemon,
  });

  if (result.pokemon.length === 0) return null;
  else return result;
}

// #endregion

// Manipulating combinations
// #region 

const swapBoxWithStart: ([start, comboBox]: [Box, BoxInCombination]) => [Box, BoxInCombination] = ([start, comboBox]) => {
  return [comboBox.box, { operation: comboBox.operation, box: start }];
}

const swapTwoMiddleBoxes: ([box1, box2]: [BoxInCombination, BoxInCombination, ]) => [BoxInCombination, BoxInCombination] = ([box1, box2]) => {
  return [box2, box1];
}

const startCombination: (box: Box) => Combination = box => {
  return [box, []];
}

// idx is an index in the array in combination, or -1 for the start
const removeFromCombination: (combination: Combination, idx: number) => Combination = (combination, idx) => {
  if (combination === null) return null;
  
  // Out of bounds
  if (idx < -1 || idx >= combination[1].length) {
    throw new Error('Index out of bounds!');
  }

  // Removing start
  if (idx === -1) {
    // Start is only box in combination, so removing it stops the combination
    if (combination[1].length === 0) {
      return null;
    }
    // Other boxes in combination to take the place of start
    else return [combination[1][0].box, combination[1].slice(1)];
  }
  // Removing middle box
  else {
    return [combination[0], combination[1].slice(0, idx).concat(combination[1].slice(idx + 1))];
  }
}

const addBoxToEnd: (combination: Combination, box: BoxInCombination) => Combination = (combination, box) => {
  if (combination === null) throw new Error('Combination hasn\'t been started yet.');
  else return [combination[0], combination[1].concat([box])];
}

// idx is an index in the array in combination, so excludes the start from the length
const moveBoxUpOne: (combination: Combination, idx: number) => Combination = (combination, idx) => {
  if (combination === null) return null;

  // No way to move boxes up
  if (combination[1].length === 0) return combination;
  
  // Out of bounds
  if (idx < 0 || idx >= combination[1].length) {
    throw new Error('Index out of bounds!');
  }

  // We must perform a swap now
  const [start, rest] = combination;

  // Swap with start
  if (idx === 0) {
    const [newStart, oldStart] = swapBoxWithStart([start, rest[0]]);
    return [newStart, [oldStart, ...rest.slice(1)]];
  }
  else {
    const swap = swapTwoMiddleBoxes([rest[idx - 1], rest[idx]]);
    const newRest = rest.slice(0, idx - 1)
                    .concat(swap)
                    .concat(rest.slice(idx + 1));
    return [start, newRest];
  }
};

// idx is an index in the array in combination OR -1 for the start
const moveBoxDownOne: (combination: Combination, idx: number) => Combination = (combination, idx) => {
  if (combination === null) return null;

  // No way to move boxes down
  if (combination[1].length === 0) return combination;
  
  // Out of bounds
  if (idx < -1 || idx >= combination[1].length - 1) {
    throw new Error('Index out of bounds!');
  }

  // We must perform a swap now
  const [start, rest] = combination;

  // Swap with start
  if (idx === -1) {
    const [newStart, oldStart] = swapBoxWithStart([start, rest[0]]);
    return [newStart, [oldStart, ...rest.slice(1)]];
  }
  else {
    const swap = swapTwoMiddleBoxes([rest[idx], rest[idx + 1]]);
    const newRest = rest.slice(0, idx)
                    .concat(swap)
                    .concat(rest.slice(idx + 2));
    return [start, newRest];
  }
};

// #endregion

// #endregion

// Set up reducer
// #region

export type CartAction =
// Adding to/removing from cart
// #region
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
    type: 'delete', 
    payload: {
      gen: GenerationNum,
      parentEntityClass: EntityClass,
      targetEntityClass: EntityClass,
      note: string,
    }
  }
// #endregion
// Combining boxes
// #region
| {
    type: 'start_combo',
    payload: {
        gen: GenerationNum
        box: Box,
      }
    }
| {
    type: 'add_to_combo',
    payload: {
      gen: GenerationNum,
      boxInCombination: BoxInCombination
    },
  }
| {
    type: 'remove_from_combo',
    payload: {
      gen: GenerationNum,
      idx: number
    },
  }
| {
    type: 'move_box_up_one',
    payload: {
      gen: GenerationNum
      idx: number
    }
  }
| {
    type: 'move_box_down_one',
    payload: {
      gen: GenerationNum
      idx: number
    }
  }
| {
    type: 'execute_combination',
    payload: {
      gen: GenerationNum,
    }
  };
// #endregion

export function cartReducer(state: Cart, action: CartAction): Cart {
  switch(action.type) {
    // Adding to/removing from cart
    // #region

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
    
    // #endregion

    // Combining boxes
    // #region

    case 'start_combo':
      return {
        ...state,
        [action.payload.gen]: {
          ...state[action.payload.gen],
          combination: startCombination(action.payload.box),
        },
      };

    case 'add_to_combo':
      return {
        ...state,
        [action.payload.gen]: {
          ...state[action.payload.gen],
          combination: addBoxToEnd(state[action.payload.gen].combination, action.payload.boxInCombination),
        },
      };

    case 'move_box_down_one':
      return {
        ...state,
        [action.payload.gen]: {
          ...state[action.payload.gen],
          combination: moveBoxDownOne(state[action.payload.gen].combination, action.payload.idx),
        },
      };

    case 'move_box_up_one':
    return {
      ...state,
      [action.payload.gen]: {
        ...state[action.payload.gen],
        combination: moveBoxUpOne(state[action.payload.gen].combination, action.payload.idx),
      },
    };

    case 'execute_combination':
      const newBox = executeCombination(state[action.payload.gen].combination);
      if (newBox === null) return {
        ...state,
        [action.payload.gen]: {
          ...state[action.payload.gen],
          combination: null,
        }
      }
      else return {
        ...state,
        [action.payload.gen]: {
          ...state[action.payload.gen],
          combination: null,
          customBoxes: {
            ...state[action.payload.gen].customBoxes,
            [newBox.note]: newBox.pokemon,
          },
        },
      }

    // #endregion

    default:
      throw new Error();
  }
}

// #endregion