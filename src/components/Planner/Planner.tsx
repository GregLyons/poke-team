import {
  Outlet,
} from "react-router-dom";
import './Planner.css';

import {
  GenerationNum,
} from "../../types-queries/Generation";
import {
  CartAction,
  TeamAction,
} from "../App";

import PlannerNavBar from './PlannerNavBar';

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