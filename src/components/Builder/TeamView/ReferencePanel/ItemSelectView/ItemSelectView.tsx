import { useDelayedQuery, useGenConnectedSearchBar } from "../../../../../hooks/Searches";
import { MemberItemQuery, MemberItemVars, MEMBER_ITEM_QUERY } from "../../../../../types-queries/Member/MemberItem";
import { Filters } from "../../../../App";
import { ItemSelectHandlers } from "../../TeamView";
import ItemSelectEntries from "./ItemSelectEntries";
import './ItemSelectView.css';


type ItemSelectViewProps = {
  focusRef: React.RefObject<HTMLDivElement>
  handlers: ItemSelectHandlers
  filters: Filters
}

const ItemSelectView = ({
  focusRef,
  handlers: clickHandlers,
  filters,
}: ItemSelectViewProps) => {
  const { queryVars, searchBar, focusedOnInput, } = useGenConnectedSearchBar<MemberItemVars>({
    defaultSearchVars: {
      gen: filters.genFilter.gen,
      contains: '',
      startsWith: '',
    },
    genFilter: filters.genFilter,
    searchBarProps: {
      id: 'member_item_search',
      title: "Search items by name",
      backgroundLight: "green"
    },
  });

  const { data, loading, error } = useDelayedQuery<MemberItemQuery, MemberItemVars>({
    query: MEMBER_ITEM_QUERY,
    queryVars,
    // Shorten the delay since users might be rapidly entering searches
    delay: 50,
  });

  if (error) { return (<div>{error.message}</div>); }

  return (
    <div
      ref={focusRef}
      className="item-select__wrapper"
    >
      <form>
        <label htmlFor="member_item_search" className="hidden-label">Search items, 'Enter' selects first entry</label>
        {searchBar}
      </form>
      <div className="item-select__results">
        <div className="item-select__legend">
          <div className="item-select__name">
            <span>Name</span>
          </div>
        </div>
        {loading
          ? <div></div>
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