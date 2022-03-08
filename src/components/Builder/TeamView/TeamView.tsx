import { useEffect, useMemo, useState } from "react";
import { BGManager, toggleBGPulse } from "../../../hooks/App/BGManager";
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
  bgManager: BGManager
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
  onAddClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, idx: number) => void
  onMemberClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, idx: number) => void
}

// #endregion

// Member details
// #region

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
  updateGender: (newValue: GenderName) => void
  toggleShiny: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  updateHappiness: (newValue: number) => void

  updateCosmeticForm: (psID: string) => void
}

// #endregion

const TeamView = ({
  bgManager,
  dispatches,
  filters,
  team,
}: TeamViewProps) => {
  // Position of the currently selected member
  const [memberSlot, setMemberSlot] = useState<number | null>(null);
  // Determines what is shown in ReferencePanel
  const [view, setView] = useState<ReferencePanelView>(null);

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

      // De-select slot
      setMemberSlot(view.idx);
      
      // No longer in 'POKEMON' mode (but can still view saved boxes)
      setView(null);
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

      // Setting view to null clears the search bar, so that when we set the view back, the search bar will be cleared
      setView(null);

      // No longer selecting abilities
      return setView({
        mode: 'ITEM',
        idx: 0,
      });
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

      // Setting view to null clears the search bar, so that when we set the view back, the search bar will be cleared
      setView(null)

      // No longer selecting items
      return setView({
        mode: 'MOVE',
        idx: 0,
      });
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
      
      // Setting view to null clears the search bar, so that when we set the view back, the search bar will be cleared
      setView(null)

      // Select next move slot, if not at the end
      if (view.idx !== 3) return setView({
        mode: 'MOVE',
        idx: view.idx + 1,
      });

      // Otherwise, move onto nature
      return setView({
        mode: 'NATURE',
        idx: 0,
      });
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

      // Move on to EV
      return setView({
        mode: 'EV',
        idx: 0,
      });
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

      // Move on to EV
      return setView({
        mode: 'EV',
        idx: 0,
      });
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
      },
      hpSelectHandlers: {
        onHPSelect,
      },
    };
  }, [dispatches, filters, team, memberSlot, setMemberSlot, view, setView, ]);

  const teamMembersClickHandlers: TeamMembersClickHandlers = useMemo(() => {
    // On clicking AddIcon, open up savedPokemon in ReferencePanel
    const onAddClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, idx: number) => {
      e.preventDefault();

      // Slot has been selected
      setMemberSlot(idx);

      // Pokemon for user to choose from
      setView({ mode: 'POKEMON', idx, });
    }

    // On clicking the Pokemon icon, pull up that member's details
    const onMemberClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, idx: number) => {
      e.preventDefault();

      // Slot has been selected
      setMemberSlot(idx);

      // No need to interact with reference panel yet
      setView(null);
    }

    return {
      onAddClick,
      onMemberClick,
    }
  }, [dispatches, filters, team, view, setMemberSlot, setView, ]);

  const memberDetailHandlers: MemberDetailsHandlers = useMemo(() => {
    const onAbilityClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      if (memberSlot === null) return;

      // Abilities not present prior to gen 3
      if (filters.genFilter.gen < 3) return setView(null);

      return setView({ mode: 'ABILITY', idx: 0, });
    };

    const onItemClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      if (memberSlot === null) return;

      // Held items not present prior to gen 2
      if (filters.genFilter.gen < 2) return setView(null);

      return setView({ mode: 'ITEM', idx: 0, });
    };

    const onMoveClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, moveslot: MoveSlot) => {
      e.preventDefault();
      if (memberSlot === null) return;

      return setView({ mode: 'MOVE', idx: moveslot });
    };

    const onNatureClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      if (memberSlot === null) return;
      
      // Natures not present prior to gen 3
      if (filters.genFilter.gen < 3) return setView(null);
      
      return setView({ mode: 'NATURE', idx: 0, });
    };

    const onEVsClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      if (memberSlot === null) return;
      
      // EVs not present prior to gen 3
      if (filters.genFilter.gen < 3) return setView(null);
      
      return setView({ mode: 'EV', idx: 0, });

    }

    const onIVsClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      if (memberSlot === null) return;
      
      return setView({ mode: 'IV', idx: 0, });
    }

    const onHPClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      if (memberSlot === null) return;
      
      return setView({ mode: 'HP', idx: 0, });
    }

    // TODO: connect to ability
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

    const updateGender = (newValue: GenderName) => {
      if (memberSlot === null) return;

      dispatches.dispatchTeam({
        type: 'assign_gender',
        payload: {
          gen: filters.genFilter.gen,
          idx: memberSlot,
          gender: newValue,
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
  }, [dispatches, filters, team, setView, view, memberSlot, ]);

  // When genFilter changes, clear memberSlot
  useEffect(() => {
    setMemberSlot(null);
  }, [filters.genFilter.gen]);

  return (
    <div className="team-view__wrapper">
      <MemberDetails
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
      <TeamMembers
        slot={memberSlot}
        clickHandlers={teamMembersClickHandlers}
        team={team}
        dispatches={dispatches}
        filters={filters} 
      />
    </div>
  )
}

export default TeamView;