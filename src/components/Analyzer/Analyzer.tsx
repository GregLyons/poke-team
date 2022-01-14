import { GenerationNum } from "../../types-queries/Generation";
import { CartAction, TeamAction } from "../App";

type AnalyzerProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
}

const Analyzer = ({
  dispatchCart,
  dispatchTeam,
  gen,
}: AnalyzerProps) => {
  return (
    <div>I'm the analyzer</div>
  );
}
export default Analyzer;