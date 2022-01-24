import {
  Outlet,
} from "react-router-dom";
import './Planner.css';

import {
  GenerationNum,
} from "../../types-queries/helpers";
import {
  CartAction,
  TeamAction,
} from "../App";

import PlannerNavBar from './PlannerNavBar';
import { TierFilter } from "../../utils/constants";

type PlannerProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
  tierFilter: TierFilter
}

const Planner = ({
  dispatchCart,
  dispatchTeam,
  gen,
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