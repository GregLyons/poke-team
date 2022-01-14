import {
  Outlet,
} from "react-router-dom";

import PlannerNavBar from './PlannerNavBar';

import './Planner.css';
import { GenerationNum } from "../../types-queries/Generation";
import { CartAction, TeamAction } from "../App";

type PlannerProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
}

const Planner = ({
  dispatchCart,
  dispatchTeam,
  gen,
}: PlannerProps) => {
  return (
    <div className="planner-container">
      <PlannerNavBar />
      <Outlet />
    </div>
  );
}
export default Planner;