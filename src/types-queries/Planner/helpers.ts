import {
  gql,
} from "@apollo/client";
import { EnumTypeName, GenerationNum, IntroductionEdge, ItemIconDatum, ItemIconEdge, itemIconEdgeToItemIconDatum, ItemRequiresPokemonEdge, itemRequiresPokemonEdgeToRequiredPokemonIconData, NameEdge, PokemonIconDatum, PokemonIconEdge } from "../helpers";

// Entity in search
// #region

export type EntitySearchQueryName = 'abilities' | 'effects' | 'fieldStates' | 'items' | 'moves' | 'pokemon' | 'stats' | 'statuses' | 'types' | 'usageMethods';

export interface MainEntitySearchResult {
  id: string
  name: string
  formattedName: string
  descriptions: {
    edges: VersionDependentDescriptionEdge[]
  }
}

export interface AuxEntitySearchResult {
  id: string
  name: string
  formattedName: string
  description?: string
}

export interface EntitySearchVars {
  gen: GenerationNum
  limit: number
  startsWith: string
}

export abstract class MainEntityInSearch {
  public id: string
  public name: string
  public formattedName: string
  public description: string

  constructor(gqlEntity: MainEntitySearchResult) {
    const { id, name, formattedName } = gqlEntity;

    this.id = id;
    this.name = name;
    this.formattedName = formattedName;

    // TODO: Bulbapedia doesn't list all items, so there will be missing descriptions
    if (gqlEntity.descriptions.edges.length > 0) {
      this.description = gqlEntity.descriptions.edges[0].node.text;
    }
    else {
      this.description = 'Placeholder description.';
    }
  }
}

export abstract class AuxEntityInSearch {
  public id: string
  public name: string
  public formattedName: string
  public description: string

  constructor(gqlEntity: AuxEntitySearchResult) {
    const { id, name, formattedName, description } = gqlEntity;

    this.id = id;
    this.name = name;
    this.formattedName = formattedName;
    this.description = description || '';
  }
}

// #endregion

// Entity page
// #region

export type EntityPageQueryName = 'abilityByName' | 'effectByName' | 'fieldStateByName' | 'itemByName' | 'moveByName' | 'pokemonByName' | 'statByName' | 'statusByName' | 'typeByName' | 'usageMethodByName';

export type VersionDependentDescriptionEdgeWithCode = {
  node: {
    text: string
  }
  versionGroupCode: string
}

export type VersionDependentDescription = {
  code: string,
  text: string,
}

export interface MainEntityPageResult {
  id: string
  name: string
  formattedName: string

  descriptions: {
    edges: VersionDependentDescriptionEdgeWithCode[]
  }

  introduced: {
    edges: IntroductionEdge[]
  }
}

export interface AuxEntityPageResult {
  id: string
  name: string
  formattedName: string
  description?: string
  
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

export abstract class MainEntityOnPage {
  public id: string
  public name: string
  public formattedName: string
  public descriptions: VersionDependentDescription[]

  public introduced: GenerationNum

  constructor(gqlEntity: MainEntityPageResult) {
    const { id, name, formattedName, descriptions } = gqlEntity;

    this.id = id;
    this.name = name;
    this.formattedName = formattedName;

    // TODO: Bulbapedia doesn't list all items, so there will be missing descriptions
    if (gqlEntity.descriptions.edges.length > 0) {
      this.descriptions = gqlEntity.descriptions.edges.map(edge => {
        return {
          text: edge.node.text,
          code: edge.versionGroupCode,
        }
      });
    }
    else {
      this.descriptions = [{
        text: 'Placeholder description.',
        code: 'Placeholder code.',
      }];
    }

    this.introduced = gqlEntity.introduced.edges[0].node.number;
  }
}

export abstract class AuxEntityOnPage {
  public id: string
  public name: string
  public formattedName: string
  public description: string

  public introduced: GenerationNum

  constructor(gqlEntity: AuxEntityPageResult) {
    const { id, name, formattedName, description, } = gqlEntity;

    this.id = id;
    this.name = name;
    this.formattedName = formattedName;
    this.description = description || '';

    this.introduced = gqlEntity.introduced.edges[0].node.number;
  }
}


// #endregion

// Entity connections
// #region

export type VersionDependentDescriptionEdge = {
  node: {
    text: string
  }
}

export interface MainToAuxConnectionEdge extends NameEdge {
  node: {
    id: string
    name: string
    formattedName: string

    description?: string
  }
}

export interface AuxToAuxConnectionEdge extends NameEdge {
  node: {
    id: string
    name: string
    formattedName: string

    description?: string
  }
}

export interface AuxToItemConnectionEdge extends AuxToMainConnectionEdge, ItemIconEdge, ItemRequiresPokemonEdge {
  node: {
    id: string
    name: string
    formattedName: string

    descriptions: {
      edges: VersionDependentDescriptionEdge[]
    }

    requiresPokemon: {
      edges: PokemonIconEdge[]
    }
  }
}

export interface AuxToMainConnectionEdge extends NameEdge {
  node: {
    id: string
    name: string
    formattedName: string

    descriptions: {
      edges: VersionDependentDescriptionEdge[]
    }
  }
}

export interface EntityConnectionVars {
  gen: GenerationNum
  name: string
}

export abstract class MainToAuxConnectionOnPage {
  public id: string
  public name: string
  public formattedName: string
  public description: string

  constructor(gqlEdge: MainToAuxConnectionEdge) {
    const { id, name, formattedName, description, } = gqlEdge.node;

    this.id = id;
    this.name = name;
    this.formattedName = formattedName;
    this.description = description || '';
  }
}

export abstract class AuxToAuxConnectionOnPage {
  public id: string
  public name: string
  public formattedName: string
  public description: string

  constructor(gqlEdge: AuxToAuxConnectionEdge) {
    const { id, name, formattedName, description, } = gqlEdge.node;

    this.id = id;
    this.name = name;
    this.formattedName = formattedName;
    this.description = description || '';
  }
}

export abstract class AuxToMainConnectionOnPage {
  public id: string
  public name: string
  public formattedName: string
  public description: string

  constructor(gqlEdge: AuxToMainConnectionEdge) {
    const { id, name, formattedName, } = gqlEdge.node;

    this.id = id;
    this.name = name;
    this.formattedName = formattedName;
    
    // TODO: Bulbapedia doesn't list all items, so there will be missing descriptions
    if (gqlEdge.node.descriptions.edges.length > 0) {
      this.description = gqlEdge.node.descriptions.edges[0].node.text;
    }
    else {
      this.description = 'Placeholder description.';
    }
  }
}

export abstract class AuxToItemConnectionOnPage extends AuxToMainConnectionOnPage {
  public itemIconDatum: ItemIconDatum
  public requiredPokemonIconData: PokemonIconDatum[]

  constructor(gqlEdge: AuxToItemConnectionEdge) {
    super(gqlEdge);
    
    this.itemIconDatum = itemIconEdgeToItemIconDatum(gqlEdge);
    this.requiredPokemonIconData = itemRequiresPokemonEdgeToRequiredPokemonIconData(gqlEdge);
  }
}

// #endregion

// Introduction query
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

// QueryVars for Moves/Pokemon, removed from BDSP/SwSh
// #region

export interface RemovedFromGameQueryVars {
  removedFromSwSh: false | null
  removedFromBDSP: false | null
}

export interface PokemonFilterVars {
  types: EnumTypeName[]
  maxHP: number
  minHP: number
  maxAttack: number
  minAttack: number
  maxDefense: number
  minDefense: number
  maxSpecialAttack: number
  minSpecialAttack: number
  maxSpecialDefense: number
  minSpecialDefense: number
  maxSpeed: number
  minSpeed: number
}

// #endregion

// #endregion