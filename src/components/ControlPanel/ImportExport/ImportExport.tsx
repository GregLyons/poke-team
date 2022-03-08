import { Team } from "../../../hooks/App/Team";
import { Dispatches, Filters } from "../../App";
import Export from "./Export/Export";
import Import from "./Import/Import";

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
        dispatches={dispatches}
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