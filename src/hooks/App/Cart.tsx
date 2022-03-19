import { GenNum } from "../../types-queries/entities";
import { equateTwoPokemonIconData, IconDatum, PokemonIconDatum, sortPokemonIconData } from "../../types-queries/helpers";
import { EntityClass } from "../../utils/constants";
import { binaryIncludes, compareStrings, omitKeys, removeDuplicatesFromSortedArray } from "../../utils/helpers";

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

export type BoxFromPlannerClassification = {
  parentEntityClass: ParentEntityClass
  targetEntityClass: TargetEntityClass
}

export type CustomBoxClassification = {
  parentEntityClass: 'Custom'
  targetEntityClass: null
}

export type BoxClassification = BoxFromPlannerClassification | CustomBoxClassification

export type BoxFromPlanner = {
  note: string
  pokemon: PokemonIconDatum[]
  classification: {
    parentEntityClass: ParentEntityClass
    targetEntityClass: TargetEntityClass
  }
  roleInCombination: CombinationRole
}

export type CustomBox = {
  note: string
  pokemon: PokemonIconDatum[]
  classification: {
    parentEntityClass: 'Custom'
    targetEntityClass: null
  }
  roleInCombination: CombinationRole
}

export type BoxInCart = BoxFromPlanner | CustomBox

export type StartBox = {
  note: string
  pokemon: PokemonIconDatum[]
  classification: BoxClassification
  roleInCombination: 'START'
}

export type AndBox = {
  note: string
  pokemon: PokemonIconDatum[]
  classification: BoxClassification
  roleInCombination: 'AND'
}

export type OrBox = {
  note: string
  pokemon: PokemonIconDatum[]
  classification: BoxClassification
  roleInCombination: 'OR'
}

export type BoxInCombination = AndBox | OrBox;

export type CartInGen = {
  pokemon: {
    [parentEntityClass in ParentEntityClass]?: ParentEntityInCart
  }
  items: {
    [parentEntityClass in ParentEntityClass]?: ParentEntityInCart
  }
  customBoxes: {
    [note: string]: BoxInCart
  }
  combination: Combination
  combinationResult: BoxInCart | null
  zeroCombinationResult: false | BoxInCombination[]
}

export type Cart = {
  [gen in GenNum]: CartInGen
};

const EMPTY_CART_IN_GEN: CartInGen = {
  pokemon: {},
  items: {},
  customBoxes: {},
  combination: null,
  combinationResult: null,
  zeroCombinationResult: (false as false),
}

export const DEFAULT_CART: Cart = {
  1: { ...EMPTY_CART_IN_GEN, },
  2: { ...EMPTY_CART_IN_GEN, },
  3: { ...EMPTY_CART_IN_GEN, },
  4: { ...EMPTY_CART_IN_GEN, },
  5: { ...EMPTY_CART_IN_GEN, },
  6: { ...EMPTY_CART_IN_GEN, },
  7: { ...EMPTY_CART_IN_GEN, },
  8: { ...EMPTY_CART_IN_GEN, },
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
    classification: {
      parentEntityClass: 'Custom',
      targetEntityClass: null
    },
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
    classification: {
      parentEntityClass: 'Custom',
      targetEntityClass: null
    },
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
const executeCombination: (combination: Combination) => 
    { zeroResult: false, combinationResult: BoxInCart } 
  | { zeroResult: true, breakingBoxes: BoxInCombination[] } 
  | null 
= combination => {
  if (combination === null) return null;
  const [start, rest] = combination;
  let breakingBoxes: BoxInCombination[] = [];

  const result: StartBox = rest.reduce((acc: StartBox, curr: BoxInCombination) => {
    const result = combineTwoBoxes(acc, curr);
    if (result.pokemon.length === 0) {
      breakingBoxes = [curr, ...breakingBoxes];
    }
    return result;
  }, {
    // Parentheses to group starting box
    note: '(' + start.note + ')',
    pokemon: start.pokemon,
    classification: {
      parentEntityClass: 'Custom',
      targetEntityClass: null
    },
    roleInCombination: 'START',
  });

  if (result.pokemon.length === 0) return { zeroResult: true, breakingBoxes };
  else return {
    zeroResult: false,
    combinationResult: {
      ...result,
      classification: {
        parentEntityClass: 'Custom',
        targetEntityClass: null,
      },
      roleInCombination: undefined,
    }
  };
}

// #endregion

// Manipulating combinations
// #region 

/*
  If box's note is the same as one of the boxes in the combination, return the index, or -1 if it's the start; return -2 otherwise.
*/
export const findBoxInCombination: (combination: Combination, box: StartBox | BoxInCombination | BoxInCart) => number = (combination, box) => {
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

export const findBoxInArray: (arr: BoxInCombination[], box: BoxInCombination) => boolean = (arr, box) => {
  const DUMMY_START_BOX: StartBox = {
    note: '',
    pokemon: [],
    classification: {
      parentEntityClass: 'Custom',
      targetEntityClass: null
    },
    roleInCombination: 'START',
  }
  return findBoxInCombination([DUMMY_START_BOX, arr], box) !== -2;
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
    throw new RangeError('Index out of bounds!');
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
    throw new RangeError('Index out of bounds!');
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
    throw new RangeError('Index out of bounds!');
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
    throw new RangeError('Index out of bounds!');
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

  return [start, [...rest.slice(0, idx), newBox, ...rest.slice(idx + 1)]];
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
      gen: GenNum
      pokemon: PokemonIconDatum[],
      parentEntityClass: EntityClass,
      targetEntityClass: TargetEntityClass,
      note: string,
    },
  }
| {
    type: 'add_item',
    payload: {
      gen: GenNum,
      item: IconDatum,
      requiredPokemon: PokemonIconDatum[],
      parentEntityClass: EntityClass,
      targetEntityClass: TargetEntityClass,
      note: string,
    }
  }
| {
    type: 'delete', 
    payload: {
      gen: GenNum,
      box: BoxInCart,
    }
  }

// #endregion

// Combining boxes
// #region

| {
    type: 'toggle_combo_start',
    payload: {
        gen: GenNum
        box: BoxInCart
      }
    }
| {
    type: 'toggle_in_combo_from_cart',
    payload: {
      gen: GenNum,
      box: BoxInCart,
      operation: CombinationOperation
    },
  }
| {
    type: 'toggle_combo_role_from_combo',
    payload: {
      gen: GenNum,
      box: BoxInCombination | StartBox
    },
  }
| {
    type: 'remove_from_combo',
    payload: {
      gen: GenNum,
      box: StartBox | BoxInCombination
    },
  }
| {
    type: 'move_box_up_one',
    payload: {
      gen: GenNum,
      box: BoxInCombination
    }
  }
| {
    type: 'move_box_down_one',
    payload: {
      gen: GenNum,
      box: BoxInCombination | StartBox
    }
  }
| {
    type: 'execute_combination',
    payload: {
      gen: GenNum,
    }
  }
| {
    type: 'add_combination_result',
    payload: {
      gen: GenNum,
      note: string,
    }
  }
| {
    type: 'clear_combination',
    payload: {
      gen: GenNum,
    }
  };

// #endregion

type RoleChangePlanner = {
  pokemon: {
    [parentEntityClass in ParentEntityClass]?: {
      [targetEntityClass in TargetEntityClass]?: {
        [note: string]: BoxInCart
      }
    }
  }
} | {
  customBoxes: {
    [note: string]: BoxInCart
  }
}

// export type CartInGen = {
//   pokemon: {
//     [parentEntityClass in EntityClass]?: ParentEntityInCart
//   }
//   items: {
//     [parentEntityClass in EntityClass]?: ParentEntityInCart
//   }
//   customBoxes: {
//     [note: string]: BoxInCart
//   }
//   combination: Combination
// }

// export type ParentEntityInCart = {
//   [targetEntityClass in TargetEntityClass]?: TargetEntityInCart
// }


// Clear combination and set roles to undefined
const setRoleToUndefinedCartInGen: (cartInGen: CartInGen) => void = cartInGen => {
  for (let value of Object.values(cartInGen.pokemon)) {
    setRoleToUndefinedParent(value);
  };
  for (let value of Object.values(cartInGen.customBoxes)) {
    value.roleInCombination = undefined;
  };

  // Clean up combination fields
  cartInGen.combination = null;
  cartInGen.zeroCombinationResult = false;
  cartInGen.combinationResult = null;
}

const setRoleToUndefinedParent: (parentEntityInCart: ParentEntityInCart) => void = parentEntityInCart => {
  for (let value of Object.values(parentEntityInCart)) {
    setRoleToUndefinedTarget(value);
  };
};

const setRoleToUndefinedTarget: (targetEntityInCart: TargetEntityInCart) => void = parentEntityInCart => {
  for (let value of Object.values(parentEntityInCart)) {
    value.roleInCombination = undefined;
  };
};

const endCombo: (state: Cart) => Cart = (state) => {
  // A shallow copy suffices since we only wish to change roleInCombination
  let newState = {...state};

  // Set role to undefined
  for (let value of Object.values(newState)) {
    setRoleToUndefinedCartInGen(value);
  };

  return newState;
};

// WARNING: DOES NOT WORK WHEN USED TWICE IN THE SAME OBJECT UNPACKING, AS THE RESULTS CAN OVERWRITE EACH OTHER
const changeRoleOfBox: (state: Cart, gen: GenNum, box: BoxInCart | BoxInCombination | StartBox, newRole: CombinationRole) => RoleChangePlanner = (state, gen, box, newRole) => {
  const [parentEntityClass, targetEntityClass]: [ParentEntityClass | 'Custom', TargetEntityClass | null] = [box.classification.parentEntityClass, box.classification.targetEntityClass];


  // box is a box from the planner
  if (parentEntityClass !== 'Custom' && targetEntityClass !== null) {
    const newBox: BoxInCart = {
      note: box.note,
      pokemon: box.pokemon,
      classification: {
        parentEntityClass,
        targetEntityClass,
      },
      roleInCombination: newRole,
    }
    const roleChangeChunk: RoleChangePlanner = {
      pokemon: {
        ...state[gen].pokemon,
        // Overwriting parentEntityClass
        [parentEntityClass]: {
          // Overwriting targetEntityClass
          ...state[gen].pokemon?.[parentEntityClass],
          [targetEntityClass]: {
            // Overwriting note
            ...state[gen].pokemon?.[parentEntityClass]?.[targetEntityClass],
            // Box now starts combination
            [box.note]: newBox,
          }
        },
      },
    };
    return roleChangeChunk;
  }

  // box is a custom box
  else if (parentEntityClass === 'Custom' && targetEntityClass === null) {
    const newBox: BoxInCart = {
      note: box.note,
      pokemon: box.pokemon,
      classification: {
        parentEntityClass,
        targetEntityClass,
      },
      roleInCombination: newRole,
    };

    const roleChangeChunk: RoleChangePlanner = {
      customBoxes: {
        ...state[gen].customBoxes,
        // Box now starts combination
        [box.note]: newBox,
      },
    };
    return roleChangeChunk;
  }

  else {
    return {
      pokemon: {
        ...state[gen].pokemon
      },
    };
  }
}

export function cartReducer(state: Cart, action: CartAction): Cart {
  let gen: GenNum
  let currentCombination: Combination;
  let idx: number;
  let parentEntityClass: ParentEntityClass | 'Custom';
  let targetEntityClass: TargetEntityClass | null;
  let note: string;
  try {
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
            [parentEntityClass]: {
              // Overwriting targetEntityClass within parentEntityClass
              ...state[gen].pokemon?.[parentEntityClass],
              [targetEntityClass]: {
                // Overwriting note within targetEntityClass
                ...state[gen].pokemon?.[parentEntityClass]?.[targetEntityClass],
                [action.payload.note]: {
                  note: action.payload.note,
                  pokemon: action.payload.pokemon,
                  classification: {
                    parentEntityClass,
                    targetEntityClass,
                  },
                  roleInCombination: undefined,
                }
              }
            }
          },
          combination: null,
          zeroCombinationResult: false,
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
          combination: null,
          zeroCombinationResult: false,
        }
      }

    // TODO
    case 'delete':
      gen = action.payload.gen;
      parentEntityClass = action.payload.box.classification.parentEntityClass;
      targetEntityClass = action.payload.box.classification.targetEntityClass;
      note = action.payload.box.note;

      // Removing custom box
      if (parentEntityClass === 'Custom' && targetEntityClass === null) {
        return {
          ...state,
          [gen]: {
            ...state[gen],
            customBoxes: omitKeys([note], state[gen].customBoxes),
          },
        };
      }
      // Removing box from Planner
      else if (parentEntityClass !== 'Custom' && targetEntityClass !== null) {
        return {
          ...state,
          [gen]: {
            ...state[gen],
            pokemon: {
              ...state[gen].pokemon,
              [parentEntityClass]: {
                ...state[gen].pokemon[parentEntityClass],
                [targetEntityClass]: omitKeys([note], state[gen].pokemon[parentEntityClass]?.[targetEntityClass]),
              },
            },
          },
        };
      }

      // Shouldn't occur
      return state;

    
    // #endregion

    // Combining boxes
    // #region

    case 'toggle_combo_start':
      parentEntityClass = action.payload.box.classification.parentEntityClass;
      targetEntityClass = action.payload.box.classification.targetEntityClass;
      gen = action.payload.gen;
      currentCombination = state[gen].combination;

      // Combo hasn't been started, so action.payload.box will start combo
      if (currentCombination === null) {
        return {
          ...state,
          [gen]: {
            ...state[gen],
            // Change role of box to 'START'
            ...changeRoleOfBox(state, gen, action.payload.box, 'START'),
            combination: startCombination(action.payload.box),
            zeroCombinationResult: false,
          },
        };
      }
      // Combo has been started, so end the combo
      else {
        return endCombo(state);
      }
    
    case 'toggle_in_combo_from_cart':
      parentEntityClass = action.payload.box.classification.parentEntityClass;
      targetEntityClass = action.payload.box.classification.targetEntityClass;
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
            ...changeRoleOfBox(state, gen, action.payload.box, action.payload.operation),
            combination: addBoxToEnd(currentCombination, { ...action.payload.box, roleInCombination: action.payload.operation, }),
            zeroCombinationResult: false,
          },
        };
      }

      // If box is at start, or if combination is null, do nothing; this shouldn't happen
      else if (idx === -1 || currentCombination === null) return state;

      // Box is already in combination
      else {
        const currentOperation = currentCombination[1][idx].roleInCombination;

        const newOperation = action.payload.operation === currentOperation 
          // If new operation is same as current, then remove box from combination
          ? undefined
          // Else, newOperation is opposite of currentOperation
          : action.payload.operation;

        return {
          ...state,
          [gen]: {
            ...state[gen],
            // Change role of box to newOperation
            ...changeRoleOfBox(state, gen, action.payload.box, newOperation),
            combination: newOperation === undefined
              // If newOperation === undefined, we need to remove the box
              ? removeFromCombination(currentCombination, idx)
              // Otherwise, we toggle its operation
              : switchOperationOfBox(currentCombination, idx),
            zeroCombinationResult: false,
          },
        };
      }

    case 'toggle_combo_role_from_combo':
      parentEntityClass = action.payload.box.classification.parentEntityClass;
      targetEntityClass = action.payload.box.classification.targetEntityClass;
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
          ...changeRoleOfBox(state, gen, action.payload.box, newOperation),
          // Switch operation of Box
          combination: switchOperationOfBox(currentCombination, idx),
          zeroCombinationResult: false,
        },
      };

    case 'remove_from_combo':
      parentEntityClass = action.payload.box.classification.parentEntityClass;
      targetEntityClass = action.payload.box.classification.targetEntityClass;
      gen = action.payload.gen;
      currentCombination = state[gen].combination;

      idx = findBoxInCombination(currentCombination, action.payload.box);

      const stateWithBoxRemoved = {
        ...state,
        [gen]: {
          ...state[gen],
          // Box no longer has a role
          ...changeRoleOfBox(state, gen, action.payload.box, undefined),
          // Switch operation of Box
          combination: removeFromCombination(currentCombination, idx),
          zeroCombinationResult: false,
        },
      };

      // Start box was removed, so need to use changeRoleOfBox
      if (idx === -1) {
        const newStart = stateWithBoxRemoved[gen].combination?.[0];
        // Combo was ended, so do nothing more
        if (!newStart) return endCombo(stateWithBoxRemoved);

        // Combo is still going,
        return {
          ...stateWithBoxRemoved,
          [gen]: {
            ...stateWithBoxRemoved[gen],
            // Assign new start
            ...changeRoleOfBox(stateWithBoxRemoved, gen, newStart, 'START'),
          },
        }
      }
      else return stateWithBoxRemoved;

    case 'move_box_down_one':
      parentEntityClass = action.payload.box.classification.parentEntityClass;
      targetEntityClass = action.payload.box.classification.targetEntityClass;
      gen = action.payload.gen;
      currentCombination = state[gen].combination;
      idx = findBoxInCombination(state[gen].combination, action.payload.box);
      
      // Shouldn't happen, but for type safety
      if (!currentCombination) return state;

      // No other items; shouldn't happen
      if (currentCombination[1].length === 0) return state;

      // Indicates payload is start, so need to do role changing
      if (idx === -1) {
        const stateWithCombinationChanged = {
          ...state,
          [gen]: {
            ...state[gen],
            combination: moveBoxDownOne(state[gen].combination, idx),
          }
        };

        const stateWithStartRoleChanged = {
          ...stateWithCombinationChanged,
          [gen]: {
            ...stateWithCombinationChanged[gen],
            ...changeRoleOfBox(stateWithCombinationChanged, gen, action.payload.box, currentCombination[1][0].roleInCombination),
          }
        };

        return {
          ...stateWithStartRoleChanged,
          [gen]: {
            ...stateWithStartRoleChanged[gen],
            ...changeRoleOfBox(stateWithStartRoleChanged, gen, currentCombination[1][0], 'START'),
            zeroCombinationResult: false,
          }
        }
      }

      // No need for role changing
      else {
        return {
          ...state,
          [gen]: {
            ...state[gen],
            combination: moveBoxDownOne(state[gen].combination, idx),
            zeroCombinationResult: false,
          },
        };
      }

    case 'move_box_up_one':
      parentEntityClass = action.payload.box.classification.parentEntityClass;
      targetEntityClass = action.payload.box.classification.targetEntityClass;
      gen = action.payload.gen;
      currentCombination = state[gen].combination;
      idx = findBoxInCombination(state[gen].combination, action.payload.box);
      
      // Shouldn't happen, but for type safety
      if (!currentCombination) return state;

      // Indicates payload is next to start, so need to change roles
      if (idx === 0) {
        const stateWithCombinationChanged = {
          ...state,
          [gen]: {
            ...state[gen],
            combination: moveBoxUpOne(state[gen].combination, idx),
          }
        };

        const stateWithStartRoleChanged = {
          ...stateWithCombinationChanged,
          [gen]: {
            ...stateWithCombinationChanged[gen],
            ...changeRoleOfBox(stateWithCombinationChanged, gen, action.payload.box, 'START'),
          }
        }

        return {
          ...stateWithStartRoleChanged,
          [gen]: {
            ...stateWithStartRoleChanged[gen],
            ...changeRoleOfBox(stateWithStartRoleChanged, gen, currentCombination[0], action.payload.box.roleInCombination),
            zeroCombinationResult: false,
          }
        }
      }
      
      // No need for role changing
      else {
        return {
          ...state,
          [gen]: {
            ...state[gen],
            combination: moveBoxUpOne(state[gen].combination, idx),
          },
        };
      }

    case 'execute_combination':
      gen = action.payload.gen;
      const result = executeCombination(state[gen].combination);

      // If result is null, don't clear original combination; give user option to manipulate combination still
      if (result === null) return {
        ...state,
        [gen]: {
          ...state[gen],
          zeroCombinationResult: false,
        }
      };

      // In this case, result is of type BoxInCombination[], 
      if (result.zeroResult) {
        return {
          ...state,
          [gen]: {
            ...state[gen],
            zeroCombinationResult: result.breakingBoxes,
          }
        }
      }
      // Store combinationResult, but don't add to custom boxes yet
      const stateWithNewBox = {
        ...state,
        [gen]: {
          ...state[gen],
          combinationResult: result.combinationResult,
        },
      };

      // Clean-up combination and roles
      return stateWithNewBox;

    case 'add_combination_result':
      gen = action.payload.gen;

      // Shouldn't happen
      if (!state[gen].combinationResult) return endCombo(state);
      return endCombo({
        ...state,
        [gen]: {
          ...state[gen],
          customBoxes: {
            ...state[gen].customBoxes,
            [action.payload.note]: {
              ...state[gen].combinationResult,
              note: action.payload.note,
            },
          },
        }
      });

    case 'clear_combination':
      return endCombo(state);

    // #endregion

    default:
      throw new Error();
    }
  }
  catch (e) {
    // Index out of bounds
    if (e instanceof RangeError) return state;
    else throw new Error();
  }
}

// #endregion