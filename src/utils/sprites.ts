import { Sprites, Icons } from '@pkmn/img';
import { GenerationNum } from '../types-queries/Generation.js';
import { Pokemon } from '../types-queries/Pokemon.js';

// Get Pokemon sprites
//#region 

// The 
type PokemonNameData = {
  name: string
  speciesName: string

  introduced: GenerationNum
}

export const getPokemonSprite = (pokemon: Pokemon | PokemonNameData, gen: GenerationNum = 8) => {
  let {url} = Sprites.getPokemon(pokemon.name.replace('_', ''), {gen: gen});

  if (gen < pokemon.introduced) {
    return Sprites.getPokemon(pokemon.name.replace('_', ''), {gen: pokemon.introduced})
  }

  // If the pokemon.name is incompatible, use the speciesName instead.
  if (url.includes('0.png')) {
    return Sprites.getPokemon(pokemon.speciesName.replace('_', ''), {gen: gen});
  } else {
    return Sprites.getPokemon(pokemon.name.replace('_', ''), {gen: gen});
  }
}

export const getPokemonIcon = (pokemon: Pokemon | PokemonNameData, gen: GenerationNum = 8) => {
  let {url} = Icons.getPokemon(pokemon.name.replace('_', ''));

  // If the pokemon.name is incompatible, use the speciesName instead.
  if (url.includes('0.png')) {
    return Icons.getPokemon(pokemon.speciesName.replace('_', ''));
  } else {
    return Icons.getPokemon(pokemon.name.replace('_', ''));
  }
}

//#endregion