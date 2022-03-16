import { Team } from "../../../hooks/App/Team";
import { Dispatches, Filters } from "../../App";
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
      <Import
        teamDispatch={dispatches.dispatchTeam}
        filters={filters}
        team={team}
      />
      <Export
        filters={filters}
        team={team}
      />
    </div>
  );
};

export default ImportExport;