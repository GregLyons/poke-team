import { DoublesTier, DOUBLES_TIERS, SinglesTier, SINGLES_TIERS } from "../../utils/smogonLogic";

export type TierFilter = {
  format: 'singles' | 'doubles'
  selectionMode: 'exact' | 'range'
  tiers: {
    [tierName in SinglesTier | DoublesTier]: boolean
  }
}

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