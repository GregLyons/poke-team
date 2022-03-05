import { gql } from "@apollo/client";
import { GenNum } from "../helpers";
import { MemberItemResult } from "../Member/MemberItem";
import { ImportVars } from "./helpers";

export interface ImportItemQuery {
  itemsByPSID: MemberItemResult[]
}

export interface ImportItemVars extends ImportVars {
  gen: GenNum
  psIDs: string[]
}

export const IMPORT_ITEM_QUERY = gql`
  query ImportItemQuery(
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