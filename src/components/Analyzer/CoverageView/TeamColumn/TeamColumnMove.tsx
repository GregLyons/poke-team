import { useMemo } from "react";
import { removedFromBDSP, removedFromSwSh } from "../../../../hooks/App/GenFilter";
import { useDelayedQuery, useRemovalConnectedSearchVars } from "../../../../hooks/Searches";
import { PopupMoveQuery, PopupMoveVars, POPUP_MOVE_QUERY } from "../../../../types-queries/Analyzer/PopupSearch";
import { MemberMove, MemberMoveResult } from "../../../../types-queries/Member/MemberMove";
import { MemberPokemon } from "../../../../types-queries/Member/MemberPokemon";
import { Dispatches, Filters } from "../../../App";
import Popup from "../../../Reusables/Popup/Popup";
import PopupSearch from "./PopupSearch";

type TeamColumnMoveProps = {
  dispatches: Dispatches
  filters: Filters

  member: MemberPokemon | null
  move: MemberMove | null | undefined
  moveIdx: 0 | 1 | 2 | 3
  determineRelevance: (name: string | undefined) => string
  onEntityClick: (memberPSID: string, entityPSID: string) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onEntityClose: () => void
};

const TeamColumnMove = ({
  dispatches,
  filters,

  member,
  move,
  moveIdx,
  determineRelevance,
  onEntityClick,
  onEntityClose,
}: TeamColumnMoveProps) => {
  const { queryVars, searchBar, focusedOnInput, } = useRemovalConnectedSearchVars<PopupMoveVars>({
    defaultSearchVars: {
      gen: filters.genFilter.gen,
      psID: member?.psID || '',
      startsWith: '',
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

  // Get up to 5 unique moves from 'data', if it exists; there may be duplicates due to a Pokemon learning the move through different methods
  const dataWithoutDuplicates = useMemo(() => {
    let slicedData: PopupMoveQuery = { pokemonByPSID: [{ moves: { edges: [] }}], };
    if (data && data?.pokemonByPSID?.length > 0) {
      slicedData.pokemonByPSID[0].moves.edges = data.pokemonByPSID[0].moves.edges.reduce((edgesWithoutDuplicateMoves, currentEdge) => {
        // Once we've reached five edges, stop
        if (edgesWithoutDuplicateMoves.length > 5) return edgesWithoutDuplicateMoves;
  
        const { psID } = currentEdge.node;
        
        // If move is already present, do nothing
        if (edgesWithoutDuplicateMoves.map(edge => edge.node.psID).includes(psID)) return edgesWithoutDuplicateMoves;
  
        // Otherwise, add curr to acc
        return edgesWithoutDuplicateMoves.concat(currentEdge);
      }, ([] as { node: MemberMoveResult, learnMethod: string }[]));
    }

    return slicedData;
  }, [data]);

  if (error) { return <div>{error.message}</div> };

  return (
    <>
      {member?.moveset[moveIdx] && <Popup
        trigger={<div
          className={`
          analyzer-member__text
            ${determineRelevance(move?.psID)}
          `}
          onClick={onEntityClick(member?.psID || 'a', member?.moveset[moveIdx]?.psID || 'a')}
        >
          {move?.formattedName || ''}
        </div>}
        content={loading
          ? <div>Loading...</div>
          : <PopupSearch
              data={dataWithoutDuplicates?.pokemonByPSID?.[0]?.moves?.edges.map(edge => edge.node)}
              searchBar={searchBar}
            />
        }
        orientation='right'
        onClose={onEntityClose}
      />}
    </>
  );
};

export default TeamColumnMove;