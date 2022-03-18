import { Team } from "../../../hooks/App/Team";
import { Dispatches, Filters } from "../../App";
import ErrorBoundary from "../../Reusables/ErrorBoundary/ErrorBoundary";
import Export from "./Export/Export";
import Import from "./Import/Import";
import './ImportExport.css';

type ImportExportProps = {
  dispatches: Dispatches
  filters: Filters
  team: Team
};

const ImportExport = ({
  dispatches,
  filters,
  team,
}: ImportExportProps) => {
  return (
    <div
      className="import-export__wrapper"
    >
      <ErrorBoundary>
        <Import
          teamDispatch={dispatches.dispatchTeam}
          filters={filters}
          team={team}
        />
        <Export
          filters={filters}
          team={team}
        />
      </ErrorBoundary>
    </div>
  );
};

export default ImportExport;