import { useEffect } from "react";
import {
  Outlet
} from "react-router-dom";
import { BGAction, BGManager, classWithBGShadow, toggleBGPulse } from "../../hooks/App/BGManager";
import './Entries/Entries.css';
import './Planner.css';
import PlannerNavBar from './PlannerNavBar';

type PlannerProps = {
  bgManager: BGManager
  dispatchBGManager: React.Dispatch<BGAction>
}

const Planner = ({
  bgManager,
  dispatchBGManager,
}: PlannerProps) => {
  useEffect(() => {
    dispatchBGManager({
      type: 'change',
      payload: 'blue',
    });
    toggleBGPulse(dispatchBGManager);
  }, []);

  return (
    <>
      <PlannerNavBar
        bgManager={bgManager}
      />
      <div className={classWithBGShadow("main-content__wrapper", bgManager)}>
        <Outlet />
      </div>
    </>
  );
}
export default Planner;