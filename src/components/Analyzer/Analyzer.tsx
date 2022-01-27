import { GenerationNum } from "../../types-queries/helpers";
import { TierFilter } from "../../utils/smogonLogic";
import { CartAction, GenFilter, TeamAction } from "../../hooks/app-hooks";

type AnalyzerProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  genFilter: GenFilter
  tierFilter: TierFilter
}

const Analyzer = ({
  dispatchCart,
  dispatchTeam,
  genFilter,
  tierFilter,
}: AnalyzerProps) => {
  return (
    <div>I'm the analyzer</div>
  );
}
export default Analyzer;