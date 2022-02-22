import { useQuery } from "@apollo/client";
import { removedFromBDSP, removedFromSwSh } from "../../../../../hooks/App/GenFilter";
import { Team } from "../../../../../hooks/App/Team";
import { useRemovalConnectedSearchVars } from "../../../../../hooks/Planner/MainSearches";
import { MemberMoveQuery, MemberMoveSearchVars, MEMBER_MOVESET_QUERY } from "../../../../../types-queries/Builder/MemberMove";
import { Dispatches, Filters } from "../../../../App";
import { MoveSelectClickHandlers, ReferencePanelView, SavedPokemonClickHandlers } from "../../TeamView";
import MoveSelectEntries from "./MoveSelectEntries";

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
      {loading
        ? <div>Loading...</div>
        : data && <MoveSelectEntries
            data={data}
            filters={filters}
          />
      }
    </div>
  )
};

export default MoveSelectView;