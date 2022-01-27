import './ControlPanel.css';

import { CartAction, GenFilter, Team, TeamAction } from "../../hooks/app-hooks";
import { GenerationNum } from "../../types-queries/helpers";
import { Pokemon } from "../../types-queries/Planner/Pokemon";
import { TierFilter } from "../../utils/smogonLogic";
import GenSlider from "./GenSlider";
import TeamDisplay from "./PokemonTeam/TeamDisplay";
import TierFilterForm from "./TierFilterForm";
import PokemonFilterForm from './PokemonFilterForm';

type ControlPanelProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>

  genFilter: GenFilter
  handleGenSliderChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  
  tierFilter: TierFilter
  handleTierModeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleTierFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  toggleSelectionMode: () => void
  
  team: Pokemon[]
}

const ControlPanel = ({
  dispatchCart,
  dispatchTeam,
  genFilter: gen,
  handleGenSliderChange,
  tierFilter,
  handleTierModeChange,
  handleTierFilterChange,
  toggleSelectionMode,
  team,
}: ControlPanelProps) => {
  return (
    <div className="control-panel__wrapper">
      <GenSlider
        genFilter={gen}
        handleGenSliderChange={handleGenSliderChange}
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
        genFilter={gen}
        team={team}
      />
      <PokemonFilterForm
      />
    </div>
  )
}

export default ControlPanel;