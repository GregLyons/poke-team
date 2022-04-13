import { DoublesTier, isDoublesTier, isSinglesTier, SinglesTier } from "../../utils/smogonLogic";
import { VGCClass } from "../../utils/vgcLogic";

export type TierFilter = {
  format: 'singles' | 'doubles' | 'vgc'
  // wasDoubles: boolean
  singlesTiers: {
    [tierName in SinglesTier]: boolean
  }
  doublesTiers: {
    [tierName in DoublesTier]: boolean
  }
  vgcClasses: {
    [className in VGCClass]: boolean
  }
}

export const DEFAULT_TIER_FILTER: TierFilter = {
  format: 'singles',
  // wasDoubles: false,
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
  vgcClasses: {
    Mythical: true,
    Restricted: true,
    Other: true,
  }
};

export type TierFilterAction =
| {
    type: 'toggle_tier',
    payload: SinglesTier | DoublesTier | VGCClass
  }
| {
    type: 'set_format',
    payload: 'singles' | 'doubles' | 'vgc'
  }
// | {
//     type: 'remember_doubles',
//   }
// | {
//     type: 'recall_doubles',
//   }

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
      else if (isDoublesTier(action.payload)) {
        return {
          ...state,
          doublesTiers: {
            ...state.doublesTiers,
            [action.payload]: !state.doublesTiers[action.payload],
          }
        };
      }
      else {
        return {
          ...state,
          vgcClasses: {
            ...state.vgcClasses,
            [action.payload]: !state.vgcClasses[action.payload],
          }
        }
      }

    case 'set_format':
      return {
        ...state,
        format: action.payload,
      };
      
    // case 'remember_doubles': 
    //   return {
    //     ...state,
    //     format: 'singles',
    //     wasDoubles: state.format === 'doubles',
    //   };

    // case 'recall_doubles':
    //   return {
    //     ...state,
    //     format: state.wasDoubles
    //       ? 'doubles'
    //       : state.format,
    //   };
    
    default:
      throw new Error();
  }
}