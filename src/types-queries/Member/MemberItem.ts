import { gql } from "@apollo/client";
import { GenerationNum } from "@pkmn/data";
import { EnablesItemEdge, RequiresItemEdge } from "../Builder/helpers";
import { IntroductionEdge } from "../helpers";
import { MemberEntity, MemberEntityVars, MemberResult } from "./helpers";


export interface MemberItemQuery {
  items: {
    edges: {
      node: MemberItemResult
    }[]
  }
}

export interface MemberItemResult extends MemberResult {
  formattedName: string
  psID: string
  formattedPSID: string

  introduced: {
    edges: IntroductionEdge[]
  }
}

export interface MemberItemVars extends MemberEntityVars {
  gen: GenerationNum

  contains: string
  startsWith: string
}

export const MEMBER_ITEM_QUERY = gql`
  query MemberItemQuery(
    $gen: Int!
    $contains: String $startsWith: String!
  ) {
    items(
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
          psID
          formattedPSID

          introduced {
            id
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

export class MemberItem extends MemberEntity {
  constructor(gqlMemberItem: MemberItemResult, gen: GenerationNum) {
    super(gqlMemberItem, gen);
  }
}

export const enablesItemEdgeToMemberItem: (edge: EnablesItemEdge, gen: GenerationNum) => MemberItem = (edge, gen) => {
  return new MemberItem({ ...edge.node }, gen);
}

export const requiresItemEdgeToMemberItem: (edge: RequiresItemEdge, gen: GenerationNum) => MemberItem = (edge, gen) => {
  return new MemberItem({ ...edge.node }, gen);
}

