import {
  GenerationNum,
} from "../../../types-queries/helpers";
import {
  TierFilter,
} from "../../../utils/smogonLogic";

import { 
  CartAction,
  GenFilter,
  TeamAction,
} from '../../../hooks/app-hooks';

type PlannerHomeProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  genFilter: GenFilter
  tierFilter: TierFilter
}

const PlannerHome = ({ 
  dispatchCart,
  dispatchTeam,
  genFilter,
  tierFilter,
}: PlannerHomeProps) => (
  <div>
    This is the planner page.
  </div>
);

export default PlannerHome;