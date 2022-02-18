import { gql } from "@apollo/client";
import { GenerationNum } from "@pkmn/data";
import { EnumTypeName, toTypeName, TypeName } from "../helpers";
import { RequiresItemEdge } from "./helpers";
import { MemberItem, requiresItemEdgeToMemberItem } from "./MemberItem";

export type MemberMoveQuery = {
  pokemonByPSID: {
    moves: {
      edges: {
        node: MemberMoveQueryResult
        learnMethod: string
      }
    }
  }
}

export type MemberMoveQueryResult = {
  id: string
  name: string
  formattedName: string
  psID: string

  power: number
  pp: number
  accuracy: number | null
  category: 'PHYSICAL' | 'SPECIAL' | 'STATUS' | 'VARIES'
  typeName: EnumTypeName

  removedFromSwSh: boolean
  removedFromBDSP: boolean

  requiresItem: RequiresItemEdge[]
}

export const MEMBER_MOVESET_QUERY = gql`
  query MemberMovesetQuery($gen: Int! $psID: String!) {
    pokemonByPSID(generation: $gen psID: $psID) {
      id
      moves {
        id
        edges {
          node {
            id
            name
            formattedName
            psID

            power
            pp
            accuracy
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
                }
              }
            }
          }
          learnMethod
        }
      }
    }
  }
`;

export class MemberMove {
  public id: string
  public name: string
  public formattedName: string
  public psID: string
  public type: TypeName

  public gen: GenerationNum
  public removedFromSwSh: boolean
  public removedFromBDSP: boolean

  public power: number
  public pp: number
  public accuracy: number | null
  public category: 'PHYSICAL' | 'SPECIAL' | 'STATUS' | 'VARIES'

  public requiresItem: MemberItem[]

  constructor(gqlMemberMove: MemberMoveQueryResult, gen: GenerationNum) {
    const {
      id, name, formattedName, psID: psID, typeName: enumTypeName,
      removedFromSwSh, removedFromBDSP,
      power, pp, accuracy, category,
      requiresItem,
    } = gqlMemberMove;

    this.id = id;
    this.name = name;
    this.formattedName = formattedName;
    this.psID = psID;
    this.type = toTypeName(enumTypeName);

    this.gen = gen;
    this.removedFromSwSh = removedFromSwSh;
    this.removedFromBDSP = removedFromBDSP;

    this.power = power;
    this.pp = pp;
    this.accuracy = accuracy;
    this.category = category;

    this.requiresItem = requiresItem.map(edge => requiresItemEdgeToMemberItem(edge, gen));
  }
}