import { BGManager, classWithBG, classWithBGShadow } from '../../hooks/App/BGManager';
import { Team } from '../../hooks/App/Team';
import { Dispatches, Filters } from '../App';
import ErrorBoundary from '../Reusables/ErrorBoundary/ErrorBoundary';
import './ControlPanel.css';
import GenFilterForm from "./GenFilterForm/GenFilterForm";
import ImportExport from './ImportExport/ImportExport';
import PokemonFilterForm from './PokemonFilterForm/PokemonFilterForm';
import TeamDisplay from "./TeamDisplay/TeamDisplay";
import TierFilterForm from "./TierFilterForm/TierFilterForm";


type ControlPanelProps = {
  dispatches: Dispatches
  filters: Filters
  team: Team

  bgManager: BGManager

  headerRef: React.RefObject<HTMLDivElement>
}

const ControlPanel = ({
  dispatches,
  filters,
  team,

  bgManager,

  headerRef,
}: ControlPanelProps) => {
  return (
    <div
      ref={headerRef}
      className={classWithBG('control-panel__wrapper', bgManager)}
    >
      <section aria-labelledby="gen-filter" className={classWithBGShadow("gen-filter__cell", bgManager)}>
        <h2 id="gen-filter" className="hidden-header">Change generation</h2>
        <ErrorBoundary>
          <GenFilterForm
            genFilter={filters.genFilter}
            dispatchGenFilter={dispatches.dispatchGenFilter}
          />
        </ErrorBoundary>
      </section>
      <section aria-labelledby="tier-filter" className={classWithBGShadow("tier-filter__cell", bgManager)}>
        <h2 id="tier-filter" className="hidden-header">Tier filter</h2>
        <ErrorBoundary>
          <TierFilterForm
            genFilter={filters.genFilter}
            tierFilter={filters.tierFilter}
            dispatchTierFilter={dispatches.dispatchTierFilter}
            bgManager={bgManager}
          />
        </ErrorBoundary>
      </section>
      <section aria-labelledby="team-display" className="team-display__cell">
        <h2 id="team-display" className="hidden-header">Team display</h2>
        <ErrorBoundary>
          <TeamDisplay
            genFilter={filters.genFilter}
            team={team}
          />
        </ErrorBoundary>
      </section>
      <section aria-labelledby="import-export" className={classWithBGShadow("import-export__cell", bgManager)}>
        <h2 id="import-export" className="hidden-header">Import and export teams</h2>
        <ErrorBoundary>
          <ImportExport
            dispatches={dispatches}
            filters={filters}
            team={team}
          />
        </ErrorBoundary>
      </section>
      <>
        <PokemonFilterForm
          dispatchPokemonFilter={dispatches.dispatchPokemonFilter}
          pokemonFilter={filters.pokemonFilter}
          genFilter={filters.genFilter}
          bgManager={bgManager}
        />
      </>
    </div>
  )
}

export default ControlPanel;