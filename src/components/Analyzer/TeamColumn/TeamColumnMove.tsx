import { useMemo, useState } from "react";
import { removedFromBDSP, removedFromSwSh } from "../../../hooks/App/GenFilter";
import { TeamAction } from "../../../hooks/App/Team";
import { useDelayedQuery, useRemovalConnectedSearchBar } from "../../../hooks/Searches";
import { PopupMoveQuery, PopupMoveVars, POPUP_MOVE_QUERY } from "../../../types-queries/Analyzer/PopupSearch";
import { MoveSlot } from "../../../types-queries/Member/helpers";
import { MemberMove, MemberMoveResult } from "../../../types-queries/Member/MemberMove";
import { MemberPokemon } from "../../../types-queries/Member/MemberPokemon";
import { Filters } from "../../App";
import ErrorBoundary from "../../Reusables/ErrorBoundary/ErrorBoundary";
import Popup from "../../Reusables/Popup/Popup";
import PopupSearch from "./PopupSearch";

type TeamColumnMoveProps = {
  teamDispatch: React.Dispatch<TeamAction>
  filters: Filters

  member: MemberPokemon
  memberIdx: number
  popupPositioning: {
    orientation: 'top' | 'bottom' | 'left' | 'right',
    nudge: 'top' | 'bottom' | 'left' | 'right',
  }

  move: MemberMove | null | undefined
  moveIdx: MoveSlot
  determineRelevance: (name: string | undefined) => string
  onEntityClick: (memberPSID: string, entityPSID: string) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onPopupClose: () => void
};

const TeamColumnMove = ({
  teamDispatch,
  filters,

  member,
  memberIdx,
  popupPositioning,

  move,
  moveIdx,
  determineRelevance,
  onEntityClick,
  onPopupClose,
}: TeamColumnMoveProps) => {
  const { queryVars, setQueryVars, searchBar, focusedOnInput, } = useRemovalConnectedSearchBar<PopupMoveVars>({
    defaultSearchVars: {
      gen: filters.genFilter.gen,
      psID: member?.psID || '',
      startsWith: '',
      contains: '',
      // Query more moves so that we can remove duplicates and get down to 5 moves; importing Pokemon or using the Builder will already have queried the Pokemon's moves, so they should be in the cache
      limit: 100,
      removedFromSwSh: removedFromSwSh(filters.genFilter),
      removedFromBDSP: removedFromBDSP(filters.genFilter),
    },
    genFilter: filters.genFilter,
    searchBarProps: {
      title: 'Search moves',
      backgroundLight: 'red',
    },
  });
  const { data, loading, error } = useDelayedQuery<PopupMoveQuery, PopupMoveVars>({
    query: POPUP_MOVE_QUERY,
    queryVars,
    delay: 50,
  });

  const [forceClose, setForceClose] = useState<boolean>(false);
  const addMove = (moveEdge: { node: MemberMoveResult, }) => {
    return (e: React.MouseEvent<HTMLElement, MouseEvent> | KeyboardEvent) => {
      e.preventDefault();

      teamDispatch({
        type: 'assign_move',
        payload: {
          gen: filters.genFilter.gen,
          idx: memberIdx,
          moveIdx,
          move: new MemberMove(moveEdge.node, filters.genFilter.gen, false),
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

  // Get up to 5 unique moves from 'data', if it exists; there may be duplicates due to a Pokemon learning the move through different methods
  const dataWithoutDuplicates = useMemo(() => {
    let slicedData: PopupMoveQuery = { pokemonByPSID: [{ moves: { edges: [] }}], };
    if (data && data?.pokemonByPSID?.length > 0) {
      slicedData.pokemonByPSID[0].moves.edges = data.pokemonByPSID[0].moves.edges.reduce((edgesWithoutDuplicateMoves, currentEdge) => {
        // Once we've reached five edges, stop
        if (edgesWithoutDuplicateMoves.length > 4) return edgesWithoutDuplicateMoves;
  
        const { psID } = currentEdge.node;
        
        // If move is already present, do nothing
        if (edgesWithoutDuplicateMoves.map(edge => edge.node.psID).includes(psID)) return edgesWithoutDuplicateMoves;

        // TODO: flag event-only moves
  
        // Otherwise, add curr to acc
        return edgesWithoutDuplicateMoves.concat(currentEdge);
      }, ([] as { node: MemberMoveResult, learnMethod: string }[]));
    }

    return slicedData;
  }, [data]);

  if (error) { return <div>{error.message}</div> };

  return (
    <ErrorBoundary>
      {member && <Popup
        trigger={<div
          className={`
          team-column__text
            ${determineRelevance(move?.psID)}
          `}
          onClick={onEntityClick(member?.psID || 'a', member?.moveset[moveIdx]?.psID || 'a')}
        >
          {move?.formattedName || 'Empty moveslot'}
        </div>}
        content={<PopupSearch
          data={dataWithoutDuplicates?.pokemonByPSID?.[0]?.moves?.edges.map(edge => edge)}
          loading={loading}
          searchBar={searchBar}
          focusedOnInput={focusedOnInput}
          onSelect={addMove}
        />}
        {...popupPositioning}

        onClose={onPopupClose}
        forceClose={forceClose}
      />}
    </ErrorBoundary>
  );
};

export default TeamColumnMove;