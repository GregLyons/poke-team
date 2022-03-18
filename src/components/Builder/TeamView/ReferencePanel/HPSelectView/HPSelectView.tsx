import { useDelayedQuery, useGenConnectedSearchBar } from "../../../../../hooks/Searches";
import { HPTypeQuery, HPTypeVars, HPTYPE_QUERY } from "../../../../../types-queries/Member/MemberPokemon";
import { Filters } from "../../../../App";
import LoadIcon from "../../../../Reusables/LoadIcon/LoadIcon";
import { HPSelectHandlers } from "../../TeamView";
import HPSelectEntries from "./HPSelectEntries";
import './HPSelectView.css';


type HPSelectViewProps = {
  handlers: HPSelectHandlers
  filters: Filters
}

const HPSelectView = ({
  handlers: clickHandlers,
  filters,
}: HPSelectViewProps) => {
  const { queryVars, searchBar, focusedOnInput, } = useGenConnectedSearchBar<HPTypeVars>({
    defaultSearchVars: {
      gen: filters.genFilter.gen,
      contains: '',
      startsWith: '',
    },
    genFilter: filters.genFilter,
    searchBarProps: {
      title: "Search types by name",
      backgroundLight: "green"
    },
  });

  const { data, loading, error } = useDelayedQuery<HPTypeQuery, HPTypeVars>({
    query: HPTYPE_QUERY,
    queryVars,
    // Shorten the delay since users might be rapidly entering searches
    delay: 50,
  });

  if (error) { return (<div>{error.message}</div>); }

  return (
    <div className="hp-select__wrapper">
      <form>
        {searchBar}
      </form>
      <div className="hp-select__results">
        <div className="hp-select__legend">
          <div className="hp-select__icon"></div>
          <div className="hp-select__name">
            <span>Type</span>
          </div>
          <div className="hp-select__ivs">
            <span>IVs</span>
          </div>
        </div>
        {loading
          ? <LoadIcon />
          : data && <HPSelectEntries
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

export default HPSelectView;