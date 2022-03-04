import { gql } from "@apollo/client";
import { MemberItemQueryResult } from "../Builder/MemberItem";
import { GenerationNum } from "../helpers";

export type MemberItemFromSetQuery = {
  itemsByPSID: MemberItemQueryResult[]
}

export type MemberItemFromSetQueryVars = {
  gen: GenerationNum
  psIDs: string[]
}

export const SET_MEMBERITEM_QUERY = gql`
  query MemberItemQuery(
    $gen: Int!
    $psIDs: [String!]!
  ) {
    itemsByPSID(generation: $gen, psIDs: $psIDs) {
      id
      name
      formattedName
      psID

      introduced {
        edges {
          node {
            number
          }
        }
      }
    }
  }
`;