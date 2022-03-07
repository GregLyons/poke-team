import { useDelayedQuery, useGenConnectedSearchVars } from "../../../../hooks/Searches";
import { PopupAbilityQuery, PopupAbilityVars, POPUP_ABILITY_QUERY } from "../../../../types-queries/Analyzer/PopupSearch";
import { MemberAbility } from "../../../../types-queries/Member/MemberAbility";
import { MemberPokemon } from "../../../../types-queries/Member/MemberPokemon";
import { Dispatches, Filters } from "../../../App";
import Popup from "../../../Reusables/Popup/Popup";
import PopupSearch from "./PopupSearch";

type TeamColumnAbilityProps = {
  dispatches: Dispatches
  filters: Filters

  member: MemberPokemon | null
  ability: MemberAbility | null | undefined
  determineRelevance: (name: string | undefined) => string
  onEntityClick: (memberPSID: string, entityPSID: string) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onEntityClose: () => void
};

const TeamColumnAbility = ({
  dispatches,
  filters,

  member,
  ability,
  determineRelevance,
  onEntityClick,
  onEntityClose,
}: TeamColumnAbilityProps) => {
  const { queryVars, searchBar, focusedOnInput, } = useGenConnectedSearchVars<PopupAbilityVars>({
    defaultSearchVars: {
      gen: filters.genFilter.gen,
      psID: member?.psID || '',
      startsWith: '',
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
        content={loading
          ? <div>Loading...</div>
          : <PopupSearch
              data={data?.pokemonByPSID?.[0]?.abilities?.edges.map(edge => edge.node)}
              searchBar={searchBar}
            />
        }
        orientation='right'
        onClose={onEntityClose}
      />}
    </>
  );
};

export default TeamColumnAbility;