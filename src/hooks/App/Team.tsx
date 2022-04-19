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

// Exceptions
// #region

const getMaxAttackDVForGender = (modifiedMember: MemberPokemon) => {
  const { gen, gender, femaleRate, } = modifiedMember;
  if (gen > 2) return 31;
  if (gen === 1 || gender !== 'F' || !femaleRate) return 15;
  if (femaleRate < 0.2) {
    return 1;
  }
  else if (femaleRate < 0.4) {
    return 4;
  }
  else if (femaleRate < 0.6) {
    return 7;
  }
  else if (femaleRate < 0.9) {
    return 11;
  }
  else {
    return 15;
  }
}

const SHINY_GEN2_VALID_ATTACK_DV = [2, 3, 6, 7, 10, 11, 14, 15];

const convertToValidShinyAttackDV = (attack: number, shiny: boolean | undefined) => {
  if (!shiny) return attack;
  if (SHINY_GEN2_VALID_ATTACK_DV.includes(attack)) return attack;
  else if (attack < 2) return 2;
  else if (attack < 6) return 6;
  else if (attack < 10) return 10;
  else if (attack < 14) return 14;
  else return attack;
}

// Marowak overflow glitch: if Gen 2 Marowak gets Thick Club and Swords Dance, then set Attack DV to 13 to prevent overflow.
const check_marowakGSC = (modifiedMember: MemberPokemon) => {
  if (
    modifiedMember.gen === 2
    && modifiedMember.psID === 'marowak'
    && modifiedMember.item?.psID === 'thickclub'
    && modifiedMember.moveset.map(move => move?.psID).includes('swordsdance')
  ) {
    if (modifiedMember.gender === 'F') {
      modifiedMember.assignIV('attack', 7);
    }
    else {
      // Largest valid attack DV to prevent overflow
      if (modifiedMember.shiny) {
        modifiedMember.assignIV('attack', 11);
      }
      else {
        modifiedMember.assignIV('attack', 13);
      }
    }
  }
}

// When Gen 2 Pokemon is set to Shiny, set Attack DV to 15 and other DVs to 10.
// If Pokemon is female with femaleRate 7:1, will set Pokemon to male
const check_shinyDVs = (modifiedMember: MemberPokemon) => {
  if (
    modifiedMember.gen === 2
    && modifiedMember.shiny
  ) {
    // Shiny, female, 7:1 femaleRate not possible
    if (modifiedMember.femaleRate && modifiedMember.femaleRate < 0.2) {
      modifiedMember.assignGender('M');
    }

    // Convert maximal attack DV based on gender, assuming shiny
    modifiedMember.assignIV('attack', 
      convertToValidShinyAttackDV(
        getMaxAttackDVForGender(modifiedMember), true
      )
    );
    modifiedMember.assignIV('defense', 10);
    modifiedMember.assignIV('specialAttack', 10);
    modifiedMember.assignIV('specialDefense', 10);
    modifiedMember.assignIV('speed', 10);

    if (modifiedMember.femaleRate < 0.2) modifiedMember.assignGender('M');
  }
  // If not shiny, set DVs to highest possible
  else if (
    modifiedMember.gen === 2
    && !modifiedMember.shiny
  ) {
    // Convert maximal attack DV based on gender, assuming shiny
    modifiedMember.assignIV('attack', 
      getMaxAttackDVForGender(modifiedMember)
    );
    modifiedMember.assignIV('defense', 15);
    modifiedMember.assignIV('specialAttack', 15);
    modifiedMember.assignIV('specialDefense', 15);
    modifiedMember.assignIV('speed', 15);

    // Only raise SD/TC Marowak's attack DV to 13
    check_marowakGSC(modifiedMember);
  }
}

// When Gen 2 Pokemon gender is set to F, set Attack DV to maximum possible
const check_genderDVs = (modifiedMember: MemberPokemon) => {
  if (
    modifiedMember.gen === 2
    && modifiedMember.gender === 'F'
  ) {
    // Shiny, female 7:1 femaleRate not possible
    if (modifiedMember.femaleRate && modifiedMember.femaleRate < 0.2) {
      modifiedMember.assignShiny(false);
    }
    
    // Convert maximal attack DV based on gender and shiny value
    modifiedMember.assignIV('attack',
      convertToValidShinyAttackDV(
        getMaxAttackDVForGender(modifiedMember), modifiedMember.shiny
      )
    );
  }
  else if (
    modifiedMember.gen === 2
    && modifiedMember.gender !== 'F'
  ) {
    modifiedMember.assignIV('attack', convertToValidShinyAttackDV(15, modifiedMember.shiny));

    // Only raise SD/TC Marowak's attack DV to 13
    check_marowakGSC(modifiedMember);
  }
}

// Given Gen 2 Pokemon, compute its maximum valid Attack DV
const getMaxValidGen2AttackDV = (modifiedMember: MemberPokemon) => {
  let maxValidAttack = 15;

  // If Pokemon is female, convert max attack DV based on femaleRate
  if (modifiedMember.gender === 'F') {
    maxValidAttack = getMaxAttackDVForGender(modifiedMember);
  }

  // If Pokemon is not shiny, then return true, otherwise return whether attack DV is valid for shiny
  const validShinyDV = !modifiedMember.shiny || SHINY_GEN2_VALID_ATTACK_DV.includes(maxValidAttack);

  // If valid shiny DV, return
  if (validShinyDV) return maxValidAttack;

  // maxValidAttack must be either 1 or 4, as getMaxAttackDVForGender returns 1, 4, 7, 11, or 15, the last three of which are valid shiny DVs
  // maxValidAttack cannot be 1, because a female 7:1 shiny is not possible; it's already precluded by check_genderDVs and check_shinyDVs
  // Thus, maxValidAttack must be 4, so we set to 3
  if (maxValidAttack === 4) return 3;
  // This last case shouldn't be possible, but we return something anyway
  else return 15;
}

// Sets Gen 2 Pokemon's attack DVs to maximum valid value
const reassignAttackDV = (modifiedMember: MemberPokemon) => {
  // Only consider Gen 2 Pokemon
  if (modifiedMember.gen !== 2) return;

  const attack = modifiedMember.ivs.attack;
  
  /* Attack DV is invalid if:

    (Pokemon is shiny AND invalid attack DV)
      OR
    (Pokemon is female AND attack DV larger than max possible for gender/femaleRate)
  */
  const invalid = (
    (modifiedMember.shiny && !SHINY_GEN2_VALID_ATTACK_DV.includes(attack))
    || (modifiedMember.gender === 'F' && attack > getMaxAttackDVForGender(modifiedMember))
  );
  
  // If Attack DV is valid, do nothing
  if (!invalid) return;
  // Otherwise, set Attack DV to maximum valid attack DV
  else modifiedMember.assignIV('attack', getMaxValidGen2AttackDV(modifiedMember));
}

// #endregion

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
// For Gen 2 specifically; determines whether attack DV is valid given gender/shiny value, and if invalid sets to maximum valid attack DV
| {
    type: 'reassign_attack_dv'
    payload: {
      gen: GenNum
      idx: number
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

      check_marowakGSC(modifiedMember);
      
      return stateWithModifiedMember(state, gen, modifiedMember, idx);

    case 'assign_move':
      gen = action.payload.gen;
      idx = action.payload.idx;
      moveIdx = action.payload.moveIdx;
      const move = action.payload.move;

      modifiedMember = state[gen].members[idx]?.copy();
      if (!modifiedMember) return state;
      modifiedMember.assignMove(move, moveIdx);

      check_marowakGSC(modifiedMember);

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

      check_shinyDVs(modifiedMember);

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

      check_genderDVs(modifiedMember);

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

    case 'reassign_attack_dv':
      gen = action.payload.gen;
      idx = action.payload.idx;

      modifiedMember = state[gen].members[idx]?.copy();
      if (!modifiedMember) return state;

      // If attack DV invalid, attempt to reassign attack DV to maximum valid attack DV
      try {
        reassignAttackDV(modifiedMember);
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
