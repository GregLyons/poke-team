import { DUMMY_POKEMON_ICON_DATUM, GenerationNum, PokemonIconDatum } from "../../types-queries/helpers";
import { omitKeys } from "../../utils/helpers";

export const DEFAULT_TEAM: Team = {
  mode: 'default',
  loadedPokemon: null,
  members: [
    DUMMY_POKEMON_ICON_DATUM,
    DUMMY_POKEMON_ICON_DATUM,
    DUMMY_POKEMON_ICON_DATUM,
    DUMMY_POKEMON_ICON_DATUM,
    DUMMY_POKEMON_ICON_DATUM,
    DUMMY_POKEMON_ICON_DATUM,
  ],
  pinnedBoxes: {}
}

export type TeamMode = 'default' | 'replace';

export type Team = {
  mode: TeamMode
  loadedPokemon: PokemonIconDatum | null
  members: PokemonIconDatum[]
  pinnedBoxes: {
    [gen in GenerationNum]?: {
      [note: string]: PokemonIconDatum[]
    }
  }
};

export type TeamAction = 
| { 
    type: 'toggle_replace_mode',
    payload: PokemonIconDatum | null,
  }
| { 
    type: 'replace',
    payload: number, 
  }
| {
    type: 'remove',
    payload: number,
  }
| {
    type: 'pin_box',
    payload: {
      gen: GenerationNum
      note: string,
      pokemon: PokemonIconDatum[]
    }
  }
| {
    type: 'unpin_box',
    payload: {
      gen: GenerationNum
      note: string,
    }
  }

export function teamReducer(state: Team, action: TeamAction): Team {
  switch(action.type) {
    // If action.payload is null or the same as state.loadedPokemon, turn replace mode off and remove state.loadedPokemon; otherwise, turn or keep replace mode on and overwrite state.loadedPokemon with action.payload.
    case 'toggle_replace_mode':
      return {
        ...state,
        mode: action.payload === null || action.payload?.psID === state.loadedPokemon?.psID
          ? 'default'
          : 'replace',
        loadedPokemon: action.payload?.psID !== state.loadedPokemon?.psID
          ? action.payload
          : null,
      };

    case 'replace':
      // If not in replace mode, do nothing, otherwise overwrite member in slot action.payload with state.loadedPokemon.
      if (state.mode !== 'replace') return state;
      return {
        ...state,
        loadedPokemon: null,
        mode: 'default',
        members: state.members.map((member: PokemonIconDatum, idx: number) => {
          if (idx === action.payload && state.loadedPokemon) return state.loadedPokemon;
          return member;
        })
      };

    case 'remove':
      return {
        ...state,
        members: state.members.map((member: PokemonIconDatum, idx: number) => {
          if (idx === action.payload) return DUMMY_POKEMON_ICON_DATUM;
          return member;
        }),
      };

    case 'pin_box':
      return {
        ...state,
        pinnedBoxes: {
          ...state.pinnedBoxes,
          [action.payload.gen]: {
            ...state.pinnedBoxes[action.payload.gen],
            [action.payload.note]: [action.payload.pokemon],
          }
        }
      };

    case 'unpin_box':
      if (!state.pinnedBoxes[action.payload.gen]) return state;
      const newPinnedBoxesInGen = omitKeys([action.payload.note], state.pinnedBoxes[action.payload.gen] || {});
      return {
        ...state,
        pinnedBoxes: {
          ...state.pinnedBoxes,
          [action.payload.gen]: {
            newPinnedBoxesInGen,
          }
        }
      }

    default:
      throw new Error();
  }
}
