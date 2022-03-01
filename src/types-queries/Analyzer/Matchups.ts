import { gql } from "@apollo/client";
import { CapsTypeName, GenerationNum, TypeName, TYPENAMES } from "../helpers";
import { CoverageDatum, incrementCoverageDatum, INITIAL_COVERAGEDATUM } from "./helpers";

export type DefensiveMatchupEdge = {
  node: {
    name: TypeName
  }
  multiplier: number
}

export interface MatchupSearchVars {
  gen: GenerationNum
  psIDs: string[]
}
export interface MatchupSearchVarsType {
  gen: GenerationNum
  names: CapsTypeName[]
}

export interface MatchupResult {
  psID?: string
  name?: string

  defensiveMatchups?: {
    edges: DefensiveMatchupEdge[]
  }

  resistsType?: {
    edges: DefensiveMatchupEdge[]
  }
}

export type TypingMatchupQuery = {
  typesByName: TypingMatchupResult[]
}

export interface TypingMatchupResult extends MatchupResult {
  name: TypeName
  defensiveMatchups: {
    edges: DefensiveMatchupEdge[]
  }
}

export const TYPING_MATCHUP_QUERY = gql`
  query TypingsTypeMatchupQuery($gen: Int!, $names: [String!]!) {
    typesByName(generation: $gen, names: $names) {
      id
      name
      defensiveMatchups {
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
`;

export type AbilityMatchupQuery = {
  abilitiesByPSIDs: AbilityMatchupResult[]
}

export interface AbilityMatchupResult extends MatchupResult {
  psID: string
  resistsType: {
    edges: DefensiveMatchupEdge[]
  }
}
export const ABILITY_MATCHUP_QUERY = gql`
  query AbilitiesTypeMatchupQuery($gen: Int!, $psIDs: [String!]!) {
    abilitiesByPSIDs(generation: $gen, psIDs: $psIDs) {
      resistsType {
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
`;

export type ItemMatchupQuery = {
  itemsByPSIDs: ItemMatchupResult[]
}

export interface ItemMatchupResult extends MatchupResult {
  psID: string
  resistsType: {
    edges: DefensiveMatchupEdge[]
  }
}

export const ITEM_MATCHUP_QUERY = gql`
  query ItemsTypeMatchupQuery($gen: Int!, $psIDs: [String!]!) {
    itemsByPSIDs(generation: $gen, psIDs: $psIDs) {
      id
      resistsType {
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
`;

type NormalizedMatchupResult = {
  name: string
  defensiveMatchups: {
    edges: DefensiveMatchupEdge[]
  }
};

// Takes a result and changes 'psID' key to 'name'
const toNormalizedMatchupResult: (result: MatchupResult) => NormalizedMatchupResult = result => {
  if (result?.psID && result?.resistsType) {
    return {
      name: result.psID,
      defensiveMatchups: result.resistsType,
    };
  }
  else if (result?.name && result?.defensiveMatchups) return {
    name: result.name,
    defensiveMatchups: result.defensiveMatchups,
  };
  else throw new Error('Incompatiable MatchupResult');
}

type DefensiveTypeMatchup = {
  [typeName in TypeName]: number
};

type DefensiveTypeMatchupMap = Map<string, DefensiveTypeMatchup>;

const initializeDefensiveTypeMatchupMapEntry: () => DefensiveTypeMatchup = () => {
  let initialDefensiveTypeMatchup: { [typeName in TypeName]?: number } = {};
  for (let typeName of TYPENAMES.map(d => d[0])) {
    initialDefensiveTypeMatchup[typeName] = 1;
  }
  return (initialDefensiveTypeMatchup as DefensiveTypeMatchup);
}

// Returns a map, whose keys are entity names (e.g. ability psIDs, item psIDs, or type names), and whose values are DefensiveTypeMatchups
const resultsToMatchupMap = (results: NormalizedMatchupResult[]) => {
  const map: DefensiveTypeMatchupMap = new Map();
  for (let result of results) {
    // Initialize entry in map for name
    map.set(result.name, initializeDefensiveTypeMatchupMapEntry());
    
    // Iterate over edges and update map
    result.defensiveMatchups.edges.map(edge => {
      // Unpack edge
      const { node, multiplier } = edge;
      const { name: typeName } = node;

      const matchup = map.get(result.name);
      
      // Typeguard; shouldn't happen
      if (!matchup) return;

      matchup[typeName] = multiplier;
    });
  }

  return map;
}

export type DefensiveTypeMatchupSummary = {
  immunities: CoverageDatum
  quadResistances: CoverageDatum
  resistances: CoverageDatum
  neutral: CoverageDatum
  weaknesses: CoverageDatum
  quadWeaknesses: CoverageDatum
};

export const computeTypeMatchups: (
  members: {
    psID: string
    typing: TypeName[]
    ability?: string
    item?: string
  }[],
  results: {
    fromTypings: TypingMatchupResult[], 
    fromAbilities: AbilityMatchupResult[], 
    fromItems: ItemMatchupResult[],
  },
  gen: GenerationNum,
) => Map<TypeName, DefensiveTypeMatchupSummary> = (members, results, gen) => {
  // Initialize Map
  const typeMatchupMap = new Map<TypeName, DefensiveTypeMatchupSummary>();
  for (let [typeName, typeGen] of TYPENAMES) {
    // Only consider types in the given gen
    if (typeGen <= gen) {
      typeMatchupMap.set(typeName, {
        immunities: INITIAL_COVERAGEDATUM,
        quadResistances: INITIAL_COVERAGEDATUM,
        resistances: INITIAL_COVERAGEDATUM,
        neutral: INITIAL_COVERAGEDATUM,
        weaknesses: INITIAL_COVERAGEDATUM,
        quadWeaknesses: INITIAL_COVERAGEDATUM,
      });
    }
  }

  // Get lookup maps from results
  const fromTypingsMap = resultsToMatchupMap(results.fromTypings.map(toNormalizedMatchupResult));
  const fromAbilitiesMap = resultsToMatchupMap(results.fromAbilities.map(toNormalizedMatchupResult));
  const fromItemsMap = resultsToMatchupMap(results.fromItems.map(toNormalizedMatchupResult));

  // Iterate over members, updating 'result' when necessary
  members.map(member => {
    // Iterate over individual types
    for (let typeName of TYPENAMES.map(d => d[0])) {
      // Keeps track of effectiveness of typeName against member after factoring in typing, ability, and item
      let finalMultiplier = 1;
      let psIDs: string[] = [member.psID];

      // Typing
      for (let memberType of member.typing) {
        const typeMatchup = fromTypingsMap.get(memberType);
        finalMultiplier *= typeMatchup
          ? typeMatchup[typeName]
          : 1;
      }

      // Ability
      if (member.ability) {
        const abilityTypeMatchup = fromAbilitiesMap.get(member.ability);
        finalMultiplier *= abilityTypeMatchup
          ? abilityTypeMatchup[typeName]
          : 1;
        // If ability affects calculation, add its psID
        if (abilityTypeMatchup !== undefined) psIDs.push(member.ability);
      }

      // Item
      if (member.item) {
        const itemTypeMatchup = fromItemsMap.get(member.item);
        finalMultiplier *= itemTypeMatchup
          ? itemTypeMatchup[typeName]
          : 1;
        // If item affects calculation, add its psID
        if (itemTypeMatchup !== undefined) psIDs.push(member.item);
      }

      // Add data to 'result.get(typeName)'
      let curr = typeMatchupMap.get(typeName);
      if (curr !== undefined) {
        // Immunity
        if (finalMultiplier === 0) curr.immunities = incrementCoverageDatum(curr.immunities, '', psIDs)
        // Resistance
        else if (finalMultiplier < 1) {
          curr.resistances = incrementCoverageDatum(curr.resistances, '', psIDs);

          // Quad resistance
          if (finalMultiplier < 0.26) {
            curr.quadResistances = incrementCoverageDatum(curr.quadResistances, '', psIDs);
          }
        }
        // Weakness
        else if (finalMultiplier > 1) {
          curr.weaknesses = incrementCoverageDatum(curr.weaknesses, '', psIDs);

          // Quad weakness
          if (finalMultiplier > 3.9) {
            curr.quadWeaknesses = incrementCoverageDatum(curr.quadWeaknesses, '', psIDs);
          }
        }
        // Neutral
        else {
          curr.neutral = incrementCoverageDatum(curr.neutral, '', psIDs);
        }
      }
    }
  });

  return typeMatchupMap;
};