import { useMemo } from "react";
import { AbilityCoverageQuery, computeSpeedControl, ItemCoverageQuery, MoveCoverageQuery } from "../../../types-queries/Analyzer/Coverage";
import { MemberAndEntityPSIDs, MemberPSIDObject } from "../../../types-queries/Analyzer/helpers";
import { Filters } from "../../App";

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
  
  return (
    <div>SpeedControl</div>
  )
};

export default SpeedControl;