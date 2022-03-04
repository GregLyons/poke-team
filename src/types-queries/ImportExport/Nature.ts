import { gql } from "@apollo/client";
import { MemberNatureQueryResult } from "../Builder/MemberNature";
import { GenerationNum } from "../helpers";

export type MemberNatureFromSetQuery = {
  natureByPSID: MemberNatureQueryResult[]
}

export type MemberNatureFromSetQueryVars = {
  gen: GenerationNum
  psIDs: string[]
}


export const SET_MEMBERNATURE_QUERY = gql`
query NatureQuery($gen: Int!, $psIDs: [String!]!) {
  naturesByPSID(generation: $gen, psIDs: $psIDs) {
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