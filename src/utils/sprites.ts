import {
  Sprites,
  Icons,
} from '@pkmn/img';
import {
  GenerationNum,
  PokemonIconDatum,
} from '../types-queries/helpers.js';
import {
  Pokemon,
} from '../types-queries/Planner/Pokemon.js';

// Get Pokemon sprites
//#region 

export const getPokemonSprite = (pokemon: Pokemon | PokemonIconDatum, gen: GenerationNum = 8) => {
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