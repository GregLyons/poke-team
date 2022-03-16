import {
  Outlet
} from "react-router-dom";
import { BGManager } from "../../hooks/App/BGManager";
import './Entries/Entries.css';
import './Planner.css';
import PlannerNavBar from './PlannerNavBar';

type PlannerProps = {
  bgManager: BGManager
}

const Planner = ({
  bgManager,
}: PlannerProps) => {
  return (
    <>
      <PlannerNavBar
        bgManager={bgManager}
      />
      <div className="main-content__wrapper">
        <Outlet />
      </div>
    </>
  );
}
export default Planner;