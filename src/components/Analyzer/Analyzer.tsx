import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { BGAction, BGManager, toggleBGPulse } from "../../hooks/App/BGManager";
import AnalyzerNavBar from "./AnalyzerNavBar";

type AnalyzerProps = {
  bgManager: BGManager
  dispatchBGManager: React.Dispatch<BGAction>
}

const Analyzer = ({
  bgManager,
  dispatchBGManager,
}: AnalyzerProps) => {
  useEffect(() => {
    dispatchBGManager({
      type: 'change',
      payload: 'red',
    });
    toggleBGPulse(dispatchBGManager);
  }, []);

  return (
    <>
      <AnalyzerNavBar
        bgManager={bgManager}
      />
      <div className="main-content__wrapper">
        <Outlet />
      </div>
    </>
  );
}
export default Analyzer;