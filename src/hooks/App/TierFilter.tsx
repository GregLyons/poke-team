import { DoublesTier, isSinglesTier, SinglesTier } from "../../utils/smogonLogic";

export type TierFilter = {
  format: 'singles' | 'doubles'
  wasDoubles: boolean
  singlesTiers: {
    [tierName in SinglesTier]: boolean
  }
  doublesTiers: {
    [tierName in DoublesTier]: boolean
  }
}

export const DEFAULT_TIER_FILTER: TierFilter = {
  format: 'singles',
  wasDoubles: false,
  singlesTiers: {
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
    None: true,
  },
  doublesTiers: {
    DUber: true,
    DOU: true,
    DBL: true,
    DUU: true,
    DNFE: true,
    DLC: true,
    DNone: true,
  },
};

export type TierFilterAction =
| {
    type: 'toggle_tier',
    payload: SinglesTier | DoublesTier
  }
| {
    type: 'set_format',
    payload: 'singles' | 'doubles',
  }
| {
    type: 'remember_doubles',
  }
| {
    type: 'recall_doubles',
  }

export function tierReducer(state: TierFilter, action: TierFilterAction): TierFilter {
  switch(action.type) {
    case 'toggle_tier':
      if (isSinglesTier(action.payload)) {
        return {
          ...state,
          singlesTiers: {
            ...state.singlesTiers,
            [action.payload]: !state.singlesTiers[action.payload],
          }
        };
      }
      else {
        return {
          ...state,
          doublesTiers: {
            ...state.doublesTiers,
            [action.payload]: !state.doublesTiers[action.payload],
          }
        };
      }

    case 'set_format':
      return {
        ...state,
        format: action.payload,
      };
      
    case 'remember_doubles': 
      return {
        ...state,
        format: 'singles',
        wasDoubles: state.format === 'doubles',
      };

    case 'recall_doubles':
      return {
        ...state,
        format: state.wasDoubles
          ? 'doubles'
          : state.format,
      };
    
    default:
      throw new Error();
  }
}