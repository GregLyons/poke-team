import { MemberPokemon } from "../../types-queries/Builder/MemberPokemon";
import { DUMMY_POKEMON_ICON_DATUM, GenerationNum, PokemonIconDatum } from "../../types-queries/helpers";
import { omitKeys } from "../../utils/helpers";
import { BoxInCart } from "./Cart";

export type TeamInGen = {
  savedPokemon: {
    pinnedBoxes: {
      [note: string]: PokemonIconDatum[]
    }
    quickSearch: PokemonIconDatum[]
  }
  members: (MemberPokemon | null)[]
  selectedMember: MemberPokemon | null
}

export type Team = {
  [gen in GenerationNum]: TeamInGen
}

const EMPTY_TEAM_IN_GEN: TeamInGen = {
  savedPokemon: {
    pinnedBoxes: {},
    quickSearch: [],
  },
  members: [null, null, null, null, null, null],
  selectedMember: null,
}

export const DEFAULT_TEAM: Team = {
  1: EMPTY_TEAM_IN_GEN,
  2: EMPTY_TEAM_IN_GEN,
  3: EMPTY_TEAM_IN_GEN,
  4: EMPTY_TEAM_IN_GEN,
  5: EMPTY_TEAM_IN_GEN,
  6: EMPTY_TEAM_IN_GEN,
  7: EMPTY_TEAM_IN_GEN,
  8: EMPTY_TEAM_IN_GEN,
}

export type TeamAction = 
| {
    type: 'pin_box',
    payload: {
      gen: GenerationNum
      pokemon: PokemonIconDatum[]
      note: string
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
  let gen: GenerationNum
  let idx: number
  switch(action.type) {
    case 'pin_box':
      gen = action.payload.gen; 

      return {
        ...state,
        [gen]: {
          ...state[gen],
          savedPokemon: {
            pinnedBoxes: {
              ...state[gen].savedPokemon.pinnedBoxes,
              [action.payload.note]: [action.payload.pokemon],
            }
          },
        }
      };

    case 'unpin_box':
      gen = action.payload.gen; 

      if (!state[gen].savedPokemon.pinnedBoxes || !state[gen].savedPokemon.pinnedBoxes?.[action.payload.note]) return state;

      const newState = { ...state };
      delete newState[gen].savedPokemon.pinnedBoxes?.[action.payload.note];
      return newState;

    default:
      throw new Error();
  }
}
