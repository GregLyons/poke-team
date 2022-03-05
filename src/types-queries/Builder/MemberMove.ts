import { gql } from "@apollo/client";
import { GenerationNum } from "@pkmn/data";
import { CapsTypeName, IntroductionEdge, introductionEdgeToGen, toTypeName, TypeName } from "../helpers";
import { RequiresItemEdge } from "./helpers";
import { MemberItem, requiresItemEdgeToMemberItem } from "./MemberItem";

export type MemberMoveQuery = {
  pokemonByPSID: {
    moves: {
      edges: {
        node: MemberMoveQueryResult
        learnMethod: string
      }[]
    }
  }[]
}

export type MemberMoveQueryResult = {
  id: string
  name: string
  formattedName: string
  psID: string

  introduced: {
    edges: IntroductionEdge[]
  }

  power: number
  pp: number
  accuracy: number | null
  category: 'PHYSICAL' | 'SPECIAL' | 'STATUS' | 'VARIES'
  typeName: CapsTypeName

  removedFromSwSh: boolean
  removedFromBDSP: boolean

  requiresItem: {
    edges: RequiresItemEdge[]
  }
}

export type MemberMoveSearchVars = {
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
              edges {
                node {
                  number
                }
              }
            }

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

export class MemberMove {
  public id: string
  public name: string
  public formattedName: string
  public psID: string
  public type: TypeName

  public gen: GenerationNum
  public introduced: GenerationNum
  public removedFromSwSh: boolean
  public removedFromBDSP: boolean

  public power: number
  public pp: number
  public accuracy: number | null
  public category: 'PHYSICAL' | 'SPECIAL' | 'STATUS' | 'VARIES'

  public requiresItem: MemberItem[]

  public eventOnly: boolean

  constructor(gqlMemberMove: MemberMoveQueryResult, gen: GenerationNum, eventOnly: boolean) {
    const {
      id, name, formattedName, psID: psID, typeName: enumTypeName,
      introduced, removedFromSwSh, removedFromBDSP,
      power, pp, accuracy, category,
      requiresItem,
    } = gqlMemberMove;

    this.id = id;
    this.name = name;
    this.formattedName = formattedName;
    this.psID = psID;
    this.type = toTypeName(enumTypeName);

    this.gen = gen;
    this.introduced = introductionEdgeToGen(introduced.edges[0]);
    this.removedFromSwSh = removedFromSwSh;
    this.removedFromBDSP = removedFromBDSP;

    this.power = power;
    this.pp = pp;
    this.accuracy = accuracy;
    this.category = category;

    this.requiresItem = requiresItem.edges.map(edge => requiresItemEdgeToMemberItem(edge, gen));

    this.eventOnly = eventOnly;
  }
}