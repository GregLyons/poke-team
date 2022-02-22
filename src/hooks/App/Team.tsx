import { MemberMove } from "../../types-queries/Builder/MemberMove";
import { MemberPokemon } from "../../types-queries/Builder/MemberPokemon";
import { DUMMY_POKEMON_ICON_DATUM, GenerationNum, PokemonIconDatum } from "../../types-queries/helpers";
import { omitKeys } from "../../utils/helpers";
import { BoxInCart } from "./Cart";

// We'll need to quickly reference whether a Pokemon in QuickSearch is saved, so we use an object, rather than an array, for quick look-up
export type QuickSearchPokemon = {
  [psID: string]: PokemonIconDatum
}

export type TeamInGen = {
  savedPokemon: {
    pinnedBoxes: {
      [note: string]: PokemonIconDatum[]
    }
    quickSearch: QuickSearchPokemon
  }
  members: (MemberPokemon | null)[]
  memberIcons: (PokemonIconDatum | null)[]
  selectedMember: MemberPokemon | null
}

export type Team = {
  [gen in GenerationNum]: TeamInGen
}

const EMPTY_TEAM_IN_GEN: TeamInGen = {
  savedPokemon: {
    pinnedBoxes: {},
    quickSearch: {},
  },
  members: [null, null, null, null, null, null],
  memberIcons: [null, null, null, null, null, null],
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
// Pin box from cart to team
| {
    type: 'pin_box',
    payload: {
      gen: GenerationNum
      pokemon: PokemonIconDatum[]
      note: string
    }
  }
// Unpin cart box from team
| {
    type: 'unpin_box',
    payload: {
      gen: GenerationNum
      note: string,
    }
  }
// Toggle whether Pokemon is included in savedPokemon.quickSearch
| {
    type: 'toggle_save'
    payload: {
      gen: GenerationNum
      pokemon: PokemonIconDatum
    }
  }
// Replace icon in team[gen].memberIcons[idx] with pokemon
| {
    type: 'replace_icon'
    payload: {
      gen: GenerationNum
      pokemon: PokemonIconDatum
      idx: number
    }
  }
// Replace member in team[gen].members[idx] with member
| {
    type: 'replace_member'
    payload: {
      gen: GenerationNum
      member: MemberPokemon
      idx: number
    }
  }
// Remove member in slot idx, as well as its icon
| {
    type: 'remove_member'
    payload: {
      gen: GenerationNum
      idx: number
    }
  }

export function teamReducer(state: Team, action: TeamAction): Team {
  let gen: GenerationNum;
  let note: string;
  let pokemon: PokemonIconDatum;
  let member: MemberPokemon;
  let psID: string;
  let newState: Team;

  let idx: number;
  let memberIdx: number;
  let moveIdx: number;

  switch(action.type) {
    case 'pin_box':
      gen = action.payload.gen;
      note = action.payload.note;

      // Box is already pinned, so do nothing
      if (state[gen].savedPokemon.pinnedBoxes?.[note]) return state;

      // Box is not pinned, so add it
      return {
        ...state,
        [gen]: {
          ...state[gen],
          savedPokemon: {
            ...state[gen].savedPokemon,
            pinnedBoxes: {
              ...state[gen].savedPokemon.pinnedBoxes,
              [note]: action.payload.pokemon,
            }
          },
        }
      };

    case 'unpin_box':
      gen = action.payload.gen;
      note = action.payload.note;

      // Box is not pinned, so do nothing
      if (!state[gen].savedPokemon.pinnedBoxes?.[note]) return state;

      // Box is pinned, so remove it
      newState = { ...state };
      delete newState[gen].savedPokemon.pinnedBoxes?.[note];
      return newState;

    case 'toggle_save':
      gen = action.payload.gen;
      psID = action.payload.pokemon.psID;

      // Pokemon is not currently saved, so add it
      if (state[gen].savedPokemon.quickSearch?.[psID] === undefined) {
        return {
          ...state,
          [gen]: {
            ...state[gen],
            savedPokemon: {
              ...state[gen].savedPokemon,
              quickSearch: {
                ...state[gen].savedPokemon.quickSearch,
                [psID]: action.payload.pokemon,
              },
            },
          },
        };
      }

      // Pokemon is currently saved, so remove it
      newState = { ...state };
      delete newState[gen].savedPokemon.quickSearch[psID];
      return newState;

    case 'replace_icon':
      gen = action.payload.gen;
      pokemon = action.payload.pokemon;
      idx = action.payload.idx;

      return {
        ...state,
        [gen]: {
          ...state[gen],
          memberIcons: state[gen].memberIcons.map((d, i) => {
            if (i !== idx) return d;
            return pokemon;
          }),
        },
      };

    case 'replace_member':
      gen = action.payload.gen;
      member = action.payload.member;
      idx = action.payload.idx;

      return {
        ...state,
        [gen]: {
          ...state[gen],
          members: state[gen].members.map((d, i) => {
            if (i !== idx) return d;
            return member;
          }),
        },
      };

    case 'remove_member':
      gen = action.payload.gen;
      idx = action.payload.idx;
      return {
        ...state,
        [gen]: {
          ...state[gen],
          members: state[gen].members.map((d, i) => {
            if (i !== idx) return d;
            return null;
          }),
          memberIcons: state[gen].memberIcons.map((d, i) => {
            if (i !== idx) return d;
            return null;
          }),
        },
      };

    default:
      throw new Error();
  }
}
