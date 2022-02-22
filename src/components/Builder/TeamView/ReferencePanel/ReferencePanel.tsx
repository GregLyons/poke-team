import { Team } from "../../../../hooks/App/Team";
import { Dispatches, Filters } from "../../../App";
import { ReferencePanelClickHandlers, ReferencePanelMode, ReferencePanelView } from "../TeamView";

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
  let viewPanelMessage;
  switch(view?.mode) {
    case 'POKEMON':
      viewPanelMessage = `Select Member ${view.idx + 1}`;
      break;

    case 'MOVE':
      viewPanelMessage = `Select Move for slot ${view.idx + 1}`
      break;

    case 'ABILITY':
      viewPanelMessage = 'Select Ability';
      break;

    case 'ITEM':
      viewPanelMessage = 'Select Item';
      break;

    case 'STATS':
      viewPanelMessage = 'Set EVs, IVs, and Nature';
      break;

    default: 
      viewPanelMessage = 'Saved Pokemon';
  }

  return (
    <div
      className="reference-panel__wrapper"
    >
      {/* Mimic text-on-border effect of other panels on the page */}
      <div className="reference-panel__padder">
        <div className="reference-panel__header">
          {viewPanelMessage}
        </div>
        <div className="reference-panel__content">
          {(view?.mode === 'POKEMON' || view === null) && <SavedPokemonView
            view={view}
            clickHandlers={clickHandlers.savedPokemonClickHandlers}
            dispatches={dispatches}
            filters={filters}
            team={team}
          />}
        </div>
      </div>
    </div>
  )
};

export default ReferencePanel