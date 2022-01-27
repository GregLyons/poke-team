import './ControlPanel.css';

import { CartAction, GenFilter, GenFilterAction, Team, TeamAction } from "../../hooks/app-hooks";
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
  
  tierFilter: TierFilter
  handleTierModeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleTierFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  toggleSelectionMode: () => void
  
  team: Pokemon[]
}

const ControlPanel = ({
  dispatchCart,
  dispatchTeam,

  dispatchGenFilter,
  genFilter,

  tierFilter,
  handleTierModeChange,
  handleTierFilterChange,
  toggleSelectionMode,
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
        handleTierModeChange={handleTierModeChange}
        handleTierFilterChange={handleTierFilterChange}
        toggleSelectionMode={toggleSelectionMode}
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