import { GenNum } from "../entities";
import { TypeName } from "../helpers";

// Keys are psIDs of MemberPokemon, values are subsets of psIDs of the MemberPokemon's Ability, Item, Moves, and Types (call them 'entityPSIDs')
export type MemberPSIDObject = {
  [key: string]: string[]
}

/*
  'total' is a context-dependent number. The 'entityPSIDs' included in the MemberPSIDObject are psIDs of entities contributing to the total.

  For example, if the CoverageDatum is for speed control, then the entityPSIDs will be those corresponding to Abilities, Items, and Moves (Types don't contribute to speed control) possessed by the team's Members which count as speed control (e.g. Thunder Wave, Icy Wind, etc.)
*/
export type CoverageDatum = {
  total: number
  memberPSIDs: MemberPSIDObject
}

/*
  Used when we encounter Abilities, Items, Moves, or Types which should increase the total on 'coverageDatum'. In this case, we should:
    Increment 'total' by 1,
    Append the psIDs of the relevant entities, 'entityPSIDs', to the array stored in 'memberPSIDs[memberPSID]'.
*/
export const incrementCoverageDatum = (coverageDatum: CoverageDatum, memberPSID: string, entityPSIDs: string[]) => {
  return {
    total: coverageDatum.total + 1,
    memberPSIDs: {
      ...coverageDatum.memberPSIDs,
      [memberPSID]: (coverageDatum.memberPSIDs[memberPSID] || []).concat(entityPSIDs),
    },
  };
}

export const INITIAL_COVERAGEDATUM: CoverageDatum = {
  total: 0,
  memberPSIDs: {},
};

// Stores the member's psID, as well as the psIDs of the member's Ability, Item, Moves, and typing
export type MemberAndEntityPSIDs = {
  psID: string
  typing?: TypeName[]
  abilityPSID?: string
  itemPSID?: string
  movePSIDs?: string[]
}[];

// Types and interfaces
// #region

// Popup
// #region

export interface PopupVars {
  gen: GenNum

  contains: string
  startsWith: string
  limit: number
}

// #endregion

// #endregion