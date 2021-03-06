import { GenNum } from "../../types-queries/entities"

export type GenFilter = {
  gen: GenNum
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
      gen: GenNum,
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
        includeRemovedFromBDSP: true,
      };
    case 'toggle_bdsp':
      return {
        ...state,
        includeRemovedFromSwSh: true,
        includeRemovedFromBDSP: !state.includeRemovedFromBDSP,
      };
    default:
      throw new Error();
  }
}