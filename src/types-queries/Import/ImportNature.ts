import { gql } from "@apollo/client";
import { GenNum } from "../helpers";
import { MemberNatureResult } from "../Member/MemberNature";
import { ImportVars } from "./helpers";

export interface ImportNatureQuery {
  naturesByName: MemberNatureResult[]
}

export interface ImportNatureVars extends ImportVars {
  gen: GenNum
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