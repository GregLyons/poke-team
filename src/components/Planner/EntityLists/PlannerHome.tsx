import {
  GenerationNum,
} from "../../../types-queries/helpers";
import {
  TierFilter,
} from "../../../utils/smogonLogic";

import { 
  CartAction,
  GenFilter,
  PokemonFilter,
  TeamAction,
} from '../../../hooks/app-hooks';

type PlannerHomeProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  genFilter: GenFilter
  tierFilter: TierFilter
  pokemonFilter: PokemonFilter
}

const PlannerHome = ({ 
  dispatchCart,
  dispatchTeam,
  genFilter,
  tierFilter,
  pokemonFilter,
}: PlannerHomeProps) => (
  <div>
    This is the planner page.
  </div>
);

export default PlannerHome;