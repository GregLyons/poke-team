import { useMemo, useRef } from "react";
import { useRemoveFromTabOrder } from "../../../../hooks/useRemoveFromTabOrder";
import { AbilityCoverageQuery, computeStatusControl, ItemCoverageQuery, MoveCoverageQuery } from "../../../../types-queries/Analyzer/Coverage";
import { MemberAndEntityPSIDs, MemberPSIDObject } from "../../../../types-queries/Analyzer/helpers";
import { handleGridKeyDown } from "../../../../utils/gridFocusManagement";
import { Filters } from "../../../App";
import './StatusControl.css';
import StatusControlEntry from "./StatusControlEntry";


type StatusControlProps = {
  filters: Filters

  abilityData: AbilityCoverageQuery
  itemData: ItemCoverageQuery
  moveData: MoveCoverageQuery

  memberAndEntityPSIDs: MemberAndEntityPSIDs
  onMouseOver: (memberPSIDObject: MemberPSIDObject) => (e: React.MouseEvent<HTMLElement, MouseEvent> | React.FocusEvent<HTMLElement, Element>) => void
  onMouseLeave: (e: React.MouseEvent<HTMLElement, MouseEvent> | React.FocusEvent<HTMLElement, Element>) => void
};

const StatusControl = ({
  filters,

  abilityData,
  itemData,
  moveData,

  memberAndEntityPSIDs,
  onMouseOver,
  onMouseLeave,
}: StatusControlProps) => {
  const statusControlMap = useMemo(() => {
    return computeStatusControl(
      memberAndEntityPSIDs,
      {
        fromAbilities: abilityData.abilitiesByPSID,
        fromItems: itemData.itemsByPSID,
        fromMoves: moveData.movesByPSID,
      },
      filters.genFilter.gen
    );
  }, [abilityData, itemData, moveData, filters, memberAndEntityPSIDs]);

  const grid = useRef<HTMLTableSectionElement>(null);

  useRemoveFromTabOrder(grid);
  
  return (
    <table
      className="status-control__wrapper"
    >
      <tbody
        ref={grid}
        className="field-control__table-body"
        role="grid"
        tabIndex={0}
        onKeyDown={e => handleGridKeyDown({
          grid,
          numRows: Array.from(statusControlMap.keys()).length + 1,
          numCols: 3,
          e,
          interactiveHeaders: false,
        })}
      >
        <tr
          className="status-control__entry"
        >
          <th
            scope="col"
            role="columnheader"
            aria-colindex={1}
            className="status-control__name"
          >
            Name
          </th>
          <th
            scope="col"
            role="columnheader"
            aria-colindex={2}
            className="status-control__cause"
          >
            +
          </th>
          <th
            scope="col"
            role="columnheader"
            aria-colindex={3}
            className="status-control__resist"
          >
            -
          </th>
        </tr>
        {Array.from(statusControlMap.entries()).map(([statusName, summary], rowIdx) => (
          <StatusControlEntry
            key={statusName}
            statusName={statusName}
            summary={summary}

            rowIdx={rowIdx}

            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
          />
        ))}
      </tbody>
    </table>
  )
};

export default StatusControl;