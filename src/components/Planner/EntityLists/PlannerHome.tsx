import {
  GenerationNum,
} from "../../../types-queries/helpers";
import {
  TierFilter,
} from "../../../utils/smogonLogic";

import { 
  CartAction,
  TeamAction,
} from "../../App";

type PlannerHomeProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
  tierFilter: TierFilter
}

const PlannerHome = ({ 
  dispatchCart,
  dispatchTeam,
  gen,
  tierFilter,
}: PlannerHomeProps) => (
  <div>
    This is the planner page.
  </div>
);

export default PlannerHome;