import { Team } from "../../../../hooks/App/Team";
import { Dispatches, Filters } from "../../../App";
import { PinnedBoxClickHandlers } from "../TeamView";
import PinnedBoxAccordion from "./PinnedBoxAccordion/PinnedBoxAccordion";

import './ReferencePanel.css';

type ReferencePanelProps = {
  clickHandlers: PinnedBoxClickHandlers
  dispatches: Dispatches
  filters: Filters
  team: Team
};

const ReferencePanel = ({
  clickHandlers,
  dispatches,
  filters,
  team,
}: ReferencePanelProps) => {
  return (
    <div className="reference-panel__wrapper">
      <PinnedBoxAccordion
        clickHandlers={clickHandlers}
        dispatches={dispatches}
        filters={filters}
        team={team}
      />
    </div>
  )
};

export default ReferencePanel;