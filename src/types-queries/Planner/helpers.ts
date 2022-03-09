import {
  gql
} from "@apollo/client";
import { GenNum } from "../entities";
import { CapsTypeName, IconDatum, IconEdge, iconEdgeToIconDatum, IntroductionEdge, ItemIconEdge, itemIconEdgeToItemIconDatum, ItemRequiresPokemonEdge, itemRequiresPokemonEdgeToRequiredPokemonIconData, NameEdge, PokemonIconDatum, PokemonIconEdge } from "../helpers";

// Entity in search
// #region

export interface EntitySearchQuery {
  abilities?: {
    edges: MainEntitySearchResult[]
  }
  effects?: {
    edges: AuxEntitySearchResult[]
  }
  fieldStates?: {
    edges: AuxEntitySearchResult[]
  }
  items?: {
    edges: MainEntitySearchResult[]
  }
  moves?: {
    edges: MainEntitySearchResult[]
  }
  stats?: {
    edges: AuxEntitySearchResult[]
  }
  statuses?: {
    edges: AuxEntitySearchResult[]
  }
  types?: {
    edges: AuxEntitySearchResult[]
  }
  usageMethods?: {
    edges: AuxEntitySearchResult[]
  }
}

export interface EntitySearchResult {
  node: {
    name: string
    formattedName: string
  }
}

export interface MainEntitySearchResult extends EntitySearchResult {
  node: {
    name: string
    formattedName: string
    descriptions: {
      edges: VersionDependentDescriptionEdge[]
    }
  }
}

export interface AuxEntitySearchResult extends EntitySearchResult {
  node: {
    id: string
    name: string
    formattedName: string
    description: string
  }
}

export interface EntitySearchVars {
  gen: GenNum
  limit: number
  contains: string
  startsWith: string
}

export abstract class MainEntityInSearch {
  public name: string
  public formattedName: string
  public description: string

  constructor(gqlEntity: MainEntitySearchResult) {
    const { name, formattedName, } = gqlEntity.node;

    this.name = name;
    this.formattedName = formattedName;

    // TODO: Bulbapedia doesn't list all items, so there will be missing descriptions
    if (gqlEntity.node.descriptions.edges.length > 0) {
      this.description = gqlEntity.node.descriptions.edges[0].node.text;
    }
    else {
      this.description = 'Placeholder description.';
    }
  }
}

export abstract class AuxEntityInSearch {
  public name: string
  public formattedName: string
  public description: string

  constructor(gqlEntity: AuxEntitySearchResult) {
    const { name, formattedName, description } = gqlEntity.node;

    this.name = name;
    this.formattedName = formattedName;
    this.description = description || '';
  }
}

export abstract class AuxEntityInSearchWithIcon extends AuxEntityInSearch {
  public iconDatum: IconDatum

  constructor(gqlEntity: AuxEntitySearchResult) {
    super(gqlEntity);

    const { name, formattedName } = gqlEntity.node;

    this.iconDatum = { name, formattedName };
  }
}

// #endregion

// Entity page
// #region

export type EntityPageQueryName = 'abilityByName' | 'effectByName' | 'fieldStateByName' | 'itemByName' | 'moveByName' | 'pokemonByPSID' | 'statByName' | 'statusByName' | 'typeByName' | 'usageMethodByName';

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
  gen: GenNum
  name: string
}

export abstract class MainEntityOnPage {
  public id: string
  public name: string
  public formattedName: string
  public descriptions: VersionDependentDescription[]

  public introduced: GenNum

  constructor(gqlEntity: MainEntityPageResult) {
    const { id, name, formattedName, descriptions, introduced } = gqlEntity;

    this.id = id;
    this.name = name;
    this.formattedName = formattedName;

    // TODO: Bulbapedia doesn't list all items, so there will be missing descriptions
    if (descriptions.edges.length > 0) {
      this.descriptions = descriptions.edges.map(edge => {
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

    this.introduced = introduced.edges[0].node.number;
  }
}

export abstract class AuxEntityOnPage {
  public id: string
  public name: string
  public formattedName: string
  public description: string

  public introduced: GenNum

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

export interface MainToIconConnectionEdge extends MainToAuxConnectionEdge, IconEdge {
  node: {
    id: string
    name: string
    formattedName: string
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

export interface AuxToIconConnectionEdge extends AuxToAuxConnectionEdge, IconEdge {
  node: {
    id: string
    name: string
    formattedName: string
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
  gen: GenNum
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
  public itemIconDatum: IconDatum
  public requiredPokemonIconData: PokemonIconDatum[]

  constructor(gqlEdge: AuxToItemConnectionEdge) {
    super(gqlEdge);
    
    this.itemIconDatum = itemIconEdgeToItemIconDatum(gqlEdge);
    this.requiredPokemonIconData = itemRequiresPokemonEdgeToRequiredPokemonIconData(gqlEdge);
  }
}

export abstract class MainToIconConnectionOnPage extends AuxToAuxConnectionOnPage {
  public iconDatum: IconDatum 

  constructor(gqlEdge: MainToIconConnectionEdge) {
    super(gqlEdge);

    this.iconDatum = iconEdgeToIconDatum(gqlEdge);
  }
}

export abstract class AuxToIconConnectionOnPage extends AuxToAuxConnectionOnPage {
  public iconDatum: IconDatum 

  constructor(gqlEdge: AuxToIconConnectionEdge) {
    super(gqlEdge);

    this.iconDatum = iconEdgeToIconDatum(gqlEdge);
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
        id
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
  types: CapsTypeName[]
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