import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useWindowSize } from "usehooks-ts";
import { BGAction, BGManager, toggleBGPulse } from "../../hooks/App/BGManager";
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
  const windowSize = useWindowSize();

  // Change background to red
  useEffect(() => {
    dispatchBGManager({
      type: 'change',
      payload: 'red',
    });
    toggleBGPulse(dispatchBGManager);
  }, []);
  return (
    <div 
      className="analyzer-container"
      style={{
        height: headerRef.current 
          ? `calc(${windowSize.height}px - ${headerRef.current.scrollHeight}px)`
          : '',
      }}
    >
      <AnalyzerNavBar
        dispatchBGManager={dispatchBGManager}
        bgManager={bgManager}
      />
      <Outlet />
    </div>
  );
}
export default Analyzer;