import { PokemonSet, Sets } from "@pkmn/sets";
import { BaseStatName, GenNum } from "../../types-queries/entities";
import { PokemonIconDatum, TypeName } from "../../types-queries/helpers";
import { GenderName, MoveSlot } from "../../types-queries/Member/helpers";
import { MemberAbility } from "../../types-queries/Member/MemberAbility";
import { MemberItem } from "../../types-queries/Member/MemberItem";
import { MemberMove } from "../../types-queries/Member/MemberMove";
import { MemberNature } from "../../types-queries/Member/MemberNature";
import { MemberPokemon } from "../../types-queries/Member/MemberPokemon";

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
  importedMembers: PokemonSet<string>[]
  failedImport: boolean
}

export type Team = {
  [gen in GenNum]: TeamInGen
}

const EMPTY_TEAM = [null, null, null, null, null, null];

const EMPTY_TEAM_IN_GEN: TeamInGen = {
  savedPokemon: {
    pinnedBoxes: {},
    quickSearch: {},
  },
  members: [...EMPTY_TEAM],
  memberIcons: [...EMPTY_TEAM],
  selectedMember: null,
  importedMembers: [],
  failedImport: false,
}

export const DEFAULT_TEAM: Team = {
  1: { ...EMPTY_TEAM_IN_GEN, },
  2: { ...EMPTY_TEAM_IN_GEN, },
  3: { ...EMPTY_TEAM_IN_GEN, },
  4: { ...EMPTY_TEAM_IN_GEN, },
  5: { ...EMPTY_TEAM_IN_GEN, },
  6: { ...EMPTY_TEAM_IN_GEN, },
  7: { ...EMPTY_TEAM_IN_GEN, },
  8: { ...EMPTY_TEAM_IN_GEN, },
}

const stateWithModifiedMember = (state: Team, gen: GenNum, modifiedMember: MemberPokemon, idx: number) => {
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
      gen: GenNum
      pokemon: PokemonIconDatum[]
      note: string
    }
  }
// Unpin cart box from team
| {
    type: 'unpin_box',
    payload: {
      gen: GenNum
      note: string,
    }
  }
// Toggle whether Pokemon is included in savedPokemon.quickSearch
| {
    type: 'toggle_save'
    payload: {
      gen: GenNum
      pokemon: PokemonIconDatum
    }
  }
// Replace icon in team[gen].memberIcons[idx] with pokemon
| {
    type: 'replace_icon'
    payload: {
      gen: GenNum
      pokemon: PokemonIconDatum
      idx: number
    }
  }
// Replace member in team[gen].members[idx] with member (if the psIDs are different)
| {
    type: 'replace_member'
    payload: {
      gen: GenNum
      member: MemberPokemon
      idx: number
    }
  }
// Remove member in slot idx, as well as its icon
| {
    type: 'remove_member'
    payload: {
      gen: GenNum
      idx: number
    }
  }
| {
    type: 'clear_team'
    payload: {
      gen: GenNum
    }
  }
// Member actions
// #region
| {
    type: 'assign_ability'
    payload: {
      gen: GenNum
      idx: number,
      ability: MemberAbility
    }
  }
| {
    type: 'assign_item'
    payload: {
      gen: GenNum
      idx: number,
      item: MemberItem
    }
  }
| {
    type: 'assign_move'
    payload: {
      gen: GenNum
      idx: number
      move: MemberMove
      moveIdx: MoveSlot
    }
  }
| {
    type: 'assign_nickname'
    payload: {
      gen: GenNum
      idx: number
      nickname: string
    }
  }
| {
    type: 'assign_level'
    payload: {
      gen: GenNum
      idx: number
      newValue: number
    }
  }
| {
    type: 'assign_gender'
    payload: {
      gen: GenNum
      idx: number
      gender: GenderName
    }
  }
| {
    type: 'toggle_shiny'
    payload: {
      gen: GenNum
      idx: number
    }
  }
| {
    type: 'assign_happiness'
    payload: {
      gen: GenNum
      idx: number
      newValue: number
    }
  }
| {
    type: 'assign_nature'
    payload: {
      gen: GenNum
      idx: number
      nature: MemberNature
    }
  }
| {
    type: 'assign_ev'
    payload: {
      gen: GenNum
      idx: number
      stat: BaseStatName
      newValue: number
    }
  }
| {
    type: 'assign_iv'
    payload: {
      gen: GenNum
      idx: number
      stat: BaseStatName
      newValue: number
    }
  }
| {
    type: 'assign_cosmetic_form'
    payload: {
      gen: GenNum,
      idx: number,
      psID: string,
    }
  }
| {
  type: 'assign_hp_type'
  payload: {
      gen: GenNum,
      idx: number,
      typeName: TypeName
    }
  }
// #endregion
// Importing
// #region
| {
    type: 'import'
    payload: {
      gen: GenNum
      importString: string
    }
  }
| {
    type: 'clear_import'
    payload: {
      gen: GenNum
    }
  }
| {
    type: 'add_imported_members'
    payload: {
      gen: GenNum
      newMembers: MemberPokemon[]
    }
  }
// #endregion

export function teamReducer(state: Team, action: TeamAction): Team {
  let gen: GenNum;
  let note: string;
  let pokemon: PokemonIconDatum;
  let member: MemberPokemon;
  let psID: string;
  let newState: Team;

  let idx: number;
  let moveIdx: MoveSlot;

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

    case 'clear_team':
      gen = action.payload.gen;
      return {
        ...state,
        [gen]: {
          ...state[gen],
          members: [...EMPTY_TEAM],
          memberIcons: [...EMPTY_TEAM],
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

    case 'assign_hp_type':
      gen = action.payload.gen;
      idx = action.payload.idx;
      const hpType = action.payload.typeName;

      modifiedMember = state[gen].members[idx]?.copy();
      if (!modifiedMember) return state;

      try {
        modifiedMember.assignHPType(hpType);
      }
      catch {
        return state;
      }

      return stateWithModifiedMember(state, gen, modifiedMember, idx);
      

    // #endregion 

    // Importing
    // #region

    case 'import':
      gen = action.payload.gen;
      const importString = action.payload.importString;

      const sets = importString.split(/\n\n+/)
        // Filter out empty parts
        .filter(d => d)
        // Get set for each member
        .map(member => Sets.importSet(member));

      // Check that all sets are properly parsed
      try {
        for (let set of sets) {
          // Set should be defined
          if (set === undefined) throw new Error();
          // Set shouldn't have space in name
          else if (set.species.includes(' ')) throw new Error();
        }
      }
      catch {
        return {
          ...state,
          [gen]: {
            ...state[gen],
            failedImport: true,
          }
        }
      }

      return {
        ...state,
        [gen]: {
            ...state[gen],
            // Filter out sets with missing name
            importedMembers: sets.filter(set => {
              return ('' + set.species).toLowerCase().replace(/[^a-z0-9]+/g, '');
            }),
            failedImport: false,
          },
      };

    case 'clear_import':
      gen = action.payload.gen;

      // If no imported members, and 'failedImport' flag is false, do nothing
      if (state[gen].importedMembers.length === 0 && !state[gen].failedImport) return state;

      // Otherwise, clear imported members, and remove 'failedImport' flag
      return {
        ...state,
        [gen]: {
          ...state[gen],
          importedMembers: [],
          failedImport: false,
        },
      };

    case 'add_imported_members':
      gen = action.payload.gen;
      const newMembers = action.payload.newMembers;
      let currentTeam = [...state[gen].members];

      for (let newMember of newMembers) {
        // Search for next open slot
        const openSlotIdx = currentTeam.indexOf(null);

        // If there is no open slot, continue
        if (openSlotIdx === -1) continue;

        // If there is an open slot, add in newMember to that slot
        currentTeam = [
          ...currentTeam.slice(0, openSlotIdx),
          newMember,
          ...currentTeam.slice(openSlotIdx + 1)
        ];
      }

      // Return state with new members, and clear the import
      return {
        ...state,
        [gen]: {
          ...state[gen],
          members: currentTeam,
          memberIcons: currentTeam.map(member => member?.iconDatum !== undefined ? member.iconDatum : null),
          importedMembers: [],
          failedImport: false,
        },
      };

    // #endregion

    default:
      throw new Error();
  }
}
