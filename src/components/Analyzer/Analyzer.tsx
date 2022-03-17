import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { BGAction, BGManager, classWithBGShadow, toggleBGPulse } from "../../hooks/App/BGManager";
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
      <div className={classWithBGShadow("main-content__wrapper", bgManager)}>
        <Outlet />
      </div>
    </>
  );
}
export default Analyzer;