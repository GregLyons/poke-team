import { EnablesItemEdge, RequiresItemEdge } from "./helpers"

import { gql } from "@apollo/client";
import { GenerationNum } from "@pkmn/data";
import { EnumTypeName, toTypeName, TypeName } from "../helpers";

export type MemberItemQuery = {
  pokemonByPSID: {
    items: {
      edges: {
        node: MemberItemQueryResult
      }
    }
  }
}

export type MemberItemQueryResult = {
  id: string
  name: string
  formattedName: string
  psID: string
}

export const MEMBER_ITEM_QUERY = gql`
  query MemberItemQuery($gen: Int! $psID: String!) {
    pokemonByPSID(generation: $gen psID: $psID) {
      id
      requiresItem {
        id
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

