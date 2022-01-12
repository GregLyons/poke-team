import {
  DocumentNode,
} from 'graphql';
import {
  TypeName,
  TypeNameEdge,
  typeNameEdgeToTypeName,
} from './Type';
import {
  PokemonIconDatum,
  PokemonIconEdge,
  pokemonIconEdgeToPokemonIconDatum
} from './Pokemon';

// Move search result
// #region

export interface MoveSearchQueryResult {
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

export class MoveSearchResult {
  public id: string
  public name: string
  public formattedName: string

  public type: TypeName

  public pokemonIconData: PokemonIconDatum[]

  constructor(
    gqlMove: MoveSearchQueryResult
  ) {
    this.id = gqlMove.id;

    this.name = gqlMove.name;
    this.formattedName = gqlMove.formattedName;
    this.type = gqlMove.type.edges.map(typeNameEdgeToTypeName)[0]

    this.pokemonIconData = gqlMove.pokemon.edges.map(pokemonIconEdgeToPokemonIconDatum);
  }
}

// #endregion

// Move page
// #region

export interface MovePageQueryResult {
  id: string

  name: string
  formattedName: string

  accuracy: number
  category: string
  contact: boolean
  power: number
  pp: number
  priority: number
  target: string

  type: {
    edges: TypeNameEdge[]
  }

  pokemon: {
    edges: PokemonIconEdge[]
  }
}

export class MovePageResult {
  public id: string

  public name: string
  public formattedName: string

  public accuracy: number
  public category: string
  public contact: boolean
  public power: number
  public pp: number
  public priority: number
  public target: string

  public type: TypeName

  public pokemonIconData: PokemonIconDatum[]

  constructor(
    gqlMove: MovePageQueryResult
  ) {
    this.id = gqlMove.id;

    this.name = gqlMove.name;
    this.formattedName = gqlMove.formattedName;
    
    this.accuracy = gqlMove.accuracy;
    this.category = gqlMove.category;
    this.contact = gqlMove.contact;
    this.power = gqlMove.power;
    this.pp= gqlMove.pp;
    this.priority = gqlMove.priority;
    this.target = gqlMove.target;

    
    this.type = gqlMove.type.edges.map(typeNameEdgeToTypeName)[0]

    this.pokemonIconData = gqlMove.pokemon.edges.map(pokemonIconEdgeToPokemonIconDatum);
  }
}

// #endregion