import { Outlet } from "react-router-dom";
import { BGManager } from "../../hooks/App/BGManager";
import AnalyzerNavBar from "./AnalyzerNavBar";

type AnalyzerProps = {
  bgManager: BGManager
}

const Analyzer = ({
  bgManager,
}: AnalyzerProps) => {
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