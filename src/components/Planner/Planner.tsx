import {
  Outlet,
} from "react-router-dom";

import PlannerNavBar from './PlannerNavBar';

import './Planner.css';
import { GenerationNum } from "../../types-queries/Generation";

type PlannerProps = {
  gen: GenerationNum
}

const Planner = ({ gen }: PlannerProps) => {
  return (
    <div className="planner-container">
      <PlannerNavBar />
      <Outlet />
    </div>
  );
}
export default Planner;