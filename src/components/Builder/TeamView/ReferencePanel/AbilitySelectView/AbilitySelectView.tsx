import { useQuery } from "@apollo/client";
import { removedFromBDSP, removedFromSwSh } from "../../../../../hooks/App/GenFilter";
import { Team } from "../../../../../hooks/App/Team";
import { useDelayedQuery, useGenConnectedSearchVars, useRemovalConnectedSearchVars } from "../../../../../hooks/Searches";
import { MemberAbilityQuery, MemberAbilitySearchVars, MEMBER_ABILITY_QUERY } from "../../../../../types-queries/Builder/MemberAbility";
import { MemberMoveQuery, MemberMoveSearchVars, MEMBER_MOVESET_QUERY } from "../../../../../types-queries/Builder/MemberMove";
import { Dispatches, Filters } from "../../../../App";
import SearchBar from "../../../../Reusables/SearchBar/SearchBar";
import { AbilitySelectHandlers, ReferencePanelView, SavedPokemonClickHandlers } from "../../TeamView";
import AbilitySelectEntries from "./AbilitySelectEntries";

import './AbilitySelectView.css';

type AbilitySelectViewProps = {
  handlers: AbilitySelectHandlers
  view: ReferencePanelView
  dispatches: Dispatches
  filters: Filters
  psID: string
}

const AbilitySelectView = ({
  handlers: clickHandlers,
  view,
  dispatches,
  filters,
  psID,
}: AbilitySelectViewProps) => {
  const { queryVars, setQueryVars, searchBar, focusedOnInput, } = useGenConnectedSearchVars<MemberAbilitySearchVars>({
    defaultSearchVars: {
      gen: filters.genFilter.gen,
      psID,
      contains: '',
      startsWith: '',
    },
    genFilter: filters.genFilter,
    searchBarProps: {
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
    <div className="ability-select__wrapper">
      <form>
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
          <div className="ability-select__description">
            <span>Description</span>
          </div>
        </div>
        {loading
          ? <div>Loading...</div>
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