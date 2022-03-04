import { useEffect, useMemo, useRef, useState } from "react";
import { Sets } from '@pkmn/sets';
import { Dex } from '@pkmn/dex';
import { PokemonSet } from "@pkmn/data";

import { Team } from "../../../hooks/App/Team";
import { Dispatches, Filters } from "../../App";
import Popup from "../../Reusables/Popup/Popup";
import ImportTextbox from "./ImportTextbox";

import './Import.css';
import { useDelayedQuery } from "../../../hooks/Searches";
import { GenerationNum } from "../../../types-queries/helpers";
import { MemberPokemonFromSetQuery, MemberPokemonFromSetQueryVars, POKEMONSET_TO_MEMBER_QUERY, setsToMembers } from "../../../types-queries/Import/ImportPokemon";
import { MemberPokemon } from "../../../types-queries/Builder/MemberPokemon";
import { MemberItemQuery, MemberItemSearchVars, MEMBER_ITEM_QUERY } from "../../../types-queries/Builder/MemberItem";
import { MemberItemFromSetQuery, MemberItemFromSetQueryVars, SET_MEMBERITEM_QUERY } from "../../../types-queries/Import/ImportItem";
import { MemberNatureFromSetQuery, MemberNatureFromSetQueryVars, SET_MEMBERNATURE_QUERY } from "../../../types-queries/Import/ImportNature";
import { InvalidAbilityError, InvalidItemError, InvalidMoveError, InvalidNatureError, InvalidStatsError, LateIntroductionError, PSIDNotFoundError } from "../../../types-queries/Import/helpers";
import { useLazyQuery } from "@apollo/client";
import { useIsFirstRender } from "usehooks-ts";

type ImportProps = {
  dispatches: Dispatches
  filters: Filters
  team: Team
};

export type ImportState = {
  key: 'waiting' | 'error' | 'loading' | 'success'
  messageComponent: JSX.Element
};

const Import = ({
  dispatches,
  filters,
  team,
}: ImportProps) => {
  const numOpenSlots = useMemo(() => {
    return team[filters.genFilter.gen].members.filter(d => d === null).length;
  }, [team, filters]);

  const [importState, setImportState] = useState<ImportState>({
    key: 'waiting',
    messageComponent: (<>
      Waiting for import.
    </>),
  });

  const [execute_pokemon, { data: data_pokemon, loading: loading_pokemon, error: error_pokemon }] = useLazyQuery<MemberPokemonFromSetQuery, MemberPokemonFromSetQueryVars>(POKEMONSET_TO_MEMBER_QUERY,
    {
      variables: {
        gen: filters.genFilter.gen,
        // Convert species name to psID
        psIDs: team[filters.genFilter.gen].importedMembers
          .slice(0, numOpenSlots)
          .filter(set => set.species)
          .map(set => set.species.toLowerCase().replace(/[^a-z0-9]+/g, '')) || [],
      }
    });

  const [execute_item, { data: data_item, loading: loading_item, error: error_item }] = useLazyQuery<MemberItemFromSetQuery, MemberItemFromSetQueryVars>(SET_MEMBERITEM_QUERY,
    {
      variables: {
        gen: filters.genFilter.gen,
        // Convert species name to psID
        psIDs: team[filters.genFilter.gen].importedMembers
          .slice(0, numOpenSlots)
          .filter(set => set.item)
          .map(set => set.item.toLowerCase().replace(/[^a-z0-9]+/g, '')) || [],
      }
    });

  const [execute_nature, { data: data_nature, loading: loading_nature, error: error_nature }] = useLazyQuery<MemberNatureFromSetQuery, MemberNatureFromSetQueryVars>(SET_MEMBERNATURE_QUERY,
    {
      variables: {
        gen: filters.genFilter.gen,
        // Convert species name to psID
        psIDs: team[filters.genFilter.gen].importedMembers
          .slice(0, numOpenSlots)
          .filter(set => set.nature)
          .map(set => set.nature.toLowerCase().replace(/[^a-z0-9]+/g, ''))
          .concat(['serious']),
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

      setImportState({
        key: 'waiting',
        messageComponent: (<></>),
      });
    };
  }

  // When members are imported, execute query
  useEffect(() => {
    // If not waiting for import, do nothing
    if (importState.key !== 'waiting') return;

    // Looks out for basic  import errors
    // #region

    // If no open slots
    if (numOpenSlots === 0) {
      setImportState({
        key: 'error',
        messageComponent: (<>
          No available slots into which to import members.
        </>)
      });

      return dispatches.dispatchTeam({
        type: 'clear_import',
        payload: {
          gen: filters.genFilter.gen,
        },
      });
    }
    
    // 'failedImport' flag is set, that means we could not parse the import string
    if (team[filters.genFilter.gen].failedImport) {
      setImportState({
        key: 'error',
        messageComponent: (<>
          Failed to parse import string. Please check your formatting.
        </>),
      });

      return dispatches.dispatchTeam({
        type: 'clear_import',
        payload: {
          gen: filters.genFilter.gen,
        },
      });
    }
    
    // If no imported members
    if (team[filters.genFilter.gen].importedMembers.length === 0) {
      setImportState({
        key: 'error',
        messageComponent: (<>
          No members detected to import.
        </>),
      });

      return dispatches.dispatchTeam({
        type: 'clear_import',
        payload: {
          gen: filters.genFilter.gen,
        },
      });
    }

    // #endregion

    // If all is well, execute the queries
    execute_pokemon();
    execute_item();
    execute_nature();
  }, [filters, team, dispatches, importState, execute_pokemon, execute_item, execute_nature]);

  // Handles import state, and attempts to add imported members to the team
  useEffect(() => {
    // If not waiting for import, or not loading data, return
    if (!['waiting', 'loading'].includes(importState.key)) return;

    // Checks for query errors
    // #region

    // Error in Pokemon query
    if (error_pokemon) {
      setImportState({
        key: 'error',
        messageComponent: (<>
          Failed to query Pokemon: {error_pokemon.message}
        </>)
      });

      return dispatches.dispatchTeam({
        type: 'clear_import',
        payload: {
          gen: filters.genFilter.gen,
        },
      });
    }

    // Error in item query
    if (error_item) {
      setImportState({
        key: 'error',
        messageComponent: (<>
          Failed to query item: {error_item.message}
        </>)
      });

      return dispatches.dispatchTeam({
        type: 'clear_import',
        payload: {
          gen: filters.genFilter.gen,
        },
      });
    }

    // Error in Nature query
    if (error_nature) {
      setImportState({
        key: 'error',
        messageComponent: (<>
          Failed to query Nature: {error_nature.message}
        </>)
      });

      return dispatches.dispatchTeam({
        type: 'clear_import',
        payload: {
          gen: filters.genFilter.gen,
        },
      });
    }

    // #endregion

    // Checks loading state
    // In this section, we don't want to clear the import, as the importing is still in process. Just modify importState
    // #region

    if (loading_pokemon || loading_item || loading_nature) {
      setImportState({
        key: 'loading',
        messageComponent:(<>
          Loading...
        </>)
      });
    }

    // #endregion

    // At this point, if we have all the necessary data, try to add imported members to team
    if (data_pokemon?.pokemonByPSIDs && data_item?.itemsByPSID && data_nature?.naturesByName && data_pokemon.pokemonByPSIDs.length > 0) {
      let newMembers: MemberPokemon[] = [];
      // Attempting to add new members to team
      try {
        newMembers = setsToMembers(
          team[filters.genFilter.gen].importedMembers.slice(0, numOpenSlots),
          data_pokemon.pokemonByPSIDs,
          data_item.itemsByPSID,
          data_nature.naturesByName,
          filters.genFilter.gen,
        );
      }
      // Handle various errors that could come from setsToMembers, e.g. invalid moves, abilities, etc.
      catch (e) {
        if (e instanceof LateIntroductionError) {
          setImportState({
            key: 'error',
            messageComponent: (<ul>
              {e.lateEntities.map((d, idx) => (
                <li
                  key={`late_introduction_${d[0]}_${d[1]}_${idx}`}
                >
                  {d[0]} introduced in Gen {d[1]}.
                </li>
              ))}
            </ul>)
          });
        }
        else if (e instanceof InvalidAbilityError) {
          setImportState({
            key: 'error',
            messageComponent: (<>
              {e.memberName} does not have the ability '{e.message}'.
            </>)
          });
        }
        else if (e instanceof InvalidItemError) {
          setImportState({
            key: 'error',
            messageComponent: (<>
              Invalid item '{e.message}' on {e.memberName}.
            </>)
          });
        }
        else if (e instanceof InvalidMoveError) {
          setImportState({
            key: 'error',
            messageComponent: (<>
              {e.memberName} does not have the move '{e.message}'.
            </>)
          });
        }
        else if (e instanceof InvalidNatureError) {
          setImportState({
            key: 'error',
            messageComponent: (<>
              Invalid nature '{e.message}' on {e.memberName}.
            </>)
          });
        }
        else if (e instanceof InvalidStatsError) {
          setImportState({
            key: 'error',
            messageComponent: (<>
              Failed to parse the EVs, IVs, or some other attribute on {e.memberName}.
            </>)
          })
        }
        else if (e instanceof PSIDNotFoundError) {
          setImportState({
            key: 'error',
            messageComponent: (<>
              Could not find data on members {e.indices.map(d => d + 1).join(', ')}.
            </>)
          })
        }
        else {
          console.log('thrown');
          console.log(e);
          throw e;
        }
      }
      finally {
        // If no newMembers could be added due to an error above, return
        if (newMembers.length === 0) {
          return dispatches.dispatchTeam({
            type: 'clear_import',
            payload: {
              gen: filters.genFilter.gen,
            },
          });
        }

        // Otherwise, add imported members to team, and then clear import
        setImportState({
          key: 'success',
          messageComponent: (<>
            Success!
          </>),
        });

        return dispatches.dispatchTeam({
          type: 'add_imported_members',
          payload: {
            gen: filters.genFilter.gen,
            newMembers,
          },
        });
      }
    }
  }, [
    error_pokemon, error_item, error_nature,
    loading_pokemon, loading_item, loading_nature,
    data_pokemon, data_item, data_nature,
    team, filters, dispatches,
    numOpenSlots, importState,
  ]);

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
            importState={importState}
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

export default Import;

