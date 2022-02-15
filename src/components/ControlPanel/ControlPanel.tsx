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

type ControlPanelProps = {
  dispatchCart: React.Dispatch<CartAction>

  dispatchGenFilter: React.Dispatch<GenFilterAction>
  genFilter: GenFilter
  
  dispatchTierFilter: React.Dispatch<TierFilterAction>
  tierFilter: TierFilter

  dispatchPokemonFilter: React.Dispatch<PokemonFilterAction>
  pokemonFilter: PokemonFilter

  dispatchTeam: React.Dispatch<TeamAction>
  team: Team

  dispatchBGManager: React.Dispatch<BGAction>
  bgManager: BGManager
}

const ControlPanel = ({
  dispatchCart,
  
  dispatchGenFilter,
  genFilter,
  
  dispatchTierFilter,
  tierFilter,
  
  dispatchPokemonFilter,
  pokemonFilter,
  
  dispatchTeam,
  team,

  dispatchBGManager,
  bgManager,
}: ControlPanelProps) => {
  return (
    <div className={classWithBG('control-panel__wrapper', bgManager)}>
      <div className={classWithBGShadow("gen-filter__cell", bgManager)}>
        <GenFilterForm
          genFilter={genFilter}
          dispatchGenFilter={dispatchGenFilter}
        />
      </div>
      <div className={classWithBGShadow("tier-filter__cell", bgManager)}>
        <TierFilterForm
          genFilter={genFilter}
          tierFilter={tierFilter}
          dispatchTierFilter={dispatchTierFilter}
        />
      </div>
      <div className="team__cell">
        <PokemonTeam
          dispatchCart={dispatchCart}
          dispatchTeam={dispatchTeam}
          genFilter={genFilter}
          team={team}
        />
      </div>
      <div className={classWithBGShadow("import-export__cell", bgManager)}>
        <div className="import-export__wrapper"></div>
      </div>
      <>
        <PokemonFilterForm
          dispatchPokemonFilter={dispatchPokemonFilter}
          pokemonFilter={pokemonFilter}
          genFilter={genFilter}
          bgManager={bgManager}
        />
      </>
    </div>
  )
}

export default ControlPanel;