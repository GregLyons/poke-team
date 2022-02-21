import { useEffect, useMemo, useState } from "react";
import { BGManager, classWithBG, classWithBGShadow, toggleBGPulse } from "../../../hooks/App/BGManager";
import { Team } from "../../../hooks/App/Team";
import { Dispatches, Filters } from "../../App";
import ReferencePanel from "./ReferencePanel/ReferencePanel";
import MemberDetails from "./MemberDetails/MemberDetails";
import TeamMembers from "./TeamIcons/TeamMembers";

import './TeamView.css';
import { PokemonIconDatum } from "../../../types-queries/helpers";

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

export type ReferencePanelClickHandlers = {
  savedPokemonClickHandlers: SavedPokemonClickHandlers
}

// #endregion

// Team icons
// #region

export type TeamMembersClickHandlers = {
  onAddClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, idx: number) => void
}

// #endregion

// Member details
// #region

export type MemberDetailClickHandlers = {
  onAbilityClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onItemClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onMoveClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, moveslot: 1 | 2 | 3 | 4) => void
  onStatsClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

// #endregion

const TeamView = ({
  bgManager,
  dispatches,
  filters,
  team,
}: TeamViewProps) => {
  const [slot, setSlot] = useState<number | null>(null);
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
      if (view.mode === 'POKEMON' && slot !== null) dispatches.dispatchTeam({
        type: 'replace_icon',
        payload: {
          gen: filters.genFilter.gen,
          pokemon: pokemonIconDatum,
          idx: view.idx,
        }
      });

      // De-select slot
      setSlot(null);
      
      // No longer in 'POKEMON' mode (but can still view saved boxes)
      setView(null);
    }

    // #endregion

    // Team icons
    // #region

    // #endregion

    return {
      savedPokemonClickHandlers: {
        onRemoveClick,
        onUnpinClick, 
        onPokemonSelect,
      },
    };
  }, [dispatches, filters, team, slot, setSlot, ]);

  const teamMembersClickHandlers: TeamMembersClickHandlers = useMemo(() => {
    // On clicking AddIcon, open up savedPokemon in ReferencePanel
    const onAddClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, idx: number) => {
      e.preventDefault();

      // Slot has been selected
      setSlot(idx);

      // Pokemon for user to choose from
      setView({ mode: 'POKEMON', idx, });
    }

    return {
      onAddClick,
    }
  }, [dispatches, filters, team, view]);

  const memberDetailClickHandlers: MemberDetailClickHandlers = useMemo(() => {
    const onAbilityClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();

      setView({ mode: 'ABILITY', idx: 0, });
    }

    const onItemClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();

      setView({ mode: 'ITEM', idx: 0, });
    }

    const onMoveClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, moveslot: 1 | 2 | 3 | 4) => {
      e.preventDefault();

      setView({ mode: 'MOVE', idx: moveslot });
    }

    const onStatsClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();

      setView({ mode: 'STATS', idx: 0, });
    }

    return {
      onAbilityClick,
      onItemClick,
      onMoveClick,
      onStatsClick,
    };
  }, [dispatches, filters, team, setView, view]);

  return (
    <div className="team-view__wrapper">
      <MemberDetails
        dispatches={dispatches}
        filters={filters}
        clickHandlers={memberDetailClickHandlers}
      />
      <ReferencePanel
        clickHandlers={referencePanelClickHandlers}
        dispatches={dispatches}
        filters={filters}
        team={team}
        view={view}
      />
      <TeamMembers
        slot={slot}
        clickHandlers={teamMembersClickHandlers}
        team={team}
        dispatches={dispatches}
        filters={filters} 
      />
    </div>
  )
}

export default TeamView;