import { useEffect, useMemo } from "react";
import { BGManager, classWithBG, classWithBGShadow, toggleBGPulse } from "../../../hooks/App/BGManager";
import { Team } from "../../../hooks/App/Team";
import { Dispatches, Filters } from "../../App";
import PinnedBoxAccordion from "./ReferencePanel/PinnedBoxAccordion/PinnedBoxAccordion";
import ReferencePanel from "./ReferencePanel/ReferencePanel";
import TeamBuilder from "./TeamBuilder/TeamBuilder";

import './TeamView.css';

type TeamViewProps = {
  bgManager: BGManager
  dispatches: Dispatches
  filters: Filters
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
    <div className="team-view__wrapper">
      <TeamBuilder
        dispatches={dispatches}
        filters={filters}
        team={team}
      />
      <ReferencePanel
        clickHandlers={pinnedBoxClickHandlers}
        dispatches={dispatches}
        filters={filters}
        team={team}
      />
    </div>
  )
}

export default TeamView;