import { useEffect } from "react";
import {
  Outlet
} from "react-router-dom";
import { BGAction, BGManager, classWithBGShadow, toggleBGPulse } from "../../hooks/App/BGManager";
import { useContainerSize } from "../../hooks/App/ContainerSize";
import './Entries/Entries.css';
import './Planner.css';
import PlannerNavBar from './PlannerNavBar';



type PlannerProps = {
  dispatchBGManager: React.Dispatch<BGAction>
  bgManager: BGManager
  headerRef: React.RefObject<HTMLElement>
  navBarRef: React.RefObject<HTMLDivElement>
}

const Planner = ({
  bgManager,
  dispatchBGManager,
  headerRef,
  navBarRef,
}: PlannerProps) => {
  const [containerWidth, containerHeight, contentHeight] = useContainerSize(headerRef, navBarRef);
  
  // Change background to blue
  useEffect(() => {
    dispatchBGManager({
      type: 'change',
      payload: 'blue',
    });
    toggleBGPulse(dispatchBGManager);
  }, [ dispatchBGManager, ]);
  return (
    <div 
      className={classWithBGShadow("planner-container", bgManager)}
      style={{
        height: containerHeight,
        width: containerWidth,
      }}
    >
      <div 
        className="nav-bar__ref-container"
      >
        <PlannerNavBar
          bgManager={bgManager}
        />
      </div>
      <div 
        className={classWithBGShadow("content-wrapper", bgManager)}
        style={{
          height: contentHeight,
          width: 'auto',
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
export default Planner;