import { useEffect, useMemo } from "react";
import { BGManager, classWithBG, classWithBGShadow, toggleBGPulse } from "../../../hooks/App/BGManager";
import { Team } from "../../../hooks/App/Team";
import { PokemonIconDispatches, PokemonIconFilters } from "../../App";
import PinnedBoxAccordion from "./PinnedBoxAccordion/PinnedBoxAccordion";
import TeamBuilder from "./TeamBuilder/TeamBuilder";

import './TeamView.css';

type TeamViewProps = {
  bgManager: BGManager
  dispatches: PokemonIconDispatches
  filters: PokemonIconFilters
  team: Team
}

export type PinnedBoxClickHandlers = {
  onUnpinClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, note: string) => void
}

const TeamView = ({
  bgManager,
  dispatches,
  filters,
  team,
}: TeamViewProps) => {
  const pinnedBoxClickHandlers: PinnedBoxClickHandlers = useMemo(() => {
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

    return { onUnpinClick, };
  }, [dispatches, filters, team]);

  return (
    <div className={classWithBG("team-view__wrapper", bgManager)}>
      <div className={classWithBGShadow("team-builder__cell", bgManager)}>
        <TeamBuilder
        
        />
      </div>
      <div className={classWithBGShadow("pinned-boxes__cell", bgManager)}>
        <PinnedBoxAccordion
          clickHandlers={pinnedBoxClickHandlers}
          dispatches={dispatches}
          filters={filters}
          team={team}
        />
      </div>
    </div>
  )
}

export default TeamView;