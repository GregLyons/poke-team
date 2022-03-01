import { useMemo } from "react";
import { AbilityCoverageQuery, computeFieldControl, ItemCoverageQuery, MoveCoverageQuery } from "../../../types-queries/Analyzer/Coverage";
import { Filters } from "../../App";

type FieldControlProps = {
  abilityData: AbilityCoverageQuery
  itemData: ItemCoverageQuery
  moveData: MoveCoverageQuery
  filters: Filters
};

const FieldControl = ({
  abilityData,
  itemData,
  moveData,
  filters,
}: FieldControlProps) => {
  const fieldControlMap = useMemo(() => {
    return computeFieldControl([...abilityData.abilitiesByPSID, ...itemData.itemsByPSID, ...moveData.movesByPSID], filters.genFilter.gen);
  }, [abilityData, itemData, moveData, filters, ]);
  
  return (
    <div>FieldControl</div>
  )
};

export default FieldControl;