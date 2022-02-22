import { useEffect, useMemo, useState } from "react";
import { MemberMove, MemberMoveQuery, MemberMoveQueryResult } from "../../../../../types-queries/Builder/MemberMove";
import { Filters } from "../../../../App";
import { MoveSelectClickHandlers } from "../../TeamView";
import MoveSelectEntry from "./MoveSelectEntry";

type MoveSelectEntriesProps = {
  data: MemberMoveQuery
  clickHandlers: MoveSelectClickHandlers
  filters: Filters
};

const MoveSelectEntries = ({
  data,
  clickHandlers,
  filters,
}: MoveSelectEntriesProps) => {
  const [sorted, setSorted] = useState(false);

  const originalEntries: MemberMove[] | undefined = useMemo(() => {
    // If not data, do nothing
    if (!data) return undefined;

    // Find event-only moves
    // #region

    // Associative array for keeping track of whether move is event only
    let eventOnlyMoves: { [key: string]: boolean } = {};

    /*
      When encountering a Move for the first time, set 'eventOnly' flag to 'true'. Then, within the same iteration of the loop, also check whether the first character of the learnMethod is 'S', indicating learning via event. If this is not the case, set 'eventOnly' flag to false.

      To see that this works, consider the following two cases for each Move:
        The edge with the learnMethod of 'S' comes first:
          In this case, the Move has not yet been added, so we set its 'eventOnly' flag to 'true'. Then, the iteration completes. If the Move is ever encountered again with a non-event learnMethod (first character not equal to 'S'), then the flag is set to 'false'. Otherwise, its 'eventOnly' flag is 'true', as desired.

        The edge with learnMethod not equal to 'S' comes first (includes edge with learnMethod 'S' not being present at all):
          The Move is added, with 'eventOnly' flag set to 'true'. Then, within the same iteration, the flag is immediately set to 'false'. Since now Move is a key of the array, its flag will never be set to 'true' again, so it remains 'false', as desired.
    */
    for (let moveEdge of data.pokemonByPSID[0].moves.edges) {
      const movePSID = moveEdge.node.psID;
      const learnMethod = moveEdge.learnMethod;
      
      // If move hasn't been encountered yet, set to true
      if (eventOnlyMoves?.[movePSID] === undefined) eventOnlyMoves[movePSID] = true;

      // If the learn method of the move is not 'S' (learned via event), then set to false
      if (learnMethod.charAt(0) !== 'S') eventOnlyMoves[movePSID] = false;
    }

    // #endregion

    // Construct array of MemberMoves
    // #region

    // Keep track of duplicates
    let addedMoves: { [key: string]: boolean } = {};

    return data.pokemonByPSID[0].moves.edges
      // Select only the node of the edge
      .map(edge => edge.node)
      // Gather list of Moves, removing duplicates
      .reduce((acc: MemberMove[], node: MemberMoveQueryResult) => {
        // Check whether move has 'eventOnly' flag
        const eventOnly = eventOnlyMoves[node.psID] === true;

        // Move hasn't been encountered yet
        if (addedMoves?.[node.psID] === undefined) {
          // Move has now been encountered
          addedMoves[node.psID] = true;

          // Add new Move to list of moves
          return acc.concat([new MemberMove(node, filters.genFilter.gen, eventOnly)]);
        }

        // If Move has already been encountered, do nothing
        return acc;
      }, []);

    // #endregion
  }, [data, filters.genFilter, ]);

  // Entries to be rendered, which should be sorted according to orderByKey
  const [entries, setEntries] = useState<MemberMove[] | undefined>(originalEntries);

  useEffect(() => {
    setEntries(originalEntries);
  }, [originalEntries, setEntries]);

  return (
    <div
      className="move-select__entries-wrapper"
    >
      {entries && entries.map(entry => {
        return (
          <MoveSelectEntry
            key={`moveSelectEntry_${entry.psID}`}
            clickHandlers={clickHandlers}
            move={entry}
          />
        )
      })}
    </div>
  )
};

export default MoveSelectEntries;