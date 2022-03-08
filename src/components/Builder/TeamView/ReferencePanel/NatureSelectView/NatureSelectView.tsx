import { useDelayedQuery, useGenConnectedSearchBar } from "../../../../../hooks/Searches";
import { MemberNatureQuery, MemberNatureVars, MEMBER_NATURE_QUERY } from "../../../../../types-queries/Member/MemberNature";
import { Filters } from "../../../../App";
import { NatureSelectHandlers } from "../../TeamView";
import NatureSelectEntries from "./NatureSelectEntries";
import './NatureSelectView.css';


type NatureSelectViewProps = {
  handlers: NatureSelectHandlers
  filters: Filters
}

const NatureSelectView = ({
  handlers: clickHandlers,
  filters,
}: NatureSelectViewProps) => {
  const { queryVars, searchBar, focusedOnInput, } = useGenConnectedSearchBar<MemberNatureVars>({
    defaultSearchVars: {
      gen: filters.genFilter.gen,
      contains: '',
      startsWith: '',
    },
    genFilter: filters.genFilter,
    searchBarProps: {
      title: "Search natures by name",
      backgroundLight: "green"
    },
  });

  const { data, loading, error } = useDelayedQuery<MemberNatureQuery, MemberNatureVars>({
    query: MEMBER_NATURE_QUERY,
    queryVars,
    // Shorten the delay since users might be rapidly entering searches
    delay: 50,
  });

  if (error) { return (<div>{error.message}</div>); }

  return (
    <div className="nature-select__wrapper">
      <form>
        {searchBar}
      </form>
      <div className="nature-select__results">
        <div className="nature-select__legend">
          <div className="nature-select__name">
            <span>Name</span>
          </div>
          <div className="nature-select__boost">
            <span>Boosts</span>
          </div>
          <div className="nature-select__reduce">
            <span>Reduces</span>
          </div>
        </div>
        {loading
          ? <div>Loading...</div>
          : data && <NatureSelectEntries
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

export default NatureSelectView;