import { gql } from "@apollo/client";
import { TypeName, TYPENAMES } from "../helpers";

export type DefensiveMatchupEdge = {
  node: {
    name: TypeName
  }
  multiplier: number
}

export type TypeMatchupsFromTypingsQuery = {
  typesByName: TypeMatchupsFromTypingsResult[]
}

export type TypeMatchupsFromTypingsResult = {
  name: TypeName
  defensiveMatchups: {
    edges: DefensiveMatchupEdge[]
  }
}

export const TYPINGS_TYPEMATCHUPS_QUERY = gql`
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

export type TypeMatchupsFromAbilitiesQuery = {
  typesByName: TypeMatchupsFromAbilitiesResult[]
}

export type TypeMatchupsFromAbilitiesResult = {
  psID: string
  defensiveMatchups: {
    edges: DefensiveMatchupEdge[]
  }
}
export const ABILITIES_TYPEMATCHUPS_QUERY = gql`
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

export type TypeMatchupsFromItemsQuery = {
  typesByName: TypeMatchupsFromItemsResult[]
}

export type TypeMatchupsFromItemsResult = {
  psID: string
  defensiveMatchups: {
    edges: DefensiveMatchupEdge[]
  }
}

export const ITEMS_TYPEMATCHUPS_QUERY = gql`
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
const toNormalizedMatchupResult: (result: TypeMatchupsFromAbilitiesResult | TypeMatchupsFromItemsResult) => NormalizedMatchupResult = result => {
  return {
    name: result.psID,
    defensiveMatchups: result.defensiveMatchups,
  };
}

type DefensiveTypeMatchup = {
  [typeName in TypeName]: number
};

type DefensiveTypeMatchupMap = Map<string, DefensiveTypeMatchup>;

const initializeDefensiveTypeMatchupMapEntry: () => DefensiveTypeMatchup = () => {
  let initialDefensiveTypeMatchup: { [typeName in TypeName]?: number } = {};
  for (let typeName of TYPENAMES) {
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
  immunities: number
  quadResistances: number
  resistances: number
  neutral: number
  weaknesses: number
  quadWeaknesses: number
};

export const computeTypeMatchups: (
  members: {
    typing: TypeName[]
    ability: string
    item: string
  }[],
  results: {
    fromTypings: TypeMatchupsFromTypingsResult[], 
    fromAbilities: TypeMatchupsFromAbilitiesResult[], 
    fromItems: TypeMatchupsFromItemsResult[],
  },
) => Map<TypeName, DefensiveTypeMatchupSummary> = (members, results) => {
  // Initialize Map
  const typeMatchupMap = new Map<TypeName, DefensiveTypeMatchupSummary>();
  for (let typeName of TYPENAMES) {
    typeMatchupMap.set(typeName, {
      immunities: 0,
      quadResistances: 0,
      resistances: 0,
      neutral: 0,
      weaknesses: 0,
      quadWeaknesses: 0,
    });
  }

  // Get lookup maps from results
  const fromTypingsMap = resultsToMatchupMap(results.fromTypings);
  const fromAbilitiesMap = resultsToMatchupMap(results.fromAbilities.map(toNormalizedMatchupResult));
  const fromItemsMap = resultsToMatchupMap(results.fromItems.map(toNormalizedMatchupResult));

  // Iterate over members, updating 'result' when necessary
  members.map(member => {
    // Iterate over individual types
    for (let typeName of TYPENAMES) {
      // Keeps track of effectiveness of typeName against member after factoring in typing, ability, and item
      let finalMultiplier = 1;

      // Typing
      for (let memberType of member.typing) {
        const typeMatchup = fromTypingsMap.get(memberType);
        finalMultiplier *= typeMatchup
          ? typeMatchup[typeName]
          : 1;
      }

      // Ability
      const abilityTypeMatchup = fromAbilitiesMap.get(member.ability);
      finalMultiplier *= abilityTypeMatchup
        ? abilityTypeMatchup[typeName]
        : 1;

      // Item
      const itemTypeMatchup = fromItemsMap.get(member.item);
      finalMultiplier *= itemTypeMatchup
        ? itemTypeMatchup[typeName]
        : 1;

      // Add data to 'result.get(typeName)'
      let curr = typeMatchupMap.get(typeName);
      console.log('was', curr);
      if (curr !== undefined) {
        // Immunity
        if (finalMultiplier === 0) {
          curr.immunities++;
        }
        // Resistance
        else if (finalMultiplier < 1) {
          curr.resistances++;

          // Quad resistance
          if (finalMultiplier < 0.26) {
            curr.quadResistances++;
          }
        }
        // Weakness
        else if (finalMultiplier > 1) {
          curr.weaknesses++;

          // Quad weakness
          if (finalMultiplier > 3.9) {
            curr.quadWeaknesses++;
          }
        }
        // Neutral
        else if (finalMultiplier === 1) {
          curr.neutral++;
        }
      }
      console.log('now', curr);
    }
  });

  return typeMatchupMap;
};