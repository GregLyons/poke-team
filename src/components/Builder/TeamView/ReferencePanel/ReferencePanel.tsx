import { Team } from "../../../../hooks/App/Team";
import { Dispatches, Filters } from "../../../App";
import { ReferencePanelHandlers, ReferencePanelView, } from "../TeamView";
import AbilitySelectView from "./AbilitySelectView/AbilitySelectView";
import ItemSelectView from "./ItemSelectView/ItemSelectView";
import MoveSelectView from "./MoveSelectView/MoveSelectView";

import './ReferencePanel.css';
import SavedPokemonView from "./SavedPokemonView/SavedPokemonView";
import StatsView from "./NatureSelectView/NatureSelectView";
import NatureSelectView from "./NatureSelectView/NatureSelectView";

type ReferencePanelProps = {
  handlers: ReferencePanelHandlers
  dispatches: Dispatches
  filters: Filters
  team: Team
  view: ReferencePanelView
  psID?: string
}

const ReferencePanel = ({
  handlers,
  dispatches,
  filters,
  team,
  view,
  psID,
}: ReferencePanelProps) => {
  let viewPanelMessage;
  switch(view?.mode) {
    case 'POKEMON':
      viewPanelMessage = `Select Member ${view.idx + 1}`;
      break;

    case 'MOVE':
      viewPanelMessage = `Select Move for Slot ${view.idx + 1}`
      break;

    case 'ABILITY':
      viewPanelMessage = 'Select Ability';
      break;

    case 'ITEM':
      viewPanelMessage = 'Select Item';
      break;

    case 'NATURE':
      viewPanelMessage = 'Select Nature';
      break;

    case 'EV':
      viewPanelMessage = 'Set EVs';
      break;

    case 'IV':
      viewPanelMessage = 'Set IVs';
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
            clickHandlers={handlers.savedPokemonClickHandlers}
            dispatches={dispatches}
            filters={filters}
            team={team}
          />}
          {(view?.mode === 'MOVE' && psID !== undefined) && <MoveSelectView
            // Key attribute forces re-render on index change,
            key={'moveSelectView_' + view.idx}
            clickHandlers={handlers.moveSelectClickHandlers}
            filters={filters}
            psID={psID}
          />}
          {(view?.mode === 'ABILITY' && psID !== undefined) && <AbilitySelectView
            clickHandlers={handlers.abilitySelectClickHandlers}
            view={view}
            dispatches={dispatches}
            filters={filters}
            psID={psID}
          />}
          {(view?.mode === 'ITEM' && psID !== undefined) && <ItemSelectView
            clickHandlers={handlers.itemSelectClickHandlers}
            filters={filters}
          />}
          {(view?.mode === 'NATURE' && <NatureSelectView
            clickHandlers={handlers.natureSelectClickHandlers}
            filters={filters}
          />)}
        </div>
      </div>
    </div>
  )
};

export default ReferencePanel