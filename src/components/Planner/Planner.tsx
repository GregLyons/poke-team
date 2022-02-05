import {
  Outlet,
} from "react-router-dom";
import './Planner.css';
import './Entries/Entries.css';

import PlannerNavBar from './PlannerNavBar';
import { BGAction, BGManager } from "../../hooks/App/BGManager";
import { useEffect } from "react";

type PlannerProps = {
  dispatchBGManager: React.Dispatch<BGAction>
  bgManager: BGManager
}

const Planner = ({
  bgManager,
  dispatchBGManager,
}: PlannerProps) => {
  // Change background to blue
  useEffect(() => {
    dispatchBGManager({
      type: 'change',
      payload: 'blue',
    });
  }, []);
  return (
    <div className="planner-container">
      <PlannerNavBar />
      <Outlet />
    </div>
  );
}
export default Planner;