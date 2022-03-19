import { Team } from "../../../../hooks/App/Team";
import { StatTable } from "../../../../types-queries/entities";
import { MemberPokemon } from "../../../../types-queries/Member/MemberPokemon";
import { Dispatches, Filters } from "../../../App";
import ErrorBoundary from "../../../Reusables/ErrorBoundary/ErrorBoundary";
import { ReferencePanelHandlers, ReferencePanelView } from "../TeamView";
import AbilitySelectView from "./AbilitySelectView/AbilitySelectView";
import HPSelectView from "./HPSelectView/HPSelectView";
import ItemSelectView from "./ItemSelectView/ItemSelectView";
import MoveSelectView from "./MoveSelectView/MoveSelectView";
import NatureSelectView from "./NatureSelectView/NatureSelectView";
import './ReferencePanel.css';
import SavedPokemonView from "./SavedPokemonView/SavedPokemonView";
import SpreadView from "./SpreadView/SpreadView";


type ReferencePanelProps = {
  handlers: ReferencePanelHandlers
  dispatches: Dispatches
  filters: Filters
  team: Team
  view: ReferencePanelView
  psID?: string
  member?: MemberPokemon | null
}

const ReferencePanel = ({
  handlers,
  dispatches,
  filters,
  team,
  view,
  psID,
  member,
}: ReferencePanelProps) => {
  let viewPanelMessage: string;
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
      viewPanelMessage = filters.genFilter.gen > 2 ? viewPanelMessage = 'Set IVs' : 'Set DVs';
      break;

    case 'HP':
      viewPanelMessage = 'Select HP Type';
      break;

    default: 
      viewPanelMessage = 'Saved Pokemon';
  }

  let spreads: { evs: StatTable, ivs: StatTable, } | undefined
  if (member) spreads = { evs: member.evs, ivs: member.ivs, };

  return (
    <section
      className="reference-panel__wrapper"
    >
      <h2 className="hidden-header" title={viewPanelMessage}>Reference panel</h2>
      {/* Mimic text-on-border effect of other panels on the page */}
      <div className="reference-panel__padder">
        <div className="reference-panel__header">
          {viewPanelMessage}
        </div>
        <ErrorBoundary>
          <div className="reference-panel__content">
            {(view?.mode === 'POKEMON' || view === null) && <SavedPokemonView
              clickHandlers={handlers.savedPokemonClickHandlers}
              dispatches={dispatches}
              filters={filters}
              team={team}
            />}
            {(view?.mode === 'MOVE' && psID !== undefined) && <MoveSelectView
              // Key attribute forces re-render on index change,
              key={view.idx}
              handlers={handlers.moveSelectHandlers}
              filters={filters}
              psID={psID}
            />}
            {(view?.mode === 'ABILITY' && psID !== undefined) && <AbilitySelectView
              handlers={handlers.abilitySelectHandlers}
              filters={filters}
              psID={psID}
            />}
            {(view?.mode === 'ITEM' && psID !== undefined) && <ItemSelectView
              handlers={handlers.itemSelectHandlers}
              filters={filters}
            />}
            {(view?.mode === 'NATURE' && <NatureSelectView
              handlers={handlers.natureSelectHandlers}
              filters={filters}
            />)}
            {(view?.mode === 'EV' || view?.mode === 'IV') && spreads && <SpreadView
              handlers={handlers.spreadHandlers}
              spread={view?.mode === 'EV' ? spreads.evs : spreads.ivs}
              spreadFor={view?.mode === 'EV'
                ? 'EV'
                : filters.genFilter.gen > 2
                  ? 'IV'
                  : 'DV'
              }
            />}
            {(view?.mode === 'HP' && <HPSelectView
              handlers={handlers.hpSelectHandlers}
              filters={filters}
            />)}
          </div>
        </ErrorBoundary>
      </div>
    </section>
  )
};

export default ReferencePanel