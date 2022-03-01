import { useMemo } from "react";
import { AbilityCoverageQuery, computeSpeedControl, ItemCoverageQuery, MoveCoverageQuery } from "../../../types-queries/Analyzer/Coverage";
import { Filters } from "../../App";

type SpeedControlProps = {
  abilityData: AbilityCoverageQuery
  itemData: ItemCoverageQuery
  moveData: MoveCoverageQuery
  filters: Filters
};

const SpeedControl = ({
  abilityData,
  itemData,
  moveData,
  filters,
}: SpeedControlProps) => {
  const speedControlMap = useMemo(() => {
    return computeSpeedControl([...abilityData.abilitiesByPSID, ...itemData.itemsByPSID, ...moveData.movesByPSID]);
  }, [abilityData, itemData, moveData]);
  
  return (
    <div>SpeedControl</div>
  )
};

export default SpeedControl;