import { useLazyQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import { Team, TeamAction } from "../../../../hooks/App/Team";
import { InvalidAbilityError, InvalidItemError, InvalidMoveError, InvalidNatureError, InvalidStatsError, LateIntroductionError, PSIDNotFoundError, toPSID } from "../../../../types-queries/Import/helpers";
import { ImportItemQuery, ImportItemVars, IMPORT_ITEM_QUERY } from "../../../../types-queries/Import/ImportItem";
import { ImportMoveQuery, ImportMoveVars, IMPORT_MOVE_QUERY } from "../../../../types-queries/Import/ImportMove";
import { ImportNatureQuery, ImportNatureVars, SET_MEMBERNATURE_QUERY } from "../../../../types-queries/Import/ImportNature";
import { ImportMemberQuery, ImportMemberVars, IMPORT_MEMBER_QUERY, setsToMembers } from "../../../../types-queries/Import/ImportPokemon";
import { MemberPokemon } from "../../../../types-queries/Member/MemberPokemon";
import { Filters } from "../../../App";
import Popup from "../../../Reusables/Popup/Popup";
import './Import.css';
import ImportTextbox from "./ImportTextbox";

// By isolating teamDispatch, we can use both dispatchTeam and dispatchEnemyTeam
type ImportProps = {
  triggerID: string
  triggerLabel: string
  teamDispatch: React.Dispatch<TeamAction>
  filters: Filters
  team: Team
};

export type ImportState = {
  key: 'waiting' | 'error' | 'loading' | 'success'
  messageComponent: JSX.Element
};

const Import = ({
  triggerID,
  triggerLabel,
  teamDispatch,
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

  const [execute_pokemon, { data: data_pokemon, loading: loading_pokemon, error: error_pokemon }] = useLazyQuery<ImportMemberQuery, ImportMemberVars>(IMPORT_MEMBER_QUERY,
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

  const [execute_item, { data: data_item, loading: loading_item, error: error_item }] = useLazyQuery<ImportItemQuery, ImportItemVars>(IMPORT_ITEM_QUERY,
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

  const [execute_nature, { data: data_nature, loading: loading_nature, error: error_nature }] = useLazyQuery<ImportNatureQuery, ImportNatureVars>(SET_MEMBERNATURE_QUERY,
    {
      variables: {
        gen: filters.genFilter.gen,
        psIDs: team[filters.genFilter.gen].importedMembers
          .slice(0, numOpenSlots)
          .filter(set => set.nature)
          .map(set => set.nature.toLowerCase().replace(/[^a-z0-9]+/g, ''))
          .concat(['serious']),
      }
    });

  const natDexOn = filters.genFilter.includeRemovedFromBDSP && filters.genFilter.includeRemovedFromSwSh;
  const [execute_move, { data: data_move, loading: loading_move, error: error_move }] = useLazyQuery<ImportMoveQuery, ImportMoveVars>(IMPORT_MOVE_QUERY,
    {
      variables: {
        gen: filters.genFilter.gen,
        psIDs: natDexOn 
          ? team[filters.genFilter.gen].importedMembers
            .slice(0, numOpenSlots)
            .filter(set => set.moves)
            .reduce((acc, curr) => {
              const movePSIDs = curr.moves.map(toPSID).map(movePSID => movePSID.includes('hiddenpower') ? 'hiddenpower' : movePSID);

              return acc.concat(movePSIDs);
            }, [] as string[])
          : [] as string[],
      },
    },
  );

  const loading = loading_pokemon || loading_item || loading_nature || loading_move;
  const error = error_pokemon || error_item || error_nature || error_move;

  const onImport: (importString: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void = importString => {
    return e => {
      e.preventDefault();
      
      teamDispatch({
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

  const returnToWaiting = () => setTimeout(() => setImportState({
    key: 'waiting',
    messageComponent: (<>
      Waiting for import.
    </>),
  }), 5000);

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

      returnToWaiting();

      return teamDispatch({
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

      returnToWaiting();

      return teamDispatch({
        type: 'clear_import',
        payload: {
          gen: filters.genFilter.gen,
        },
      });
    }
    
    // // If no imported members
    // if (team[filters.genFilter.gen].importedMembers.length === 0) {
    //   setImportState({
    //     key: 'error',
    //     messageComponent: (<>
    //       No members detected to import.
    //     </>),
    //   });

    //   returnToWaiting();

    //   return teamDispatch({
    //     type: 'clear_import',
    //     payload: {
    //       gen: filters.genFilter.gen,
    //     },
    //   });
    // }

    // #endregion

    // If all is well, execute the queries
    execute_pokemon();
    execute_item();
    execute_nature();
    execute_move();
  }, [
    filters, team, teamDispatch,
    importState.key, numOpenSlots,
    execute_pokemon, execute_item, execute_nature,
  ]);

  // Handles import state, and attempts to add imported members to the team
  useEffect(() => {
    // If not waiting for import, or not loading data, return
    if (!['waiting', 'loading'].includes(importState.key)) return;

    // Checks for query errors
    if (error) {
      setImportState({
        key: 'error',
        messageComponent: (<>
          Failed to query: {error.message}
        </>)
      });

      returnToWaiting();

      return teamDispatch({
        type: 'clear_import',
        payload: {
          gen: filters.genFilter.gen,
        },
      });
    }

    if (loading) {
      setImportState({
        key: 'loading',
        messageComponent:(<>
          Loading...
        </>)
      });
    }

    // At this point, if we have all the necessary data, try to add imported members to team
    if (data_pokemon?.pokemonByPSIDs && data_item?.itemsByPSID && data_nature?.naturesByName && data_move?.movesByPSID && data_pokemon.pokemonByPSIDs.length > 0) {
      let newMembers: MemberPokemon[] = [];
      // Attempting to add new members to team
      try {
        newMembers = setsToMembers(
          team[filters.genFilter.gen].importedMembers.slice(0, numOpenSlots),
          data_pokemon.pokemonByPSIDs,
          data_item.itemsByPSID,
          data_nature.naturesByName,
          data_move.movesByPSID,
          filters.genFilter,
        );
      }
      // Handle various errors that could come from setsToMembers, e.g. invalid moves, abilities, etc.
      catch (e) {
        // After each error, return to waiting after 5 seconds
        returnToWaiting();

        if (e instanceof LateIntroductionError) {
          setImportState({
            key: 'error',
            messageComponent: (<ul>
              {e.lateEntities.map((d, idx) => (
                <li
                  key={idx}
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
              {e.memberName} does not have the ability '{e.message}' in Gen {filters.genFilter.gen}.
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
              {e.memberName} does not have the move '{e.message}' in Gen {filters.genFilter.gen}.
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
          throw e;
        }
      }
      finally {
        // If no newMembers could be added due to an error above, return
        if (newMembers.length === 0) {
          return teamDispatch({
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

        returnToWaiting();

        return teamDispatch({
          type: 'add_imported_members',
          payload: {
            gen: filters.genFilter.gen,
            newMembers,
          },
        });
      }
    }
  }, [
    team, filters, teamDispatch,
    numOpenSlots, importState.key,
    data_pokemon, data_item, data_nature,
    loading,
    error,
  ]);
  
  return (
    <div
      className="import-wrapper"
      title="Import Pokemon."
    >
      <label htmlFor={triggerID} className="hidden-label">{triggerLabel}</label>
      <Popup
        triggerID={triggerID}
        trigger={<div className="import-export__popup-trigger">IMPORT</div>}
        content={<ImportTextbox 
          onImport={onImport}
          importState={importState}
        />}
        orientation="bottom"
        onClose={() => setImportState({
          key: 'waiting',
          messageComponent: (<>
            Waiting for import.
          </>)
        })}
      />
    </div>
  );
};

export default Import;

