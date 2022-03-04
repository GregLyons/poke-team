import { gql } from "@apollo/client";
import { GenerationNum } from "@pkmn/data";
import { CapsTypeName, IntroductionEdge, introductionEdgeToGen, toTypeName, TypeName } from "../helpers";
import { RequiresItemEdge } from "./helpers";
import { MemberItem, requiresItemEdgeToMemberItem } from "./MemberItem";

export type MemberAbilityQuery = {
  pokemonByPSID: {
    abilities: {
      edges: {
        node: MemberAbilityQueryResult
        slot: 'ONE' | 'TWO' | 'HIDDEN'
      }[]
    }
  }[]
}

export type MemberAbilityQueryResult = {
  id: string
  name: string
  formattedName: string
  psID: string

  introduced: {
    edges: IntroductionEdge[]
  }
}

export type MemberAbilitySearchVars = {
  gen: GenerationNum
  psID: string

  contains: string
  startsWith: string
}

export const MEMBER_ABILITY_QUERY = gql`
  query MemberAbilityQuery(
    $gen: Int! $psID: String!
    $contains: String $startsWith: String!
  ) {
    pokemonByPSID(generation: $gen psID: $psID) {
      id
      abilities(filter: {
        contains: $contains, startsWith: $startsWith, 
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
          }
          slot
        }
      }
    }
  }
`;

export class MemberAbility {
  public id: string
  public name: string
  public formattedName: string
  public psID: string
  
  public gen: GenerationNum
  public introduced: GenerationNum

  public slot: 'ONE' | 'TWO' | 'HIDDEN'

  constructor(gqlMemberAbility: MemberAbilityQueryResult, gen: GenerationNum, slot: 'ONE' | 'TWO' | 'HIDDEN') {
    const {
      id, name, formattedName, psID: psID, introduced,
    } = gqlMemberAbility;

    this.id = id;
    this.name = name;
    this.formattedName = formattedName;
    this.psID = psID;

    this.gen = gen;
    this.introduced = introductionEdgeToGen(introduced.edges[0]);

    this.slot = slot;
  }
}