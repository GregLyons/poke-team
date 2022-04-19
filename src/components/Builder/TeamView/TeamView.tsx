import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useEventListener, useIsMounted } from "usehooks-ts";
import { toggleBGPulse } from "../../../hooks/App/BGManager";
import { Team } from "../../../hooks/App/Team";
import { BaseStatName } from "../../../types-queries/entities";
import { PokemonIconDatum, TypeName } from "../../../types-queries/helpers";
import { GenderName, MoveSlot } from "../../../types-queries/Member/helpers";
import { MemberAbility } from "../../../types-queries/Member/MemberAbility";
import { MemberItem } from "../../../types-queries/Member/MemberItem";
import { MemberMove } from "../../../types-queries/Member/MemberMove";
import { MemberNature } from "../../../types-queries/Member/MemberNature";
import { Dispatches, Filters } from "../../App";
import MemberDetails from "./MemberDetails/MemberDetails";
import ReferencePanel from "./ReferencePanel/ReferencePanel";
import TeamMembers from "./TeamIcons/TeamMembers";
import './TeamView.css';


type TeamViewProps = {
  dispatches: Dispatches
  filters: Filters
  team: Team
}

// Reference panel 
// #region

export type ReferencePanelMode =
| 'POKEMON'
| 'ABILITY'
| 'ITEM'
| 'MOVE'
| 'NATURE'
| 'EV'
| 'IV'
| 'HP'

export type ReferencePanelView = {
  mode: ReferencePanelMode
  idx: number
} | null

export type SavedPokemonClickHandlers = {
  onUnpinClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, note: string) => void
  onRemoveClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, pokemonIconDatum: PokemonIconDatum) => void
  onPokemonSelect: (e: React.MouseEvent<HTMLElement, MouseEvent>, pokemonIconDatum: PokemonIconDatum) => void
}

export type AbilitySelectHandlers = {
  onAbilitySelect: (e: React.MouseEvent<HTMLElement, MouseEvent> | KeyboardEvent, ability: MemberAbility) => void
}

export type ItemSelectHandlers = {
  onItemSelect: (e: React.MouseEvent<HTMLElement, MouseEvent> | KeyboardEvent, item: MemberItem) => void
}

export type MoveSelectHandlers = {
  onMoveSelect: (e: React.MouseEvent<HTMLElement, MouseEvent> | KeyboardEvent, move: MemberMove) => void
}

export type NatureSelectHandlers = {
  onNatureSelect: (e: React.MouseEvent<HTMLElement, MouseEvent> | KeyboardEvent, nature: MemberNature) => void
}

export type SpreadHandlers = {
  updateEV: (statName: BaseStatName, newValue: number) => void
  updateIV: (statName: BaseStatName, newValue: number) => void
  onSpreadFinish: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export type HPSelectHandlers = {
  onHPSelect: (e: React.MouseEvent<HTMLElement, MouseEvent> | KeyboardEvent, typeName: TypeName) => void
}

export type ReferencePanelHandlers = {
  savedPokemonClickHandlers: SavedPokemonClickHandlers
  abilitySelectHandlers: AbilitySelectHandlers
  itemSelectHandlers: ItemSelectHandlers
  moveSelectHandlers: MoveSelectHandlers
  natureSelectHandlers: NatureSelectHandlers
  spreadHandlers: SpreadHandlers
  hpSelectHandlers: HPSelectHandlers
}

// #endregion

// Team icons
// #region

export type TeamMembersClickHandlers = {
  onAddClick: (e: React.MouseEvent<HTMLElement, MouseEvent> | KeyboardEvent, idx: number) => void
  onMemberClick: (e: React.MouseEvent<HTMLElement, MouseEvent> | KeyboardEvent, idx: number) => void
}

// #endregion

// Member details
// #region

export type TeamViewRefKey =
| 'member'
| 'ability'
| 'item'
| 'move'
| 'evs'
| 'ivs'
| 'nature'
| 'hp'
| null;

export type MemberDetailsHandlers = {
  onAbilityClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onItemClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onMoveClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, moveslot: MoveSlot) => void
  onNatureClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onEVsClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onIVsClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onHPClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void

  updateNickname: (e: React.ChangeEvent<HTMLInputElement>) => void
  updateLevel: (newValue: number) => void
  updateGender: (newValue: boolean | null) => void
  toggleShiny: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  updateHappiness: (newValue: number) => void

  updateCosmeticForm: (psID: string) => void
}

// #endregion

const TeamView = ({
  dispatches,
  filters,
  team,
}: TeamViewProps) => {
  const isMounted = useIsMounted();

  // Position of the currently selected member
  const [memberSlot, setMemberSlot] = useState<number | null>(null);
  // Determines what is shown in ReferencePanel
  const [view, setView] = useState<ReferencePanelView>(null);

  // Focus management for closing reference panel
  // #region

  // refKey determines which element in MemberDetails or TeamIcons receives focusRef
  const [refKey, setRefKey] = useState<TeamViewRefKey>(null);
  const focusRef = useRef<HTMLDivElement>(null);

  // When reference panel closes, focus on focusRef and set refKey to null
  const focusPrevious = useCallback(() => {
    if (!focusRef.current) return;
  
    const wrapperEl = focusRef.current;
    const firstInteractiveEl = wrapperEl.querySelector("button:not(:disabled), input") as HTMLElement;

    // If the 'Enter' key is pressed to complete a search, e.g. for selecting an Ability, then focusing immediately would cause the button in MemberDetails to be pressed _again_, reopening the view in ReferencePanel. Thus, we add a small delay to prevent this
    if (firstInteractiveEl) setTimeout(() => isMounted() && firstInteractiveEl.focus(), 5);

    setRefKey(null);
  }, [focusRef, setRefKey, isMounted, ]);

  // #endregion

  // Focusing on member's first detail when member is clicked
  // #region

  const nicknameRef = useRef<HTMLDivElement>(null);
  const focusNickname = useCallback(() => {
    if (!nicknameRef.current) return;
  
    const wrapperEl = nicknameRef.current;
    const firstInteractiveEl = wrapperEl.querySelector("input:not(:disabled)") as HTMLElement;

    if (firstInteractiveEl) firstInteractiveEl.focus();

    setView(null);
    setRefKey(null);
  }, [nicknameRef, setRefKey, setView]);

  // #endregion

  const referencePanelClickHandlers: ReferencePanelHandlers = useMemo(() => {
    // Saved Pokemon
    // #region

    const onUnpinClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, note: string) => {
      e.preventDefault();
      dispatches.dispatchTeam({
        type: 'unpin_box',
        payload: {
          gen: filters.genFilter.gen,
          note,
        }
      });

      toggleBGPulse(dispatches.dispatchBGManager);
    };

    const onRemoveClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, pokemonIconDatum: PokemonIconDatum) => {
      e.preventDefault();
      dispatches.dispatchTeam({
        type: 'toggle_save',
        payload: {
          gen: filters.genFilter.gen,
          pokemon: pokemonIconDatum,
        },
      });
    }

    const onPokemonSelect = (e: React.MouseEvent<HTMLElement, MouseEvent>, pokemonIconDatum: PokemonIconDatum, ) => {
      if (!view) return;

      // If a slot is selected, then add Pokemon to that slot
      if (view.mode === 'POKEMON' && memberSlot !== null) dispatches.dispatchTeam({
        type: 'replace_icon',
        payload: {
          gen: filters.genFilter.gen,
          pokemon: pokemonIconDatum,
          idx: view.idx,
        }
      });

      // Select slot
      setMemberSlot(view.idx);

      // Selecting Pokemon will pull it up in member details, and this focuses on the nickname; this replaces focusPrevious
      setTimeout(() => isMounted() && focusNickname(), 15);

      return setView(null);
    }

    // #endregion

    // Move select
    // #region

    const onAbilitySelect = (e: React.MouseEvent<HTMLElement, MouseEvent> | KeyboardEvent, ability: MemberAbility) => {
      if (!view || view.mode !== 'ABILITY' || memberSlot === null) return;

      // Replace ability on selected member
      dispatches.dispatchTeam({
        type: 'assign_ability',
        payload: {
          gen: filters.genFilter.gen,
          idx: memberSlot,
          ability,
        }
      });

      focusPrevious();
      return setView(null);
    }

    const onItemSelect = (e: React.MouseEvent<HTMLElement, MouseEvent> | KeyboardEvent, item: MemberItem) => {
      if (!view || view.mode !== 'ITEM' || memberSlot === null) return;

      // Replace item on selected member
      dispatches.dispatchTeam({
        type: 'assign_item',
        payload: {
          gen: filters.genFilter.gen,
          idx: memberSlot,
          item,
        }
      });

      focusPrevious();
      return setView(null);
    }

    const onMoveSelect = (e: React.MouseEvent<HTMLElement, MouseEvent> | KeyboardEvent, move: MemberMove) => {
      if (!view || view.mode !== 'MOVE' || memberSlot === null) return;

      // Replace move in slot moveIdx on selected member
      dispatches.dispatchTeam({
        type: 'assign_move',
        payload: {
          gen: filters.genFilter.gen,
          idx: memberSlot,
          move,
          moveIdx: (view.idx as MoveSlot),
        }
      });
      
      focusPrevious();
      return setView(null);
    }

    // #endregion

    // Stats
    // #region 

    const onNatureSelect = (e: React.MouseEvent<HTMLElement, MouseEvent> | KeyboardEvent, memberNature: MemberNature) => {
      if (memberSlot === null) return;

      dispatches.dispatchTeam({
        type: 'assign_nature',
        payload: {
          gen: filters.genFilter.gen,
          idx: memberSlot,
          nature: memberNature,
        }
      });

      focusPrevious();
      return setView(null);
    }

    const updateEV = (stat: BaseStatName, newValue: number) => {
      if (memberSlot === null) return;

      dispatches.dispatchTeam({
        type: 'assign_ev',
        payload: {
          gen: filters.genFilter.gen,
          idx: memberSlot,
          stat,
          newValue,
        }
      });
    };

    const updateIV = (stat: BaseStatName, newValue: number) => {
      if (memberSlot === null) return;

      dispatches.dispatchTeam({
        type: 'assign_iv',
        payload: {
          gen: filters.genFilter.gen,
          idx: memberSlot,
          stat,
          newValue,
        }
      });
    };

    const onSpreadFinish = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (memberSlot === null) return;

      // In Gen 2, may need to re-assign Attack DV
      if (filters.genFilter.gen === 2) {
        dispatches.dispatchTeam({
          type: 'reassign_attack_dv',
          payload: {
            gen: filters.genFilter.gen,
            idx: memberSlot,
          }
        });
      }

      focusPrevious();
      return setView(null);
    }

    const onHPSelect = (e: React.MouseEvent<HTMLElement, MouseEvent> | KeyboardEvent, typeName: TypeName) => {
      if (memberSlot === null) return;

      dispatches.dispatchTeam({
        type: 'assign_hp_type',
        payload: {
          gen: filters.genFilter.gen,
          idx: memberSlot,
          typeName,
        }
      });
      
      focusPrevious();
      return setView(null);
    };

    // #endregion

    return {
      savedPokemonClickHandlers: {
        onRemoveClick,
        onUnpinClick, 
        onPokemonSelect,
      },
      abilitySelectHandlers: {
        onAbilitySelect,
      },
      itemSelectHandlers: {
        onItemSelect,
      },
      moveSelectHandlers: {
        onMoveSelect,
      },
      natureSelectHandlers: {
        onNatureSelect,
      },
      spreadHandlers: {
        updateEV,
        updateIV,
        onSpreadFinish,
      },
      hpSelectHandlers: {
        onHPSelect,
      },
    };
  }, [dispatches, filters, memberSlot, setMemberSlot, view, setView, focusNickname, focusPrevious, isMounted, ]);

  const teamMembersClickHandlers: TeamMembersClickHandlers = useMemo(() => {
    // On clicking AddIcon, open up savedPokemon in ReferencePanel
    const onAddClick = (e: React.MouseEvent<HTMLElement, MouseEvent> | KeyboardEvent, idx: number) => {
      e.preventDefault();

      // Slot has been selected
      setMemberSlot(idx);

      setRefKey('member');

      // Pokemon for user to choose from
      setView({ mode: 'POKEMON', idx, });
    }

    // On clicking the Pokemon icon, pull up that member's details
    const onMemberClick = (e: React.MouseEvent<HTMLElement, MouseEvent> | KeyboardEvent, idx: number) => {
      e.preventDefault();

      // Slot has been selected
      setMemberSlot(idx);

      setTimeout(() => focusNickname(), 5);
      
      // No need to interact with reference panel yet
      setView(null);
    }

    return {
      onAddClick,
      onMemberClick,
    }
  }, [setMemberSlot, setView, focusNickname, ]);

  const memberDetailHandlers: MemberDetailsHandlers = useMemo(() => {
    const onAbilityClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      if (memberSlot === null) return;

      // Abilities not present prior to gen 3
      if (filters.genFilter.gen < 3) return setView(null);

      setRefKey('ability');
      return setView({ mode: 'ABILITY', idx: 0, });
    };

    const onItemClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      if (memberSlot === null) return;

      // Held items not present prior to gen 2
      if (filters.genFilter.gen < 2) return setView(null);

      setRefKey('item');
      return setView({ mode: 'ITEM', idx: 0, });
    };

    const onMoveClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, moveslot: MoveSlot) => {
      e.preventDefault();
      if (memberSlot === null) return;

      setRefKey('move');
      return setView({ mode: 'MOVE', idx: moveslot });
    };

    const onNatureClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      if (memberSlot === null) return;
      
      // Natures not present prior to gen 3
      if (filters.genFilter.gen < 3) return setView(null);
      
      setRefKey('nature');
      return setView({ mode: 'NATURE', idx: 0, });
    };

    const onEVsClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      if (memberSlot === null) return;
      
      
      setRefKey('evs');
      return setView({ mode: 'EV', idx: 0, });

    }

    const onIVsClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      if (memberSlot === null) return;
      
      setRefKey('ivs');
      return setView({ mode: 'IV', idx: 0, });
    }

    const onHPClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      if (memberSlot === null) return;
      
      setRefKey('hp');
      return setView({ mode: 'HP', idx: 0, });
    }

    const updateNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (memberSlot === null) return;

      dispatches.dispatchTeam({
        type: 'assign_nickname',
        payload: {
          gen: filters.genFilter.gen,
          idx: memberSlot,
          nickname: e.target.value,
        }
      });
    };

    const updateLevel = (newValue: number) => {
      if (memberSlot === null) return;

      dispatches.dispatchTeam({
        type: 'assign_level',
        payload: {
          gen: filters.genFilter.gen,
          idx: memberSlot,
          newValue,
        }
      });
    };

    const updateGender = (newValue: boolean | null) => {
      if (memberSlot === null) return;

      let gender: GenderName;
      switch(newValue) {
        case null:
          gender = 'M';
          break;
        case true:
          gender = 'F';
          break;
        case false:
          gender = 'N';
          break;
      };

      dispatches.dispatchTeam({
        type: 'assign_gender',
        payload: {
          gen: filters.genFilter.gen,
          idx: memberSlot,
          gender,
        }
      });
    };

    const toggleShiny = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      if (memberSlot === null) return;

      dispatches.dispatchTeam({
        type: 'toggle_shiny',
        payload: {
          gen: filters.genFilter.gen,
          idx: memberSlot,
        }
      });
    };

    const updateHappiness = (newValue: number) => {
      if (memberSlot === null) return;

      dispatches.dispatchTeam({
        type: 'assign_happiness',
        payload: {
          gen: filters.genFilter.gen,
          idx: memberSlot,
          newValue,
        }
      });
    };

    const updateCosmeticForm = (psID: string) => {
      if (memberSlot === null) return;

      dispatches.dispatchTeam({
        type: 'assign_cosmetic_form',
        payload: {
          gen: filters.genFilter.gen,
          idx: memberSlot,
          psID,
        }
      });
    };

    return {
      onAbilityClick,
      onItemClick,
      onMoveClick,
      onNatureClick,
      onEVsClick,
      onIVsClick,
      onHPClick,

      updateNickname,
      updateLevel,
      updateGender,
      toggleShiny,
      updateHappiness,

      updateCosmeticForm,
    };
  }, [dispatches, filters, setView, memberSlot, ]);

  // When genFilter changes, clear memberSlot
  useEffect(() => {
    setMemberSlot(null);
  }, [filters.genFilter.gen]);

  // Pressing Shift + a number key between 1-6 selects the corresponding member if focus is within TeamView
  const onNumberPress = useCallback((e: KeyboardEvent) => {
    const memberSlots = ['!', '@', '#', '$', '%', '^']; 
    if (!memberSlots.includes(e.key)) return;

    let memberIdx: number;
    switch(e.key) {
      case '!':
        memberIdx = 0;
        break;
        
      case '@':
        memberIdx = 1;
        break;

      case '#':
        memberIdx = 2;
        break;

      case '$':
        memberIdx = 3;
        break;

      case '%':
        memberIdx = 4;
        break;

      case '^':
        memberIdx = 5;
        break;

      default:
        return;
    }

    if (team[filters.genFilter.gen].members[memberIdx]) return teamMembersClickHandlers.onMemberClick(e, memberIdx);
    
    return teamMembersClickHandlers.onAddClick(e, memberIdx);
  }, [team, filters, teamMembersClickHandlers, ]);
  useEventListener('keydown', onNumberPress);

  return (
    <div
      className="team-view__wrapper"
    >
      <TeamMembers
        focusRef={focusRef}
        refKey={refKey}
        slot={memberSlot}
        clickHandlers={teamMembersClickHandlers}
        team={team}
        dispatches={dispatches}
        filters={filters}
        view={view}
      />
      <MemberDetails
        nicknameRef={nicknameRef}
        focusRef={focusRef}
        refKey={refKey}
        dispatches={dispatches}
        filters={filters}
        handlers={memberDetailHandlers}
        memberSlot={memberSlot}
        team={team}
        view={view}
      />
      <ReferencePanel
        handlers={referencePanelClickHandlers}
        dispatches={dispatches}
        filters={filters}
        team={team}
        view={view}
        psID={memberSlot !== null
          ? team[filters.genFilter.gen].members[memberSlot]?.psID
          : ''
        }
        member={memberSlot !== null
          ? team[filters.genFilter.gen].members[memberSlot]
          : undefined
        }
      />
    </div>
  )
}

export default TeamView;