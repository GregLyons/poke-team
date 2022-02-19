import { useEffect, useMemo, useState } from "react";
import { BGManager, classWithBG, classWithBGShadow, toggleBGPulse } from "../../../hooks/App/BGManager";
import { Team } from "../../../hooks/App/Team";
import { Dispatches, Filters } from "../../App";
import ReferencePanel from "./ReferencePanel/ReferencePanel";
import MemberDetails from "./MemberDetails/MemberDetails";
import TeamIcons from "./TeamIcons/TeamIcons";

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

export type ReferencePanelView =
| 'POKEMON'
| 'ABILITY'
| 'ITEM'
| 'STATS'
| 'MOVESLOT 1' | 'MOVESLOT 2' | 'MOVESLOT 3' | 'MOVESLOT 4';

export type CartClickHandlers = {
  onUnpinClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, note: string) => void
}

export type QuickSearchClickHandlers = {
  onRemoveClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, pokemonIconDatum: PokemonIconDatum) => void
}

export type SavedPokemonClickHandlers = {
  cartClickHandlers: CartClickHandlers
  quickSearchClickHandlers: QuickSearchClickHandlers
}

export type ReferencePanelClickHandlers = {
  savedPokemonClickHandlers: SavedPokemonClickHandlers
}

// #endregion

// Team icons
// #region

export type TeamIconsClickHandlers = {
  onMemberClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
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
  const [view, setView] = useState<ReferencePanelView>('POKEMON');

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

    // #endregion

    // Team icons
    // #region

    // #endregion

    return {
      savedPokemonClickHandlers: {
        quickSearchClickHandlers: {
          onRemoveClick,
        },
        cartClickHandlers: {
          onUnpinClick, 
        },
      },
    };
  }, [dispatches, filters, team]);

  const teamIconsClickHandlers: TeamIconsClickHandlers = useMemo(() => {
    const onMemberClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      setView('POKEMON');
    }

    return {
      onMemberClick,
    }
  }, [dispatches, filters, team]);

  const memberDetailClickHandlers: MemberDetailClickHandlers = useMemo(() => {
    const onAbilityClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      setView('ABILITY');
    }

    const onItemClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      setView('ITEM');
    }

    const onMoveClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, moveslot: 1 | 2 | 3 | 4) => {
      e.preventDefault();
      setView(`MOVESLOT ${moveslot}`);
    }

    const onStatsClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      setView('STATS');
    }

    return {
      onAbilityClick,
      onItemClick,
      onMoveClick,
      onStatsClick,
    };
  }, [dispatches, filters, team, setView]);

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
      <TeamIcons
        team={team}
        dispatches={dispatches}
      />
    </div>
  )
}

export default TeamView;