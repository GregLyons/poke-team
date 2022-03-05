import { gql } from "@apollo/client";
import { MemberAbilityResult } from "../Member/MemberAbility";
import { PopupVars } from "./helpers";
import { AbilitySlot } from "../Member/helpers";
import { GenNum } from "../entities";
import { MemberItemResult } from "../Member/MemberItem";
import { MemberMoveResult } from "../Member/MemberMove";

// Ability
// #region

export interface PopupAbilityQuery {
  pokemonByPSID: {
    abilities: {
      edges: {
        node: MemberAbilityResult
        slot: AbilitySlot
      }[]
    }
  }[]
};

export interface PopupAbilityVars extends PopupVars {
  gen: GenNum
  psID: string

  startsWith: string
};

export const POPUP_ABILITY_QUERY = gql`
  query PopupAbilityQuery(
    $gen: Int!, $psID: String!,
    $startsWith: String!
  ) {
    pokemonByPSID(generation: $gen psID: $psID) {
      id
      abilities(filter: {
        startsWith: $startsWith, 
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

// #endregion

// Item
// #region

export interface PopupItemQuery {
  items: {
    edges: {
      node: MemberItemResult
    }[]
  }
};

export interface PopupItemVars extends PopupVars {
  gen: GenNum

  startsWith: string
  limit: number
};

export const POPUP_ITEM_QUERY = gql`
  query PopupItemQuery(
    $gen: Int!,
    $startsWith: String!, $limit: Int!
  ) {
    items(
      generation: $gen
      filter: {
        startsWith: $startsWith
      }
      pagination: {
        limit: $limit
      }
    ) {
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
`;

// #endregion

// Move
// #region

export interface PopupMoveQuery {
  pokemonByPSID: {
    moves: {
      edges: {
        node: MemberMoveResult
        learnMethod: string
      }[]
    }
  }[]
};

export interface PopupMoveVars extends PopupVars {
  gen: GenNum
  psID: string

  startsWith: string
  limit: number

  removedFromSwSh: false | null
  removedFromBDSP: false | null
};

export const POPUP_MOVE_QUERY = gql`
  query PopupMoveQuery(
    $gen: Int!, $psID: String!
    $startsWith: String!
    $removedFromBDSP: Boolean $removedFromSwSh: Boolean
  ) {
    pokemonByPSID(generation: $gen, psID: $psID) {
      id
      moves(filter: {
        startsWith: $startsWith,
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

// #endregion