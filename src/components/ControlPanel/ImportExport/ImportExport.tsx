import { useState } from "react";
import { Sets } from '@pkmn/sets';
import { Dex } from '@pkmn/dex';
import { PokemonSet } from "@pkmn/data";

import { Team } from "../../../hooks/App/Team";
import { Filters } from "../../App";
import Popup from "../../Reusables/Popup/Popup";

type ImportExportProps = {
  filters: Filters
  team: Team
};

const ImportExport = ({
  filters,
  team,
}: ImportExportProps) => {
  const [importedSets, setImportedSets] = useState<PokemonSet[]>([]);

  // const member = team[filters.genFilter.gen].members[0];

  // if (member === null) { return (<div> yo </div>); }

  // const str = member.toSetString();

  return (
    <div className="import-export__wrapper">
      <div
        className="import-wrapper"
      >
        <Popup
          trigger={<div>Import</div>}
          content={<div>asdf asdf asdf</div>}
          orientation="v"
        />
      </div>
      <div
        className="export-wrapper"
      >
        <Popup
          trigger={<div>Export</div>}
          content={<div>asdfasdfasdf</div>}
          orientation="v"
        />
      </div>
    </div>
  );
};

export default ImportExport;

