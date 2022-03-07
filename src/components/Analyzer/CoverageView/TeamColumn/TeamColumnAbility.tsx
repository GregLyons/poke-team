import { useState } from "react";
import { useDelayedQuery, useGenConnectedSearchBar, useGenConnectedSearchVars } from "../../../../hooks/Searches";
import { PopupAbilityQuery, PopupAbilityVars, POPUP_ABILITY_QUERY } from "../../../../types-queries/Analyzer/PopupSearch";
import { AbilitySlot } from "../../../../types-queries/Member/helpers";
import { MemberAbility, MemberAbilityResult } from "../../../../types-queries/Member/MemberAbility";
import { MemberPokemon } from "../../../../types-queries/Member/MemberPokemon";
import { Dispatches, Filters } from "../../../App";
import Popup from "../../../Reusables/Popup/Popup";
import PopupSearch from "./PopupSearch";

type TeamColumnAbilityProps = {
  dispatches: Dispatches
  filters: Filters

  member: MemberPokemon | null
  memberIdx: number

  ability: MemberAbility | null | undefined
  determineRelevance: (name: string | undefined) => string
  onEntityClick: (memberPSID: string, entityPSID: string) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onPopupClose: () => void
};

const TeamColumnAbility = ({
  dispatches,
  filters,

  member,
  memberIdx,
  
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
      title: 'Search abilities',
      backgroundLight: 'red',
    },
  });
  const { data, loading, error } = useDelayedQuery<PopupAbilityQuery, PopupAbilityVars>({
    query: POPUP_ABILITY_QUERY,
    queryVars,
    delay: 50,
  });

  const [forceClose, setForceClose] = useState<boolean>(false);

  const addAbility = (abilityEdge: { node: MemberAbilityResult, slot: AbilitySlot, }) => {
    return (e: React.MouseEvent<HTMLElement, MouseEvent> | KeyboardEvent) => {
      e.preventDefault();

      dispatches.dispatchTeam({
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
    <>
      {member?.ability && <Popup
        trigger={
          <div
            className={`
              analyzer-member__text
              ${determineRelevance(ability?.psID)}
            `}
            onClick={onEntityClick(member?.psID || 'a', member?.ability?.psID || 'a')}
          >
            {ability?.formattedName || ''}
          </div>}
        content={<PopupSearch
          data={data?.pokemonByPSID?.[0]?.abilities?.edges.map(edge => edge)}
          loading={loading}
          searchBar={searchBar}
          focusedOnInput={focusedOnInput}
          onSelect={addAbility}
        />}
        orientation='right'

        onClose={onPopupClose}
        forceClose={forceClose}
      />}
    </>
  );
};

export default TeamColumnAbility;