import { gql } from "@apollo/client";
import { GenNum } from "../entities";
import { MemberMoveResult } from "../Member/MemberMove";

export interface ImportMoveQuery {
  movesByPSID: MemberMoveResult[]
}

export interface ImportMoveVars {
  gen: GenNum
  psIDs: string[]
}

export const IMPORT_MOVE_QUERY = gql`
  query ImportMoveQuery(
    $gen: Int! $psIDs: [String!]!
  ) {
    movesByPSID(generation: $gen psIDs: $psIDs) {
      id
      name
      formattedName
      psID

      introduced {
        id
        edges {
          node {
            number
          }
        }
      }

      power
      pp
      accuracy
      priority
      category
      typeName

      removedFromSwSh
      removedFromBDSP

      requiresItem {
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
  }
`;