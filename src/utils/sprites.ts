import {
  Sprites,
  Icons,
} from '@pkmn/img';
import { GenderName } from '../types-queries/Builder/MemberPokemon.js';
import {
  GenNum,
  ItemIconDatum,
  PokemonIconDatum,
  TypeName,
} from '../types-queries/helpers.js';

// Get Pokemon sprites
//#region 

// export const getPokemonSprite = (pokemon: PokemonIconDatum, gen: GenerationNum = 8) => {
//   let {url} = Sprites.getPokemon(pokemon.name.replace('_', ''), {gen: gen});

//   // if (gen < pokemon.introduced) {
//   //   return Sprites.getPokemon(pokemon.name.replace('_', ''), {gen: pokemon.introduced})
//   // }

//   // If the pokemon.name is incompatible, use the speciesName instead.
//   if (url.includes('0.png')) {
//     return Sprites.getPokemon(pokemon.psID.replace('_', ''), {gen: gen});
//   } else {
//     return Sprites.getPokemon(pokemon.name.replace('_', ''), {gen: gen});
//   }
// }

export const getPokemonIcon = (pokemon: PokemonIconDatum, gender?: GenderName) => {
  return Icons.getPokemon(pokemon.psID, {
    gender,
  });
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

const TYPENAME_TO_TYPEICON_5 = new Map<string, [number, number]>([
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

const TYPENAME_TO_TYPEICON_8 = new Map<string, [number, number]>([
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

export const getTypeIcon = (type: string): { left: number, top: number } => {
  const [left, top] = TYPENAME_TO_TYPEICON_5.get(type) || [0, 0];
  return { left, top, };
}

// #endregion

// Get field state icons
// #region

const FIELDSTATENAME_TO_FIELDSTATEICON = new Map<string, [number, number]>([
  ['toxic_spikes', [-0, -0]],
  ['trick_room', [-0, -12]],
  ['vine_lash', [-32, -0]],
  ['volcalith', [-32, -12]],
  ['wildfire', [-0, -24]],
  ['wonder_room', [-32, -24]],
  ['aurora_veil', [-0, -36]],
  ['cannonade', [-32, -36]],
  ['clear_skies', [-0, -48]],
  ['electric_terrain', [-32, -48]],
  ['extremely_harsh_sunlight', [-64, -0]],
  ['fog', [-64, -12]],
  ['grassy_terrain', [-64, -24]],
  ['gravity', [-64, -36]],
  ['hail', [-64, -48]],
  ['harsh_sunlight', [-0, -60]],
  ['heavy_rain', [-32, -60]],
  ['light_screen', [-64, -60]],
  ['magic_room', [-0, -72]],
  ['mist', [-32, -72]],
  ['misty_terrain', [-64, -72]],
  ['psychic_terrain', [-0, -84]],
  ['rain', [-32, -84]],
  ['rainbow', [-64, -84]],
  ['reflect', [-96, -0]],
  ['safeguard', [-96, -12]],
  ['sandstorm', [-96, -24]],
  ['sea_of_fire', [-96, -36]],
  ['sharp_steel', [-96, -48]],
  ['spikes', [-96, -60]],
  ['stealth_rock', [-96, -72]],
  ['sticky_web', [-96, -84]],
  ['strong_winds', [-0, -96]],
  ['swamp', [-32, -96]],
  ['tailwind', [-64, -96]],
]);

export const getFieldStateIcon = (fieldState: string): { left: number, top: number } => {
  let left, top;
  // TODO: Decide whether to ever include gen 8 icons
  [left, top] = FIELDSTATENAME_TO_FIELDSTATEICON.get(fieldState) || [0, 0];
  return { left, top, };
}

// #endregion

// Get stat icons
// #region

const STATNAME_TO_STATICON = new Map<string, [number, number]>([
  ['evasion', [-0, -0]],
  ['secondary_effect_chance', [-0, -12]],
  ['special_attack', [-32, -0]],
  ['special_defense', [-32, -12]],
  ['speed', [-0, -24]],
  ['accuracy', [-32, -24]],
  ['attack', [-0, -36]],
  ['critical_hit_ratio', [-32, -36]],
  ['defense', [-0, -48]],
]);

export const getStatIcon = (stat: string): { left: number, top: number } => {
  let left, top;
  // TODO: Decide whether to ever include gen 8 icons
  [left, top] = STATNAME_TO_STATICON.get(stat) || [0, 0];
  return { left, top, };
}

// #endregion

// Get status icons
// #region

const STATUSNAME_TO_STATUSICON = new Map<string, [number, number]>([
  ['semi_invulnerable_turn', [-0, -0]],
  ['sleep', [-0, -12]],
  ['substitute', [-32, -0]],
  ['taking_aim', [-32, -12]],
  ['taunt', [-0, -24]],
  ['telekinesis', [-32, -24]],
  ['thrashing', [-0, -36]],
  ['torment', [-32, -36]],
  ['transformed', [-0, -48]],
  ['trapped', [-32, -48]],
  ['type_change', [-64, -0]],
  ['aqua_ring', [-64, -12]],
  ['bound', [-64, -24]],
  ['bad_poison', [-64, -36]],
  ['bracing', [-64, -48]],
  ['burn', [-0, -60]],
  ['center_of_attention', [-32, -60]],
  ['charging_turn', [-64, -60]],
  ['confusion', [-0, -72]],
  ['curse', [-32, -72]],
  ['defense_curl', [-64, -72]],
  ['disable', [-0, -84]],
  ['drowsy', [-32, -84]],
  ['embargo', [-64, -84]],
  ['encore', [-96, -0]],
  ['flinch', [-96, -12]],
  ['freeze', [-96, -24]],
  ['heal_block', [-96, -36]],
  ['identified', [-96, -48]],
  ['infatuation', [-96, -60]],
  ['leech_seed', [-96, -72]],
  ['magic_coat', [-96, -84]],
  ['magnetic_levitation', [-0, -96]],
  ['mimic', [-32, -96]],
  ['minimize', [-64, -96]],
  ['nightmare', [-96, -96]],
  ['paralysis', [-0, -108]],
  ['perish_song', [-32, -108]],
  ['poison', [-64, -108]],
  ['protection', [-96, -108]],
  ['recharging', [-128, -0]],
  ['rooted', [-128, -12]],
]);

export const getStatusIcon = (status: string): { left: number, top: number } => {
  let left, top;
  // TODO: Decide whether to ever include gen 8 icons
  [left, top] = STATUSNAME_TO_STATUSICON.get(status) || [0, 0];
  return { left, top, };
}

// #endregion

// Get usage method icons
// #region

const USAGEMETHODNAME_TO_USAGEMETHODICON = new Map<string, [number, number]>([
  ['ball', [-0, -0]],
  ['bite', [-0, -12]],
  ['dance', [-32, -0]],
  ['explosive', [-32, -12]],
  ['powder', [-0, -24]],
  ['pulse', [-32, -24]],
  ['punch', [-0, -36]],
  ['sound', [-32, -36]],
]);

export const getUsageMethodIcon = (usageMethod: string): { left: number, top: number } => {
  let left, top;
  // TODO: Decide whether to ever include gen 8 icons
  [left, top] = USAGEMETHODNAME_TO_USAGEMETHODICON.get(usageMethod) || [0, 0];
  return { left, top, };
}

// #endregion