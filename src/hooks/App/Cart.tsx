import { equateTwoPokemonIconData, GenerationNum, ItemIconDatum, PokemonIconDatum, sortPokemonIconData, } from "../../types-queries/helpers";
import { EntityClass } from "../../utils/constants";
import { binaryIncludes, compareStrings, removeDuplicatesFromSortedArray } from "../../utils/helpers";

// Cart setup
// #region 

export type TargetEntityInCart = {
  [note: string]: BoxInCart
}

export type ParentEntityClass = EntityClass

export type TargetEntityClass = EntityClass | 'Has' | 'From search';

export type ParentEntityInCart = {
  [targetEntityClass in TargetEntityClass]?: TargetEntityInCart
}

export type CombinationRole = CombinationOperation | 'START' | undefined

export interface Box {
  note: string
  pokemon: PokemonIconDatum[]
  parentEntityClass: ParentEntityClass | 'Custom'
  targetEntityClass: TargetEntityClass | null
}

export interface BoxFromPlanner extends Box {
  note: string
  pokemon: PokemonIconDatum[]
  parentEntityClass: ParentEntityClass
  targetEntityClass: TargetEntityClass
  roleInCombination: CombinationRole
}

export interface CustomBox extends Box {
  note: string
  pokemon: PokemonIconDatum[]
  parentEntityClass: 'Custom'
  targetEntityClass: null
  roleInCombination: CombinationRole
}

export type BoxInCart = BoxFromPlanner | CustomBox

export interface StartBox extends Box {
  note: string
  pokemon: PokemonIconDatum[]
  parentEntityClass: ParentEntityClass | 'Custom'
  targetEntityClass: TargetEntityClass | null
  roleInCombination: 'START'
}

export interface AndBox extends Box {
  note: string
  pokemon: PokemonIconDatum[]
  parentEntityClass: ParentEntityClass | 'Custom'
  targetEntityClass: TargetEntityClass | null
  roleInCombination: 'AND'
}

export interface OrBox extends Box {
  note: string
  pokemon: PokemonIconDatum[]
  parentEntityClass: ParentEntityClass | 'Custom'
  targetEntityClass: TargetEntityClass | null
  roleInCombination: 'OR'
}

export type BoxInCombination = AndBox | OrBox;

export type CartInGen = {
  pokemon: {
    [parentEntityClass in EntityClass]?: ParentEntityInCart
  }
  items: {
    [parentEntityClass in EntityClass]?: ParentEntityInCart
  }
  customBoxes: {
    [note: string]: BoxInCart
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

export type Combination = [StartBox, BoxInCombination[]] | null;

// Combining operations
// #region

const intersectPokemonIconData = (pokemonIconData1: PokemonIconDatum[], pokemonIconData2: PokemonIconDatum[]): PokemonIconDatum[]  => {
  const psIDs2 = pokemonIconData2.map(d => d.psID).sort();

  return pokemonIconData1.filter(d => binaryIncludes(psIDs2, d.psID, compareStrings));
};

const intersectBoxes = (box1: StartBox | AndBox, box2: StartBox | AndBox): StartBox => {
  return {
    note: `${box1.note} AND ${box2.note}`,
    pokemon: intersectPokemonIconData(box1.pokemon, box2.pokemon),
    parentEntityClass: 'Custom',
    targetEntityClass: null,
    roleInCombination: 'START',
  };
};

const unitePokemonIconData = (pokemonIconData1: PokemonIconDatum[], pokemonIconData2: PokemonIconDatum[]): PokemonIconDatum[]  => {
  return removeDuplicatesFromSortedArray(sortPokemonIconData(pokemonIconData1.concat(pokemonIconData2)), equateTwoPokemonIconData);
}

const uniteBoxes = (box1: StartBox | OrBox, box2: StartBox | OrBox): StartBox => {
  return {
    note: `${box1.note} OR ${box2.note}`,
    pokemon: unitePokemonIconData(box1.pokemon, box2.pokemon),
    parentEntityClass: 'Custom',
    targetEntityClass: null,
    roleInCombination: 'START',
  };
};

const combineTwoBoxes = (box1: StartBox, box2: BoxInCombination): StartBox => {
  switch (box2.roleInCombination) {
    case 'AND':
      return intersectBoxes(box1, box2);
    case 'OR':
      return uniteBoxes(box1, box2);
    default:
      throw Error();
  }
}

/*
  Returns null if combination leads to empty set of Pokemon.
  Otherwise, returns resulting box from executing the combination.
*/ 
const executeCombination: (combination: Combination) => BoxInCart | null = combination => {
  if (combination === null) return null;
  const [start, rest] = combination;

  const result: StartBox = rest.reduce((acc: StartBox, curr: BoxInCombination) => {
    return combineTwoBoxes(acc, curr);
  }, {
    // Parentheses to group starting box
    note: '(' + start.note + ')',
    pokemon: start.pokemon,
    parentEntityClass: 'Custom',
    targetEntityClass: null,
    roleInCombination: 'START',
  });

  if (result.pokemon.length === 0) return null;
  else return {
    ...result,
    parentEntityClass: 'Custom',
    targetEntityClass: null,
    roleInCombination: undefined,
  };
}

// #endregion

// Manipulating combinations
// #region 

/*
  If box's note is the same as one of the boxes in the combination, return the index, or -1 if it's the start; return -2 otherwise.
*/
export const findBoxInCombination: (combination: Combination, box: Box) => number = (combination, box) => {
  if (combination === null) return -2;

  const [start, rest] = combination;
  if (start.note === box.note) return -1;
  else {
    const notes = rest.map(boxInCombo => boxInCombo.note);
    let idx = -2;
    for (let i = 0; i < notes.length; i++) {
      if (notes[i] === box.note) {
        idx = i;
        break;
      }
    }
    return idx;
  }
}

const swapBoxWithStart: ([start, comboBox]: [StartBox, BoxInCombination]) => [StartBox, BoxInCombination] = ([start, comboBox]) => {
  const newStart: StartBox = {
    ...comboBox,
    roleInCombination: 'START',
  }
  const newFirstEntry: BoxInCombination = {
    ...start,
    roleInCombination: comboBox.roleInCombination,
  }
  return [newStart, newFirstEntry];
}

const swapTwoMiddleBoxes: ([box1, box2]: [BoxInCombination, BoxInCombination, ]) => [BoxInCombination, BoxInCombination] = ([box1, box2]) => {
  return [box2, box1];
}

const startCombination: (box: BoxInCart) => Combination = box => {
  const newStart: StartBox = {
    ...box,
    roleInCombination: 'START',
  }
  return [newStart, []];
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
    else {
      const newStart: StartBox = {
        ...combination[1][0],
        roleInCombination: 'START',
      }
      return [newStart, combination[1].slice(1)];
    }
  }
  // Removing middle box
  else {
    const newStart: StartBox = {
      ...combination[1][0],
      roleInCombination: 'START',
    }
    return [newStart, combination[1].slice(0, idx).concat(combination[1].slice(idx + 1))];
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

// idx represents index in array in combination, so excludes start
const switchOperationOfBox: (combination: Combination, idx: number) => Combination = (combination, idx) => {
  if (combination === null) return null;
  if (idx < 0 || idx >= combination[1].length) {
    throw new Error('Index out of bounds!');
  }
  const [start, rest] = combination;
  const newBox: BoxInCombination = rest[idx].roleInCombination === 'AND'
    ? {
        ...rest[idx],
        roleInCombination: 'OR',
      }
    : {
        ...rest[idx],
        roleInCombination: 'AND',
      };
  return [start, [...rest.slice(idx), newBox, ...rest.slice(idx + 1)]];
}

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
      targetEntityClass: TargetEntityClass,
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
      targetEntityClass: TargetEntityClass,
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
    type: 'toggle_combo_start',
    payload: {
        gen: GenerationNum
        box: BoxInCart
      }
    }
| {
    type: 'toggle_in_combo_from_cart',
    payload: {
      gen: GenerationNum,
      box: BoxInCart,
      operation: CombinationOperation
    },
  }
| {
    type: 'toggle_combo_role_from_combo',
    payload: {
      gen: GenerationNum,
      box: BoxInCombination
    },
  }
| {
    type: 'remove_from_combo',
    payload: {
      gen: GenerationNum,
      box: BoxInCombination
    },
  }
| {
    type: 'remove_from_combo',
    payload: {
      gen: GenerationNum,
      box: BoxInCombination
    },
  }
| {
    type: 'move_box_up_one',
    payload: {
      gen: GenerationNum,
      box: BoxInCombination
    }
  }
| {
    type: 'move_box_down_one',
    payload: {
      gen: GenerationNum,
      box: BoxInCombination
    }
  }
| {
    type: 'execute_combination',
    payload: {
      gen: GenerationNum,
    }
  }
| {
    type: 'clear_combination',
    payload: {
      gen: GenerationNum,
    }
  };

// #endregion

type RoleChangePlanner = {
  pokemon: {
    [parentEntityClass in ParentEntityClass]?: {
      [targetEntityClass in TargetEntityClass]?: {
        [note: string]: Box
      }
    }
  }
} | {
  customBoxes: {
    [note: string]: Box
  }
}

const changeRoleOfBox: (state: Cart, gen: GenerationNum, parentEntityClass: ParentEntityClass | 'Custom', targetEntityClass: TargetEntityClass | null, box: Box, newRole: CombinationRole) => RoleChangePlanner = (state, gen, parentEntityClass, targetEntityClass, box, newRole) => {
  // Starting box is a box from the planner
  if (parentEntityClass !== 'Custom' && targetEntityClass !== null) {
    const roleChangeChunk: RoleChangePlanner = {
      pokemon: {
        // Overwriting parentEntityClass
        [parentEntityClass]: {
          // Overwriting targetEntityClass
          ...state[gen].pokemon?.[parentEntityClass],
          [targetEntityClass]: {
            // Overwriting note
            ...state[gen].pokemon?.[parentEntityClass]?.[targetEntityClass],
            // Box now starts combination
            [box.note]: {
              ...box,
              roleInCombination: newRole,
            }
          }
        },
      },
    };
    return roleChangeChunk;
  }

  // Starting box is a custom box
  else {
    const roleChangeChunk = {
      customBoxes: {
        ...state[gen].customBoxes,
        // Box now starts combination
        [box.note]: {
          ...box,
          roleInCombination: newRole,
        },
      },
    };
    return roleChangeChunk;
  }
}

export function cartReducer(state: Cart, action: CartAction): Cart {
  let gen: GenerationNum
  let currentCombination: Combination;
  let idx: number;
  let parentEntityClass: ParentEntityClass | 'Custom';
  let targetEntityClass: TargetEntityClass | null;

  switch(action.type) {
    // Adding to/removing from cart; these operations stop combinations
    // #region

    case 'add_pokemon':
      parentEntityClass = action.payload.parentEntityClass;
      targetEntityClass = action.payload.targetEntityClass;
      gen = action.payload.gen; 

      return {
        ...state,
        // Overwriting gen
        [gen]: {
          ...state[gen],
          // Overwriting Pokemon
          pokemon: {
            // Overwriting parentEntityClass
            ...state[gen].pokemon,
            [action.payload.parentEntityClass]: {
              // Overwriting targetEntityClass within parentEntityClass
              ...state[gen].pokemon?.[action.payload.parentEntityClass],
              [action.payload.targetEntityClass]: {
                // Overwriting note within targetEntityClass
                ...state[gen].pokemon?.[action.payload.parentEntityClass]?.[action.payload.targetEntityClass],
                [action.payload.note]: action.payload.pokemon,
              }
            }
          },
          combination: null
        }
      }

    case 'add_item':
      parentEntityClass = action.payload.parentEntityClass;
      targetEntityClass = action.payload.targetEntityClass;
      gen = action.payload.gen; 

      return {
        ...state,
        // Overwriting gen
        [gen]: {
          // Overwriting items
          items: {
            // Overwriting parentEntityClass
            ...state[gen].items,
            [action.payload.parentEntityClass]: {
              // Overwriting targetEntityClass within parentEntityClass
              ...state[gen].items?.[action.payload.parentEntityClass],
              [action.payload.targetEntityClass]: {
                // Overwriting note within targetEntityClass
                ...state[gen].items?.[action.payload.parentEntityClass]?.[action.payload.targetEntityClass],
                [action.payload.note]: action.payload.requiredPokemon,
              }
            }
          },
          combination: null
        }
      }

    case 'delete':
      parentEntityClass = action.payload.parentEntityClass;
      targetEntityClass = action.payload.targetEntityClass;
      gen = action.payload.gen; 

      return state;
    
    // #endregion

    // Combining boxes
    // #region

    case 'toggle_combo_start':
      parentEntityClass = action.payload.box.parentEntityClass;
      targetEntityClass = action.payload.box.targetEntityClass;
      gen = action.payload.gen;
      currentCombination = state[gen].combination;
      
      // Combo hasn't been started, so action.payload.box will start combo
      if (currentCombination === null) {
        return {
          ...state,
          [gen]: {
            ...state[gen],
            // Change role of box to 'START'
            ...changeRoleOfBox(state, gen, parentEntityClass, targetEntityClass, action.payload.box, 'START'),
            combination: startCombination(action.payload.box),
          },
        };
      }
      // Combo has been started, so end the combo
      else {
        return {
          ...state,
          [gen]: {
            ...state[gen],
            // Box no longer has a role
            ...changeRoleOfBox(state, gen, parentEntityClass, targetEntityClass, action.payload.box, undefined),
            combination: startCombination(action.payload.box),
          },
        };
      }
    
    case 'toggle_in_combo_from_cart':
      parentEntityClass = action.payload.box.parentEntityClass;
      targetEntityClass = action.payload.box.targetEntityClass;
      gen = action.payload.gen;
      currentCombination = state[gen].combination;

      idx = findBoxInCombination(currentCombination, action.payload.box);

      // If box is not in combo, add it, with its operation
      if (idx === -2) {
        return {
          ...state,
          [gen]: {
            ...state[gen],
            // Change role of box to action.payload.operation
            ...changeRoleOfBox(state, gen, parentEntityClass, targetEntityClass, action.payload.box, action.payload.operation),
            combination: addBoxToEnd(currentCombination, { ...action.payload.box, roleInCombination: action.payload.operation, }),
          },
        };
      }

      // If box is at start, or if combination is null, do nothing; this shouldn't happen
      else if (idx === -1 || currentCombination === null) return state;

      // Box is already in combination
      else {
        const currentOperation = currentCombination[1][idx].roleInCombination;

        const newOperation = action.payload.box.roleInCombination === currentOperation 
          // If new operation is same as current, then remove box from combination
          ? undefined
          // Else, newOperation is opposite of currentOperation
          : action.payload.box.roleInCombination;

        return {
          ...state,
          [gen]: {
            ...state[gen],
            // Change role of box to newOperation
            ...changeRoleOfBox(state, gen, parentEntityClass, targetEntityClass, action.payload.box, newOperation),
            combination: newOperation === undefined
              // If newOperation === undefined, we need to remove the box
              ? removeFromCombination(currentCombination, idx)
              // Otherwise, we toggle its operation
              : switchOperationOfBox(currentCombination, idx),
          },
        };
      }

    case 'toggle_combo_role_from_combo':
      parentEntityClass = action.payload.box.parentEntityClass;
      targetEntityClass = action.payload.box.targetEntityClass;
      gen = action.payload.gen;
      currentCombination = state[gen].combination;

      // Shouldn't happen
      if (currentCombination === null) return state;

      idx = findBoxInCombination(currentCombination, action.payload.box);

      const currentOperation = currentCombination[1][idx].roleInCombination;
      const newOperation = currentOperation === 'AND'
        ? 'OR'
        : 'AND';

      return {
        ...state,
        [gen]: {
          ...state[gen],
          // Change role of box to newOperation
          ...changeRoleOfBox(state, gen, parentEntityClass, targetEntityClass, action.payload.box, newOperation),
          // Switch operation of Box
          combination: switchOperationOfBox(currentCombination, idx),
        },
      };

    case 'remove_from_combo':
      parentEntityClass = action.payload.box.parentEntityClass;
      targetEntityClass = action.payload.box.targetEntityClass;
      gen = action.payload.gen;
      currentCombination = state[gen].combination;

      idx = findBoxInCombination(currentCombination, action.payload.box);

      return {
        ...state,
        [gen]: {
          ...state[gen],
          // Box no longer has a role
          ...changeRoleOfBox(state, gen, parentEntityClass, targetEntityClass, action.payload.box, undefined),
          // Switch operation of Box
          combination: removeFromCombination(currentCombination, idx),
        },
      };

    case 'move_box_down_one':
      parentEntityClass = action.payload.box.parentEntityClass;
      targetEntityClass = action.payload.box.targetEntityClass;
      gen = action.payload.gen;
      currentCombination = state[gen].combination;
      idx = findBoxInCombination(state[gen].combination, action.payload.box);

      return {
        ...state,
        [gen]: {
          ...state[gen],
          combination: moveBoxDownOne(state[gen].combination, idx),
        },
      };

    case 'move_box_up_one':
      parentEntityClass = action.payload.box.parentEntityClass;
      targetEntityClass = action.payload.box.targetEntityClass;
      gen = action.payload.gen;
      currentCombination = state[gen].combination;
      idx = findBoxInCombination(state[gen].combination, action.payload.box);

      return {
        ...state,
        [gen]: {
          ...state[gen],
          combination: moveBoxUpOne(state[gen].combination, idx),
        },
      };

    case 'execute_combination':
      gen = action.payload.gen;
      const newBox = executeCombination(state[gen].combination);

      // If result is null, don't clear original combination; give user option to manipulate combination still
      if (newBox === null) return {
        ...state,
        [gen]: {
          ...state[gen],
          combination: null,
        }
      }
      else return {
        ...state,
        [gen]: {
          ...state[gen],
          combination: null,
          customBoxes: {
            ...state[gen].customBoxes,
            [newBox.note]: newBox.pokemon,
          },
        },
      }

    case 'clear_combination':
      gen = action.payload.gen;
      return {
        ...state,
        [gen]: {
          ...state[gen],
          combination: null,
        }
      };

    // #endregion

    default:
      throw new Error();
  }
}

// #endregion