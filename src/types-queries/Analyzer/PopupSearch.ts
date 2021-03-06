import { gql } from "@apollo/client";
import { AbilitySlot } from "../Member/helpers";
import { MemberAbilityResult } from "../Member/MemberAbility";
import { MemberItemResult } from "../Member/MemberItem";
import { MemberMoveResult } from "../Member/MemberMove";
import { MemberNatureResult } from "../Member/MemberNature";
import { PopupVars } from "./helpers";

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
  psID: string
};

export const POPUP_ABILITY_QUERY = gql`
  query PopupAbilityQuery(
    $gen: Int!, $psID: String!,
    $startsWith: String!, $contains: String!,
    $limit: Int!,
  ) {
    pokemonByPSID(generation: $gen psID: $psID) {
      id
      abilities(
        filter: {
          startsWith: $startsWith,
          contains: $contains
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
};

export const POPUP_ITEM_QUERY = gql`
  query PopupItemQuery(
    $gen: Int!,
    $startsWith: String!, $contains: String!,
    $limit: Int!
  ) {
    items(
      generation: $gen
      filter: {
        startsWith: $startsWith
        contains: $contains
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
  psID: string
  
  removedFromSwSh: false | null
  removedFromBDSP: false | null
};

export const POPUP_MOVE_QUERY = gql`
  query PopupMoveQuery(
    $gen: Int!, $psID: String!
    $startsWith: String!, $contains: String!,
    $removedFromBDSP: Boolean $removedFromSwSh: Boolean
  ) {
    pokemonByPSID(generation: $gen, psID: $psID) {
      id
      moves(filter: {
        startsWith: $startsWith,
        contains: $contains,
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
            formattedPSID

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
            category
            typeName
            priority

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
          learnMethod
        }
      }
    }
  }
`;

// #endregion

// Nature
// #region

export interface PopupNatureQuery {
  natures: {
    edges: {
      node: MemberNatureResult
    }[]
  }
};

export interface PopupNatureVars extends PopupVars {
};

export const POPUP_NATURE_QUERY = gql`
  query PopupItemQuery(
    $gen: Int!,
    $startsWith: String!, $contains: String!,
    $limit: Int!
  ) {
    natures(
      generation: $gen
      filter: {
        startsWith: $startsWith
        contains: $contains
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

          modifiesStat {
            id
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
`;

// #endregion
