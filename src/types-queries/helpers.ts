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

export type EntitySearchQueryName = 'abilities' | 'effects' | 'fieldStates' | 'items' | 'moves' | 'pokemon' | 'stats' | 'statuses' | 'types' | 'usageMethods';

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

export abstract class EntityInSearch {
  id: string
  name: string
  formattedName: string

  constructor(gqlEntity: EntitySearchResult) {
    const { id, name, formattedName } = gqlEntity;

    this.id = id;
    this.name = name;
    this.formattedName = formattedName;
  }
}

// #endregion

// Entity page
// #region

export type EntityPageQueryName = 'abilityByName' | 'effectByName' | 'fieldStateByName' | 'itemByName' | 'moveByName' | 'pokemonByName' | 'statByName' | 'statusByName' | 'typeByName' | 'usageMethodByName'

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

export abstract class EntityOnPage {
  public id: string
  public name: string
  public formattedName: string

  public introduced: GenerationNum

  constructor(gqlEntity: EntityPageResult) {
    const { id, name, formattedName } = gqlEntity;

    this.id = id;
    this.name = name;
    this.formattedName = formattedName;

    this.introduced = gqlEntity.introduced.edges[0].node.number;
  }
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
  startsWith: string
}

export abstract class EntityConnectionOnPage {
  public id: string
  public name: string
  public formattedName: string

  constructor(gqlEdge: EntityConnectionEdge) {
    const { id, name, formattedName } = gqlEdge.node;

    this.id = id;
    this.name = name;
    this.formattedName = formattedName;
  }
}

// #endregion