import { useQuery } from "@apollo/client";
import { removedFromBDSP, removedFromSwSh } from "../../../../../hooks/App/GenFilter";
import { Team } from "../../../../../hooks/App/Team";
import { useRemovalConnectedSearchVars } from "../../../../../hooks/Planner/MainSearches";
import { MemberMoveQuery, MemberMoveSearchVars, MEMBER_MOVESET_QUERY } from "../../../../../types-queries/Builder/MemberMove";
import { Dispatches, Filters } from "../../../../App";
import SearchBar from "../../../../Reusables/SearchBar/SearchBar";
import { MoveSelectClickHandlers, ReferencePanelView, SavedPokemonClickHandlers } from "../../TeamView";
import MoveSelectEntries from "./MoveSelectEntries";

import './MoveSelectView.css';

type MoveSelectViewProps = {
  clickHandlers: MoveSelectClickHandlers
  view: ReferencePanelView
  dispatches: Dispatches
  filters: Filters
  psID: string
}

const MoveSelectView = ({
  clickHandlers,
  view,
  dispatches,
  filters,
  psID,
}: MoveSelectViewProps) => {
  const [queryVars, setQueryVars, searchTerm, handleSearchTermChange, searchMode, handleSearchModeChange] = useRemovalConnectedSearchVars<MemberMoveSearchVars>(
    {
      gen: filters.genFilter.gen,
      psID,
      contains: '',
      startsWith: '',
      removedFromSwSh: removedFromSwSh(filters.genFilter),
      removedFromBDSP: removedFromBDSP(filters.genFilter),
    },
    filters.genFilter,
  );

  const { data, loading, error } = useQuery<MemberMoveQuery, MemberMoveSearchVars>(MEMBER_MOVESET_QUERY, {
    variables: queryVars,
  });

  if (error) { return (<div>{error.message}</div>); }

  return (
    <div className="move-select__wrapper">
      <form>
        <SearchBar
          title="Search items by name"
          placeholder="ENTER to select first result"
          searchTerm={searchTerm}
          handleSearchTermChange={handleSearchTermChange}
          searchMode={searchMode}
          handleSearchModeChange={handleSearchModeChange}
          backgroundLight="green"
        />
      </form>
      <div className="move-select__results">
        <div className="move-select__legend">
          <div className="move-select__name">
            <span>Name</span>
          </div>
          <div className="move-select__data">
            <span>Data</span>
          </div>
          <div className="move-select__description">
            <span>Description</span>
          </div>
        </div>
        {loading
          ? <div>Loading...</div>
          : data && <MoveSelectEntries
              data={data}
              clickHandlers={clickHandlers}
              filters={filters}
            />
        }
      </div>
    </div>
  )
};

export default MoveSelectView;