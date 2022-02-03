import './ControlPanel.css';

import { Pokemon } from "../../types-queries/Planner/Pokemon";
import GenFilterForm from "./GenFilterForm/GenFilterForm";
import TeamDisplay from "./PokemonTeam/TeamDisplay";
import TierFilterForm from "./TierFilterForm/TierFilterForm";
import PokemonFilterForm from './PokemonFilterForm/PokemonFilterForm';
import { TierFilter, TierFilterAction } from '../../hooks/App/TierFilter';
import { PokemonFilter, PokemonFilterAction } from '../../hooks/App/PokemonFilter';
import { GenFilter, GenFilterAction } from '../../hooks/App/GenFilter';
import { TeamAction } from '../../hooks/App/Team';
import { CartAction } from '../../hooks/App/Cart';

type ControlPanelProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>

  dispatchGenFilter: React.Dispatch<GenFilterAction>
  genFilter: GenFilter
  
  dispatchTierFilter: React.Dispatch<TierFilterAction>
  tierFilter: TierFilter

  dispatchPokemonFilter: React.Dispatch<PokemonFilterAction>
  pokemonFilter: PokemonFilter
  
  team: Pokemon[]
}

const ControlPanel = ({
  dispatchCart,
  dispatchTeam,

  dispatchGenFilter,
  genFilter,

  dispatchTierFilter,
  tierFilter,

  dispatchPokemonFilter,
  pokemonFilter,
  
  team,
}: ControlPanelProps) => {
  return (
    <div className="control-panel__wrapper">
      <div className="gen-filter__cell">
        <GenFilterForm
          genFilter={genFilter}
          dispatchGenFilter={dispatchGenFilter}
        />
      </div>
      <div className="tier-filter__cell">
        <TierFilterForm
          genFilter={genFilter}
          tierFilter={tierFilter}
          dispatchTierFilter={dispatchTierFilter}
        />
      </div>
      <div className="team__cell">
        <TeamDisplay
          dispatchCart={dispatchCart}
          dispatchTeam={dispatchTeam}
          genFilter={genFilter}
          team={team}
        />
      </div>
      <div className="import-export__cell">
        <div className="import-export__wrapper"></div>
      </div>
      <>
        <PokemonFilterForm
          dispatchPokemonFilter={dispatchPokemonFilter}
          pokemonFilter={pokemonFilter}
          genFilter={genFilter}
        />
      </>
    </div>
  )
}

export default ControlPanel;