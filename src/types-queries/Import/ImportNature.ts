import { gql } from "@apollo/client";
import { MemberNatureQueryResult } from "../Builder/MemberNature";
import { GenerationNum } from "../helpers";

export type MemberNatureFromSetQuery = {
  naturesByName: MemberNatureQueryResult[]
}

export type MemberNatureFromSetQueryVars = {
  gen: GenerationNum
  psIDs: string[]
}


export const SET_MEMBERNATURE_QUERY = gql`
  query NatureQuery($gen: Int!, $psIDs: [String!]!) {
    naturesByName(generation: $gen, names: $psIDs) {
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
`;