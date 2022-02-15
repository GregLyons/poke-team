import { gql } from "@apollo/client";
import { TypeName } from "../helpers";

export type MemberMove = {
  id: string
  name: string
  formattedName: string
  psID: string
  description: string

  type: TypeName
  power: number
  pp: number
  accuracy: number | null
}

export const MEMBER_MOVE_QUERY = gql`
`;