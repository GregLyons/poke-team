import { useEffect, useState } from "react";
import { TeamAction } from "../../../hooks/App/Team";
import { useDelayedQuery, useGenConnectedSearchBar } from "../../../hooks/Searches";
import { PopupAbilityQuery, PopupAbilityVars, POPUP_ABILITY_QUERY } from "../../../types-queries/Analyzer/PopupSearch";
import { AbilitySlot } from "../../../types-queries/Member/helpers";
import { MemberAbility, MemberAbilityResult } from "../../../types-queries/Member/MemberAbility";
import { MemberPokemon } from "../../../types-queries/Member/MemberPokemon";
import { Filters } from "../../App";
import ErrorBoundary from "../../Reusables/ErrorBoundary/ErrorBoundary";
import Popup from "../../Reusables/Popup/Popup";
import PopupSearch from "./PopupSearch";

type TeamColumnAbilityProps = {
  teamDispatch: React.Dispatch<TeamAction>
  filters: Filters

  member: MemberPokemon
  memberIdx: number
  popupPositioning: {
    orientation: 'top' | 'bottom' | 'left' | 'right',
    nudge: 'top' | 'bottom' | 'left' | 'right',
  }

  ability: MemberAbility | null | undefined
  determineRelevance: (name: string | undefined) => string
  onEntityClick: (memberPSID: string, entityPSID: string) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onPopupClose: () => void
};

const TeamColumnAbility = ({
  teamDispatch,
  filters,

  member,
  memberIdx,
  popupPositioning,
  
  ability,
  determineRelevance,
  onEntityClick,
  onPopupClose,
}: TeamColumnAbilityProps) => {
  const { queryVars, setQueryVars, searchBar, focusedOnInput, } = useGenConnectedSearchBar<PopupAbilityVars>({
    defaultSearchVars: {
      gen: filters.genFilter.gen,
      psID: member?.psID || '',
      startsWith: '',
      contains: '',
      limit: 5,
    },
    genFilter: filters.genFilter,
    searchBarProps: {
      id: 'popup_ability_search',
      title: 'Search abilities',
      backgroundLight: 'red',
    },
  });

  useEffect(() => {
    if (!member) return;
    setQueryVars({
      ...queryVars,
      psID: member.psID,
    })
  }, [member]);

  const { data, loading, error } = useDelayedQuery<PopupAbilityQuery, PopupAbilityVars>({
    query: POPUP_ABILITY_QUERY,
    queryVars,
    delay: 50,
  });

  const [forceClose, setForceClose] = useState<boolean>(false);

  const addAbility = (abilityEdge: { node: MemberAbilityResult, slot: AbilitySlot, }) => {
    return (e: React.MouseEvent<HTMLElement, MouseEvent> | KeyboardEvent) => {
      e.preventDefault();

      teamDispatch({
        type: 'assign_ability',
        payload: {
          gen: filters.genFilter.gen,
          idx: memberIdx,
          ability: new MemberAbility(abilityEdge.node, filters.genFilter.gen, abilityEdge.slot),
        },
      });

      // Close popup
      setForceClose(true);
      setTimeout(() => setForceClose(false));
      onPopupClose();

      // Clear search term
      setQueryVars({
        ...queryVars,
        startsWith: '',
        contains: '',
      });
    };
  };

  if (error) { return <div>{error.message}</div> };

  return (
    <ErrorBoundary>
      {member && <Popup
        triggerID={`popup_trigger_${memberIdx}_ability`}
        trigger={
          <div
            className={`
              team-column__text
              ${determineRelevance(ability?.psID)}
            `}
            onClick={onEntityClick(member?.psID || 'a', member?.ability?.psID || 'a')}
          >
            {ability?.formattedName || 'Empty ability'}
          </div>}
        content={<PopupSearch
          data={data?.pokemonByPSID?.[0]?.abilities?.edges.map(edge => edge)}
          loading={loading}
          searchBar={searchBar}
          focusedOnInput={focusedOnInput}
          onSelect={addAbility}
        />}
        {...popupPositioning}

        onClose={onPopupClose}
        forceClose={forceClose}
      />}
    </ErrorBoundary>
  );
};

export default TeamColumnAbility;