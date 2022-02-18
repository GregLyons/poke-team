import { useEffect, useMemo, useState } from "react";
import { BGManager, classWithBG, classWithBGShadow, toggleBGPulse } from "../../../hooks/App/BGManager";
import { Team } from "../../../hooks/App/Team";
import { Dispatches, Filters } from "../../App";
import ReferencePanel from "./ReferencePanel/ReferencePanel";
import MemberDetails from "./MemberDetails/MemberDetails";
import TeamIcons from "./TeamIcons/TeamIcons";

import './TeamView.css';

type TeamViewProps = {
  bgManager: BGManager
  dispatches: Dispatches
  filters: Filters
  team: Team
}

export type ReferencePanelView = 'POKEMON' | 'ABILITY' | 'ITEM' | 'MOVE' | 'STATS';

export type CartClickHandlers = {
  onUnpinClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, note: string) => void
}

export type TeamIconsClickHandlers = {
  onMemberClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, note: string) => void
}

export type MemberDetailClickHandlers = {
  onAbilityClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, note: string) => void
  onItemClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, note: string) => void
  onMoveClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, note: string) => void
  onStatsClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, note: string) => void
}

export type ReferencePanelClickHandlers = {
  cartClickHandlers: CartClickHandlers
  memberDetailClickHandlers: MemberDetailClickHandlers
}

const TeamView = ({
  bgManager,
  dispatches,
  filters,
  team,
}: TeamViewProps) => {
  const [view, setView] = useState<ReferencePanelView>('POKEMON');

  const referencePanelClickHandlers: ReferencePanelClickHandlers = useMemo(() => {
    // Pinned boxes
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

    // #endregion

    // Team icons
    // #region

    const onMemberClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      setView('POKEMON');
    }
    // #endregion

    // Member details 
    // #region

    const onAbilityClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      setView('ABILITY');
    }

    const onItemClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      setView('ITEM');
    }

    const onMoveClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      setView('MOVE');
    }

    const onStatsClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      setView('STATS');
    }

    // #endregion

    return {
      teamIconsClickHandlers: {
        onMemberClick,
      },
      cartClickHandlers: {
        onUnpinClick, 
      },
      memberDetailClickHandlers: {
        onAbilityClick,
        onItemClick,
        onMoveClick,
        onStatsClick,
      }
    };
  }, [dispatches, filters, team]);

  return (
    <div className="team-view__wrapper">
      <MemberDetails
        dispatches={dispatches}
        filters={filters}
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