import { gql } from "@apollo/client";
import { CausesStatusEdge, ControlFieldStateEdge, EffectClass, EffectClassEdge, FieldStateClass, FieldStateTargetClass, GenerationNum, ModifiesStatEdge, MoveCategory, ResistsStatusEdge, StatusControlFieldStateEdge, STATUSES, StatusName, TypeName, TYPENAMES } from "../helpers";
import { CoverageDatum, incrementCoverageDatum, INITIAL_COVERAGEDATUM } from "./helpers";

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

// Speed control
// #region

export const computeSpeedControl: (results: CoverageResult[]) => CoverageDatum = results => {
  let coverageDatum = { total: 0, psIDs: [] as string[], };

  for (let result of results) {
    let isSpeedControl = false;
    const { psID } = result;

    // Check effects
    for (let effectEdge of result.effects.edges) {
      const { class: effectClass } = effectEdge.node;
      if (effectClass === 'SPEED') isSpeedControl = true;
    }

    // Check stat modifications
    for (let statModEdge of result.modifiesStat.edges) {
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
    for (let causesStatusEdge of result.causesStatus.edges) {
      const { chance } = causesStatusEdge;
      const { name } = causesStatusEdge.node;

      if (chance >= 0.5 && name === 'paralysis') isSpeedControl = true;
    }

    // Check if priority and damaging (i.e. physical/special)
    if (result?.priority !== undefined && result?.category !== undefined && result.priority > 0 && ['PHYSICAL', 'SPECIAL'].includes(result.category)) isSpeedControl = true;

    if (isSpeedControl) coverageDatum = incrementCoverageDatum(coverageDatum, psID);
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
export const computeStatusControl: (results: CoverageResult[]) => Map<StatusName, StatusControlSummary> = results => {
  // Initialize Map
  const statusControlMap = new Map<StatusName, StatusControlSummary>();
  for (let statusName of STATUSES) {
    statusControlMap.set(statusName, {
      cause: INITIAL_COVERAGEDATUM,
      resistance: INITIAL_COVERAGEDATUM, 
    });
  }

  // Iterate over results
  for (let result of results) {
    const { psID } = result;
    // Iterate caused statuses, aside from field states
    for (let causesStatusEdge of result.causesStatus.edges) {
      const { chance } = causesStatusEdge;
      const { name } = causesStatusEdge.node;

      const statusName: StatusName = name as StatusName;

      // Type guard
      if (!STATUSES.includes(statusName) || !statusName) continue;
      // Reliability check
      if (chance < 0.3) continue;

      let curr = statusControlMap.get(statusName);
      if (curr !== undefined) curr.cause = incrementCoverageDatum(curr.cause, psID);
    }
    // Iterate resisted statuses, aside from field states
    for (let resistsStatusEdge of result.resistsStatus.edges) {
      const { name } = resistsStatusEdge.node;

      const statusName: StatusName = name as StatusName;

      // Type guard
      if (!STATUSES.includes(statusName) || !statusName) continue;

      let curr = statusControlMap.get(statusName);
      if (curr !== undefined) curr.resistance = incrementCoverageDatum(curr.resistance, psID);
    }

    // Check whether the ability/move creates a field state, and if so whether that field state causes/resists a status
    if (result?.createsFieldState === undefined ) continue;
    for (let createsFieldStateEdge of result.createsFieldState.edges) {
      for (let causesStatusEdge of createsFieldStateEdge.node.causesStatus.edges) {
        const { chance } = causesStatusEdge;
        const { name } = causesStatusEdge.node;
  
        const statusName: StatusName = name as StatusName;
  
        // Type guard
        if (!STATUSES.includes(statusName) || !statusName) continue;
        // Reliability check
        if (chance < 0.3) continue;
  
        let curr = statusControlMap.get(statusName);
        if (curr !== undefined) curr.cause = incrementCoverageDatum(curr.cause, psID);
      }
      for (let resistsStatusEdge of createsFieldStateEdge.node.resistsStatus.edges) {
        const { name } = resistsStatusEdge.node;
  
        const statusName: StatusName = name as StatusName;
  
        // Type guard
        if (!STATUSES.includes(statusName) || !statusName) continue;
  
        let curr = statusControlMap.get(statusName);
        if (curr !== undefined) curr.resistance = incrementCoverageDatum(curr.resistance, psID);
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

export const computeTypeCoverage: (results: MoveCoverageResult[]) => Map<TypeName, TypeCoverageSummary> = results => {
  // Initialize Map
  const typeCoverageMap = new Map<TypeName, TypeCoverageSummary>();
  for (let typeName of TYPENAMES) {
    typeCoverageMap.set(typeName, {
      noEffect: INITIAL_COVERAGEDATUM,
      notVeryEffective: INITIAL_COVERAGEDATUM,
      neutral: INITIAL_COVERAGEDATUM,
      superEffective: INITIAL_COVERAGEDATUM,
    });
  }

  // Iterate over moves
  loop1:
    for (let result of results) {
      const { psID } = result;

      // Check whether move is in one of the exceptions that we wish to exclude; if so, continue onto next move
      loop2:
        for (let moveEffectEdge of result.effects.edges) {
          if (effectTypeExceptions.includes(moveEffectEdge.node.name)) continue loop1;
        }

      // Iterate over MoveTypeEdges; should only be one
      for (let moveTypeEdge of result.type.edges) {
        for (let matchupEdge of moveTypeEdge.node.offensiveMatchups.edges) {
          const typeName = matchupEdge.node.name;
          const { multiplier } = matchupEdge;

          let curr = typeCoverageMap.get(typeName)
          if (curr !== undefined) {
            if (multiplier === 0) curr.noEffect = incrementCoverageDatum(curr.noEffect, psID);
            else if (multiplier < 1) curr.notVeryEffective = incrementCoverageDatum(curr.notVeryEffective, psID);
            else if (multiplier > 1) curr.neutral = incrementCoverageDatum(curr.neutral, psID);
            else curr.superEffective = incrementCoverageDatum(curr.superEffective, psID);
          }
        }
      }
    }
  
  return typeCoverageMap;
}

// #endregion

// Weather, terrain, and entry hazard control
// #region

export const computeFieldStateControl: (results: CoverageResult[]) => Map<FieldStateClass, CoverageDatum> = results => {
  // Initialize Map
  const RELEVANT_CLASSES: FieldStateClass[] = ['WEATHER', 'ENTRY_HAZARD', 'TERRAIN'];
  const fieldStateControlMap = new Map<FieldStateClass, CoverageDatum>();
  for (let className of RELEVANT_CLASSES) {
    fieldStateControlMap.set(className, INITIAL_COVERAGEDATUM);
  }

  // Iterate over results
  for (let result of results) {
    const { psID } = result;

    // Ignoring field states
    if (result.ignoresFieldState) {
      // Iterate over edges
      for (let fieldStateEdge of result.ignoresFieldState.edges) {
        const { class: className } = fieldStateEdge.node;

        let curr = fieldStateControlMap.get(className);
        if (curr !== undefined) curr = incrementCoverageDatum(curr, psID);
      }
    }
    // Preventing field states
    if (result.preventsFieldState) {
      // Iterate over edges
      for (let fieldStateEdge of result.preventsFieldState.edges) {
        const { class: className } = fieldStateEdge.node;

        let curr = fieldStateControlMap.get(className);
        if (curr !== undefined) curr = incrementCoverageDatum(curr, psID);
      }
    }
    // Removing field states
    if (result.removesFieldState) {
      // Iterate over edges
      for (let fieldStateEdge of result.removesFieldState.edges) {
        const { class: className } = fieldStateEdge.node;

        let curr = fieldStateControlMap.get(className);
        if (curr !== undefined) curr = incrementCoverageDatum(curr, psID);
      }
    }
    // Resisting field states
    if (result.resistsFieldState) {
      // Iterate over edges
      for (let fieldStateEdge of result.resistsFieldState.edges) {
        const { class: className } = fieldStateEdge.node;

        let curr = fieldStateControlMap.get(className);
        if (curr !== undefined) curr = incrementCoverageDatum(curr, psID);
      }
    }
    // Suppressing field states
    if (result.suppressesFieldState) {
      // Iterate over edges
      for (let fieldStateEdge of result.suppressesFieldState.edges) {
        const { class: className } = fieldStateEdge.node;

        let curr = fieldStateControlMap.get(className);
        if (curr !== undefined) curr = incrementCoverageDatum(curr, psID);
      }
    }
  }
  
  return fieldStateControlMap;
}

// #endregion

// #endregion
