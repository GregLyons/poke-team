import { gql } from "@apollo/client";
import { GenerationNum } from "@pkmn/data";
import { AbilitySlot, MemberEntity, MemberResult, MemberSpecificEntityVars } from "./helpers";

export interface MemberAbilityQuery {
  pokemonByPSID: {
    abilities: {
      edges: {
        node: MemberAbilityResult
        slot: AbilitySlot
      }[]
    }
  }[]
}

export interface MemberAbilityResult extends MemberResult {
}

export interface MemberAbilitySearchVars extends MemberSpecificEntityVars {
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

export class MemberAbility extends MemberEntity {
  public slot: AbilitySlot

  constructor(gqlMemberAbility: MemberAbilityResult, gen: GenerationNum, slot: AbilitySlot) {
    super(gqlMemberAbility, gen);

    this.slot = slot;
  }
}