import './ControlPanel.css';

import { CartAction, GenFilter, GenFilterAction, Team, TeamAction, TierFilterAction } from "../../hooks/app-hooks";
import { GenerationNum } from "../../types-queries/helpers";
import { Pokemon } from "../../types-queries/Planner/Pokemon";
import { TierFilter } from "../../utils/smogonLogic";
import GenFilterForm from "./GenFilterForm";
import TeamDisplay from "./PokemonTeam/TeamDisplay";
import TierFilterForm from "./TierFilterForm";
import PokemonFilterForm from './PokemonFilterForm';

type ControlPanelProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>

  dispatchGenFilter: React.Dispatch<GenFilterAction>
  genFilter: GenFilter
  
  dispatchTierFilter: React.Dispatch<TierFilterAction>
  tierFilter: TierFilter
  
  team: Pokemon[]
}

const ControlPanel = ({
  dispatchCart,
  dispatchTeam,

  dispatchGenFilter,
  genFilter,

  tierFilter,
  dispatchTierFilter,
  
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
      />
    </div>
  )
}

export default ControlPanel;