import { useMemo } from "react";
import { AbilityCoverageQuery, computeStatusControl, ItemCoverageQuery, MoveCoverageQuery } from "../../../types-queries/Analyzer/Coverage";
import { Filters } from "../../App";

type StatusControlProps = {
  abilityData: AbilityCoverageQuery
  itemData: ItemCoverageQuery
  moveData: MoveCoverageQuery
  filters: Filters
};

const StatusControl = ({
  abilityData,
  itemData,
  moveData,
  filters,
}: StatusControlProps) => {
  const statusControlMap = useMemo(() => {
    return computeStatusControl([...abilityData.abilitiesByPSID, ...itemData.itemsByPSID, ...moveData.movesByPSID], filters.genFilter.gen);
  }, [abilityData, itemData, moveData, filters, ]);
  
  return (
    <div>StatusControl</div>
  )
};

export default StatusControl;