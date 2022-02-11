import {
  Outlet,
} from "react-router-dom";
import './Planner.css';
import './Entries/Entries.css';

import PlannerNavBar from './PlannerNavBar';
import { BGAction, BGManager, classWithBGShadow, toggleBGPulse } from "../../hooks/App/BGManager";
import { useEffect } from "react";
import { useWindowSize } from "usehooks-ts";


type PlannerProps = {
  dispatchBGManager: React.Dispatch<BGAction>
  bgManager: BGManager
  headerRef: React.RefObject<HTMLElement>
}

const Planner = ({
  headerRef,
  bgManager,
  dispatchBGManager,
}: PlannerProps) => {
  const windowSize = useWindowSize();

  // Change background to blue
  useEffect(() => {
    dispatchBGManager({
      type: 'change',
      payload: 'blue',
    });
    toggleBGPulse(dispatchBGManager);
  }, []);
  return (
    <div 
      className={classWithBGShadow("planner-container", bgManager)}
      style={{
        height: headerRef.current 
          ? `calc(${windowSize.height}px - ${headerRef.current.scrollHeight}px)`
          : '',
      }}
    >
      <PlannerNavBar 
        dispatchBGManager={dispatchBGManager}
        bgManager={bgManager}
      />
      <div
        className="content-wrapper"
        style={{
          height: headerRef.current
            ? `calc(${windowSize.height}px - ${headerRef.current.scrollHeight}px - var(--nav-bar-height))`
            : ''
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
export default Planner;