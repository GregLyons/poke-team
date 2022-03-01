import { BGManager, classWithBG, classWithBGShadow } from '../../hooks/App/BGManager';
import { Dispatches, Filters } from '../App';

type AnalyzerHomeProps = {
  dispatches: Dispatches
  filters: Filters
  bgManager: BGManager
}

const AnalyzerHome = ({
  dispatches,
  filters,
  bgManager,
}: AnalyzerHomeProps) => {

  return (
    <div>
      This is the Analyzer page
    </div>
  );
}
export default AnalyzerHome;