import './ControlPanel.css';

import GenFilterForm from "./GenFilterForm/GenFilterForm";
import PokemonTeam from "./PokemonTeam/PokemonTeam";
import TierFilterForm from "./TierFilterForm/TierFilterForm";
import PokemonFilterForm from './PokemonFilterForm/PokemonFilterForm';
import { TierFilter, TierFilterAction } from '../../hooks/App/TierFilter';
import { PokemonFilter, PokemonFilterAction } from '../../hooks/App/PokemonFilter';
import { GenFilter, GenFilterAction } from '../../hooks/App/GenFilter';
import { Team, TeamAction } from '../../hooks/App/Team';
import { CartAction } from '../../hooks/App/Cart';
import { BGManager, BGAction, classWithBGShadow, classWithBG } from '../../hooks/App/BGManager';
import ImportExport from './ImportExport/Import';
import { Dispatches, Filters } from '../App';

type ControlPanelProps = {
  dispatches: Dispatches
  filters: Filters
  team: Team

  dispatchBGManager: React.Dispatch<BGAction>
  bgManager: BGManager

  headerRef: React.RefObject<HTMLDivElement>
}

const ControlPanel = ({
  dispatches,
  filters,
  team,

  dispatchBGManager,
  bgManager,

  headerRef,
}: ControlPanelProps) => {
  return (
    <div  
      ref={headerRef}
      className={classWithBG('control-panel__wrapper', bgManager)}
    >
      <div className={classWithBGShadow("gen-filter__cell", bgManager)}>
        <GenFilterForm
          genFilter={filters.genFilter}
          dispatchGenFilter={dispatches.dispatchGenFilter}
        />
      </div>
      <div className={classWithBGShadow("tier-filter__cell", bgManager)}>
        <TierFilterForm
          genFilter={filters.genFilter}
          tierFilter={filters.tierFilter}
          dispatchTierFilter={dispatches.dispatchTierFilter}
          bgManager={bgManager}
        />
      </div>
      <div className="team__cell">
        <PokemonTeam
          dispatchCart={dispatches.dispatchCart}
          dispatchTeam={dispatches.dispatchTeam}
          genFilter={filters.genFilter}
          team={team}
        />
      </div>
      <div className={classWithBGShadow("import-export__cell", bgManager)}>
        <ImportExport
          dispatches={dispatches}
          filters={filters}
          team={team}
        />
      </div>
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