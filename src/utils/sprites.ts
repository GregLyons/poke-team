import { Sprites, Icons } from '@pkmn/img';
import { GenerationNum } from '../typeDefs/Generation.js';
import { Pokemon } from '../typeDefs/Pokemon.js';

// Get Pokemon sprites
//#region 

// The 
type PokemonNameData = {
  name: string
  speciesName: string
}

type spriteGen = "gen1rg" | "gen1rb" | "gen1" | "gen2g" | "gen2s" | "gen2" | "gen3rs" | "gen3frlg" | "gen3" | "gen3-2" | "gen4dp" | "gen4dp-2" | "gen4" | "gen5" | "gen5ani" | "ani" | GenerationNum | undefined;

export const getPokemonSprite = (pokemon: Pokemon | PokemonNameData, gen: spriteGen = 8) => {
  let {url} = Sprites.getPokemon(pokemon.name.replace('_', ''), {gen: gen});

  // If the pokemon.name is incompatible, use the speciesName instead.
  if (url.includes('0.png')) {
    return Sprites.getPokemon(pokemon.speciesName, {gen: gen});
  } else {
    return Sprites.getPokemon(pokemon.name, {gen: gen});
  }
}

export const getPokemonIcon = (pokemon: Pokemon | PokemonNameData, gen: spriteGen = 8) => {
  let {url} = Icons.getPokemon(pokemon.name.replace('_', ''));

  // If the pokemon.name is incompatible, use the speciesName instead.
  if (url.includes('0.png')) {
    return Icons.getPokemon(pokemon.speciesName);
  } else {
    return Icons.getPokemon(pokemon.name);
  }
}

//#endregion