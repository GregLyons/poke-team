import { GenerationNum } from "../../types-queries/helpers";
import { TierFilter } from "../../utils/constants";
import { CartAction, TeamAction } from "../App";

type AnalyzerProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
  tierFilter: TierFilter
}

const Analyzer = ({
  dispatchCart,
  dispatchTeam,
  gen,
  tierFilter,
}: AnalyzerProps) => {
  return (
    <div>I'm the analyzer</div>
  );
}
export default Analyzer;