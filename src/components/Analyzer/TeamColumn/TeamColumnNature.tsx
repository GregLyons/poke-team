import { useState } from "react";
import { TeamAction } from "../../../hooks/App/Team";
import { useDelayedQuery, useGenConnectedSearchBar } from "../../../hooks/Searches";
import { PopupNatureQuery, PopupNatureVars, POPUP_NATURE_QUERY } from "../../../types-queries/Analyzer/PopupSearch";
import { natureNameToFormattedNatureName } from "../../../types-queries/Member/helpers";
import { MemberNature, MemberNatureResult_psID } from "../../../types-queries/Member/MemberNature";
import { MemberPokemon } from "../../../types-queries/Member/MemberPokemon";
import { Filters } from "../../App";
import ErrorBoundary from "../../Reusables/ErrorBoundary/ErrorBoundary";
import Popup from "../../Reusables/Popup/Popup";
import PopupSearch from "./PopupSearch";

type TeamColumnNatureProps = {
  teamDispatch: React.Dispatch<TeamAction>
  filters: Filters

  member: MemberPokemon
  memberIdx: number
  popupPositioning: {
    orientation: 'top' | 'bottom' | 'left' | 'right',
    nudge: 'top' | 'bottom' | 'left' | 'right',
  }
  
  nature: MemberNature | null | undefined
  determineRelevance: (name: string | undefined) => string
  onEntityClick: (memberPSID: string, entityPSID: string) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onPopupClose: () => void
};

const TeamColumnNature = ({
  teamDispatch,
  filters,
  
  member,
  memberIdx,
  popupPositioning,
  
  nature,
  determineRelevance,
  onEntityClick,
  onPopupClose,
}: TeamColumnNatureProps) => {
  const { queryVars, setQueryVars, searchBar, focusedOnInput, } = useGenConnectedSearchBar<PopupNatureVars>({
    defaultSearchVars: {
      gen: filters.genFilter.gen,
      startsWith: '',
      contains: '',
      limit: 5,
    },
    genFilter: filters.genFilter,
    searchBarProps: {
      title: 'Search natures',
      backgroundLight: 'red',
    },
  });
  const { data, loading, error } = useDelayedQuery<PopupNatureQuery, PopupNatureVars>({
    query: POPUP_NATURE_QUERY,
    queryVars,
    delay: 50,
  });
  const [forceClose, setForceClose] = useState<boolean>(false);

  const addNature = (natureEdge: { node: MemberNatureResult_psID, }) => {
    return (e: React.MouseEvent<HTMLElement, MouseEvent> | KeyboardEvent) => {
      e.preventDefault();

      teamDispatch({
        type: 'assign_nature',
        payload: {
          gen: filters.genFilter.gen,
          idx: memberIdx,
          nature: new MemberNature({
            ...natureEdge.node,
            name: natureEdge.node.psID,
          }, filters.genFilter.gen),
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
        trigger={
          <div
            className={`
                team-column__text
              ${determineRelevance(nature?.name)}
            `}
            onClick={onEntityClick(member?.psID || 'a', member?.nature?.name || 'a')}
          >
            {nature?.formattedName || 'Empty nature'}
          </div>}
        content={<PopupSearch
          data={data?.natures?.edges.map(edge => {
            return {
              node: {
                psID: edge.node.name,
                formattedName: natureNameToFormattedNatureName(edge.node.name),
                introduced: edge.node.introduced,
                modifiesStat: edge.node.modifiesStat,
              },
            };
          })}
          loading={loading}
          searchBar={searchBar}
          focusedOnInput={focusedOnInput}
          onSelect={addNature}
        />}
        {...popupPositioning}

        onClose={onPopupClose}
        forceClose={forceClose}
      />}
    </ErrorBoundary>
  );
};

export default TeamColumnNature;