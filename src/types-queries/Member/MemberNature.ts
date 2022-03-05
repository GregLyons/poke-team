import { gql } from "@apollo/client";
import { BaseStatName, GenNum, toBaseStatName } from "../entities";
import { IntroductionEdge, introductionEdgeToGen, ModifiesBaseStatEdge } from "../helpers";
import { FormattedNatureName, MemberEntityVars, NatureName, natureNameToFormattedNatureName, } from "./helpers";

export interface MemberNatureQuery {
  natures: {
    edges: {
      node: MemberNatureResult
    }[]
  }
}

export interface MemberNatureResult {
  name: NatureName

  introduced: {
    edges: IntroductionEdge[]
  }

  modifiesStat: {
    edges: ModifiesBaseStatEdge[]
  }
}

export interface MemberNatureVars extends MemberEntityVars {
  gen: GenNum

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
  public formattedName: FormattedNatureName

  public gen: GenNum
  public introduced: GenNum

  public modifiesStat: {
    boosts: BaseStatName | null
    reduces: BaseStatName | null
  }

  constructor(gqlNature: MemberNatureResult, gen: GenNum) {
    const { name, introduced } = gqlNature;

    this.name = name;
    this.formattedName = natureNameToFormattedNatureName(name);

    this.gen = gen;
    this.introduced = introductionEdgeToGen(introduced.edges[0]);
    
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
  }
}