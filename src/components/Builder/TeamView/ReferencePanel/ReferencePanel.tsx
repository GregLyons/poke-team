import { Team } from "../../../../hooks/App/Team";
import { Dispatches, Filters } from "../../../App";
import { ReferencePanelClickHandlers, ReferencePanelView } from "../TeamView";

import './ReferencePanel.css';

type ReferencePanelProps = {
  clickHandlers: ReferencePanelClickHandlers
  dispatches: Dispatches
  filters: Filters
  team: Team
  view: ReferencePanelView
}

const ReferencePanel = ({
  clickHandlers,
  dispatches,
  filters,
  team,
  view,
}: ReferencePanelProps) => {
  return (
    <div
      className="reference-panel__wrapper"
    >
      <div className="reference-panel__content">
        <div className="reference-panel__header">
          {view}
        </div>
      </div>
    </div>
  )
};

export default ReferencePanel