import { Team } from "../../../../hooks/App/Team";
import { Dispatches, Filters } from "../../../App";
import { ReferencePanelClickHandlers, ReferencePanelView } from "../TeamView";

import './ReferencePanel.css';
import SavedPokemonView from "./SavedPokemonView/SavedPokemonView";

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
      {/* Mimic text-on-border effect of other panels on the page */}
      <div className="reference-panel__padder">
        <div className="reference-panel__header">
          {view}
        </div>
        <div className="reference-panel__content">
          <SavedPokemonView
            clickHandlers={clickHandlers.savedPokemonClickHandlers}
            dispatches={dispatches}
            filters={filters}
            team={team}
          />
        </div>
      </div>
    </div>
  )
};

export default ReferencePanel