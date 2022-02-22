import { useEffect, useMemo, useState } from "react";
import { BGManager, classWithBG, classWithBGShadow, toggleBGPulse } from "../../../hooks/App/BGManager";
import { Team } from "../../../hooks/App/Team";
import { Dispatches, Filters } from "../../App";
import ReferencePanel from "./ReferencePanel/ReferencePanel";
import MemberDetails from "./MemberDetails/MemberDetails";
import TeamMembers from "./TeamIcons/TeamMembers";

import './TeamView.css';
import { PokemonIconDatum } from "../../../types-queries/helpers";
import { MemberPokemon } from "../../../types-queries/Builder/MemberPokemon";
import { MemberMove } from "../../../types-queries/Builder/MemberMove";
import { MemberAbility } from "../../../types-queries/Builder/MemberAbility";
import { MemberItem } from "../../../types-queries/Builder/MemberItem";

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
| 'STATS'
| 'MOVE'

export type ReferencePanelView = {
  mode: ReferencePanelMode
  idx: number
} | null

export type SavedPokemonClickHandlers = {
  onUnpinClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, note: string) => void
  onRemoveClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, pokemonIconDatum: PokemonIconDatum) => void
  onPokemonSelect: (e: React.MouseEvent<HTMLElement, MouseEvent>, pokemonIconDatum: PokemonIconDatum) => void
}

export type AbilitySelectClickHandlers = {
  onAbilitySelect: (e: React.MouseEvent<HTMLElement, MouseEvent>, ability: MemberAbility) => void
}

export type ItemSelectClickHandlers = {
  onItemSelect: (e: React.MouseEvent<HTMLElement, MouseEvent>, item: MemberItem) => void
}

export type MoveSelectClickHandlers = {
  onMoveSelect: (e: React.MouseEvent<HTMLElement, MouseEvent>, move: MemberMove, moveIdx: 0 | 1 | 2 | 3) => void
}

export type ReferencePanelClickHandlers = {
  savedPokemonClickHandlers: SavedPokemonClickHandlers
  abilitySelectClickHandlers: AbilitySelectClickHandlers
  itemSelectClickHandlers: ItemSelectClickHandlers
  moveSelectClickHandlers: MoveSelectClickHandlers
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

export type MemberDetailClickHandlers = {
  onAbilityClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onItemClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onMoveClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, moveslot: 0 | 1 | 2 | 3) => void
  onStatsClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
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
  // The currently selected member
  const [member, setMember] = useState<MemberPokemon | null>(null);
  // Determines what is shown in ReferencePanel
  const [view, setView] = useState<ReferencePanelView>(null);

  const referencePanelClickHandlers: ReferencePanelClickHandlers = useMemo(() => {
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
      setMemberSlot(null);
      
      // No longer in 'POKEMON' mode (but can still view saved boxes)
      setView(null);
    }

    // #endregion

    // Move select
    // #region

    const onAbilitySelect = (e: React.MouseEvent<HTMLElement, MouseEvent>, ability: MemberAbility) => {
      if (!view) return;

      // Replace ability on selected member
      if (view.mode === 'ABILITY' && member !== null && memberSlot !== null) {
        team[filters.genFilter.gen].members[memberSlot]?.assignAbility(ability);
      }

      // No longer selecting abilities
      setView(null);
    }

    const onItemSelect = (e: React.MouseEvent<HTMLElement, MouseEvent>, item: MemberItem) => {
      if (!view) return;

      // Replace item on selected member
      if (view.mode === 'ITEM' && member !== null && memberSlot !== null) {
        team[filters.genFilter.gen].members[memberSlot]?.assignItem(item);
      }

      // No longer selecting items
      setView(null);
    }

    const onMoveSelect = (e: React.MouseEvent<HTMLElement, MouseEvent>, move: MemberMove, moveIdx: 0 | 1 | 2 | 3) => {
      if (!view) return;

      // Replace move in slot moveIdx on selected member
      if (view.mode === 'MOVE' && member !== null && memberSlot !== null) {
        team[filters.genFilter.gen].members[memberSlot]?.assignMove(move, moveIdx);
      }

      // No longer selecting moves
      setView(null);
    }

    // #endregion

    return {
      savedPokemonClickHandlers: {
        onRemoveClick,
        onUnpinClick, 
        onPokemonSelect,
      },
      abilitySelectClickHandlers: {
        onAbilitySelect,
      },
      itemSelectClickHandlers: {
        onItemSelect,
      },
      moveSelectClickHandlers: {
        onMoveSelect,
      },
    };
  }, [dispatches, filters, team, memberSlot, setMemberSlot, setView, member, ]);

  const teamMembersClickHandlers: TeamMembersClickHandlers = useMemo(() => {
    // On clicking AddIcon, open up savedPokemon in ReferencePanel
    const onAddClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, idx: number) => {
      e.preventDefault();

      // No actual member has been selected yet, as the AddIcon only shows up if the slot is empty
      setMember(null)

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

      // Select clicked member
      setMember(team[filters.genFilter.gen].members[idx]);
    }

    return {
      onAddClick,
      onMemberClick,
    }
  }, [dispatches, filters, team, view, setMemberSlot, setView, setMember]);

  const memberDetailClickHandlers: MemberDetailClickHandlers = useMemo(() => {
    const onAbilityClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();

      if (member !== null) setView({ mode: 'ABILITY', idx: 0, });
    }

    const onItemClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();

      if (member !== null) setView({ mode: 'ITEM', idx: 0, });
    }

    const onMoveClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, moveslot: 0 | 1 | 2 | 3) => {
      e.preventDefault();

      if (member !== null) setView({ mode: 'MOVE', idx: moveslot });
    }

    const onStatsClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();

      if (member !== null) setView({ mode: 'STATS', idx: 0, });
    }

    return {
      onAbilityClick,
      onItemClick,
      onMoveClick,
      onStatsClick,
    };
  }, [dispatches, filters, team, setView, view, member]);

  return (
    <div className="team-view__wrapper">
      <MemberDetails
        dispatches={dispatches}
        filters={filters}
        clickHandlers={memberDetailClickHandlers}
        member={member}
        view={view}
      />
      <ReferencePanel
        clickHandlers={referencePanelClickHandlers}
        dispatches={dispatches}
        filters={filters}
        team={team}
        view={view}
        psID={member?.psID}
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