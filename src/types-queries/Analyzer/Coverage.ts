import { gql } from "@apollo/client";
import { CausesStatusEdge, ControlFieldStateEdge, EffectClass, EffectClassEdge, FieldStateClass, FieldStateTargetClass, ModifiesStatEdge, MoveCategory, ResistsStatusEdge, StatusControlFieldStateEdge, STATUSES, StatusName, TypeName, TYPENAMES } from "../helpers";

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
  preventsFieldState?: {
    edges: ControlFieldStateEdge[]
  }
  removesFieldState?: {
    edges: ControlFieldStateEdge[]
  }
  suppressesFieldState?: {
    edges: ControlFieldStateEdge[]
  }
}

// Ability coverage
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

  // Weather and terrain control
  preventsFieldState: {
    edges: ControlFieldStateEdge[]
  }
  removesFieldState: {
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

      # Weather and terrain control
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

// Item coverage
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
    }
  }
`;

// #endregion

// Move coverage
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

  // Weather and terrain control
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

      # Weather and terrain control
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

// Speed control
// #region

export const computeSpeedControl: (results: CoverageResult[]) => {
  total: number
  psIDs: string[]
} = results => {
  let total = 0;
  let psIDs = [];

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

    if (isSpeedControl) {
      total += 1;
      psIDs.push(psID);
    }
  }

  return { total, psIDs, };
}

// #endregion

// Status control
// #region

export type StatusControlSummary = {
  cause: number
  resist: number
  psIDs: string[]
}

export const computeStatusControl: (results: CoverageResult[]) => Map<StatusName, StatusControlSummary> = results => {
  // Initialize Map
  const statusControlMap = new Map<StatusName, StatusControlSummary>();
  for (let statusName of STATUSES) {
    statusControlMap.set(statusName, {
      cause: 0,
      resist: 0,
      psIDs: [],
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
      if (curr !== undefined) {
        curr.cause++;
        curr.psIDs.push(psID);
      }
    }
    // Iterate resisted statuses, aside from field states
    for (let resistsStatusEdge of result.resistsStatus.edges) {
      const { name } = resistsStatusEdge.node;

      const statusName: StatusName = name as StatusName;

      // Type guard
      if (!STATUSES.includes(statusName) || !statusName) continue;

      let curr = statusControlMap.get(statusName);
      if (curr !== undefined) {
        curr.resist++;
        curr.psIDs.push(psID);
      }
    }

    // Check whether the ability/move creates a field state, and if so whether that field state causes/resists a status
    if (result?.createsFieldState === undefined ) continue;

    
  }
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
  noEffect: number
  notVeryEffective: number
  neutral: number
  superEffective: number
}

export const computeTypeCoverage: (results: MoveCoverageResult[]) => Map<TypeName, TypeCoverageSummary> = results => {
  // Initialize Map
  const typeCoverageMap = new Map<TypeName, TypeCoverageSummary>();
  for (let typeName of TYPENAMES) {
    typeCoverageMap.set(typeName, {
      noEffect: 0,
      notVeryEffective: 0,
      neutral: 0,
      superEffective: 0,
    });
  }

  // Iterate over moves
  loop1:
    for (let result of results) {
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
            if (multiplier === 0) curr.noEffect++;
            else if (multiplier < 1) curr.notVeryEffective++;
            else if (multiplier > 1) curr.superEffective++;
            else curr.neutral++;
          }
        }
      }
    }
  
    return typeCoverageMap;
}

// #endregion

// Weather and terrain control
// #region



// #endregion