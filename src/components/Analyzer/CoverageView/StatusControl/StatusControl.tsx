import { useMemo } from "react";
import { AbilityCoverageQuery, computeStatusControl, ItemCoverageQuery, MoveCoverageQuery } from "../../../../types-queries/Analyzer/Coverage";
import { MemberAndEntityPSIDs, MemberPSIDObject } from "../../../../types-queries/Analyzer/helpers";
import { Filters } from "../../../App";
import './StatusControl.css';
import StatusControlEntry from "./StatusControlEntry";


type StatusControlProps = {
  filters: Filters

  abilityData: AbilityCoverageQuery
  itemData: ItemCoverageQuery
  moveData: MoveCoverageQuery

  memberAndEntityPSIDs: MemberAndEntityPSIDs
  onMouseOver: (memberPSIDObject: MemberPSIDObject) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onMouseLeave: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
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
  
  return (
    <div
      className="status-control__wrapper"
    >
      <div className="status-control__entry">
        <div className="status-control__icon"></div>
        <div className="status-control__name">
          
        </div>
        <div className="status-control__cause">
          +
        </div>
        <div className="status-control__resist">
          -
        </div>
      </div>
      {Array.from(statusControlMap.entries()).map(([statusName, summary]) => (
        <StatusControlEntry
          key={`status_control_${statusName}`}
          statusName={statusName}
          summary={summary}

          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
        />
      ))}
    </div>
  )
};

export default StatusControl;