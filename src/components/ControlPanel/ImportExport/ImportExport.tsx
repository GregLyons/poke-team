import { useState } from "react";
import { Sets } from '@pkmn/sets';
import { Dex } from '@pkmn/dex';
import { PokemonSet } from "@pkmn/data";

import { Team } from "../../../hooks/App/Team";
import { Dispatches, Filters } from "../../App";
import Popup from "../../Reusables/Popup/Popup";
import ImportTextbox from "./ImportTextbox";

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
  const onImport: (teamString: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void = teamString => {
    return e => {
      e.preventDefault();

    }
  }

  // const member = team[filters.genFilter.gen].members[0];

  // if (member === null) { return (<div> yo </div>); }

  // const str = member.toSetString();

  return (
    <div className="import-export__wrapper">
      <div
        className="import-wrapper"
        title="Import Pokemon."
      >
        <Popup
          trigger={<div>Import</div>}
          content={<ImportTextbox 
            onImport={onImport}
          />}
          orientation="v"
        />
      </div>
      {/* <div
        className="export-wrapper"
      >
        <Popup
          trigger={<div>Export</div>}
          content={<div>asdfasdfasdf</div>}
          orientation="v"
        />
      </div> */}
    </div>
  );
};

export default ImportExport;

