import { MemberAbility } from "../../types-queries/Builder/MemberAbility";
import { MemberItem } from "../../types-queries/Builder/MemberItem";
import { MemberMove } from "../../types-queries/Builder/MemberMove";
import { MemberNature } from "../../types-queries/Builder/MemberNature";
import { GenderName, MemberPokemon, NatureName } from "../../types-queries/Builder/MemberPokemon";
import { BaseStatName, DUMMY_POKEMON_ICON_DATUM, GenerationNum, PokemonIconDatum } from "../../types-queries/helpers";
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

const stateWithModifiedMember = (state: Team, gen: GenerationNum, modifiedMember: MemberPokemon, idx: number) => {
  return {
    ...state,
    [gen]: {
      ...state[gen],
      members: state[gen].members.map((d, i) => {
        if (i !== idx) return d;
        return modifiedMember;
      }),
    }
  }
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
// Replace member in team[gen].members[idx] with member (if the psIDs are different)
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
// Member actions
// #region

| {
    type: 'assign_ability'
    payload: {
      gen: GenerationNum
      idx: number,
      ability: MemberAbility
    }
  }
| {
    type: 'assign_item'
    payload: {
      gen: GenerationNum
      idx: number,
      item: MemberItem
    }
  }
| {
    type: 'assign_move'
    payload: {
      gen: GenerationNum
      idx: number
      move: MemberMove
      moveIdx: 0 | 1 | 2 | 3
    }
  }
| {
    type: 'assign_nickname'
    payload: {
      gen: GenerationNum
      idx: number
      nickname: string
    }
  }
| {
    type: 'assign_level'
    payload: {
      gen: GenerationNum
      idx: number
      newValue: number
    }
  }
| {
    type: 'assign_gender'
    payload: {
      gen: GenerationNum
      idx: number
      gender: GenderName
    }
  }
| {
    type: 'toggle_shiny'
    payload: {
      gen: GenerationNum
      idx: number
    }
  }
| {
    type: 'assign_happiness'
    payload: {
      gen: GenerationNum
      idx: number
      newValue: number
    }
  }
| {
    type: 'assign_nature'
    payload: {
      gen: GenerationNum
      idx: number
      nature: MemberNature
    }
  }
| {
    type: 'assign_ev'
    payload: {
      gen: GenerationNum
      idx: number
      stat: BaseStatName
      newValue: number
    }
  }
| {
    type: 'assign_iv'
    payload: {
      gen: GenerationNum
      idx: number
      stat: BaseStatName
      newValue: number
    }
  }
| {
    type: 'assign_cosmetic_form'
    payload: {
      gen: GenerationNum,
      idx: number,
      psID: string,
    }
  }

// #endregion

export function teamReducer(state: Team, action: TeamAction): Team {
  let gen: GenerationNum;
  let note: string;
  let pokemon: PokemonIconDatum;
  let member: MemberPokemon;
  let psID: string;
  let newState: Team;

  let idx: number;
  let memberIdx: number;
  let moveIdx: 0 | 1 | 2 | 3;

  let modifiedMember: MemberPokemon | undefined

  let stat: BaseStatName;
  let newValue: number;

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
            // (If the psIDs are the same, do not overwrite)
            if (i !== idx || (d && d.psID === member.psID)) return d;
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

    // Member modifications
    // #region

    case 'assign_ability':
      gen = action.payload.gen;
      idx = action.payload.idx;
      const ability = action.payload.ability;

      modifiedMember = state[gen].members[idx]?.copy();
      if (!modifiedMember) return state;
      modifiedMember.assignAbility(ability);
      return stateWithModifiedMember(state, gen, modifiedMember, idx);

    case 'assign_item':
      gen = action.payload.gen;
      idx = action.payload.idx;
      const item = action.payload.item;

      modifiedMember = state[gen].members[idx]?.copy();
      if (!modifiedMember) return state;
      modifiedMember.assignItem(item);
      return stateWithModifiedMember(state, gen, modifiedMember, idx);

    case 'assign_move':
      gen = action.payload.gen;
      idx = action.payload.idx;
      moveIdx = action.payload.moveIdx;
      const move = action.payload.move;

      modifiedMember = state[gen].members[idx]?.copy();
      if (!modifiedMember) return state;
      modifiedMember.assignMove(move, moveIdx);
      return stateWithModifiedMember(state, gen, modifiedMember, idx);

    case 'assign_nickname':
      gen = action.payload.gen;
      idx = action.payload.idx;
      const nickname = action.payload.nickname;

      modifiedMember = state[gen].members[idx]?.copy();
      if (!modifiedMember) return state;
      modifiedMember.assignNickname(nickname);
      return stateWithModifiedMember(state, gen, modifiedMember, idx);

    case 'assign_level':
      gen = action.payload.gen;
      idx = action.payload.idx;
      newValue = action.payload.newValue;

      modifiedMember = state[gen].members[idx]?.copy();
      if (!modifiedMember) return state;
      modifiedMember.assignLevel(newValue);
      return stateWithModifiedMember(state, gen, modifiedMember, idx);

    case 'toggle_shiny':
      gen = action.payload.gen;
      idx = action.payload.idx;

      modifiedMember = state[gen].members[idx]?.copy();
      if (!modifiedMember) return state;
      modifiedMember.toggleShiny();
      return stateWithModifiedMember(state, gen, modifiedMember, idx);

    case 'assign_happiness':
      gen = action.payload.gen;
      idx = action.payload.idx;
      newValue = action.payload.newValue;

      modifiedMember = state[gen].members[idx]?.copy();
      if (!modifiedMember) return state;
      modifiedMember.assignHappiness(newValue);
      return stateWithModifiedMember(state, gen, modifiedMember, idx);

    case 'assign_gender':
      gen = action.payload.gen;
      idx = action.payload.idx;
      const gender = action.payload.gender;

      modifiedMember = state[gen].members[idx]?.copy();
      if (!modifiedMember) return state;
      modifiedMember.assignGender(gender);
      return stateWithModifiedMember(state, gen, modifiedMember, idx);

    case 'assign_nature':
      gen = action.payload.gen;
      idx = action.payload.idx;
      const nature = action.payload.nature;

      modifiedMember = state[gen].members[idx]?.copy();
      if (!modifiedMember) return state;
      modifiedMember.assignNature(nature);
      return stateWithModifiedMember(state, gen, modifiedMember, idx);

    case 'assign_ev':
      gen = action.payload.gen;
      idx = action.payload.idx;
      stat = action.payload.stat;
      newValue = action.payload.newValue;

      modifiedMember = state[gen].members[idx]?.copy();
      if (!modifiedMember) return state;

      // If illegal EV value, then return original state
      try {
        modifiedMember.assignEV(stat, newValue);
      }
      catch {
        return state;
      }

      return stateWithModifiedMember(state, gen, modifiedMember, idx);

    case 'assign_iv':
      gen = action.payload.gen;
      idx = action.payload.idx;
      stat = action.payload.stat;
      newValue = action.payload.newValue;

      modifiedMember = state[gen].members[idx]?.copy();
      if (!modifiedMember) return state;

      // If illegal IV value, then return original state
      try {
        modifiedMember.assignIV(stat, newValue);
      }
      catch {
        return state;
      }
      
      return stateWithModifiedMember(state, gen, modifiedMember, idx);

    case 'assign_cosmetic_form':
      gen = action.payload.gen;
      idx = action.payload.idx;
      psID = action.payload.psID;

      modifiedMember = state[gen].members[idx]?.cosmeticForm(psID);
      const newIconDatum = modifiedMember?.iconDatum;
      if (!modifiedMember || !newIconDatum) return state;

      // Replace icon data 
      const stateWithNewIconDatum = {
        ...state,
        [gen]: {
          ...state[gen],
          memberIcons: state[gen].memberIcons.map((d, i) => {
            if (i !== idx) return d;
            return newIconDatum;
          }),
        }
      }
      
      // Replace member data
      return stateWithModifiedMember(stateWithNewIconDatum, gen, modifiedMember, idx);

    // #endregion 

    default:
      throw new Error();
  }
}
