import { useDelayedQuery, useGenConnectedSearchBar } from "../../../../../hooks/Searches";
import { MemberAbilityQuery, MemberAbilitySearchVars, MEMBER_ABILITY_QUERY } from "../../../../../types-queries/Member/MemberAbility";
import { Filters } from "../../../../App";
import { AbilitySelectHandlers } from "../../TeamView";
import AbilitySelectEntries from "./AbilitySelectEntries";
import './AbilitySelectView.css';


type AbilitySelectViewProps = {
  focusRef: React.RefObject<HTMLDivElement>
  handlers: AbilitySelectHandlers
  filters: Filters
  psID: string
}

const AbilitySelectView = ({
  focusRef,
  handlers: clickHandlers,
  filters,
  psID,
}: AbilitySelectViewProps) => {
  const { queryVars, searchBar, focusedOnInput, } = useGenConnectedSearchBar<MemberAbilitySearchVars>({
    defaultSearchVars: {
      gen: filters.genFilter.gen,
      psID,
      contains: '',
      startsWith: '',
    },
    genFilter: filters.genFilter,
    searchBarProps: {
      id: 'member_ability_search',
      title: "Search abilities by name",
      backgroundLight: "green"
    },
  });

  const { data, loading, error } = useDelayedQuery<MemberAbilityQuery, MemberAbilitySearchVars>({
    query: MEMBER_ABILITY_QUERY,
    queryVars,
    // Shorten the delay since users might be rapidly entering searches
    delay: 50,
  });

  if (error) { return (<div>{error.message}</div>); }

  return (
    <div
      ref={focusRef}
      className="ability-select__wrapper"
    >
      <form>
        <label htmlFor="member_ability_search" className="hidden-label">Search abilities, 'Enter' selects first entry</label>
        {searchBar}
      </form>
      <div className="ability-select__results">
        <div className="ability-select__legend">
          <div className="ability-select__name">
            <span>Name</span>
          </div>
          <div className="ability-select__slot">
            <span>Slot</span>
          </div>
        </div>
        {loading
          ? <div></div>
          : data && <AbilitySelectEntries
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

export default AbilitySelectView;