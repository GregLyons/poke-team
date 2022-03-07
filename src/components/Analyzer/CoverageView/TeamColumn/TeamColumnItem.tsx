import { useDelayedQuery, useGenConnectedSearchVars } from "../../../../hooks/Searches";
import { PopupItemQuery, PopupItemVars, POPUP_ITEM_QUERY } from "../../../../types-queries/Analyzer/PopupSearch";
import { MemberItem } from "../../../../types-queries/Member/MemberItem";
import { MemberPokemon } from "../../../../types-queries/Member/MemberPokemon";
import { Dispatches, Filters } from "../../../App";
import Popup from "../../../Reusables/Popup/Popup";
import PopupSearch from "./PopupSearch";

type TeamColumnItemProps = {
  dispatches: Dispatches
  filters: Filters

  member: MemberPokemon | null
  item: MemberItem | null | undefined
  determineRelevance: (name: string | undefined) => string
  onEntityClick: (memberPSID: string, entityPSID: string) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onEntityClose: () => void
};

const TeamColumnItem = ({
  dispatches,
  filters,
  
  member,
  item,
  determineRelevance,
  onEntityClick,
  onEntityClose,
}: TeamColumnItemProps) => {
  const { queryVars, searchBar, focusedOnInput, } = useGenConnectedSearchVars<PopupItemVars>({
    defaultSearchVars: {
      gen: filters.genFilter.gen,
      psID: member?.psID || '',
      startsWith: '',
      limit: 5,
    },
    genFilter: filters.genFilter,
    searchBarProps: {
      title: 'Search items',
      backgroundLight: 'red',
    },
  });
  const { data, loading, error } = useDelayedQuery<PopupItemQuery, PopupItemVars>({
    query: POPUP_ITEM_QUERY,
    queryVars,
    delay: 50,
  });

  if (error) { return <div>{error.message}</div> };


  return (
    <>
      {member?.item && <Popup
        trigger={
          <div
            className={`
                analyzer-member__text
              ${determineRelevance(item?.psID)}
            `}
            onClick={onEntityClick(member?.psID || 'a', member?.item?.psID || 'a')}
          >
            {item?.formattedName || ''}
          </div>}
        content={loading
          ? <div>Loading...</div>
          : <PopupSearch
              data={data?.items?.edges.map(edge => edge.node)}
              searchBar={searchBar}
            />
        }
        orientation='right'
        onClose={onEntityClose}
      />}
    </>
  );
};

export default TeamColumnItem;