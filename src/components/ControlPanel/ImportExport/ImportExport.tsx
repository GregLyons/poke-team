import { useEffect, useState } from "react";
import { Sets } from '@pkmn/sets';
import { Dex } from '@pkmn/dex';
import { PokemonSet } from "@pkmn/data";

import { Team } from "../../../hooks/App/Team";
import { Dispatches, Filters } from "../../App";
import Popup from "../../Reusables/Popup/Popup";
import ImportTextbox from "./ImportTextbox";

import './ImportExport.css';
import { useDelayedQuery } from "../../../hooks/Searches";
import { GenerationNum } from "../../../types-queries/helpers";
import { MemberPokemonFromSetQuery, MemberPokemonFromSetQueryVars, POKEMONSET_TO_MEMBER_QUERY, setsToMembers } from "../../../types-queries/ImportExport/Pokemon";
import { MemberPokemon } from "../../../types-queries/Builder/MemberPokemon";
import { MemberItemQuery, MemberItemSearchVars, MEMBER_ITEM_QUERY } from "../../../types-queries/Builder/MemberItem";
import { MemberItemFromSetQuery, MemberItemFromSetQueryVars, SET_MEMBERITEM_QUERY } from "../../../types-queries/ImportExport/Item";
import { MemberNatureFromSetQuery, MemberNatureFromSetQueryVars, SET_MEMBERNATURE_QUERY } from "../../../types-queries/ImportExport/Nature";
import { LateIntroductionError } from "../../../types-queries/ImportExport/helpers";

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
  const [lateMembers, setLateMembers] = useState<[string, GenerationNum][]>([]);

  const { data: data_pokemon, loading: loading_pokemon, error: error_pokemon } = useDelayedQuery<MemberPokemonFromSetQuery, MemberPokemonFromSetQueryVars>({
    query: POKEMONSET_TO_MEMBER_QUERY,
    queryVars: {
      gen: filters.genFilter.gen,
      // Convert species name to psID
      psIDs: team[filters.genFilter.gen].importedMembers.map(set => set.species.toLowerCase().replace(/[^a-z0-9]+/g, '')) || [],
    }
  });

  const { data: data_item, loading: loading_item, error: error_item } = useDelayedQuery<MemberItemFromSetQuery, MemberItemFromSetQueryVars>({
    query: SET_MEMBERITEM_QUERY,
    queryVars: {
      gen: filters.genFilter.gen,
      // Convert species name to psID
      psIDs: team[filters.genFilter.gen].importedMembers.map(set => set.item.toLowerCase().replace(/[^a-z0-9]+/g, '')) || [],
    }
  });

  const { data: data_nature, loading: loading_nature, error: error_nature } = useDelayedQuery<MemberNatureFromSetQuery, MemberNatureFromSetQueryVars>({
    query: SET_MEMBERNATURE_QUERY,
    queryVars: {
      gen: filters.genFilter.gen,
      // Convert species name to psID
      psIDs: team[filters.genFilter.gen].importedMembers.map(set => set.nature.toLowerCase().replace(/[^a-z0-9]+/g, '')) || [],
    }
  });

  const onImport: (importString: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void = importString => {
    return e => {
      e.preventDefault();
      
      dispatches.dispatchTeam({
        type: 'import',
        payload: {
          gen: filters.genFilter.gen,
          importString,
        }
      });
    };
  }

  // If nontrivial data is received, clear 
  useEffect(() => {
    if (data_pokemon && data_item && data_nature) {
      const numOpenSlots = team[filters.genFilter.gen].members.filter(d => d === null).length;
      // If no open slots, stop
      if (numOpenSlots === 0) return;

      // Otherwise, get first 'numOpenSlots' results
      let newMembers: MemberPokemon[];
      try {
        newMembers = setsToMembers(
          team[filters.genFilter.gen].importedMembers,
          data_pokemon.pokemonByPSIDs,
          data_item.itemsByPSID,
          data_nature.natureByPSID,
          filters.genFilter.gen,
        );
      }
      catch (e) {
        if (e instanceof LateIntroductionError) {
          
        }
        else {
          throw e;
        }
      }
    }
  }, [data_pokemon, data_item, data_nature, team, filters, dispatches, ]);

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
            importError={team[filters.genFilter.gen].failedImport}
            lateMembers={lateMembers}
            loading={loading_pokemon}
            queryError={error_pokemon}
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

