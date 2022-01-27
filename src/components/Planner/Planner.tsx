import {
  Outlet,
} from "react-router-dom";
import './Planner.css';

import {
  GenerationNum,
} from "../../types-queries/helpers";
import {
  CartAction,
  GenFilter,
  TeamAction,
} from "../../hooks/app-hooks";

import PlannerNavBar from './PlannerNavBar';
import { TierFilter } from "../../utils/smogonLogic";

type PlannerProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  genFilter: GenFilter
  tierFilter: TierFilter
}

const Planner = ({
  dispatchCart,
  dispatchTeam,
  genFilter,
  tierFilter,
}: PlannerProps) => {
  return (
    <div className="planner-container">
      <PlannerNavBar />
      <Outlet />
    </div>
  );
}
export default Planner;