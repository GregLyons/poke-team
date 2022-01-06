import { TypeName } from './Type.js';
import { Sprites } from '@pkmn/img';
import { GenerationNum } from './Generation.js';

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
  formattedName: string
  speciesName: string

  baseStats: BaseStats
  typing: {
    edges: TypeEdge[]
  }
}


// 
export class Pokemon {
  public id: string

  public name: string
  public formattedName: string
  public speciesName: string

  public baseStats: BaseStats
  public typing: TypeName[]
  public ability: string
  public moveset: string[]

  constructor(
    private readonly gqlPokemon: PokemonGQLResult
  ) {
    this.id = gqlPokemon.id;

    this.name = gqlPokemon.name;
    this.formattedName = gqlPokemon.formattedName;
    this.speciesName = gqlPokemon.speciesName;

    const {hp, attack, defense, specialAttack, specialDefense, speed} = gqlPokemon.baseStats;
    this.baseStats = {hp, attack, defense, specialAttack, specialDefense, speed};
    
    this.typing = gqlPokemon.typing.edges.map(edge => edge.node.name);
    this.ability = '';
    this.moveset = [];
  }
}


// Get Pokemon sprites
//#region 

// The 
type spriteGen = "gen1rg" | "gen1rb" | "gen1" | "gen2g" | "gen2s" | "gen2" | "gen3rs" | "gen3frlg" | "gen3" | "gen3-2" | "gen4dp" | "gen4dp-2" | "gen4" | "gen5" | "gen5ani" | "ani" | GenerationNum | undefined;

export const getPokemonSprite = (pokemon: Pokemon, gen: spriteGen = 8) => {
  let {url} = Sprites.getPokemon(pokemon.name.replace('_', ''), {gen: gen});

  // If the pokemon.name is incompatible, use the speciesName instead.
  if (url.includes('0.png')) {
    return Sprites.getPokemon(pokemon.speciesName, {gen: gen});
  } else {
    return Sprites.getPokemon(pokemon.name, {gen: gen});
  }
}

//#endregion