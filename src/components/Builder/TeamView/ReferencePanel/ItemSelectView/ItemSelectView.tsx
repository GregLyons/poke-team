import { useDelayedQuery, useGenConnectedSearchVars, } from "../../../../../hooks/Searches";
import { MemberItemQuery, MemberItemSearchVars, MEMBER_ITEM_QUERY } from "../../../../../types-queries/Builder/MemberItem";
import { Filters } from "../../../../App";
import { ItemSelectClickHandlers, } from "../../TeamView";
import ItemSelectEntries from "./ItemSelectEntries";

import './ItemSelectView.css';

type ItemSelectViewProps = {
  clickHandlers: ItemSelectClickHandlers
  filters: Filters
}

const ItemSelectView = ({
  clickHandlers,
  filters,
}: ItemSelectViewProps) => {
  const { queryVars, searchBar, focusedOnInput, } = useGenConnectedSearchVars<MemberItemSearchVars>({
    defaultSearchVars: {
      gen: filters.genFilter.gen,
      contains: '',
      startsWith: '',
    },
    genFilter: filters.genFilter,
    searchBarProps: {
      title: "Search items by name",
      backgroundLight: "green"
    },
  });

  const { data, loading, error } = useDelayedQuery<MemberItemQuery, MemberItemSearchVars>({
    query: MEMBER_ITEM_QUERY,
    queryVars,
    // Shorten the delay since users might be rapidly entering searches
    delay: 50,
  });

  if (error) { return (<div>{error.message}</div>); }

  return (
    <div className="item-select__wrapper">
      <form>
        {searchBar}
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
              focusedOnInput={focusedOnInput}
            />
        }
      </div>
    </div>
  )
};

export default ItemSelectView;