import { useQuery } from "@apollo/client";
import { removedFromBDSP, removedFromSwSh } from "../../../../../hooks/App/GenFilter";
import { Team } from "../../../../../hooks/App/Team";
import { useDelayedQuery, useRemovalConnectedSearchVars } from "../../../../../hooks/Searches";
import { MemberMoveQuery, MemberMoveSearchVars, MEMBER_MOVESET_QUERY } from "../../../../../types-queries/Builder/MemberMove";
import { Filters } from "../../../../App";
import { MoveSelectHandlers, } from "../../TeamView";
import MoveSelectEntries from "./MoveSelectEntries";

import './MoveSelectView.css';

type MoveSelectViewProps = {
  handlers: MoveSelectHandlers
  filters: Filters
  psID: string
}

const MoveSelectView = ({
  handlers: clickHandlers,
  filters,
  psID,
}: MoveSelectViewProps) => {
  const { queryVars, searchBar, focusedOnInput, } = useRemovalConnectedSearchVars<MemberMoveSearchVars>({
    defaultSearchVars: {
      gen: filters.genFilter.gen,
      psID,
      removedFromSwSh: removedFromSwSh(filters.genFilter),
      removedFromBDSP: removedFromBDSP(filters.genFilter),
      contains: '',
      startsWith: '',
    },
    genFilter: filters.genFilter,
    searchBarProps: {
      title: "Search moves by name",
      backgroundLight: "green"
    },
  });

  const { data, loading, error } = useDelayedQuery<MemberMoveQuery, MemberMoveSearchVars>({
    query: MEMBER_MOVESET_QUERY,
    queryVars,
    // Shorten the delay since users might be rapidly entering searches
    delay: 1,
  });

  if (error) { return (<div>{error.message}</div>); }

  return (
    <div className="move-select__wrapper">
      <form>
        {searchBar}
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
              focusedOnInput={focusedOnInput}
            />
        }
      </div>
    </div>
  )
};

export default MoveSelectView;