import {
  Outlet,
} from "react-router-dom";

import PlannerNavBar from './PlannerNavBar';

import './Planner.css';

const Planner = () => {
  return (
    <div className="planner-container">
      <PlannerNavBar />
      <Outlet />
    </div>
  );
}
export default Planner;