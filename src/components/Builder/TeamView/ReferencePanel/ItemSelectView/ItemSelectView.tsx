import { useQuery } from "@apollo/client";
import { removedFromBDSP, removedFromSwSh } from "../../../../../hooks/App/GenFilter";
import { Team } from "../../../../../hooks/App/Team";
import { useGenConnectedSearchVars, useRemovalConnectedSearchVars } from "../../../../../hooks/Planner/MainSearches";
import { MemberItemQuery, MemberItemSearchVars, MEMBER_ITEM_QUERY } from "../../../../../types-queries/Builder/MemberItem";
import { MemberMoveQuery, MemberMoveSearchVars, MEMBER_MOVESET_QUERY } from "../../../../../types-queries/Builder/MemberMove";
import { Dispatches, Filters } from "../../../../App";
import { ItemSelectClickHandlers, ReferencePanelView, SavedPokemonClickHandlers } from "../../TeamView";
import ItemSelectEntries from "./ItemSelectEntries";

type ItemSelectViewProps = {
  clickHandlers: ItemSelectClickHandlers
  view: ReferencePanelView
  dispatches: Dispatches
  filters: Filters
  psID: string
}

const ItemSelectView = ({
  clickHandlers,
  view,
  dispatches,
  filters,
  psID,
}: ItemSelectViewProps) => {
  const [queryVars, setQueryVars, searchTerm, handleSearchTermChange, searchMode, handleSearchModeChange] = useGenConnectedSearchVars<MemberItemSearchVars>(
    {
      gen: filters.genFilter.gen,
      contains: '',
      startsWith: '',
    },
    filters.genFilter,
  );

  const { data, loading, error } = useQuery<MemberItemQuery, MemberItemSearchVars>(MEMBER_ITEM_QUERY, {
    variables: queryVars,
  });

  if (error) { return (<div>{error.message}</div>); }

  return (
    <div className="move-select__wrapper">
      {loading
        ? <div>Loading...</div>
        : data && <ItemSelectEntries
            data={data}
            filters={filters}
          />
      }
    </div>
  )
};

export default ItemSelectView;