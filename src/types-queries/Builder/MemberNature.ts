import { gql } from "@apollo/client";
import { BaseStatName, GenerationNum, IntroductionEdge, introductionEdgeToGen, ModifiesBaseStatEdge, toBaseStatName } from "../helpers";
import { NatureName } from "./MemberPokemon";

export type MemberNatureQuery = {
  natures: {
    edges: {
      node: MemberNatureQueryResult
    }[]
  }
}

export interface MemberNatureQueryResult {
  id: string
  name: NatureName
  formattedName: NatureName
  modifiesStat: {
    edges: ModifiesBaseStatEdge[]
  }

  introduced: {
    edges: IntroductionEdge[]
  }
}

export interface MemberNatureSearchVars {
  gen: GenerationNum

  contains: string
  startsWith: string
}

export const MEMBER_NATURE_QUERY = gql`
  query NatureQuery(
    $gen: Int!
    $contains: String $startsWith: String
  ) {
    natures(
      generation: $gen
      filter: {
        contains: $contains
        startsWith: $startsWith
      }
    ) {
      id
      edges {
        node {
          id
          name
          formattedName
          modifiesStat {
            edges {
              node {
                id
                name
                name
              }
              multiplier
            }
          }

          introduced {
            edges {
              node {
                number
              }
            }
          }
        }
      }
    }
  }
`;

export class MemberNature {
  public name: NatureName
  public formattedName: string

  public introduced: GenerationNum

  public modifiesStat: {
    boosts: BaseStatName | null
    reduces: BaseStatName | null
  }

  constructor(gqlNature: MemberNatureQueryResult) {
    this.name = gqlNature.name;
    this.formattedName = gqlNature.formattedName
    
    const statModEdges = gqlNature.modifiesStat.edges;
    let boosts = null, reduces = null;
    for (let statModEdge of statModEdges) {
      if (statModEdge.multiplier < 1) {
        reduces = toBaseStatName(statModEdge.node.name);
      }
      else if (statModEdge.multiplier > 1) {
        boosts = toBaseStatName(statModEdge.node.name);
      }
    }
    this.modifiesStat = { boosts, reduces };

    this.introduced = introductionEdgeToGen(gqlNature.introduced.edges[0]);
  }
}