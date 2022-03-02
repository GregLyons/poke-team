import { gql } from "@apollo/client";
import { isType } from "graphql";
import { binarySearchValueByKey, compareNumbers, compareStrings } from "../../utils/helpers";
import { CausesStatusEdge, ControlFieldStateEdge, EffectClass, EffectClassEdge, FieldStateClass, FieldStateTargetClass, GenerationNum, ModifiesStatEdge, MoveCategory, ResistsStatusEdge, StatusControlFieldStateEdge, STATUSES, StatusName, TypeName, TYPENAMES } from "../helpers";
import { CoverageDatum, incrementCoverageDatum, INITIAL_COVERAGEDATUM, MemberAndEntityPSIDs } from "./helpers";

// Queries
// #region

export interface CoverageSearchVars {
  gen: GenerationNum
  psIDs: string[]
}

export interface CoverageResult {
  psID: string

  priority?: number
  category?: MoveCategory
  
  effects: {
    edges: EffectClassEdge[]
  }

  modifiesStat: {
    edges: ModifiesStatEdge[]
  }

  causesStatus: {
    edges: CausesStatusEdge[]
  }
  resistsStatus: {
    edges: ResistsStatusEdge[]
  }

  createsFieldState?: {
    edges: StatusControlFieldStateEdge[]
  }
  ignoresFieldState?: {
    edges: ControlFieldStateEdge[]
  }
  preventsFieldState?: {
    edges: ControlFieldStateEdge[]
  }
  removesFieldState?: {
    edges: ControlFieldStateEdge[]
  }
  resistsFieldState?: {
    edges: ControlFieldStateEdge[]
  }
  suppressesFieldState?: {
    edges: ControlFieldStateEdge[]
  }
}

// Ability coverage results
// #region

export interface AbilityCoverageQuery {
  abilitiesByPSID: AbilityCoverageResult[]
}

export interface AbilityCoverageResult extends CoverageResult {
  psID: string

  effects: {
    edges: EffectClassEdge[]
  }

  modifiesStat: {
    edges: ModifiesStatEdge[]
  }

  // Status control
  causesStatus: {
    edges: CausesStatusEdge[]
  }
  resistsStatus: {
    edges: ResistsStatusEdge[]
  }
  createsFieldState: {
    edges: StatusControlFieldStateEdge[]
  }

  // Field state control
  ignoresFieldState: {
    edges: ControlFieldStateEdge[]
  }
  preventsFieldState: {
    edges: ControlFieldStateEdge[]
  }
  removesFieldState: {
    edges: ControlFieldStateEdge[]
  }
  resistsFieldState: {
    edges: ControlFieldStateEdge[]
  }
  suppressesFieldState: {
    edges: ControlFieldStateEdge[]
  }
}

export const ABILITY_COVERAGE_QUERY = gql`
  query AbilityCoverageQuery($gen: Int!, $psIDs: [String!]!) {
    abilitiesByPSID(generation: $gen, psIDs: $psIDs) {
      id
      psID

      effects {
        id
        edges {
          node {
            id
            name
          }
        }
      }

      # Stat modifications
      modifiesStat {
        id
        edges {
          node {
            id
            name
          }
          multiplier
          stage
          chance
          recipient
        }
      }

      # Statuses
      causesStatus {
        id
        edges {
          node {
            id
            name
          }
          chance
        }
      }
      resistsStatus {
        id
        edges {
          node {
            id
            name
          }
        }
      }
      createsFieldState {
        id
        edges {
          node {
            name
            class

            causesStatus {
              id
              edges {
                node {
                  id
                  name
                }
                chance
              }
            }
            resistsStatus {
              id
              edges {
                node {
                  id
                  name
                }
              }
            }
          }
        }
      }

      # Field state control
      ignoresFieldState {
        id
        edges {
          node {
            id
            name
            class
          }
        }
      }
      removesFieldState {
        id
        edges {
          node {
            id
            name
            class
          }
        }
      }
      preventsFieldState {
        id
        edges {
          node {
            id
            name
            class
          }
        }
      }
      suppressesFieldState {
        id
        edges {
          node {
            id
            name
            class
          }
        }
      }
    }
  }
`;

// #endregion

// Item coverage results
// #region

export interface ItemCoverageQuery {
  itemsByPSID: ItemCoverageResult[]
}

export interface ItemCoverageResult extends CoverageResult {
  psID: string

  effects: {
    edges: {
      node: {
        name: string
        class: EffectClass
      }
    }[]
  }

  modifiesStat: {
    edges: ModifiesStatEdge[]
  }

  // Statuses
  causesStatus: {
    edges: CausesStatusEdge[]
  }
  resistsStatus: {
    edges: ResistsStatusEdge[]
  }
}

export const ITEM_COVERAGE_QUERY = gql`
  query ItemCoverageQuery($gen: Int!, $psIDs: [String!]!) {
    itemsByPSID(generation: $gen, psIDs: $psIDs) {
      id
      psID

      # Effects
      effects {
        id
        edges {
          node {
            id
            name
          }
        }
      }

      # Stat modifications
      modifiesStat {
        id
        edges {
          node {
            id
            name
          }
          multiplier
          stage
          chance
          recipient
        }
      }

      # Statuses
      causesStatus {
        id
        edges {
          node {
            id
            name
          }
          chance
        }
      }
      resistsStatus {
        id
        edges {
          node {
            id
            name
          }
        }
      }

      # Field state control
      ignoresFieldState {
        id
        edges {
          node {
            id
            name
            class
          }
        }
      }
      resistsFieldState {
        id
        edges {
          node {
            id
            name
            class
          }
        }
      }
    }
  }
`;

// #endregion

// Move coverage results
// #region

export interface OffensiveMatchupEdge {
  node: {
    name: TypeName
  }
  multiplier: number
}

export interface MoveCoverageQuery {
  movesByPSID: MoveCoverageResult[]
}

export interface MoveCoverageResult extends CoverageResult {
  psID: string

  category: MoveCategory

  contact: boolean
  priority: number

  // Type coverage
  type: {
    edges: {
      node: {
        name: TypeName
        offensiveMatchups: {
          edges: OffensiveMatchupEdge[]
        }
      }
    }[]
  }

  // Effects
  effects: {
    edges: {
      node: {
        name: string
        class: EffectClass
      }
    }[]
  }

  modifiesStat: {
    edges: ModifiesStatEdge[]
  }

  // Statuses
  causesStatus: {
    edges: CausesStatusEdge[]
  }
  resistsStatus: {
    edges: ResistsStatusEdge[]
  }
  createsFieldState: {
    edges: StatusControlFieldStateEdge[]
  }

  // Field state control
  removesFieldState: {
    edges: ControlFieldStateEdge[]
  }
}

export const MOVE_COVERAGE_QUERY = gql`
  query MoveCoverageQuery($gen: Int!, $psIDs: [String!]!) {
    movesByPSID(generation: $gen, psIDs: $psIDs) {
      id
      psID

      category
      priority

      # Type coverage
      type {
        id
        edges {
          node {
            id
            name
            offensiveMatchups {
              id
              edges {
                node {
                  id
                  name
                }
                multiplier
              }
            }
          }
        }
      }

      # Effects
      effects {
        id
        edges {
          node {
            id
            name
            class
          }
        }
      }

      # Stat modifications
      modifiesStat {
        id
        edges {
          node {
            id
            name
          }
          multiplier
          stage
          chance
          recipient
        }
      }

      # Statuses
      causesStatus {
        id
        edges {
          node {
            id
            name
          }
          chance
        }
      }
      resistsStatus {
        id
        edges {
          node {
            id
            name
          }
        }
      }
      createsFieldState {
        id
        edges {
          node {
            name
            class

            causesStatus {
              id
              edges {
                node {
                  id
                  name
                }
                chance
              }
            }
            resistsStatus {
              id
              edges {
                node {
                  id
                  name
                }
              }
            }
          }
        }
      }

      # Field state control
      removesFieldState {
        id
        edges {
          node {
            id
            name
            class
          }
        }
      }
    }
  }
`;

// #endregion

// #endregion

// Coverage calculators
// #region

// Returns CoverageDatum with total 0, and a key for each member in memberPSIDs
const getInitialCoverageDatumFromMembers: (members: MemberAndEntityPSIDs) => CoverageDatum = members => {
  let coverageDatum: CoverageDatum = { total: 0, memberPSIDs: {}, };
  for (let member of members) {
    const { psID: memberPSID } = member;
    coverageDatum.memberPSIDs[memberPSID] = [];
  }
  return coverageDatum;
};

type CoverageResults = {
  fromAbilities: CoverageResult[]
  fromItems: CoverageResult[]
  fromMoves: CoverageResult[]
};

// Convert CoverageResults type to CoverageResult[]. This allows us to use getMemberToResultsMap regardless of whether we get all the ability, item, and move data
const flattenCoverageResults: (results: CoverageResults) => CoverageResult[] = results => {
  return results.fromAbilities.concat(results.fromItems).concat(results.fromMoves);
}

// For sorting arrays of coverage results by psID
const coverageResultsSortHelper = (result1: CoverageResult, result2: CoverageResult) => compareStrings(result1.psID, result2.psID);

// Returns a map which sends a member's PSID to the CoverageResults corresponding to that member's ability, item, and moves
const getMemberToResultsMap: (members: MemberAndEntityPSIDs, results: CoverageResult[]) => Map<string, CoverageResult[]> = (members, results) => {
  let memberToResultsMap = new Map<string, CoverageResult[]>();

  // Sort results for faster lookup
  results.sort(coverageResultsSortHelper);

  // Iterate over members to fill out memberToResultsMap
  for (let member of members) {
    const { psID: memberPSID } = member;

    // Fill out memberResults
    const memberResults: CoverageResult[] = [];
    if (member.abilityPSID) {
      const index = binarySearchValueByKey(results, 'psID', member.abilityPSID, compareStrings);

      if (index !== -1) memberResults.push(results[index]);
    }
    if (member.itemPSID) {
      const index = binarySearchValueByKey(results, 'psID', member.itemPSID, compareStrings);

      if (index !== -1) memberResults.push(results[index]);
    }
    if (member.movePSIDs) {
      for (let movePSID of member.movePSIDs) {
        const index = binarySearchValueByKey(results, 'psID', movePSID, compareStrings);
  
        if (index !== -1) memberResults.push(results[index]);
      }
    }

    memberToResultsMap.set(memberPSID, memberResults);
  }

  return memberToResultsMap;
}

// Speed control
// #region

export const computeSpeedControl: (
  members: MemberAndEntityPSIDs,
  results: CoverageResults,
) => CoverageDatum = (members, results) => {
  let coverageDatum = getInitialCoverageDatumFromMembers(members);

  const memberToResultsMap = getMemberToResultsMap(members, flattenCoverageResults(results));

  // Iterate over members
  for (let member of members) {
    const { psID: memberPSID } = member;
    const memberResults = memberToResultsMap.get(memberPSID);

    // Type-guard
    if (!memberResults) continue;

    // Iterate over memberResults
    for (let memberResult of memberResults) {
      let isSpeedControl = false;
      const { psID: entityPSID } = memberResult;
  
      // Check effects
      for (let effectEdge of memberResult.effects.edges) {
        const { class: effectClass } = effectEdge.node;
        if (effectClass === 'SPEED') isSpeedControl = true;
      }
  
      // Check stat modifications
      for (let statModEdge of memberResult.modifiesStat.edges) {
        const { multiplier, stage, chance, recipient } = statModEdge;
        // Positively affects speed
        const positiveModification = stage > 0 || multiplier > 1;
        // Negative affects speed
        const negativeModification = stage < 0 || multiplier < 1;
        // Reasonable chance to modify speed
        const reliable = chance >= 0.5;
        // Can target user and/or allies
        const allies = ['ALL_ALLIES', 'USER', 'TARGET', 'ALL'].includes(recipient);
        // Can target enemies
        const enemies = ['ALL_FOES', 'TARGET', 'ALL'].includes(recipient);
  
        const { name } = statModEdge.node;
  
        // Only interested in speed modifications
        if (name !== 'speed') continue;
        /* We consider the result to be speed control if
            It modifies user's and/or ally's speed positively, or it modifies target and/or foe's speed negatively
            It does so reliably
        */
        if (
          (
            (positiveModification && allies) || (negativeModification && enemies)
          )
          && reliable
        ) isSpeedControl = true;
      }
  
      // Check whether reliably causes paralysis
      for (let causesStatusEdge of memberResult.causesStatus.edges) {
        const { chance } = causesStatusEdge;
        const { name } = causesStatusEdge.node;
  
        if (chance >= 0.5 && name === 'paralysis') isSpeedControl = true;
      }
  
      // Check if priority and damaging (i.e. physical/special)
      if (memberResult?.priority !== undefined && memberResult?.category !== undefined && memberResult.priority > 0 && ['PHYSICAL', 'SPECIAL'].includes(memberResult.category)) isSpeedControl = true;
      
      // If entity is speed control, add it to coverageDatum
      if (isSpeedControl) coverageDatum = incrementCoverageDatum(coverageDatum, memberPSID, [entityPSID]);
    }
  }

  return coverageDatum;
}

// #endregion

// Status control
// #region

export type StatusControlSummary = {
  cause: CoverageDatum
  resistance: CoverageDatum
}

export const computeStatusControl: 
( 
  members: MemberAndEntityPSIDs,
  results: CoverageResults,
  gen: GenerationNum,
) => Map<StatusName, StatusControlSummary> = (members, results, gen) => {
  // Initialize Map
  const statusControlMap = new Map<StatusName, StatusControlSummary>();
  for (let [statusName, statusGen] of STATUSES) {
    // Only track statuses in given gen
    if (statusGen <= gen) {
      statusControlMap.set(statusName, {
        cause: INITIAL_COVERAGEDATUM,
        resistance: INITIAL_COVERAGEDATUM, 
      });
    }
  }

  const memberToResultsMap = getMemberToResultsMap(members, flattenCoverageResults(results));

  // Iterate over members
  for (let member of members) {
    const { psID: memberPSID } = member;
    const memberResults = memberToResultsMap.get(memberPSID);

    // Type-guard
    if (!memberResults) continue;
    // Iterate over results
    for (let memberResult of memberResults) {
      const { psID: entityPSID } = memberResult;
      // Iterate caused statuses, aside from field states
      for (let causesStatusEdge of memberResult.causesStatus.edges) {
        const { chance } = causesStatusEdge;
        const { name } = causesStatusEdge.node;

        const statusName: StatusName = name as StatusName;

        // Type guard
        if (!STATUSES.map(d => d[0]).includes(statusName) || !statusName) continue;
        // Reliability check
        if (chance < 0.3) continue;

        let curr = statusControlMap.get(statusName);
        if (curr !== undefined) curr.cause = incrementCoverageDatum(curr.cause, memberPSID, [entityPSID]);
      }
      // Iterate resisted statuses, aside from field states
      for (let resistsStatusEdge of memberResult.resistsStatus.edges) {
        const { name } = resistsStatusEdge.node;

        const statusName: StatusName = name as StatusName;

        // Type guard
        if (!STATUSES.map(d => d[0]).includes(statusName) || !statusName) continue;

        let curr = statusControlMap.get(statusName);
        if (curr !== undefined) curr.resistance = incrementCoverageDatum(curr.resistance, memberPSID, [entityPSID]);
      }

      // Check whether the ability/move creates a field state, and if so whether that field state causes/resists a status
      if (memberResult?.createsFieldState === undefined ) continue;
      for (let createsFieldStateEdge of memberResult.createsFieldState.edges) {
        for (let causesStatusEdge of createsFieldStateEdge.node.causesStatus.edges) {
          const { chance } = causesStatusEdge;
          const { name } = causesStatusEdge.node;
    
          const statusName: StatusName = name as StatusName;
    
          // Type guard
          if (!STATUSES.map(d => d[0]).includes(statusName) || !statusName) continue;
          // Reliability check
          if (chance < 0.3) continue;
    
          let curr = statusControlMap.get(statusName);
          if (curr !== undefined) curr.cause = incrementCoverageDatum(curr.cause, memberPSID, [entityPSID]);
        }
        for (let resistsStatusEdge of createsFieldStateEdge.node.resistsStatus.edges) {
          const { name } = resistsStatusEdge.node;
    
          const statusName: StatusName = name as StatusName;
    
          // Type guard
          if (!STATUSES.map(d => d[0]).includes(statusName) || !statusName) continue;
    
          let curr = statusControlMap.get(statusName);
          if (curr !== undefined) curr.resistance = incrementCoverageDatum(curr.resistance, memberPSID, [entityPSID]);
        }
      }
    }
  }

  return statusControlMap;
}

// #endregion

// Type coverage
// #region

const effectTypeExceptions: string[] = [
  'special_type_effectiveness',
  'type_varies',
  'deals_direct_damage',
  'ohko',
  'no_effect',
  'calls_other_move',
];

export type TypeCoverageSummary = {
  noEffect: CoverageDatum
  notVeryEffective: CoverageDatum
  neutral: CoverageDatum
  superEffective: CoverageDatum
}

// Spread operator needed, otherwise each entry will refer to the same object
export const INITIAL_TYPECOVERAGE_SUMMARY: TypeCoverageSummary = {
  noEffect: { ...INITIAL_COVERAGEDATUM, },
  notVeryEffective: { ...INITIAL_COVERAGEDATUM, },
  neutral: { ...INITIAL_COVERAGEDATUM, },
  superEffective: { ...INITIAL_COVERAGEDATUM, },
}

export const isTypeDamagingMove: (result: MoveCoverageResult) => boolean = result => {
  if (result.category === 'STATUS') return false;
  for (let moveEffectEdge of result.effects.edges) {
    if (effectTypeExceptions.includes(moveEffectEdge.node.name)) return false;
  }
  return true;
}

export const countDamagingMoves: (results: MoveCoverageResult[]) => number = results => {
  let count = 0;
  loop1:
    for (let result of results) {
      // Ignore status moves
      if (result.category === 'STATUS') continue;
      
      // Ignore moves which have certain effects
      loop2:
        for (let moveEffectEdge of result.effects.edges) {
          if (effectTypeExceptions.includes(moveEffectEdge.node.name)) continue loop1;

        }
      
      count++;
  }
  return count;
}

const TYPECOVERAGE_SUMMARY_KEYS: (keyof TypeCoverageSummary)[] = ['noEffect', 'notVeryEffective', 'neutral', 'superEffective'];

const compareMoveRank = (key1: keyof TypeCoverageSummary, key2: keyof TypeCoverageSummary) => {
  const idx1 = TYPECOVERAGE_SUMMARY_KEYS.indexOf(key1);
  const idx2 = TYPECOVERAGE_SUMMARY_KEYS.indexOf(key2);

  return compareNumbers(idx1, idx2);
}

export const computeMemberTypeCoverage: (
  members: MemberAndEntityPSIDs,
  moveResults: CoverageResult[],
  gen: GenerationNum
) => Map<TypeName, TypeCoverageSummary> = (members, moveResults, gen) => {
  // Initialize Map
  const typeCoverageMap = new Map<TypeName, TypeCoverageSummary>();
  for (let [typeName, typeGen] of TYPENAMES) {
    // Only track types in given gen
    if (typeGen <= gen) {
      // Spread operator needed, otherwise each entry will refer to the same object
      typeCoverageMap.set(typeName, { ...INITIAL_TYPECOVERAGE_SUMMARY, });
    }
  }

  const memberToResultsMap = getMemberToResultsMap(members, moveResults);

  // Iterate over members
  for (let member of members) {
    const { psID: memberPSID } = member;

    // Map holding maximum effectiveness of member's moves against each type
    let memberRankMap = new Map<TypeName, { movePSID: string, rank: keyof TypeCoverageSummary}>();
    // Initialize memberRankMap
    for (let [typeName, typeGen] of TYPENAMES) {
      // Only track types in given gen
      if (typeGen <= gen) {
        memberRankMap.set(typeName, { movePSID: '', rank: 'noEffect', });
      }
    }

    // If the member has no type-damaging moves, then rank is irrelevant
    let validMoveFound = false;

    // We should only be passing in MoveCoverageResults. This allows us to bypass undefined-checking for, e.g. category
    const memberResults = ((memberToResultsMap.get(memberPSID) as unknown) as MoveCoverageResult[]);

    // Type-guard
    if (!memberResults) continue;


    // Iterate over member's moves to fill out memberRankMap
    for (let memberResult of memberResults) {
      const { psID: movePSID } = memberResult;

      // Ignore moves which aren't type-damaging
      if (!isTypeDamagingMove(memberResult)) continue;
      
      // Type-damaging move found, so rank is relevant
      validMoveFound = true;

      // Should only be one type edge for the move
      for (let moveTypeEdge of memberResult.type.edges) {
        // Iterate over matchup edges for the move's type
        for (let matchupEdge of moveTypeEdge.node.offensiveMatchups.edges) {
          const typeName = matchupEdge.node.name;
          const { multiplier } = matchupEdge;
          
          let moveRank: keyof TypeCoverageSummary;
          if (multiplier === 0) moveRank = 'noEffect';
          else if (multiplier < 1) moveRank = 'notVeryEffective';
          else if (multiplier === 1) moveRank = 'neutral';
          else moveRank = 'superEffective';

          // Type guard
          const currentMemberRank = memberRankMap.get(typeName);
          if (!currentMemberRank) continue;
          // If moveRank is greater than currentMemberRank, set new memberRank for typeName to the current move
          if (compareMoveRank(moveRank, currentMemberRank.rank) > 0) memberRankMap.set(typeName, { movePSID, rank: moveRank, });
        }
      }
    }

    // If no type-damaging move was found, move onto next member
    if (!validMoveFound) continue;

    // Otherwise, update typeCoverageMap
    for (let [typeName, memberRank] of Array.from(memberRankMap.entries())) {
      let curr = typeCoverageMap.get(typeName);
      
      // Type-guard
      if (curr === undefined) continue;

      curr[memberRank.rank] = incrementCoverageDatum(curr[memberRank.rank], memberPSID, [memberRank.movePSID]);
    }
  }

  return typeCoverageMap;
};

// Counts type coverage for individual moves
export const computeTypeCoverage: (
  members: MemberAndEntityPSIDs,
  moveResults: MoveCoverageResult[],
  gen: GenerationNum
) => Map<TypeName, TypeCoverageSummary> = (members, moveResults, gen) => {
  // Initialize Map
  const typeCoverageMap = new Map<TypeName, TypeCoverageSummary>();
  for (let [typeName, typeGen] of TYPENAMES) {
    // Only track types in given gen
    if (typeGen <= gen) {
      // Spread operator needed, otherwise each entry will refer to the same object
      typeCoverageMap.set(typeName, { ...INITIAL_TYPECOVERAGE_SUMMARY, });
    }
  }
  
  const memberToResultsMap = getMemberToResultsMap(members, moveResults);

  // Iterate over members
  for (let member of members) {
    const { psID: memberPSID } = member;

    // We should only be passing in MoveCoverageResults. This allows us to bypass undefined-checking for, e.g. category
    const memberResults = ((memberToResultsMap.get(memberPSID) as unknown) as MoveCoverageResult[]);

    // Type-guard
    if (!memberResults) continue;

    // Iterate over memberResults
    loop1:
    for (let moveResult of memberResults) {
      const { psID: movePSID } = moveResult;

      // Ignore status moves
      if (moveResult.category === 'STATUS') continue;

      // Check whether move is in one of the exceptions that we wish to exclude; if so, continue onto next move
      loop2:
        for (let moveEffectEdge of moveResult.effects.edges) {
          if (effectTypeExceptions.includes(moveEffectEdge.node.name)) continue loop1;
        }

      // Iterate over MoveTypeEdges; should only be one
      for (let moveTypeEdge of moveResult.type.edges) {
        for (let matchupEdge of moveTypeEdge.node.offensiveMatchups.edges) {
          const typeName = matchupEdge.node.name;
          const { multiplier } = matchupEdge;

          let curr = typeCoverageMap.get(typeName)
          if (curr !== undefined) {
            if (multiplier === 0) curr.noEffect = incrementCoverageDatum(curr.noEffect, memberPSID, [movePSID]);
            else if (multiplier < 1) curr.notVeryEffective = incrementCoverageDatum(curr.notVeryEffective, memberPSID, [movePSID]);
            else if (multiplier === 1) curr.neutral = incrementCoverageDatum(curr.neutral, memberPSID, [movePSID]);
            else curr.superEffective = incrementCoverageDatum(curr.superEffective, memberPSID, [movePSID]);
          }
        }
      }
    }
  }
  
  return typeCoverageMap;
}

// #endregion

// Weather, terrain, and entry hazard control
// #region

export const computeFieldControl: (
  members: MemberAndEntityPSIDs,
  results: CoverageResults,
  gen: GenerationNum
) => Map<FieldStateClass, CoverageDatum> = (members, results, gen) => {
  // Initialize Map
  const RELEVANT_CLASSES: [FieldStateClass, GenerationNum][] = [
    ['WEATHER', 2],
    ['ENTRY_HAZARD', 2],
    ['TERRAIN', 6],
  ];
  const fieldStateControlMap = new Map<FieldStateClass, CoverageDatum>();
  for (let [className, classGen] of RELEVANT_CLASSES) {
    // Only track classes in given gen
    if (classGen <= gen) {
      fieldStateControlMap.set(className, INITIAL_COVERAGEDATUM);
    }
  }
  
  const memberToResultsMap = getMemberToResultsMap(members, flattenCoverageResults(results));

  for (let member of members) {
    const { psID: memberPSID } = member;

    const memberResults = memberToResultsMap.get(memberPSID);

    // Type-guard
    if (!memberResults) continue;

    // Iterate over results
    for (let memberResult of memberResults) {
      const { psID: entityPSID } = memberResult;

      // Ignoring field states
      if (memberResult.ignoresFieldState) {
        // Iterate over edges
        for (let fieldStateEdge of memberResult.ignoresFieldState.edges) {
          const { class: className } = fieldStateEdge.node;

          let curr = fieldStateControlMap.get(className);
          if (curr !== undefined) curr = incrementCoverageDatum(curr, memberPSID, [entityPSID]);
        }
      }
      // Preventing field states
      if (memberResult.preventsFieldState) {
        // Iterate over edges
        for (let fieldStateEdge of memberResult.preventsFieldState.edges) {
          const { class: className } = fieldStateEdge.node;

          let curr = fieldStateControlMap.get(className);
          if (curr !== undefined) curr = incrementCoverageDatum(curr, memberPSID, [entityPSID]);
        }
      }
      // Removing field states
      if (memberResult.removesFieldState) {
        // Iterate over edges
        for (let fieldStateEdge of memberResult.removesFieldState.edges) {
          const { class: className } = fieldStateEdge.node;

          let curr = fieldStateControlMap.get(className);
          if (curr !== undefined) curr = incrementCoverageDatum(curr, memberPSID, [entityPSID]);
        }
      }
      // Resisting field states
      if (memberResult.resistsFieldState) {
        // Iterate over edges
        for (let fieldStateEdge of memberResult.resistsFieldState.edges) {
          const { class: className } = fieldStateEdge.node;

          let curr = fieldStateControlMap.get(className);
          if (curr !== undefined) curr = incrementCoverageDatum(curr, memberPSID, [entityPSID]);
        }
      }
      // Suppressing field states
      if (memberResult.suppressesFieldState) {
        // Iterate over edges
        for (let fieldStateEdge of memberResult.suppressesFieldState.edges) {
          const { class: className } = fieldStateEdge.node;

          let curr = fieldStateControlMap.get(className);
          if (curr !== undefined) curr = incrementCoverageDatum(curr, memberPSID, [entityPSID]);
        }
      }
    }
  }
  
  return fieldStateControlMap;
}

// #endregion

// #endregion
