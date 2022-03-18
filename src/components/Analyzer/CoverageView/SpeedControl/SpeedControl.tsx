import { useMemo, useRef } from "react";
import { useRemoveFromTabOrder } from "../../../../hooks/useRemoveFromTabOrder";
import { AbilityCoverageQuery, computeSpeedControl, ItemCoverageQuery, MoveCoverageQuery } from "../../../../types-queries/Analyzer/Coverage";
import { MemberAndEntityPSIDs, MemberPSIDObject } from "../../../../types-queries/Analyzer/helpers";
import { handleGridKeyDown } from "../../../../utils/gridFocusManagement";
import './SpeedControl.css';
import SpeedControlEntry from "./SpeedControlEntry";


type SpeedControlProps = {
  abilityData: AbilityCoverageQuery
  itemData: ItemCoverageQuery
  moveData: MoveCoverageQuery

  memberAndEntityPSIDs: MemberAndEntityPSIDs
  onMouseOver: (memberPSIDObject: MemberPSIDObject) => (e: React.MouseEvent<HTMLElement, MouseEvent> | React.FocusEvent<HTMLElement, Element>) => void
  onMouseLeave: (e: React.MouseEvent<HTMLElement, MouseEvent> | React.FocusEvent<HTMLElement, Element>) => void
};

const SpeedControl = ({
  abilityData,
  itemData,
  moveData,

  memberAndEntityPSIDs,
  onMouseOver,
  onMouseLeave,
}: SpeedControlProps) => {
  const speedControlMap = useMemo(() => {
    return computeSpeedControl(
      memberAndEntityPSIDs,
      {
        fromAbilities: abilityData.abilitiesByPSID,
        fromItems: itemData.itemsByPSID,
        fromMoves: moveData.movesByPSID,
      },
    );
  }, [abilityData, itemData, moveData, memberAndEntityPSIDs]);

  const grid = useRef<HTMLTableSectionElement>(null);

  useRemoveFromTabOrder(grid);
  
  return (
    <table
      className="speed-control__wrapper"
    >
      <tbody
        ref={grid}
        className="speed-control__table-body"
        role="grid"
        tabIndex={0}
        onKeyDown={e => handleGridKeyDown({
          grid,
          numRows: Object.keys(speedControlMap).length + 1,
          numCols: 2,
          e,
          interactiveHeaders: false,
        })}
      >
        <tr
          role="row"
          aria-rowindex={1}
          className="speed-control__entry"
        >
          <th
            scope="col"
            role="columnheader"
            aria-colindex={1}
            className="speed-control__name"
          >
            Class
          </th>
          <td
            scope="col"
            role="columnheader"
            aria-colindex={2}
            className="speed-control__value"
          >
            #
          </td>
        </tr>
        {(Object.entries(speedControlMap)).map(([speedControlKey, coverageDatum], rowIdx) => (
          <SpeedControlEntry
            key={speedControlKey}
            rowIdx={rowIdx}
            speedControlKey={speedControlKey}
            coverageDatum={coverageDatum}

            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
          />
        ))}
      </tbody>
    </table>
  )
};

export default SpeedControl;