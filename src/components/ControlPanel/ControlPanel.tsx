import './ControlPanel.css';

import { CartAction, GenFilter, GenFilterAction, PokemonFilter, PokemonFilterAction, Team, TeamAction, TierFilterAction } from "../../hooks/app-hooks";
import { GenerationNum } from "../../types-queries/helpers";
import { Pokemon } from "../../types-queries/Planner/Pokemon";
import { TierFilter } from "../../utils/smogonLogic";
import GenFilterForm from "./GenFilterForm/GenFilterForm";
import TeamDisplay from "./PokemonTeam/TeamDisplay";
import TierFilterForm from "./TierFilterForm/TierFilterForm";
import PokemonFilterForm from './PokemonFilterForm/PokemonFilterForm';

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
      <GenFilterForm
        genFilter={genFilter}
        dispatchGenFilter={dispatchGenFilter}
      />
      <TierFilterForm
        tierFilter={tierFilter}
        dispatchTierFilter={dispatchTierFilter}
      />
      <TeamDisplay
        dispatchCart={dispatchCart}
        dispatchTeam={dispatchTeam}
        genFilter={genFilter}
        team={team}
      />
      <PokemonFilterForm
        dispatchPokemonFilter={dispatchPokemonFilter}
        pokemonFilter={pokemonFilter}
        genFilter={genFilter}
      />
    </div>
  )
}

export default ControlPanel;