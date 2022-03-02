import { useCallback, useMemo } from "react";
import { AbilityCoverageQuery, computeSpeedControl, ItemCoverageQuery, MoveCoverageQuery } from "../../../../types-queries/Analyzer/Coverage";
import { MemberAndEntityPSIDs, MemberPSIDObject } from "../../../../types-queries/Analyzer/helpers";
import { Filters } from "../../../App";

type SpeedControlProps = {
  filters: Filters

  abilityData: AbilityCoverageQuery
  itemData: ItemCoverageQuery
  moveData: MoveCoverageQuery

  memberAndEntityPSIDs: MemberAndEntityPSIDs
  onMouseOver: (memberPSIDObject: MemberPSIDObject) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onMouseLeave: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
};

const SpeedControl = ({
  filters,

  abilityData,
  itemData,
  moveData,

  memberAndEntityPSIDs,
  onMouseOver,
  onMouseLeave,
}: SpeedControlProps) => {
  const speedControlDatum = useMemo(() => {
    return computeSpeedControl(
      memberAndEntityPSIDs,
      {
        fromAbilities: abilityData.abilitiesByPSID,
        fromItems: itemData.itemsByPSID,
        fromMoves: moveData.movesByPSID,
      },
    );
  }, [abilityData, itemData, moveData, memberAndEntityPSIDs]);

  const rankControlValue = useCallback((total: number) => {
    if (total > 2) return 'great';
    if (total > 1) return 'good';
    if (total > 0) return 'decent';
    else return 'ok';
  }, []);
  
  return (
    <div
      className="speed-control__wrapper"
      onMouseLeave={onMouseLeave}
    >
      <div className="speed-control__header">
        Speed control
      </div>
      <div
        className="speed-control__value"
        onMouseOver={onMouseOver(speedControlDatum.memberPSIDs)}
      >
        <span
          className={rankControlValue(speedControlDatum.total)}
        >
          {speedControlDatum.total}
        </span>
      </div>
    </div>
  )
};

export default SpeedControl;