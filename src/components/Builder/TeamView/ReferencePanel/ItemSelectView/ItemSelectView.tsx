import { useQuery } from "@apollo/client";
import { removedFromBDSP, removedFromSwSh } from "../../../../../hooks/App/GenFilter";
import { Team } from "../../../../../hooks/App/Team";
import { useGenConnectedSearchVars, useRemovalConnectedSearchVars } from "../../../../../hooks/Planner/MainSearches";
import { MemberItemQuery, MemberItemSearchVars, MEMBER_ITEM_QUERY } from "../../../../../types-queries/Builder/MemberItem";
import { MemberMoveQuery, MemberMoveSearchVars, MEMBER_MOVESET_QUERY } from "../../../../../types-queries/Builder/MemberMove";
import { Dispatches, Filters } from "../../../../App";
import SearchBar from "../../../../Reusables/SearchBar/SearchBar";
import { ItemSelectClickHandlers, ReferencePanelView, SavedPokemonClickHandlers } from "../../TeamView";
import ItemSelectEntries from "./ItemSelectEntries";

import './ItemSelectView.css';

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
    <div className="item-select__wrapper">
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
      <div className="item-select__results">
        <div className="item-select__legend">
          <div className="item-select__name">
            <span>Name</span>
          </div>
          <div className="item-select__description">
            <span>Description</span>
          </div>
        </div>
        {loading
          ? <div>Loading...</div>
          : data && <ItemSelectEntries
              data={data}
              clickHandlers={clickHandlers}
              filters={filters}
            />
        }
      </div>
    </div>
  )
};

export default ItemSelectView;