import { gql } from "@apollo/client";
import { GenerationNum } from "@pkmn/data";
import { RequiresItemEdge } from "../Builder/helpers";
import { CapsTypeName, toTypeName, TypeName } from "../helpers";
import { MemberEntity, MemberResult, MemberSpecificEntityVars } from "./helpers";
import { MemberItem, requiresItemEdgeToMemberItem } from "./MemberItem";

export interface MemberMoveQuery {
  pokemonByPSID: {
    moves: {
      edges: {
        node: MemberMoveResult
        learnMethod: string
      }[]
    }
  }[]
}

export interface MemberMoveResult extends MemberResult {
  power: number
  pp: number
  accuracy: number | null
  category: 'PHYSICAL' | 'SPECIAL' | 'STATUS' | 'VARIES'
  priority: number
  typeName: CapsTypeName

  removedFromSwSh: boolean
  removedFromBDSP: boolean

  requiresItem: {
    edges: RequiresItemEdge[]
  }
}

export interface MemberMoveVars extends MemberSpecificEntityVars {
  gen: GenerationNum
  psID: string

  contains: string
  startsWith: string

  removedFromSwSh: false | null
  removedFromBDSP: false | null
}

export const MEMBER_MOVESET_QUERY = gql`
  query MemberMovesetQuery(
    $gen: Int! $psID: String!
    $contains: String! $startsWith: String!
    $removedFromBDSP: Boolean $removedFromSwSh: Boolean
  ) {
    pokemonByPSID(generation: $gen psID: $psID) {
      id
      moves(filter: {
        contains: $contains, startsWith: $startsWith,
        removedFromSwSh: $removedFromSwSh,
        removedFromBDSP: $removedFromBDSP,
      }) {
        id
        edges {
          node {
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
          learnMethod
        }
      }
    }
  }
`;

export class MemberMove extends MemberEntity {
  public type: TypeName

  public removedFromSwSh: boolean
  public removedFromBDSP: boolean

  public power: number
  public pp: number
  public accuracy: number | null
  public priority: number
  public category: 'PHYSICAL' | 'SPECIAL' | 'STATUS' | 'VARIES'

  public requiresItem: MemberItem[]

  public eventOnly: boolean

  constructor(gqlMemberMove: MemberMoveResult, gen: GenerationNum, eventOnly: boolean) {
    super(gqlMemberMove, gen);
    const {
      typeName: enumTypeName,
      removedFromSwSh, removedFromBDSP,
      power, pp, accuracy, category, priority,
      requiresItem,
    } = gqlMemberMove;
    this.type = toTypeName(enumTypeName);

    this.removedFromSwSh = removedFromSwSh;
    this.removedFromBDSP = removedFromBDSP;

    this.power = power;
    this.pp = pp;
    this.accuracy = accuracy;
    this.priority = priority;
    this.category = category;

    this.requiresItem = requiresItem.edges.map(edge => requiresItemEdgeToMemberItem(edge, gen));

    this.eventOnly = eventOnly;
  }
}