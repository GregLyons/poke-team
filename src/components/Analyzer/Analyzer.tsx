import { useEffect } from "react";
import { BGAction, BGManager, toggleBGPulse } from "../../hooks/App/BGManager";

type AnalyzerProps = {
  dispatchBGManager: React.Dispatch<BGAction>
  bgManager: BGManager
}

const Analyzer = ({
  bgManager,
  dispatchBGManager,
}: AnalyzerProps) => {
  // Change background to red
  useEffect(() => {
    dispatchBGManager({
      type: 'change',
      payload: 'red',
    });
    toggleBGPulse(dispatchBGManager);
  }, []);
  return (
    <div>I'm the analyzer</div>
  );
}
export default Analyzer;