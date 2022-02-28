import { useState } from "react";
import { Sets } from '@pkmn/sets';
import { Dex } from '@pkmn/dex';
import { PokemonSet } from "@pkmn/data";

import { Team } from "../../../hooks/App/Team";
import { Filters } from "../../App";

type ImportExportProps = {
  filters: Filters
  team: Team
};

const ImportExport = ({
  filters,
  team,
}: ImportExportProps) => {
  const [importedSets, setImportedSets] = useState<PokemonSet[]>([]);

  const member = team[filters.genFilter.gen].members[0];

  if (member === null) { return (<div> yo </div>); }

  const str = member.toSetString();


  return (
    <div>yo</div>
  );
};

export default ImportExport;

