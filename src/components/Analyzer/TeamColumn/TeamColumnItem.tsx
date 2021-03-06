import { useState } from "react";
import { TeamAction } from "../../../hooks/App/Team";
import { useDelayedQuery, useGenConnectedSearchBar } from "../../../hooks/Searches";
import { PopupItemQuery, PopupItemVars, POPUP_ITEM_QUERY } from "../../../types-queries/Analyzer/PopupSearch";
import { MemberItem, MemberItemResult } from "../../../types-queries/Member/MemberItem";
import { MemberPokemon } from "../../../types-queries/Member/MemberPokemon";
import { Filters } from "../../App";
import ErrorBoundary from "../../Reusables/ErrorBoundary/ErrorBoundary";
import Popup from "../../Reusables/Popup/Popup";
import PopupSearch from "./PopupSearch";

type TeamColumnItemProps = {
  teamDispatch: React.Dispatch<TeamAction>
  filters: Filters

  member: MemberPokemon
  memberIdx: number
  popupPositioning: {
    orientation: 'top' | 'bottom' | 'left' | 'right',
    nudge: 'top' | 'bottom' | 'left' | 'right',
  }
  
  item: MemberItem | null | undefined
  determineRelevance: (name: string | undefined) => string
  onEntityClick: (memberPSID: string, entityPSID: string) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onPopupClose: () => void
};

const TeamColumnItem = ({
  teamDispatch,
  filters,
  
  member,
  memberIdx,
  popupPositioning,
  
  item,
  determineRelevance,
  onEntityClick,
  onPopupClose,
}: TeamColumnItemProps) => {
  const { queryVars, setQueryVars, searchBar, focusedOnInput, } = useGenConnectedSearchBar<PopupItemVars>({
    defaultSearchVars: {
      gen: filters.genFilter.gen,
      startsWith: '',
      contains: '',
      limit: 5,
    },
    genFilter: filters.genFilter,
    searchBarProps: {
      id: 'popup_item_search',
      title: 'Search items',
      backgroundLight: 'red',
    },
  });
  const { data, loading, error } = useDelayedQuery<PopupItemQuery, PopupItemVars>({
    query: POPUP_ITEM_QUERY,
    queryVars,
    delay: 50,
  });
  const [forceClose, setForceClose] = useState<boolean>(false);

  const addItem = (itemEdge: { node: MemberItemResult, }) => {
    return (e: React.MouseEvent<HTMLElement, MouseEvent> | KeyboardEvent) => {
      e.preventDefault();

      teamDispatch({
        type: 'assign_item',
        payload: {
          gen: filters.genFilter.gen,
          idx: memberIdx,
          item: new MemberItem(itemEdge.node, filters.genFilter.gen),
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
    <ErrorBoundary {...popupPositioning}>
      {member && <Popup
        triggerID={`popup_trigger_${memberIdx}_item`}
        trigger={
          <div
            className={`
                team-column__text
              ${determineRelevance(item?.psID)}
            `}
            onClick={onEntityClick(member?.psID || 'a', member?.item?.psID || 'a')}
          >
            {item?.formattedName || 'Empty item'}
          </div>}
        content={<PopupSearch
          data={data?.items?.edges.map(edge => edge)}
          loading={loading}
          searchBar={searchBar}
          focusedOnInput={focusedOnInput}
          onSelect={addItem}
        />}
        {...popupPositioning}

        onClose={onPopupClose}
        forceClose={forceClose}
      />}
    </ErrorBoundary>
  );
};

export default TeamColumnItem;