import { EnablesItemEdge, RequiresItemEdge } from "./helpers"

import { gql } from "@apollo/client";
import { GenerationNum } from "@pkmn/data";
import { CapsTypeName, toTypeName, TypeName } from "../helpers";

export type MemberItemQuery = {
  items: {
    edges: {
      node: MemberItemQueryResult
    }[]
  }
}

export type MemberItemQueryResult = {
  id: string
  name: string
  formattedName: string
  psID: string
}

export type MemberItemSearchVars = {
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
      edges {
        node {
          id
          name
          formattedName
          psID
        }
      }
    }
  }
`;

export class MemberItem {
  public id: string
  public name: string
  public formattedName: string
  public psID: string
  
  public gen: GenerationNum

  constructor(gqlMemberItem: MemberItemQueryResult, gen: GenerationNum) {
    const {
      id, name, formattedName, psID: psID,
    } = gqlMemberItem;

    this.id = id;
    this.name = name;
    this.formattedName = formattedName;
    this.psID = psID;

    this.gen = gen;
  }
}

export const enablesItemEdgeToMemberItem: (edge: EnablesItemEdge, gen: GenerationNum) => MemberItem = (edge, gen) => {
  return new MemberItem({ ...edge.node }, gen);
}

export const requiresItemEdgeToMemberItem: (edge: RequiresItemEdge, gen: GenerationNum) => MemberItem = (edge, gen) => {
  return new MemberItem({ ...edge.node }, gen);
}

