import {
  GenerationNum,
} from "../../../types-queries/Generation";

import { 
  CartAction,
  TeamAction,
} from "../../App";

type PlannerHomeProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
}

const PlannerHome = ({ 
  dispatchCart,
  dispatchTeam,
  gen,
}: PlannerHomeProps) => (
  <div>
    This is the planner page.
  </div>
);

export default PlannerHome;