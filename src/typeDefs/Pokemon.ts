import TypeName from './Type.js';

// An object containing the base stats for the Pokemon
type BaseStats = {
  hp: number
  attack: number
  defense: number
  specialAttack: number
  specialDefense: number
  speed: number
}

type TypeEdge = { node: { name: TypeName }}

export interface PokemonGQLResult {
  id: string
  name: string
  baseStats: BaseStats
  typing: {
    edges: TypeEdge[]
  }
}


// 
export class Pokemon {
  public id: string
  public name: string
  public baseStats: BaseStats
  public typing: TypeName[]
  public ability: string
  public moveset: string[]

  constructor(
    private readonly gqlPokemon: PokemonGQLResult
  ) {
    this.id = gqlPokemon.id;
    this.name = gqlPokemon.name;

    const {hp, attack, defense, specialAttack, specialDefense, speed} = gqlPokemon.baseStats;
    this.baseStats = {hp, attack, defense, specialAttack, specialDefense, speed};
    
    this.typing = gqlPokemon.typing.edges.map(edge => edge.node.name);
    this.ability = '';
    this.moveset = [];
  }
}