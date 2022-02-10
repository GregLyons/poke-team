import { useEffect, useMemo } from "react";
import { Team } from "../../../hooks/App/Team";
import { PokemonIconDispatches, PokemonIconFilters } from "../../App";
import PinnedBoxAccordion from "./PinnedBoxAccordion/PinnedBoxAccordion";

type TeamViewProps ={
  dispatches: PokemonIconDispatches
  filters: PokemonIconFilters
  team: Team
}

export type PinnedBoxClickHandlers = {
  onUnpinClick: (e: React.MouseEvent<HTMLElement, MouseEvent>, note: string) => void
}

const TeamView = ({
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
    }

    return { onUnpinClick, };
  }, [dispatches, filters, team]);

  return (
    <div className="team-view__wrapper">
      yo
      <PinnedBoxAccordion
        clickHandlers={pinnedBoxClickHandlers}
        dispatches={dispatches}
        filters={filters}
        team={team}
      />
    </div>
  )
}

export default TeamView;