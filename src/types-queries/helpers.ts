import {
  gql,
} from "@apollo/client";
import {
  GenerationNum,
  IntroductionEdge
} from "./Generation";
import { 
  TypeName,
} from "./Type";

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

export interface EntityConnectionEdge extends NameEdge {
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

// #region

export type IntroductionQuery = {
  [pageQueryName in EntityPageQueryName]?: {
    introduced: {
      edges: IntroductionEdge[]
    }
  }[]
}

export interface IntroductionQueryVars {
  gen: number
  name: string
}

export const INTRODUCTION_QUERY = (queryName: EntityPageQueryName) => gql`
  query ${queryName + 'Introduced'}($gen: Int! $name: String!) {
    ${queryName}(generation: $gen, name: $name) {
      id
      introduced {
        edges {
          node {
            number
          }
        }
      }
    }
  }
`;

// #endregion

// Edge types
// #region

export type Edge = { node: any }

export interface NameEdge extends Edge {
  node: {
    id: string
    name: string
    formattedName: string
  }
}

export interface TypeNameEdge extends NameEdge {
  node: { 
    id: string
    name: TypeName
    formattedName: string
  }
};

export interface AbilityIconEdge extends NameEdge {
  node: {
    id: string
    name: string
    formattedName: string

    pokemon: {
      edges: PokemonIconEdge[]
    }
  }
}

export interface MoveIconEdge extends NameEdge {
  node: {
    id: string
    name: string
    formattedName: string

    type: {
      edges: TypeNameEdge[]
    }

    pokemon: {
      edges: PokemonIconEdge[]
    }
  }
}



// Icons
// #region 

export interface ItemIconEdge extends NameEdge {
  node: {
    id: string
    name: string
    formattedName: string

    introduced: {
      edges: IntroductionEdge[]
    }
  }
}

export type ItemIconDatum = {
  name: string
  formattedName: string
  introduced: GenerationNum
}

export const itemIconEdgeToItemIconDatum: (edge: ItemIconEdge) => ItemIconDatum = (edge) => {
  return {
    name: edge.node.name,
    formattedName: edge.node.formattedName,
    introduced: edge.node.introduced.edges[0].node.number,
  };
}

export interface PokemonIconEdge extends NameEdge {
  node: {
    id: string
    name: string
    formattedName: string
    speciesName: string

    introduced: {
      edges: IntroductionEdge[]
    }
  }
}

export type PokemonIconDatum = {
  name: string
  formattedName: string
  speciesName: string
  introduced: GenerationNum
}

export const pokemonIconEdgeToPokemonIconDatum: (edge: PokemonIconEdge) => PokemonIconDatum = (edge) => {
  return {
    name: edge.node.name,
    formattedName: edge.node.formattedName,
    speciesName: edge.node.speciesName,
    introduced: edge.node.introduced.edges[0].node.number,
  };
}

// #endregion

// #endregion