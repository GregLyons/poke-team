import {
  GenerationNum,
  IntroductionEdge
} from './Generation.js';
import {
  TypeNameEdge,
  TypeName,
} from './Type.js';
import {
  Edge,
} from './helpers.js';

// Pokemon icons
// #region 

export type PokemonIconDatum = {
  name: string
  formattedName: string
  speciesName: string
  introduced: GenerationNum
}

export interface PokemonIconEdge extends Edge {
  node: {
    name: string
    formattedName: string
    speciesName: string

    introduced: {
      edges: IntroductionEdge[]
    }
  }
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

// An object containing the base stats for the Pokemon
type BaseStats = {
  hp: number
  attack: number
  defense: number
  specialAttack: number
  specialDefense: number
  speed: number
}

export interface PokemonGQLResult {
  id: string

  name: string
  formattedName: string
  speciesName: string

  introduced: {
    edges: IntroductionEdge[]
  }

  baseStats: BaseStats

  typing: {
    edges: TypeNameEdge[]
  }
}

// 
export class Pokemon {
  public id: string

  public name: string
  public formattedName: string
  public speciesName: string

  public introduced: GenerationNum

  public baseStats: BaseStats
  public typing: TypeName[]
  public ability: string
  public moveset: string[]

  constructor(
    gqlPokemon: PokemonGQLResult
  ) {
    this.id = gqlPokemon.id;

    this.name = gqlPokemon.name;
    this.formattedName = gqlPokemon.formattedName;
    this.speciesName = gqlPokemon.speciesName;

    const {hp, attack, defense, specialAttack, specialDefense, speed} = gqlPokemon.baseStats;
    this.baseStats = {hp, attack, defense, specialAttack, specialDefense, speed};

    this.introduced = gqlPokemon.introduced.edges[0].node.number;
    
    this.typing = gqlPokemon.typing.edges.map(edge => edge.node.name);

    this.ability = '';
    this.moveset = [];
  }
}

