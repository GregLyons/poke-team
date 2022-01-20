import { Sprites, Icons } from '@pkmn/img';
import { GenerationNum } from '../types-queries/Generation.js';
import { PokemonIconDatum } from '../types-queries/helpers.js';
import { Pokemon } from '../types-queries/Pokemon.js';

// Get Pokemon sprites
//#region 

// The 
export type PokemonNameData = {
  formattedName: string
  name: string
  psID: string
  introduced: GenerationNum
}

export const getPokemonSprite = (pokemon: Pokemon | PokemonNameData, gen: GenerationNum = 8) => {
  let {url} = Sprites.getPokemon(pokemon.name.replace('_', ''), {gen: gen});

  if (gen < pokemon.introduced) {
    return Sprites.getPokemon(pokemon.name.replace('_', ''), {gen: pokemon.introduced})
  }

  // If the pokemon.name is incompatible, use the speciesName instead.
  if (url.includes('0.png')) {
    return Sprites.getPokemon(pokemon.psID.replace('_', ''), {gen: gen});
  } else {
    return Sprites.getPokemon(pokemon.name.replace('_', ''), {gen: gen});
  }
}

export const getPokemonIcon = (pokemon: PokemonIconDatum) => {
  return Icons.getPokemon(pokemon.psID);
}

//#endregion