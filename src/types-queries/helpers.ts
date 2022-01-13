import { DocumentNode } from "graphql";
import { GenerationNum, IntroductionEdge } from "./Generation";
import {
  PokemonIconDatum,
  PokemonIconEdge,
} from "./Pokemon";
import { TypeName } from "./Type";

export type TypeEdge = { node: { name: TypeName }};

export type Edge = { node: any }

// Entity in search
// #region

export interface EntitySearchResult {
  id: string
  name: string
  formattedName: string
}

export interface EntitySearchVars {
  gen: GenerationNum
  limit: number
  startsWith: string
}

export interface EntityInSearch {
  id: string
  name: string
  formattedName: string
}

// #endregion

// Entity page
// #region

export interface EntityPageResult {
  id: string
  name: string
  formattedName: string

  introduced: {
    edges: IntroductionEdge[]
  }
}

export interface CountField {
  count: number
}

export interface EntityPageVars {
  gen: GenerationNum
  name: string
}

export interface EntityOnPage {
  id: string
  name: string
  formattedName: string
}

// #endregion

// Entity connections
// #region

export interface EntityConnectionQuery {
  id: string
}

export interface EntityConnectionEdge {
  node: {
    id: string
    name: string
    formattedName: string
  }
}

export interface EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export interface EntityConnectionOnPage {
  id: string
  name: string
  formattedName: string
}

// #endregion