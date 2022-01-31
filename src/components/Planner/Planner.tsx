import {
  Outlet,
} from "react-router-dom";
import './Planner.css';
import './Entries/Entries.css';

import PlannerNavBar from './PlannerNavBar';

type PlannerProps = {
}

const Planner = ({
}: PlannerProps) => {
  return (
    <div className="planner-container">
      <PlannerNavBar />
      <Outlet />
    </div>
  );
}
export default Planner;