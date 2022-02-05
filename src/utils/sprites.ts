import {
  Sprites,
  Icons,
} from '@pkmn/img';
import {
  GenerationNum,
  ItemIconDatum,
  PokemonIconDatum,
  TypeName,
} from '../types-queries/helpers.js';
import {
  Pokemon,
} from '../types-queries/Planner/Pokemon.js';

// Get Pokemon sprites
//#region 

export const getPokemonSprite = (pokemon: Pokemon | PokemonIconDatum, gen: GenerationNum = 8) => {
  let {url} = Sprites.getPokemon(pokemon.name.replace('_', ''), {gen: gen});

  // if (gen < pokemon.introduced) {
  //   return Sprites.getPokemon(pokemon.name.replace('_', ''), {gen: pokemon.introduced})
  // }

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

// Get item sprites 
// #region

export const getItemIcon = (item: ItemIconDatum) => {
  return Icons.getItem(item.name);
}

// #endregion

// Get type sprites
// #region

const TYPENAME_TO_TYPEICON_5 = new Map<TypeName, [number, number]>([
  ['normal', [-0, -0]],
  ['poison', [-0, -12]],
  ['psychic', [-32, -0]],
  ['rock', [-32, -12]],
  ['steel', [-0, -24]],
  ['water', [-32, -24]],
  ['bug', [-0, -36]],
  ['dark', [-32, -36]],
  ['dragon', [-0, -48]],
  ['electric', [-32, -48]],
  ['fairy', [-64, -0]],
  ['fighting', [-64, -12]],
  ['fire', [-64, -24]],
  ['flying', [-64, -36]],
  ['ghost', [-64, -48]],
  ['grass', [-0, -60]],
  ['ground', [-32, -60]],
  ['ice', [-64, -60]],
]);

const TYPENAME_TO_TYPEICON_8 = new Map<TypeName, [number, number]>([
  ['fighting', [-0, -0]],
  ['fire', [-0, -44]],
  ['flying', [-0, -88]],
  ['ghost', [-0, -132]],
  ['grass', [-200, -0]],
  ['ground', [-200, -44]],
  ['ice', [-200, -88]],
  ['normal', [-200, -132]],
  ['poison', [-0, -176]],
  ['psychic', [-200, -176]],
  ['rock', [-0, -220]],
  ['steel', [-200, -220]],
  ['water', [-0, -264]],
  ['bug', [-200, -264]],
  ['dark', [-0, -308]],
  ['dragon', [-200, -308]],
  ['electric', [-0, -352]],
  ['fairy', [-200, -352]],
]);

export const getTypeIcon = (type: TypeName, gen: GenerationNum): { left: number, top: number } => {
  let left, top;
  // TODO: Decide whether to ever include gen 8 icons
  if (true || gen < 6) [left, top] = TYPENAME_TO_TYPEICON_5.get(type) || [0, 0];
  else [left, top] = TYPENAME_TO_TYPEICON_8.get(type) || [0, 0];
  return { left, top, };
}

// #endregion