import './ControlPanel.css';

import { CartAction, GenFilter, Team, TeamAction } from "../../hooks/app-hooks";
import { GenerationNum } from "../../types-queries/helpers";
import { Pokemon } from "../../types-queries/Planner/Pokemon";
import { TierFilter } from "../../utils/smogonLogic";
import GenDropdown from "./GenSlider";
import TeamDisplay from "./PokemonTeam/TeamDisplay";
import TierFilterForm from "./TierFilterForm";
import PokemonFilterForm from './PokemonFilterForm';

type ControlPanelProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>

  genFilter: GenFilter
  selectGen: (gen: GenerationNum) => void
  
  tierFilter: TierFilter
  handleTierModeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleTierFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  toggleSelectionMode: () => void
  
  team: Pokemon[]
}

const ControlPanel = ({
  dispatchCart,
  dispatchTeam,
  genFilter,
  selectGen,
  tierFilter,
  handleTierModeChange,
  handleTierFilterChange,
  toggleSelectionMode,
  team,
}: ControlPanelProps) => {
  return (
    <div className="control-panel__wrapper">
      <GenDropdown
        genFilter={genFilter}
        selectGen={selectGen}
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