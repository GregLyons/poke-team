import {
  Outlet,
} from "react-router-dom";
import './Planner.css';
import './Entries/Entries.css';

import PlannerNavBar from './PlannerNavBar';
import { BGAction, BGManager, classWithBGShadow, toggleBGPulse } from "../../hooks/App/BGManager";
import { useEffect, useRef } from "react";
import { useWindowSize } from "usehooks-ts";
import { useContainerHeight } from "../../hooks/App/ContainerHeight";


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
  const navBarRef = useRef<HTMLDivElement>(null);
  const [containerHeight, contentHeight] = useContainerHeight(headerRef, navBarRef);
  
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
        height: containerHeight,
      }}
    >
      <div 
        className="nav-bar__ref-container"
        ref={navBarRef}
      >
        <PlannerNavBar 
          dispatchBGManager={dispatchBGManager}
          bgManager={bgManager}
        />
      </div>
      <div
        className="content-wrapper"
        style={{
          height: contentHeight,
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
export default Planner;