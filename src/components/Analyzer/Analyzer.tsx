import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { BGAction, BGManager, classWithBGShadow, toggleBGPulse } from "../../hooks/App/BGManager";
import { useContainerSize } from "../../hooks/App/ContainerSize";
import AnalyzerNavBar from "./AnalyzerNavBar";

type AnalyzerProps = {
  dispatchBGManager: React.Dispatch<BGAction>
  bgManager: BGManager
  headerRef: React.RefObject<HTMLElement>
  navBarRef: React.RefObject<HTMLDivElement>
}

const Analyzer = ({
  headerRef,
  bgManager,
  dispatchBGManager,
  navBarRef,
}: AnalyzerProps) => {
  const [containerWidth, containerHeight, contentHeight] = useContainerSize(headerRef, navBarRef);

  // Change background to red
  useEffect(() => {
    dispatchBGManager({
      type: 'change',
      payload: 'red',
    });
    toggleBGPulse(dispatchBGManager);
  }, [dispatchBGManager, ]);
  return (
    <div 
      className="analyzer-container"
      style={{
        height: containerHeight,
        width: containerWidth,
      }}
    >
      <div
        className="nav-bar__ref-container"
      >
        <AnalyzerNavBar
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
export default Analyzer;