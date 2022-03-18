import { useMemo, useRef } from "react";
import { useRemoveFromTabOrder } from "../../../../hooks/useRemoveFromTabOrder";
import { AbilityCoverageQuery, computeFieldControl, ItemCoverageQuery, MoveCoverageQuery } from "../../../../types-queries/Analyzer/Coverage";
import { MemberAndEntityPSIDs, MemberPSIDObject } from "../../../../types-queries/Analyzer/helpers";
import { handleGridKeyDown } from "../../../../utils/gridFocusManagement";
import { Filters } from "../../../App";
import './FieldControl.css';
import FieldControlEntry from "./FieldControlEntry";


type FieldControlProps = {
  filters: Filters

  abilityData: AbilityCoverageQuery
  itemData: ItemCoverageQuery
  moveData: MoveCoverageQuery

  memberAndEntityPSIDs: MemberAndEntityPSIDs
  onMouseOver: (memberPSIDObject: MemberPSIDObject) => (e: React.MouseEvent<HTMLElement, MouseEvent> | React.FocusEvent<HTMLElement, Element>) => void
  onMouseLeave: (e: React.MouseEvent<HTMLElement, MouseEvent> | React.FocusEvent<HTMLElement, Element>) => void
};

const FieldControl = ({
  filters,
  
  abilityData,
  itemData,
  moveData,

  memberAndEntityPSIDs,
  onMouseOver,
  onMouseLeave,
}: FieldControlProps) => {
  const fieldControlMap = useMemo(() => {
    return computeFieldControl(
      memberAndEntityPSIDs,
      {
        fromAbilities: abilityData.abilitiesByPSID,
        fromItems: itemData.itemsByPSID,
        fromMoves: moveData.movesByPSID,
      },
      filters.genFilter.gen,
    );
  }, [abilityData, itemData, moveData, filters, memberAndEntityPSIDs]);

  const grid = useRef<HTMLTableSectionElement>(null);

  useRemoveFromTabOrder(grid);
  
  return (
    <table
      className="field-control__wrapper"
    >
      <tbody
        ref={grid}
        className="field-control__table-body"
        role="grid"
        tabIndex={0}
        onKeyDown={e => handleGridKeyDown({
          grid,
          numRows: Array.from(fieldControlMap.keys()).length + 1,
          numCols: 3,
          e,
          interactiveHeaders: false,
        })}
      >
        <tr
          role="row"
          aria-rowindex={1}
          className="field-control__entry"
        >
          <th
            scope="col"
            role="columnheader"
            aria-colindex={1}
            className="field-control__name"
          >
            Name
          </th>
          <th
            scope="col"
            role="columnheader"
            aria-colindex={2}
            className="field-control__create"
          >
            +
          </th>
          <th
            scope="col"
            role="columnheader"
            aria-colindex={3}
            className="field-control__resist"
          >
            -
          </th>
        </tr>
        {Array.from(fieldControlMap.entries()).map(([fieldStateClass, summary], rowIdx) => (
          <FieldControlEntry
            key={fieldStateClass}
            fieldStateClass={fieldStateClass}
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

export default FieldControl;