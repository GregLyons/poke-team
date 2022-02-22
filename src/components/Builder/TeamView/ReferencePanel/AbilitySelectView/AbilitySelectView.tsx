import { useQuery } from "@apollo/client";
import { removedFromBDSP, removedFromSwSh } from "../../../../../hooks/App/GenFilter";
import { Team } from "../../../../../hooks/App/Team";
import { useGenConnectedSearchVars, useRemovalConnectedSearchVars } from "../../../../../hooks/Planner/MainSearches";
import { MemberAbilityQuery, MemberAbilitySearchVars, MEMBER_ABILITY_QUERY } from "../../../../../types-queries/Builder/MemberAbility";
import { MemberMoveQuery, MemberMoveSearchVars, MEMBER_MOVESET_QUERY } from "../../../../../types-queries/Builder/MemberMove";
import { Dispatches, Filters } from "../../../../App";
import { AbilitySelectClickHandlers, ReferencePanelView, SavedPokemonClickHandlers } from "../../TeamView";
import AbilitySelectEntries from "./AbilitySelectEntries";

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
    <div className="move-select__wrapper">
      {loading
        ? <div>Loading...</div>
        : data && <AbilitySelectEntries
            data={data}
            filters={filters}
          />
      }
    </div>
  )
};

export default AbilitySelectView;