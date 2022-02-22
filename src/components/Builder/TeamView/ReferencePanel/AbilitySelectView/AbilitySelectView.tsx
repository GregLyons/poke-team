import { useQuery } from "@apollo/client";
import { removedFromBDSP, removedFromSwSh } from "../../../../../hooks/App/GenFilter";
import { Team } from "../../../../../hooks/App/Team";
import { useGenConnectedSearchVars, useRemovalConnectedSearchVars } from "../../../../../hooks/Planner/MainSearches";
import { MemberAbilityQuery, MemberAbilitySearchVars, MEMBER_ABILITY_QUERY } from "../../../../../types-queries/Builder/MemberAbility";
import { MemberMoveQuery, MemberMoveSearchVars, MEMBER_MOVESET_QUERY } from "../../../../../types-queries/Builder/MemberMove";
import { Dispatches, Filters } from "../../../../App";
import SearchBar from "../../../../Reusables/SearchBar/SearchBar";
import { AbilitySelectClickHandlers, ReferencePanelView, SavedPokemonClickHandlers } from "../../TeamView";
import AbilitySelectEntries from "./AbilitySelectEntries";

import './AbilitySelectView.css';

type AbilitySelectViewProps = {
  clickHandlers: AbilitySelectClickHandlers
  view: ReferencePanelView
  dispatches: Dispatches
  filters: Filters
  psID: string
}

const AbilitySelectView = ({
  clickHandlers,
  view,
  dispatches,
  filters,
  psID,
}: AbilitySelectViewProps) => {
  const [queryVars, setQueryVars, searchTerm, handleSearchTermChange, searchMode, handleSearchModeChange] = useGenConnectedSearchVars<MemberAbilitySearchVars>(
    {
      gen: filters.genFilter.gen,
      psID,
      contains: '',
      startsWith: '',
    },
    filters.genFilter,
  );

  const { data, loading, error } = useQuery<MemberAbilityQuery, MemberAbilitySearchVars>(MEMBER_ABILITY_QUERY, {
    variables: queryVars,
  });

  if (error) { return (<div>{error.message}</div>); }

  return (
    <div className="ability-select__wrapper">
      <form>
        <SearchBar
          title="Search abilities by name"
          placeholder="ENTER to select first row"
          searchTerm={searchTerm}
          handleSearchTermChange={handleSearchTermChange}
          searchMode={searchMode}
          handleSearchModeChange={handleSearchModeChange}
          backgroundLight="green"
        />
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
            />
        }
      </div>
    </div>
  )
};

export default AbilitySelectView;